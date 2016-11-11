import './company.less';
import React , { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory  } from 'react-router';
import { Form ,Input ,Radio ,Select ,Upload, Icon, Modal ,Button} from 'antd';
import { Title } from '../../../public/title/title';
import { getCurrent } from '../index/action';
import { setFormAjax , getShopAjax ,getMenuAjax} from './action';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@connect(state =>{
    return {
        FormData:state.fillStoreRs.formData,
        Shops:state.companyRs.shop,
        Menus:state.companyRs.menuType
    }
},dispatch =>({
    setCurrent:(current) => dispatch(getCurrent(current)),
    setForm:(data) => dispatch(setFormAjax(data)),
    getMenu:(data) => dispatch(getMenuAjax(data)),
    getShop:(data) => dispatch(getShopAjax(data))
}))
export default class SubCompany extends Component{
    constructor(props){
        super(props);
        this.state ={
            previewVisible: false,
            previewImage: '',
            showCompany:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCompany = this.handleCompany.bind(this);
        this.eventCate = this.eventCate.bind(this);
    }
    componentWillMount(){
        this.props.setCurrent(2);
        this.props.getMenu({url:'/api/seller/apply/mainCategoryList',method:'POST'});

        this.props.getShop({url:'/api/seller/apply/storeTypes',method:'POST'});
    }
    componentDidMount(){
        if(this.props.FormData.showModel){
           this.setState({
               showCompany:true
           });
        }else{
            Modal.info({
                title: '提示信息',
                content: (
                    <div>
                        <p>由于你刷新页面，导致数据失效请重新填写！</p>
                    </div>
                ),
                onOk() {
                    browserHistory.push('/fillStore');
                }
            });
        }
    }
    handleCancel() {
        this.setState({
            previewVisible: false
        });
    }
    handleSubmit(e){
        let isForm = true;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }else{
                isForm = false;
            }
        });
        console.log(this.props.form.getFieldsValue())
        if(isForm){
            this.props.setForm({url:'/api/seller/apply/submit',method:'POST',data:Object.assign(this.props.FormData,this.props.form.getFieldsValue())});
        }
    }
    handleOk(){
        browserHistory.push('/fillStore');
    }
    handleCompany(){
        this.setState({
            showCompany:false
        });
    }
    eventCate(e){
        this.props.form.setFieldsValue({mainCategory:e});
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 6
            }
        };
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        const props = {
            action: 'http://192.168.1.33/v2/api/task/qiniuUploadImage',
            listType: 'picture-card',
            defaultFileList: [],
            onPreview: (file) => {
                console.log(file);
                this.setState({
                    previewImage: file.url,
                    previewVisible: true
                });
            },
            onChange:(file,fileList,event) =>{
                console.log(file)
            }
        };

        const radios = () =>{
            let menus =Object.keys(this.props.Shops.info);
            let radio;
            if(menus.length > 0){
                radio = menus.map((d) =>{
                   return <Radio value={d}>{this.props.Shops.info[d]}</Radio>
                })
            }
            return radio;
        };

        const selectBox = () =>{
            let selects;
            if(this.props.Menus.info.length > 0){
                selects = this.props.Menus.info.map((d,i) =>{
                        return <Option key={'sel'+i} value={d.id}>{d.name}</Option>
                    })
            }
            return selects;
        };

        return (
            <div className="company-box">

                <Title title="企业信息认证" />
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="店铺类型">
                        {getFieldDecorator('storeType', {
                            initialValue:1
                        })(
                            <RadioGroup>
                                {radios()}
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="店铺名称"
                        hasFeedback>
                        {getFieldDecorator('sellerName', {
                            rules: [{
                                required: true, message: '不能为空'
                            }]
                        })(
                           <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="主营类目">
                        {getFieldDecorator('mainCategory',{
                            rules: [{ required: true, message: '不能为空!',type:'number' }]
                        })(
                            <Select>
                                {this.props.Menus.info.map((d) =>
                                        <Option value={d.id}>{d.name}</Option>
                                )}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="公司名称"
                        hasFeedback>
                        {getFieldDecorator('company', {
                            rules: [{
                                required: true, message: '不能为空'
                            }]
                        })(
                           <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="法人姓名"
                        hasFeedback>
                        {getFieldDecorator('legalPersonName', {
                            rules: [{
                                required: true, message: '不能为空'
                            }]
                        })(
                            <Input placeholder=" 请填写你营业执照上的公司名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="营业执照"
                        hasFeedback>
                        {getFieldDecorator('bussinessLicense', {
                            rules: [{
                                required: true, message: '不能为空'
                            }]
                        })(
                            <Input placeholder="请填写你营业执照上的统一社会信用代码" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="营业执照图片"
                        >
                        {getFieldDecorator('bussinessLicenseImage', {
                            valuePropName: 'fileList',
                            normalize: this.normFile
                        })(
                            <div className="clearfix">
                                <Upload {...props}>
                                    <Icon type="plus" />
                                    <div className="ant-upload-text">Upload</div>
                                </Upload>
                                <a href="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" target="_blank" rel="noopener noreferrer" className="upload-example">
                                    <img alt="example" src="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" />
                                    <span>参考图片</span>
                                </a>
                                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" src={this.state.previewImage} />
                                </Modal>
                            </div>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="法人身份证（正面）"
                        >
                        {getFieldDecorator('personCardUp', {
                            valuePropName: 'fileList'
                        })(
                            <div className="clearfix">
                                <Upload {...props}>
                                    <Icon type="plus" />
                                    <div className="ant-upload-text">Upload</div>
                                </Upload>
                                <a href="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" target="_blank" rel="noopener noreferrer" className="upload-example">
                                    <img alt="example" src="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" />
                                    <span>参考图片</span>
                                </a>
                                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" src={this.state.previewImage} />
                                </Modal>
                            </div>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="法人身份证（反面）"
                        >
                        {getFieldDecorator('personCardDown', {
                            valuePropName: 'fileList'
                        })(
                            <div className="clearfix">
                                <Upload {...props}>
                                    <Icon type="plus" />
                                    <div className="ant-upload-text">Upload</div>
                                </Upload>
                                <a href="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" target="_blank" rel="noopener noreferrer" className="upload-example">
                                    <img alt="example" src="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" />
                                    <span>参考图片</span>
                                </a>
                                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" src={this.state.previewImage} />
                                </Modal>
                            </div>
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">提交认证</Button>
                    </FormItem>
                </Form>
                <Modal className="model-company" title="Modal" visible={this.state.showCompany}
                       onCancel={this.handleCompany} onOk={this.handleOk}
                       okText="返回修改" cancelText="确认"
                    >
                    <p><span className="lab">公司名称：</span><span className="con">{this.props.FormData.company}</span></p>
                    <p><span className="lab">QQ：</span><span className="con">{this.props.FormData.qq}</span></p>
                    <p><span className="lab">手机：</span><span className="con">{this.props.FormData.personPhone}</span></p>
                    <p><span className="lab">邮箱：</span><span className="con">{this.props.FormData.email}</span></p>
                </Modal>
            </div>
        )
    }
}
SubCompany = Form.create()(SubCompany);
