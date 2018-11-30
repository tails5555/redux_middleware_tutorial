import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Card, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap';

function createPushURL(id, query){
    let queryModel = queryString.parse(query);
    Object.assign(queryModel, { id });
    return queryString.stringify(queryModel);
}

const MemoInfoCard = ({ history, location, memo }) => (
    <Card body style={{ margin : '5px 3px' }}>
        <CardTitle>{memo && memo.title}</CardTitle>
        <CardSubtitle><i className="fas fa-user" /> {memo && memo.writer}</CardSubtitle>
        <CardText><i className="fas fa-calendar" /> {memo && new Date(memo.updated_at).toLocaleString()}</CardText>
        <Button color="info" onClick={() => history.push(`/memo/view?${createPushURL(memo && memo.id, location.search)}`)}><i className="fas fa-external-link-square-alt" /> 조회하기</Button>
    </Card>
);

export default withRouter(MemoInfoCard);