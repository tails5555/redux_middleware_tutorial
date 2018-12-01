import React from 'react';

import queryString from 'query-string';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { fetch_memo_element_by_id, reset_fetch_memo_element_by_id } from '../action/action_memo';

import { MemoEditForm } from '../component';

const mapStateToProps = (state) => ({
    memoElement : state.memo.memoElement,
    memoSave : state.memo.memoSave
});

const mapDispatchToProps = (dispatch) => ({
    fetchMemoElementById : (id) => dispatch(fetch_memo_element_by_id(id)),
    resetFetchMemoElementById : () => dispatch(reset_fetch_memo_element_by_id())
});

class PostUpdateContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = { storeElement : null, storeElementLoading : false, storeElementError : null, storeUpdateLoading : false };
    }

    componentDidMount(){
        const { location, fetchMemoElementById } = this.props;
        const { search } = location;
        const queryModel = queryString.parse(search);
        fetchMemoElementById(queryModel && queryModel.id);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { memoElement, memoSave } = nextProps;
        if(
            prevState.storeElement !== memoElement.post ||
            prevState.storeElementLoading !== memoElement.loading ||
            prevState.storeElementError !== memoElement.error ||
            prevState.storeUpdateLoading !== memoSave.loading
        ) {
            return {
                storeElement : memoElement.memo,
                storeElementLoading : memoElement.loading,
                storeElementError : memoElement.error,
                storeUpdateLoading : memoSave.loading
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
        const { memoSave, history, location } = this.props;
        const { memo, error } = memoSave;
        if(memo !== null && memo !== prevProps.memoSave.memo) {
            alert(`${memo && memo.writer} 님이 작성하신 메모장이 수정 되었습니다.`);
            history.push(`/memo/view${location.search}`);
        } else if(error !== null && error !== prevProps.memoSave.error) {
            alert(`메모장 작성 중 다음과 같은 오류가 발생 했습니다.\n오류 내용 : ${error}`);
            history.push('/');
        }
    }

    componentWillUnmount(){
        const { resetFetchMemoElementById } = this.props;
        resetFetchMemoElementById();
    }

    render() {
        const { storeElement, storeElementLoading, storeElementError, storeUpdateLoading } = this.state;
        
        let loadView = (
            <Modal isOpen={storeElementLoading}>
                <ModalHeader>메모장을 불러오는 중입니다...</ModalHeader>
                <ModalBody>
                    <h1 className="text-center"><i className="fa fa-spinner fa-spin" /></h1>
                    <h2 className="text-center">잠시만 기다려 주세요!!!</h2>
                </ModalBody>
            </Modal>
        );
        
        let saveView = (
            <Modal isOpen={storeUpdateLoading}>
                <ModalHeader>메모장을 수정하는 중입니다...</ModalHeader>
                <ModalBody>
                    <h1 className="text-center"><i className="fa fa-spinner fa-spin" /></h1>
                    <h2 className="text-center">잠시만 기다려 주세요!!!</h2>
                </ModalBody>
            </Modal>
        );
        
        return (
            <Container style={{ padding : '10px' }}>
                <div id="post_update_title" style={{ margin : '10px' }}>
                    <h1>메모장 수정</h1>
                </div>
                <hr/>
                <div id="post_update_form" style={{ margin : '10px' }}>
                    <MemoEditForm storeMemo={storeElement} storeMemoError={storeElementError} />
                </div>
                <div id="memo_element_loading_modal">
                    {loadView}
                </div>
                <div id="memo_update_loading_modal">
                    {saveView}
                </div>
            </Container>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostUpdateContainer)
);