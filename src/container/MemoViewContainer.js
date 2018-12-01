import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { fetch_memo_element_by_id, reset_fetch_memo_element_by_id, delete_memo_element_by_id } from '../action/action_memo';
import { MemoElementView } from '../component';

const mapStateToProps = (state) => ({
    memoElement : state.memo.memoElement,
    memoDelete : state.memo.memoDelete
});

const mapDispatchToProps = (dispatch) => ({
    fetchMemoElementById : (id) => dispatch(fetch_memo_element_by_id(id)),
    resetFetchMemoElementById : () => dispatch(reset_fetch_memo_element_by_id()),
    deleteMemoElementById : (id) => dispatch(delete_memo_element_by_id(id))
});

class MemoViewContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = { storeMemo : null, storeLoading : false, storeError : null, storeDeleteStatus : null, storeDeleteLoading : false, storeDeleteError : null };
    }

    componentDidMount() {
        const { fetchMemoElementById, location } = this.props;
        const queryModel = queryString.parse(location.search);
        fetchMemoElementById(queryModel && queryModel.id);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { memoElement, memoDelete } = nextProps;
        if(
            prevState.storeMemo !== memoElement.memo ||
            prevState.storeLoading !== memoElement.loading ||
            prevState.storeError !== memoElement.error ||
            prevState.storeDeleteStatus !== memoDelete.status ||
            prevState.storeDeleteLoading !== memoDelete.loading ||
            prevState.storeDeleteError !== memoDelete.error
        ) {
            return {
                storeMemo : memoElement.memo,
                storeLoading : memoElement.loading,
                storeError : memoElement.error,
                storeDeleteStatus : memoDelete.status,
                storeDeleteLoading : memoDelete.loading,
                storeDeleteError : memoDelete.error
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
        const { storeError, storeMemo } = this.state;
        const { history, memoDelete } = this.props;
        const { status, error } = memoDelete;
        if(storeError !== prevState.storeError){
            alert(`게시물을 불러오는 도중 오류가 발생했습니다.\n오류 내용 : ${storeError}`);
            history.push('/');
        } else if(status !== null && status !== prevState.storeDeleteStatus && status === 204) {
            alert(`${storeMemo.writer} 님이 작성한 글이 삭제 되었습니다.`);
            history.push('/memo/list/_ref?pg=1');
        } else if(error !== null && error !== prevState.storeDeleteError) {
            alert(`게시글 삭제 중 다음과 같은 오류가 발생 했습니다.\n오류 내용 : ${error}`);
            history.push('/memo/list/_ref?pg=1');
        }
    }

    componentWillUnmount(){
        const { resetFetchMemoElementById } = this.props;
        resetFetchMemoElementById();
    }

    handleClickDelete = () => {
        const { deleteMemoElementById } = this.props;
        const { storeMemo } = this.state;
        const isDelete = window.confirm(`${storeMemo && storeMemo.writer} 님이 작성한 메모장을 삭제합니다. 계속 하시겠습니까?`);
        if(isDelete)
            deleteMemoElementById(storeMemo && storeMemo.id);
    }

    render(){
        const { storeMemo, storeLoading, storeError, storeDeleteLoading } = this.state;

        let fetchLoadingView = (
            <Modal isOpen={storeLoading}>
                <ModalHeader>메모장을 불러오는 중 입니다.</ModalHeader>
                <ModalBody>
                    <h1 className="text-center"><i className="fa fa-spinner fa-spin" /></h1>
                    <h2 className="text-center">잠시만 기다려 주세요!!!</h2>
                </ModalBody>
            </Modal>
        );

        let deleteLoadingView = (
            <Modal isOpen={storeDeleteLoading}>
                <ModalHeader>메모장을 삭제하는 중 입니다...</ModalHeader>
                <ModalBody>
                    <h1 className="text-center"><i className="fa fa-spinner fa-spin" /></h1>
                    <h2 className="text-center">잠시만 기다려 주세요!!!</h2>
                </ModalBody>
            </Modal>
        );

        return(
            <Container style={{ padding : '10px' }}>
                <div id="memo_element_card_view" style={{ margin : '10px' }}>
                    <MemoElementView memo={storeMemo} loading={storeLoading} error={storeError} deleteLambda={() => this.handleClickDelete()} />
                </div>
                <div id="memo_element_loading_view">
                    { fetchLoadingView }
                </div>
                <div id="memo_delete_loading_view">
                    { deleteLoadingView }
                </div>
            </Container>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MemoViewContainer)
);