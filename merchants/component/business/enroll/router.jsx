import React from 'react';
import { Route , IndexRoute} from 'react-router';

import Index from './index/index';
import Agreement from './agreement/index';
import FillStore from './fillStore/index';
import SubCompany from './subCompany/index';
import Result from './result/index';

const enrollRt = (
    <div>
        <IndexRoute component={Agreement}  />
        <Route path='agreement' component={Agreement}></Route>
        <Route path='fillStore' component={FillStore}></Route>
        <Route path='subCompany' component={SubCompany}></Route>
        <Route path='result' component={Result}></Route>
    </div>
);

export default enrollRt;