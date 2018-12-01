import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomeContainer from '../container/HomeContainer';
import MenuBarContainer from '../container/MenuBarContainer';
import PostListContainer from '../container/PostListContainer';
import PostCreateContainer from '../container/PostCreateContainer';
import PostViewContainer from '../container/PostViewContainer';
import PostUpdateContainer from '../container/PostUpdateContainer';
import MemoListContainer from '../container/MemoListContainer';
import MemoViewContainer from '../container/MemoViewContainer';
import MemoCreateContainer from '../container/MemoCreateContainer';

const RootRouter = () => (
    <Fragment>
        <MenuBarContainer />
        <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/bbs/create" component={PostCreateContainer} />
            <Route exact path="/bbs/edit" component={PostUpdateContainer} />
            <Route exact path="/bbs/list" component={PostListContainer} />
            <Route exact path="/bbs/view" component={PostViewContainer} />
            <Route exact path="/bbs/list/_ref" render={(({location}) => <Redirect to={`/bbs/list${location.search}`} />)} />
            
            <Route exact path="/memo/list" component={MemoListContainer} />
            <Route exact path="/memo/list/_ref" render={(({location}) => <Redirect to={`/memo/list${location.search}`} />)} />
            <Route exact path="/memo/view" component={MemoViewContainer} />
            <Route exact path="/memo/create" component={MemoCreateContainer} />
        </Switch>
    </Fragment>
);

export default RootRouter;