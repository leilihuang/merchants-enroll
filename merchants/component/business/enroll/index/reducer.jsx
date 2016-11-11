import { POSS_CURRENT } from './action';

const initState = {
    current:0
};

export const possRs = (state = initState , action ) =>{
    switch(action.type){
        case POSS_CURRENT:
            return Object.assign({},state,action.poss);
        default :
            return state;
    }
};