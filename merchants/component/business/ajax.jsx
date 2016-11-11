import reqwest from 'reqwest';
import { connect } from 'react-redux';
import { showLoad , hideLoad } from '../public/loading/action';

class Util{
    ajax(params,dispatch,callback){
        dispatch(showLoad());
        /**
         * @url 请求地址(必填)
         * @type  json数据类型
         * @method  请求类型
         * @callback（必填）  回调函数*/
        reqwest({
            url:params.url,
            type:params.type || 'json',
            method:params.method || 'GET',
            data:params.data || {}
        })
            .then((resp) => {
                callback( Object.assign({},resp,{success:true}));
            })
            .fail((err) =>{
                callback(Object.assign({},err,{success:false}));

            })
        .always(resp => {
                dispatch(hideLoad())
            })
    }
}

const util = new Util();

export default util;