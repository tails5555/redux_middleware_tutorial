import React from 'react';

import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Modal, ModalHeader, ModalBody } from 'reactstrap';

import * as typeActions from '../action/action_type';
import * as postActions from '../action/action_post';

import { PostEditForm } from '../component';

const mapStateToProps = (state) => ({
    typeList : state.type.typeList,
    postElement : state.post.postElement,
    postSave : state.post.postSave
});

const mapDispatchToProps = (dispatch) => ({
    typeAction : bindActionCreators(typeActions, dispatch),
    postAction : bindActionCreators(postActions, dispatch)
});

class PostUpdateContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = { storeTypes : [], storeTypesLoading : false, storeTypesError : null, storeElement : null, storeElementLoading : false, storeElementError : null, openModal : false };
    }

    componentDidMount(){
        const { location, postAction, typeAction } = this.props;
        const { search } = location;
        const queryModel = queryString.parse(search);
        typeAction.fetch_all_bbs_types();
        postAction.fetch_post_element_by_id(queryModel && queryModel.id);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { typeList, postElement } = nextProps;
        if(
            prevState.storeTypes !== typeList.types ||
            prevState.storeLoading !== typeList.loading ||
            prevState.storeError !== typeList.error ||
            prevState.storeElement !== postElement.post ||
            prevState.storeElementLoading !== postElement.loading ||
            prevState.storeElementError !== postElement.error ||
            prevState.openModal !== nextProps.postSave.loading
        ) {
            return {
                storeTypes : typeList.types,
                storeTypesLoading : typeList.loading,
                storeTypesError : typeList.error,
                storeElement : postElement.post,
                storeElementLoading : postElement.loading,
                storeElementError : postElement.error,
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
        const { post, error } = this.props.postSave;
        if(post !== null && prevProps.post !== post) {
            alert(`${post && post.writer} 님이 작성하신 글이 수정 되었습니다.`);
            this.props.postAction.reset_update_post_context();
            this.props.history.push(`/bbs/list/_ref?type=${post && post.type}&pg=1`);
        } else if(error !== null && prevProps.error !== error) {
            alert(`게시글 작성 중 다음과 같은 오류가 발생 했습니다.\n오류 내용 : ${error}`);
            this.props.postAction.reset_update_post_context();
            this.props.history.push('/');
        }
    }

    componentWillUnmount(){
        const { postAction } = this.props;
        postAction.reset_fetch_post_element_by_id();
    }

    render() {
        const { storeTypes, storeTypesLoading, storeTypesError, storeElement, storeElementLoading, storeElementError, openModal } = this.state;
        let saveView = (
            <Modal isOpen={openModal}>
                <ModalHeader>게시글을 수정하는 중입니다...</ModalHeader>
                <ModalBody>
                    <h1 className="text-center"><i className="fa fa-spinner fa-spin" /></h1>
                    <h2 className="text-center">잠시만 기다려 주세요!!!</h2>
                </ModalBody>
            </Modal>
        );
        return (
            <Container style={{ padding : '10px' }}>
                <div id="post_update_title" style={{ margin : '10px' }}>
                    <h1>게시물 수정</h1>
                </div>
                <hr/>
                <div id="post_update_form" style={{ margin : '10px' }}>
                    <PostEditForm 
                        storeTypes={storeTypes} 
                        storeTypesLoading={storeTypesLoading} 
                        storeTypesError={storeTypesError}
                        storePost={storeElement}
                        storePostLoading={storeElementLoading}
                        storePostError={storeElementError}
                    />
                </div>
                <div id="post_create_loading_modal">
                    {saveView}
                </div>
            </Container>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostUpdateContainer)
);