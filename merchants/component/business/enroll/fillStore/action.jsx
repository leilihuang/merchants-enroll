import { browserHistory  } from 'react-router';
import Util from '../../ajax';
import {Modal } from 'antd';

export const YZ_CODE = 'YZ_CODE';
export const GET_CITY = 'GET_CITY';
export const GET_PROVINCE = 'GET_PROVINCE';
export const VERFIY_CODE = 'VERFIY_CODE';
export const SAVE_FORM = 'SAVE_FORM';

export const saveForm = (formData) =>({
    type:SAVE_FORM,
    formData
});

const getCode = (code) =>({
    type:YZ_CODE,
    code
});
export const codeAjax = (url) => dispatch =>{
    Util.ajax(url,dispatch,(data) =>{
        dispatch(getCode(data));
        if(data.success && data.info){
            Modal.success({
                title: '提示信息',
                content: '验证码发送成功，请注意查收！'
            });
        }else{
            Modal.error({
                title: '提示信息',
                content: data.errorMessage
            });
        }
    })
};

const verfiyCode = (verfiy) => ({
    type:VERFIY_CODE,
    verfiy
});

export const verfiyCodeAjax = (url) => (dispatch) =>{
    Util.ajax(url,dispatch,(data) =>{
        dispatch(verfiyCode(data));
        if(!data.success && data.info){
            Modal.error({
                title: '提示信息',
                content: data.errorMessage
            });
        }else{
            if(data.success && data.info){
                browserHistory.push('/subCompany')
            }
        }
    })
};

const getProvince = (province) =>({
    type:GET_PROVINCE,
    province
});
export const getProvinceAjax = (url) => (dispatch) =>{
    Util.ajax(url,dispatch,(data) =>{
        dispatch(getProvince(data));
    })
};

const getCity = (city) =>({
    type:GET_CITY,
    city
});
export const getCityAjax = (url) => (dispatch) =>{
    Util.ajax(url,dispatch,(data) =>{
        if(data.success){
            dispatch(getCity(data));
        }else{
            dispatch(getCity(data));
            Modal.error({
                title: '提示信息',
                content: data.errorMessage
            });
        }
    })
};


