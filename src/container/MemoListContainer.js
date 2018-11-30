import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import { fetch_memo_list } from '../action/action_memo';
import { PostPagination, MemoCardListView } from '../component';

const mapStateToProps = (state) => ({
    memoList : state.memo.memoList
});

const mapDispatchToProps = (dispatch) => ({
    fetchMemos : (queryModel) => dispatch(fetch_memo_list(queryModel))
});

class MemoListContainer extends React.Component {
    constructor(props){
        super(props);
        const { search } = this.props.location;
        this.state = { query : search, storeMemos : [], storeMemosCount : 0, storeLoading : false, storeError : null };
    }

    componentDidMount() {
        const { query } = this.state;
        const queryModel = queryString.parse(query);

        const { fetchMemos } = this.props;
        fetchMemos(queryModel);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { memoList } = nextProps;
        if(
            prevState.storeMemos !== memoList.memos ||
            prevState.storeLoading !== memoList.loading ||
            prevState.storeError !== memoList.error ||
            prevState.storeMemosCount !== memoList.count
        ) {
            return {
                storeMemos : memoList.memos,
                storeLoading : memoList.loading,
                storeError : memoList.error,
                storeMemosCount : memoList.count
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
        const { storeMemos, storeMemosCount, storeLoading, storeError } = this.state;
        return (
            <Container style={{ padding : '10px' }}>
                <h1>메모장 목록</h1>
                <hr/>
                <div id="memo_view" style={{ margin : '10px' }}>
                    <MemoCardListView memos={storeMemos} loading={storeLoading} error={storeError} />
                </div>
                <div id="memo_pagination" style={{ margin : '10px' }}>
                    <PostPagination count={storeMemosCount} />
                </div>
            </Container>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MemoListContainer)
);