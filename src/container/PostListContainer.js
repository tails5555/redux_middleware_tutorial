import React from 'react';

import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import * as typeActions from '../action/action_type';
import * as postActions from '../action/action_post';

import { PostTableView } from '../component';

const mapStateToProps = (state) => ({
    typeElement : state.type.typeElement,
    postList : state.post.postList
});

const mapDispatchToProps = (dispatch) => ({
    typeAction : bindActionCreators(typeActions, dispatch),
    postAction : bindActionCreators(postActions, dispatch)
});

class PostListContainer extends React.Component {
    constructor(props){
        super(props);
        const { search } = this.props.location;
        this.state = { query : search, storeType : null, storeTypeLoading : false, storeTypeError : null, storePosts : [], storePostsLoading : false, storePostsError : null, storePostsCount : 0 };
    }

    componentDidMount() {
        const { query } = this.state;
        const queryModel = queryString.parse(query);

        const { typeAction, postAction } = this.props;
        typeAction.fetch_bbs_type_element_by_id(queryModel && queryModel.type);
        postAction.fetch_post_list_by_query(queryModel)
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { typeElement, postList } = nextProps;
        if(
            prevState.storeType !== typeElement.type ||
            prevState.storeTypeLoading !== typeElement.loading ||
            prevState.storeTypeError !== typeElement.error ||
            prevState.storePosts !== postList.posts ||
            prevState.storePostsLoading !== postList.loading ||
            prevState.storePostsError !== postList.error ||
            prevState.storePostsCount !== postList.count
        ) {
            return {
                storeType : typeElement.type,
                storeTypeLoading : typeElement.loading,
                storeTypeError : typeElement.error,
                storePosts : postList.posts,
                storePostsLoading : postList.loading,
                storePostsError : postList.error,
                storePostsCount : postList.count
            };
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState){
        for (let stateKey in this.state) {
            if(this.state[stateKey] !== nextState[stateKey]){
                return true;
            }
        }
        for (let propsKey in this.props) {
            if(this.props[propsKey] !== nextProps[propsKey]) {
                return true;
            }
        }
        return false;
    }

    render(){
        const { storeType, storeTypeLoading, storeTypeError, storePosts, storePostsLoading, storePostsError, storePostsCount } = this.state;

        let typeView = null;
        
        if(storeTypeLoading){
            typeView = <h1><i className="fa fa-spinner fa-spin" /> 제목을 불러오는 중입니다...</h1>
        }
        
        if(storeType !== null){
            typeView = <h1>{ storeType && storeType.name }</h1>
        } else if (storeTypeError !== null) {
            typeView = <h1><i className="fas fa-exclamation-triangle" /> { storeTypeError }</h1>
        }

        return(
            <Container style={{ padding : '10px' }}>
                <div id="type_title">
                    {typeView}
                </div>
                <hr/>
                <div id="type_post_view">
                    <PostTableView posts={storePosts} loading={storePostsLoading} error={storePostsError} />
                </div>
            </Container>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
);