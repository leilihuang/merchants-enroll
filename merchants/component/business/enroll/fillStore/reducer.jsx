import { YZ_CODE ,GET_CITY ,GET_PROVINCE ,VERFIY_CODE ,SAVE_FORM} from './action';

const initState = {
    city:{
        info:[]
    },
    province:{
        info:[]
    },
    code:{
        info:false
    },
    verfiy:{
        success:false,
        info:false
    },
    formData:{
        showModel:false
    }
};

export const fillStoreRs = (state =initState , action) =>{
    switch (action.type){
        case YZ_CODE:
        case GET_PROVINCE:
        case GET_CITY:
        case VERFIY_CODE:
        case SAVE_FORM:
            return Object.assign({},state,action);
        default :
            return state;
    }
};