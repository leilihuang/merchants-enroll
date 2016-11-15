import { browserHistory  } from 'react-router';
import Util from '../../ajax';
import {Modal } from 'antd';

export const SUB_FORM = 'SUB_FORM';
export const GET_SHOP = 'GET_SHOP';
export const GET_MENU = 'GET_MENU';

const setForm = (sellerApplyForm) =>({
    type:SUB_FORM,
    sellerApplyForm
});

export const setFormAjax = (params) =>(dispatch)=>{
    Util.ajax(params,dispatch,(data)=>{
        dispatch(setForm(data));
        if(data.success && data.info){
            browserHistory.push('/result');
        }else{
            Modal.error({
                title: '提示信息',
                content: data.errorMessage
            });
        }
    });
};
export const isNames = params => (dispatch) =>{
    Util.ajax(params.param,dispatch,(data)=>{
        if(data.success){
            dispatch(setFormAjax(params.next));
        }else{
            Modal.error({
                title: '提示信息',
                content: data.errorMessage
            });
        }
    });
};

const getShop = (shop) =>({
    type:GET_SHOP,
    shop
});
export const getShopAjax = (params) =>(dispatch)=>{
    Util.ajax(params,dispatch,(data)=>{
        dispatch(getShop(data));
    });
};

const getMenu = (menuType) =>({
    type:GET_MENU,
    menuType
});
export const getMenuAjax = (params) =>(dispatch)=>{
    Util.ajax(params,dispatch,(data)=>{
        dispatch(getMenu(data));
    });
};

