import React from 'react';

import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Modal, ModalHeader, ModalBody } from 'reactstrap';

import * as postActions from '../action/action_post';

import { PostElementView } from '../component';

const mapStateToProps = (state) => ({
    postElement : state.post.postElement,
    postDelete : state.post.postDelete
});

const mapDispatchToProps = (dispatch) => ({
    postAction : bindActionCreators(postActions, dispatch)
});

class PostViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { storePost : null, storeLoading : false, storeError : null, storeDeleteStatus : null, storeDeleteLoading : false, storeDeleteError : null };
    }

    componentDidMount() {
        const { postAction, location } = this.props;
        const queryModel = queryString.parse(location.search);
        postAction.fetch_post_element_by_id(queryModel && queryModel.id);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { postElement, postDelete } = nextProps;
        if(
            prevState.storePost !== postElement.post ||
            prevState.storeLoading !== postElement.loading ||
            prevState.storeError !== postElement.error ||
            prevState.storeDeleteStatus !== postDelete.status ||
            prevState.storeDeleteLoading !== postDelete.loading ||
            prevState.storeDeleteError !== postDelete.error
        ) {
            return {
                storePost : postElement.post,
                storeLoading : postElement.loading,
                storeError : postElement.error,
                storeDeleteStatus : postDelete.status,
                storeDeleteLoading : postDelete.loading,
                storeDeleteError : postDelete.error
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
        const { storeError, storePost } = this.state;
        const { history, postAction, postDelete } = this.props;
        const { status, error } = postDelete;
        if(storeError !== prevState.storeError){
            const { location, history } = this.props;
            const { search } = location;
            const queryModel = queryString.parse(search);
            queryModel['id'] = undefined;
            alert(`게시물을 불러오는 도중 오류가 발생했습니다. 이전으로 돌아갑니다.\n오류 내용 : ${storeError}`);
            history.push(`/bbs/list?${queryString.stringify(queryModel)}`);
        } else if(status !== null && status === 204) {
            alert(`${storePost.writer} 님이 작성한 글이 삭제 되었습니다.`);
            postAction.reset_delete_post_element_by_id();
            history.push(`/bbs/list/_ref?type=${storePost && storePost.type}&pg=1`);
        } else if(error !== null && error !== prevState.storeDeleteError) {
            alert(`게시글 삭제 중 다음과 같은 오류가 발생 했습니다.\n오류 내용 : ${error}`);
            postAction.reset_update_post_context();
            history.push(`/bbs/list/_ref?type=${storePost && storePost.type}&pg=1`);
        }
    }

    componentWillUnmount(){
        const { postAction } = this.props;
        const { post } = this.state;
        if(post !== null)
            postAction.reset_fetch_post_element_by_id();
    }

    handleClickDelete = () => {
        const { storePost } = this.state;
        const isDelete = window.confirm(`${storePost && storePost.writer} 님이 작성한 글을 삭제합니다. 계속 하시겠습니까?`);
        if(isDelete)
            this.props.postAction.delete_post_element_by_id(storePost && storePost.id)
    }

    render(){
        const { storePost, storeLoading, storeError, storeDeleteLoading } = this.state;

        let fetchLoadingView = (
            <Modal isOpen={storeLoading}>
                <ModalHeader>게시물을 불러오는 중 입니다.</ModalHeader>
                <ModalBody>
                    <h1 className="text-center"><i className="fa fa-spinner fa-spin" /></h1>
                    <h2 className="text-center">잠시만 기다려 주세요!!!</h2>
                </ModalBody>
            </Modal>
        );

        let deleteLoadingView = (
            <Modal isOpen={storeDeleteLoading}>
                <ModalHeader>게시물을 삭제하는 중 입니다...</ModalHeader>
                <ModalBody>
                    <h1 className="text-center"><i className="fa fa-spinner fa-spin" /></h1>
                    <h2 className="text-center">잠시만 기다려 주세요!!!</h2>
                </ModalBody>
            </Modal>
        );

        return (
            <Container style={{ padding : '10px' }}>
                <div id="post_element_card_view" style={{ margin : '10px' }}>
                    <PostElementView post={storePost} loading={storeLoading} error={storeError} deleteLambda={() => this.handleClickDelete()} />
                </div>
                <div id="post_loading_modal">
                    { fetchLoadingView }
                </div>
                <div id="delete_loading_modal">
                    { deleteLoadingView }
                </div>
            </Container>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostViewContainer)
);