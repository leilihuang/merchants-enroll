export const SHOW_LOAD = 'SHOW_LAOD';
export const HIDE_LOAD = 'HIDE_LOAD';

export const showLoad = () =>({
    type:SHOW_LOAD,
    spinning:true
});
export const hideLoad = () =>({
    type:HIDE_LOAD,
    spinning:false
});
