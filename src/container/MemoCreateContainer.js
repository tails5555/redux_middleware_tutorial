import React from 'react';

import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';

import { Container, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { MemoEditForm } from '../component';

const mapStateToProps = (state) => ({
    memoSave : state.memo.memoSave
});

class MemoCreateContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openModal : false };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(
            prevState.openModal !== nextProps.memoSave.loading
        ) {
            return {
                openModal : nextProps.memoSave.loading
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
        const { memo, error } = this.props.memoSave;
        if(memo !== null && prevProps.memoSave.memo !== memo) {
            alert(`${memo && memo.writer} 님이 작성하신 메모장이 등록 되었습니다.`);
            this.props.history.push('/memo/list/_ref?pg=1');
        } else if(error !== null && prevProps.memoSave.error !== error) {
            alert(`메모장 작성 중 다음과 같은 오류가 발생 했습니다.\n오류 내용 : ${error}`);
            this.props.history.push('/');
        }
    }
    
    render(){
        const { openModal } = this.state;

        let saveView = (
            <Modal isOpen={openModal}>
                <ModalHeader>새로운 메모를 작성하는 중입니다.</ModalHeader>
                <ModalBody>
                    <h1 className="text-center"><i className="fa fa-spinner fa-spin" /></h1>
                    <h2 className="text-center">잠시만 기다려 주세요!!!</h2>
                </ModalBody>
            </Modal>
        );
        
        return(
            <Container style={{ padding : '10px' }}>
                <div id="memo_create_title" style={{ margin : '10px' }}>
                    <h1>메모장 추가</h1>
                </div>
                <hr/>
                <div id="memo_create_form" style={{ margin : '10px' }}>
                    <MemoEditForm />
                </div>
                <div id="memo_create_loading_modal">
                    {saveView}
                </div>
            </Container>
        )
    }
}

export default withRouter(
    connect(mapStateToProps)(MemoCreateContainer)
);