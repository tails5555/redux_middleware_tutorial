import React from 'react';

import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Modal, ModalHeader, ModalBody } from 'reactstrap';

import * as typeActions from '../action/action_type';
import * as postActions from '../action/action_post';

import { PostEditForm } from '../component';

const mapStateToProps = (state) => ({
    typeList : state.type.typeList,
    postSave : state.post.postSave
});

const mapDispatchToProps = (dispatch) => ({
    typeAction : bindActionCreators(typeActions, dispatch),
    postAction : bindActionCreators(postActions, dispatch)
});

class PostCreateContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { storeTypes : [], storeLoading : false, storeError : null, openModal : false };
    }

    componentDidMount() {
        const { typeAction } = this.props;
        typeAction.fetch_all_bbs_types();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { types, loading, error } = nextProps.typeList;
        if(
            prevState.storeTypes !== types ||
            prevState.storeLoading !== loading ||
            prevState.storeError !== error ||
            prevState.openModal !== nextProps.postSave.loading
        ) {
            return {
                storeTypes : types,
                storeLoading : loading,
                storeError : error,
                openModal : nextProps.postSave.loading
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
        const { history, postAction, postSave } = this.props;
        const { post, error } = postSave;
        if(post !== null && post !== prevProps.postSave.post) {
            alert(`${post && post.writer} 님이 작성하신 글이 등록 되었습니다.`);
            postAction.reset_create_post_context();
            history.push(`/bbs/list/_ref?type=${post && post.type}&pg=1`);
        } else if(error !== null && error !== prevProps.postSave.error) {
            alert(`게시글 작성 중 다음과 같은 오류가 발생 했습니다.\n오류 내용 : ${error}`);
            this.props.postAction.reset_create_post_context();
            this.props.history.push('/');
        }
    }
    
    render(){
        const { storeTypes, storeLoading, storeError, openModal } = this.state;
        let saveView = (
            <Modal isOpen={openModal}>
                <ModalHeader>새로운 글을 작성하는 중입니다.</ModalHeader>
                <ModalBody>
                    <h1 className="text-center"><i className="fa fa-spinner fa-spin" /></h1>
                    <h2 className="text-center">잠시만 기다려 주세요!!!</h2>
                </ModalBody>
            </Modal>
        );
        
        return(
            <Container style={{ padding : '10px' }}>
                <div id="post_create_title" style={{ margin : '10px' }}>
                    <h1>게시물 추가</h1>
                </div>
                <hr/>
                <div id="post_create_form" style={{ margin : '10px' }}>
                    <PostEditForm storeTypes={storeTypes} storeTypesLoading={storeLoading} storeTypesError={storeError} />
                </div>
                <div id="post_create_loading_modal">
                    {saveView}
                </div>
            </Container>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostCreateContainer)
);