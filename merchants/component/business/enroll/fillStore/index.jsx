import React , { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory  } from 'react-router';
import { Form, Input, DatePicker, Col , Button ,Cascader  ,Row ,InputNumber,Select } from 'antd';
import { getCurrent } from '../index/action'
import {Title} from '../../../public/title/title';

import {getProvinceAjax ,getCityAjax ,codeAjax ,verfiyCodeAjax ,saveForm} from './action';

const FormItem = Form.Item;
const InputGroup = Input.Group;

@connect(state =>{
    const {city , province ,verfiy,formData} = state.fillStoreRs;
    return {
        city ,
        province ,
        verfiy,
        formData
    }
},dispatch =>({
    setCurrent:(current) => dispatch(getCurrent(current)),
    ProvinceAjax:(url) => dispatch(getProvinceAjax(url)),
    CityAjax:(url) => dispatch(getCityAjax(url)),
    getCode:(url) => dispatch(codeAjax(url)),
    getVerfiy:(url) => dispatch(verfiyCodeAjax(url)),
    setForm:(data) => dispatch(saveForm(data))
}))
export default class FillStore extends Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPhoneRq = this.onPhoneRq.bind(this);
        this.onGetCode = this.onGetCode.bind(this);
        this.onProvince = this.onProvince.bind(this);
    }
    componentWillMount(){
        this.props.setCurrent(1);
        this.props.ProvinceAjax({url:'/api/seller/apply/provinceList',method:'POST'});
    }
    componentDidMount(){
        const form = this.props.form;
        form.setFieldsValue(this.props.formData);
    }
    handleSubmit(e){
        let isForm = true;
        const form = this.props.form;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }else{
                isForm = false;
            }
        });
        console.log(form.getFieldsValue());
        if(isForm){
            this.props.setForm(Object.assign(form.getFieldsValue(),{showModel:true}));
            this.props.getVerfiy({url:'/api/seller/apply/checkVerifyCode',mobileNo:form.getFieldValue('personPhone'),verifyCode:form.getFieldValue('verifyCode')});
        }
    }
    onPhoneRq(rule, value, callback){
        if(/^\d*$/g.test(value)){
            if(value.length != 11){
                callback('请输入11位电话号码!');
            }
        }else{
            callback('请输入正确的电话号码!');
        }
    }
    onGetCode(){
        const form = this.props.form;
        if(form.getFieldValue('personPhone')){
            if(form.getFieldValue('personPhone').length == 11){
                this.props.getCode({url:'/api/seller/apply/sendVerifyCode',mobileNo:form.getFieldValue('personPhone')});
            }
        }
    }
    onProvince(val){
        const form = this.props.form;
        this.props.CityAjax({url:'/api/seller/apply/cityList',method:'POST',data:{provinceCode:val}});
        form.setFieldsValue({companyCity:''});
    }
    render(){
        const formItemLayout  = {
            labelCol : { span: 6 },
            wrapperCol : { span: 12 }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 6
            }
        };
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="store-box">
                <Title title="填写公司信息" />
                <Form horizontal onSubmit = {this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="公司名称"
                        hasFeedback>
                        {getFieldDecorator('company', {
                            rules: [{ required: true, message: '请输入公司名称!' }]
                        })(
                            <Input placeholder="请输入公司名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司所在地">
                        <Row gutter={24}>
                            <Col span={12}>
                                {getFieldDecorator('companyProvince')(
                                    <Select placeholder="省" onChange={this.onProvince}>
                                        {this.props.province.info.map((d) =>
                                                <Option value={d.code}>{d.name}</Option>
                                        )}
                                    </Select>
                                )}
                            </Col>
                            <Col span={12}>
                                {getFieldDecorator('companyCity')(
                                    <Select placeholder="市">
                                        {this.props.city.success ? this.props.city.info.map((d) =>
                                                <Option value={d.code}>{d.name}</Option>
                                        ) : null}
                                    </Select>
                                )}
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司地址">
                        {getFieldDecorator('companyAdd',{initialValue:''})(
                            <Input placeholder="请填写公司详细地址" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="传真">
                        {getFieldDecorator('fax',{initialValue:''})(
                            <Input placeholder="请填写传真号" />
                        )}
                    </FormItem>
                    <Title title="填写店铺联系人" />
                    <FormItem
                        {...formItemLayout}
                        label="联系人姓名"
                        hasFeedback>
                        {getFieldDecorator('contactName',{
                            rules:[{required:true,message:'请填写店铺负责人姓名'}]
                        })(
                            <Input placeholder="请填写店铺负责人姓名" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="联系人手机"
                        >
                        {getFieldDecorator('personPhone',{
                            rules:[
                                {required:true,message:'必填项不能为空'},
                                {validator: this.onPhoneRq}
                            ]
                        })(
                            <Input placeholder="请输入手机号" />
                        )}
                    </FormItem>
                    <FormItem
                       labelCol={{ span: 6 }}
                        wrapperCol= {{ span: 12 }}
                        label="手机验证码"
                        >
                        {getFieldDecorator('verifyCode',{
                            rules:[
                                {required:true,message:'必填项不能为空'}
                            ]
                        })(
                            <div className="yzm-box">
                                <Row gutter={16}>
                                    <Col span={10}><Input  placeholder="请输入验证码" /></Col>
                                    <Col span={6}> <Button  className="btnStore" onClick={this.onGetCode}>获取验证码</Button></Col>
                                </Row>
                            </div>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                        hasFeedback>
                        {getFieldDecorator('email',{
                            rules:[
                                {required:true,message:'必填项不能为空'},
                                {type:'email',message:'请输入正确的邮箱地址'}
                            ]
                        })(
                            <Input  placeholder=" 将作为商户后台的登录名，收取初始密码" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="QQ"
                        hasFeedback>
                        {getFieldDecorator('qq',{
                            rules:[
                                {required:true,message:'必填项不能为空'}
                            ]
                        })(
                            <Input  placeholder="请填写您的QQ号" />
                        )}
                    </FormItem>

                    <Title title="填写结算银行账户" />
                    <FormItem
                        {...formItemLayout}
                        label="银行开户名"
                        hasFeedback>
                        {getFieldDecorator('bankUser',{
                            rules:[
                                {required:true,message:'必填项不能为空'}
                            ]
                        })(
                            <Input  placeholder=" 开户行名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="开户行帐号"
                        hasFeedback>
                        {getFieldDecorator('bankCode',{
                            rules:[
                                {required:true,message:'必填项不能为空'}
                            ]
                        })(
                            <Input maxlength='10'  placeholder="开户行帐号" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="开户行支行名称"
                        hasFeedback>
                        {getFieldDecorator('bankNameBranch',{
                            rules:[
                                {required:true,message:'必填项不能为空'}
                            ]
                        })(
                            <Input  placeholder="分支行信息" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="联行号"
                        hasFeedback>
                        {getFieldDecorator('brandNameCode',{
                            initialValue:''
                        })(
                            <Input  placeholder="" />
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">下一步</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

FillStore = Form.create({})(FillStore);