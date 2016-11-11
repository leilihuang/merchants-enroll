import { SUB_FORM ,GET_SHOP ,GET_MENU} from './action';

const initState = {
    sellerApplyForm:{},
    shop:{
        info:{}
    },
    menuType:{
        info:[]
    }
};

export const companyRs = (state = initState ,action) =>{
    switch (action.type){
        case SUB_FORM:
        case GET_SHOP:
        case GET_MENU:
            return Object.assign({},state,action);
        default:
            return state;
    }
};
