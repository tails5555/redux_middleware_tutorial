import React, { Fragment } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Button, Card, CardTitle, CardSubtitle, CardBody, CardText } from 'reactstrap';

class MemoElementView extends React.Component {
    constructor(props){
        super(props);
        this.state = { memo : null, loading : false, error : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { memo, loading, error } = nextProps;
        if(
            prevState.memo !== memo ||
            prevState.loading !== loading ||
            prevState.error !== error
        ) {
            return {
                memo,
                loading,
                error
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
    
    handleClickPushBack = () => {
        const { location, history } = this.props;
        let queryModel = queryString.parse(location.search);
        queryModel['id'] = undefined;
        history.push(`/memo/list/_ref?${queryString.stringify(queryModel)}`);
    }

    handleClickPushEdit = () => {
        const { location, history } = this.props;
        history.push(`/memo/edit${location.search}`);
    }

    render(){
        const { memo, loading, error } = this.state;
        return error === null ? 
            (
                <Card>
                    <CardBody>
                        <CardTitle>{ loading ? '제목을 불러오는 중입니다...' : (memo && memo.title) }</CardTitle>
                        <CardSubtitle>{ loading ? '작성자를 불러오는 중입니다...' : (memo && memo.writer) } / { loading ? '날짜를 가져오는 중입니다...' : (memo && new Date(memo.updated_at).toLocaleString()) }</CardSubtitle>
                    </CardBody>
                    <CardBody>
                        <CardText style={{ minHeight : '500px' }}>
                            { loading ? '내용을 불러오는 중입니다' : (memo && memo.context) }
                        </CardText>
                        <hr/>
                        <div id="button_div_box" className="d-flex justify-content-end">
                            <Button style={{ margin : '10px' }} color="info" onClick={() => this.handleClickPushBack()}><i className="fas fa-arrow-left" /> 이전으로</Button>
                            <Button style={{ margin : '10px' }} color="primary" onClick={() => this.handleClickPushEdit()}><i className="fas fa-edit" /> 수정하기</Button>
                            <Button style={{ margin : '10px' }} color="danger"><i className="fas fa-trash" /> 삭제하기</Button>
                        </div>
                    </CardBody>
                </Card>
            ) : <Fragment />
    }
}

export default withRouter(MemoElementView);