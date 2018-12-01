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
        this.state = { storeTypes : [], storeTypesLoading : false, storeTypesError : null, storeElement : null, storeElementLoading : false, storeElementError : null, storeSaveLoading : false };
    }

    componentDidMount(){
        const { location, postAction, typeAction } = this.props;
        const { search } = location;
        const queryModel = queryString.parse(search);
        typeAction.fetch_all_bbs_types();
        postAction.fetch_post_element_by_id(queryModel && queryModel.id);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { typeList, postElement, postSave } = nextProps;
        if(
            prevState.storeTypes !== typeList.types ||
            prevState.storeLoading !== typeList.loading ||
            prevState.storeError !== typeList.error ||
            prevState.storeElement !== postElement.post ||
            prevState.storeElementLoading !== postElement.loading ||
            prevState.storeElementError !== postElement.error ||
            prevState.storeSaveLoading !== postSave.loading
        ) {
            return {
                storeTypes : typeList.types,
                storeTypesLoading : typeList.loading,
                storeTypesError : typeList.error,
                storeElement : postElement.post,
                storeElementLoading : postElement.loading,
                storeElementError : postElement.error,
                storeSaveLoading : postSave.loading
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
        const { history, location, postAction, postSave } = this.props;
        const { post, error } = postSave;
        if(post !== null && post !== prevProps.postSave.post) {
            alert(`${post && post.writer} 님이 작성하신 글이 수정 되었습니다.`);
            postAction.reset_update_post_context();
            let queryModel = queryString.parse(location.search);
            queryModel['type'] = post && post.type;
            history.push(`/bbs/view?${queryString.stringify(queryModel)}`);
        } else if(error !== null && error !== prevProps.postSave.error) {
            alert(`게시글 작성 중 다음과 같은 오류가 발생 했습니다.\n오류 내용 : ${error}`);
            postAction.reset_update_post_context();
            history.push('/');
        }
    }

    componentWillUnmount(){
        const { postAction } = this.props;
        postAction.reset_fetch_post_element_by_id();
    }

    render() {
        const { storeTypes, storeTypesLoading, storeTypesError, storeElement, storeElementLoading, storeElementError, storeSaveLoading } = this.state;
        
        let loadView = (
            <Modal isOpen={storeElementLoading}>
                <ModalHeader>게시글을 불러오는 중입니다...</ModalHeader>
                <ModalBody>
                    <h1 className="text-center"><i className="fa fa-spinner fa-spin" /></h1>
                    <h2 className="text-center">잠시만 기다려 주세요!!!</h2>
                </ModalBody>
            </Modal>
        );

        let saveView = (
            <Modal isOpen={storeSaveLoading}>
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
                <div id="post_element_loading_modal">
                    {loadView}
                </div>
                <div id="post_update_loading_modal">
                    {saveView}
                </div>
            </Container>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostUpdateContainer)
);