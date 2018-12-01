import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { fetch_memo_element_by_id, reset_fetch_memo_element_by_id } from '../action/action_memo';
import { MemoElementView } from '../component';

const mapStateToProps = (state) => ({
    memoElement : state.memo.memoElement
});

const mapDispatchToProps = (dispatch) => ({
    fetchMemoElementById : (id) => dispatch(fetch_memo_element_by_id(id)),
    resetFetchMemoElementById : () => dispatch(reset_fetch_memo_element_by_id())
});

class MemoViewContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = { storeMemo : null, storeLoading : false, storeError : null };
    }

    componentDidMount() {
        const { fetchMemoElementById, location } = this.props;
        const queryModel = queryString.parse(location.search);
        fetchMemoElementById(queryModel && queryModel.id);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { memoElement } = nextProps;
        if(
            prevState.storeMemo !== memoElement.memo ||
            prevState.storeLoading !== memoElement.loading ||
            prevState.storeError !== memoElement.error
        ) {
            return {
                storeMemo : memoElement.memo,
                storeLoading : memoElement.loading,
                storeError : memoElement.error
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

    componentWillUnmount(){
        const { resetFetchMemoElementById } = this.props;
        resetFetchMemoElementById();
    }

    render(){
        const { storeMemo, storeLoading, storeError } = this.state;

        let fetchLoadingView = (
            <Modal isOpen={storeLoading}>
                <ModalHeader>메모를 불러오는 중 입니다.</ModalHeader>
                <ModalBody>
                    <h1 className="text-center"><i className="fa fa-spinner fa-spin" /></h1>
                    <h2 className="text-center">잠시만 기다려 주세요!!!</h2>
                </ModalBody>
            </Modal>
        );

        return(
            <Container style={{ padding : '10px' }}>
                <div id="memo_element_card_view" style={{ margin : '10px' }}>
                    <MemoElementView memo={storeMemo} loading={storeLoading} error={storeError} />
                </div>
                <div id="memo_loading_view">
                    { fetchLoadingView }
                </div>
            </Container>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MemoViewContainer)
);