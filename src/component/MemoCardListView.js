import React from 'react';
import { Row, Col } from 'reactstrap';
import MemoInfoCard from './MemoInfoCard';

class MemoCardListView extends React.Component {
    constructor(props){
        super(props);
        this.state = { memos : [], loading : false, error : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { memos, loading, error } = nextProps;
        if(
            prevState.memos !== memos ||
            prevState.loading !== loading ||
            prevState.error !== error
        ) {
            return {
                memos,
                loading,
                error
            };
        }
        return null;
    }

    render(){
        const { memos, loading, error } = this.state;
        let memoContexts;

        if(loading){
            memoContexts = <h1><i className="fa fa-spinner fa-spin" /> 메모 목록을 불러오는 중입니다.</h1>
        } else if(error === null){
            memoContexts = memos.length > 0 ? 
                memos.map((memo, idx) => <Col sm={6} key={`memo_key_${idx}`}><MemoInfoCard memo={memo} /></Col>) :
                (
                    <h1><i className="fas fa-ghost" /> 메모가 존재하지 않습니다.</h1>
                );
        } else {
            memoContexts = (
                <div className="text-center">
                    <h1><i className="fas fa-exclamation-triangle" /> 메모를 불러오는 도중 오류가 발생했습니다.</h1>
                    <h2>{error}</h2>
                </div>
            )
        }
        
        return(
            <Row className="d-flex justify-content-around">
                {memoContexts}
            </Row>
        )
    }
}

export default MemoCardListView;