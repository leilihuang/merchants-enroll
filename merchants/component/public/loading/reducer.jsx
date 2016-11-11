import { SHOW_LOAD , HIDE_LOAD } from './action';

export const loadingRs = (state = {spinning:false} , action) =>{
    switch (action.type){
        case SHOW_LOAD:
        case HIDE_LOAD:
            return {...state,...action};
        default :
            return state;
    }
};