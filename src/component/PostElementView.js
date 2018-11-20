import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import './style/context_style.css';

class PostElementView extends React.Component {
    constructor(props){
        super(props);
        this.state = { post : null, loading : false, error : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { post, loading, error } = nextProps;
        if(
            prevState.post !== post ||
            prevState.loading !== loading ||
            prevState.error !== error
        ) {
            return { post, loading, error };
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
        history.push(`/bbs/list/_ref?${queryString.stringify(queryModel)}`);
    }

    handleClickPushEdit = () => {
        const { location, history } = this.props;
        history.push(`/bbs/edit${location.search}`);
    }

    render(){
        const { post, loading, error } = this.state;
        return(
            <Card>
                <CardBody>
                    <CardTitle>{ loading ? '제목을 불러오는 중입니다...' : (post && post.title) }</CardTitle>
                    <CardSubtitle>{ loading ? '작성자를 불러오는 중입니다...' : (post && post.writer) } / { loading ? '날짜를 가져오는 중입니다...' : (post && new Date(post.updated_at).toLocaleString()) }</CardSubtitle>
                </CardBody>
                <CardBody>
                    <div
                        id="bbs_context_view"
                        className="post_context"
                        style={{ minHeight : '500px' }}
                        dangerouslySetInnerHTML={{ __html: loading ? '<h2>내용을 불러오는 중입니다...</h2>' : (post && post.context) }}
                    />
                    <hr/>
                    <div id="button_div_box" className="d-flex justify-content-end">
                        <Button style={{ margin : '10px' }} color="info" onClick={() => this.handleClickPushBack()}><i className="fas fa-arrow-left" /> 이전으로</Button>
                        <Button style={{ margin : '10px' }} color="primary" onClick={() => this.handleClickPushEdit()}><i className="fas fa-edit" /> 수정하기</Button>
                        <Button style={{ margin : '10px' }} color="danger" onClick={() => this.handleClickPushBack()}><i className="fas fa-trash" /> 삭제하기</Button>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default withRouter(PostElementView);