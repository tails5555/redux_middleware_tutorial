import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { RootStore } from './store';
import { RootRouter } from './router';

const ApplicationRoot = () => (
    <Provider store={RootStore}>
        <Router>
            <RootRouter />
        </Router>
    </Provider>
);

export default ApplicationRoot;