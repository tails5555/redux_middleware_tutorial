import React, { Fragment } from 'react';
import { Table } from 'reactstrap';

import PostInfoBrief from './PostInfoBrief';
import './style/table_style.css';

class PostTableView extends React.Component {
    constructor(props){
        super(props);
        this.state = { posts : [], loading : false, error : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { posts, loading, error } = nextProps;
        if(
            prevState.posts !== posts ||
            prevState.loading !== loading ||
            prevState.error !== error
        ) {
            return {
                posts,
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

    render(){
        const { posts, loading, error } = this.state;

        let postListView = null;        
        if(loading){
            postListView =
                <tr>
                    <td colSpan={4}><i className="fa fa-spinner fa-spin" /> 게시글 목록을 불러오는 중입니다.</td>
                </tr>
        } else if(error === null){
            postListView = 
                posts.length > 0 ?
                    posts.map((post, idx) => <PostInfoBrief post={post} key={`post_td_${idx}`} />) :
                    <tr>
                        <td colSpan={4}><i className="fas fa-times-circle" /> 게시글이 존재하지 않습니다.</td>
                    </tr>
        } else {
            postListView =
                <tr>
                    <td colSpan={4}><i className="fas fa-exclamation-triangle" /> 게시글을 불러오는 도중 에러가 발생했습니다.</td>
                </tr>
        }

        return(
            <Fragment>
                <Table size="md" responsive className="text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Writer</th>
                            <th>Update Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        { postListView }
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}

export default PostTableView;