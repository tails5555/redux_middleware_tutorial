import React from 'react';

import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Modal, ModalHeader, ModalBody } from 'reactstrap';

import * as postActions from '../action/action_post';

import { PostElementView } from '../component';

const mapStateToProps = (state) => ({
    postElement : state.post.postElement
});

const mapDispatchToProps = (dispatch) => ({
    postAction : bindActionCreators(postActions, dispatch)
});


class PostViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { storePost : null, storeLoading : false, storeError : null };
    }

    componentDidMount() {
        const { postAction, location } = this.props;
        const queryModel = queryString.parse(location.search);
        postAction.fetch_post_element_by_id(queryModel && queryModel.id);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { post, loading, error } = nextProps.postElement;
        if(
            prevState.storePost !== post ||
            prevState.storeLoading !== loading ||
            prevState.storeError !== error
        ) {
            return {
                storePost : post,
                storeLoading : loading,
                storeError : error
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

    componentDidUpdate(prevProps, prevState){
        const { storeError } = this.state;
        if(storeError !== prevState.storeError){
            const { location, history } = this.props;
            const { search } = location;
            const queryModel = queryString.parse(search);
            queryModel['id'] = undefined;
            alert(`게시물을 불러오는 도중 오류가 발생했습니다. 이전으로 돌아갑니다.\n오류 내용 : ${storeError}`);
            history.push(`/bbs/list?${queryString.stringify(queryModel)}`);
        }
    }

    componentWillUnmount(){
        const { postAction } = this.props;
        const { post } = this.state;
        if(post !== null)
            postAction.reset_fetch_post_element_by_id();
    }

    render(){
        const { storePost, storeLoading, storeError } = this.state;

        let saveView = (
            <Modal isOpen={storeLoading}>
                <ModalHeader>게시물을 불러오는 중 입니다.</ModalHeader>
                <ModalBody>
                    <h1 className="text-center"><i className="fa fa-spinner fa-spin" /></h1>
                    <h2 className="text-center">잠시만 기다려 주세요!!!</h2>
                </ModalBody>
            </Modal>
        );

        return(
            <Container style={{ padding : '10px' }}>
                <div id="post_element_card_view" style={{ margin : '10px' }}>
                    <PostElementView post={storePost} loading={storeLoading} error={storeError} />
                </div>
                <div id="post_loading_modal">
                    { saveView }
                </div>
            </Container>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostViewContainer)
);