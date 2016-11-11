import React from 'react';
import { Route } from 'react-router';
import Poss from '../component/business/enroll/index/index';
import ChildrenRt from '../component/business/enroll/router';

export default (
    <div>
        <Route path='/' component={Poss}>
            {ChildrenRt}
        </Route>
    </div>
);