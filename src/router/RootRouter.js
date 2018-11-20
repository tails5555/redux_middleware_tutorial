import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomeContainer from '../container/HomeContainer';
import MenuBarContainer from '../container/MenuBarContainer';
import PostListContainer from '../container/PostListContainer';
import PostCreateContainer from '../container/PostCreateContainer';

const RootRouter = () => (
    <Fragment>
        <MenuBarContainer />
        <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/bbs/create" component={PostCreateContainer} />
            <Route exact path="/bbs/list" component={PostListContainer} />
            <Route exact path="/bbs/list/_ref" render={(({location}) => <Redirect to={`/bbs/list${location.search}`} />)} />
        </Switch>
    </Fragment>
);

export default RootRouter;