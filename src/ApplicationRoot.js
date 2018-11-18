import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ThunkStore } from './store';
import { RootRouter } from './router';

const ApplicationRoot = () => (
    <Provider store={ThunkStore}>
        <Router>
            <RootRouter />
        </Router>
    </Provider>
);

export default ApplicationRoot;