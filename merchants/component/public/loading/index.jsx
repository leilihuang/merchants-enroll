import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

@connect(state =>({
    spinning:state.loadingRs.spinning
}))
export default class Loading extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="loading-box">
                <Spin spinning={this.props.spinning} tip="Loading..." />
            </div>
        )
    }
}