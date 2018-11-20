import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

function createPushURL(id, query){
    let queryModel = queryString.parse(query);
    Object.assign(queryModel, { id });
    return queryString.stringify(queryModel);
}

const PostInfoBrief = (props) => {
    const { post, history, location } = props;
    
    return (
        <tr onClick={() => history.push(`/bbs/view?${createPushURL(post && post.id, location.search)}`)}>
            <td>{post && post.id}</td>
            <td>{post && post.title}</td>
            <td>{post && post.writer}</td>
            <td>{post && new Date(post.updated_at).toLocaleString()}</td>
        </tr>
    );
}

export default withRouter(PostInfoBrief);