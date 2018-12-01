import React from 'react';
import queryString from 'query-string';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Form, Button } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';

import * as postActions from '../action/action_post';
import { SelectInputRender, TextInputRender, WysiwygInputRender } from './form';

import './style/quill_style.css';

const mapStateToProps = (state) => {
    const { post } = state.post.postElement;
    return {
        initialValues : {
            title : post && (post.title || ''),
            writer : post && (post.writer || ''),
            type : post && (post.type || ''),
            context : post && (post.context || '') 
        }
    };
}

function validate(values){
    var errors = {};
    var hasErrors = false;

    if(!values.title || values.title.trim() === ''){
        errors.title = '제목을 입력하세요.';
        hasErrors = true;
    }

    if(!values.writer || values.writer.trim() === ''){
        errors.writer = '작성자를 입력하세요.';
        hasErrors = true;
    }

    if(!values.type || Number(values.type) === 0){
        errors.type = '게시판 종류를 선택하세요.'
        hasErrors = true;
    }

    if(!values.context || values.context.trim() === ''){
        errors.context = '내용을 입력하세요.';
        hasErrors = true;
    }

    return hasErrors && errors;
}

const validateAndSaving = (values, dispatch) => {
    const postModel = {
        title : values && values.title,
        writer : values && values.writer,
        type : values && values.type,
        context : values && values.context
    }
    if(values && values.postId === undefined){
        dispatch(postActions.create_post_context(postModel));
    } else if(values && values.postId !== null){
        dispatch(postActions.update_post_context(values.postId, postModel));
    }
}

class PostEditForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { storeTypes : [], storeTypesLoading : false, storeTypesError : null, storePost : null, storePostLoading : false, storePostError : null };    
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { storeTypes, storeTypesLoading, storeTypesError, storePost, storePostLoading, storePostError } = nextProps;
        if(
            prevState.storeTypes !== storeTypes ||
            prevState.storeTypesLoading !== storeTypesLoading ||
            prevState.storeTypesError !== storeTypesError
        ) 
            if(
                storePost === undefined && storePostLoading === undefined && storePostError === undefined
            ){
                return {
                    storeTypes,
                    storeTypesLoading,
                    storeTypesError,
                    storePost : null,
                    storePostLoading : false,
                    storePostError : null
                };
            } else if(
                prevState.storePost !== storePost || prevState.storePostLoading !== storePostLoading || prevState.storePostError !== storePostError
            ) {
                return {
                    storeTypes,
                    storeTypesLoading,
                    storeTypesError,
                    storePost,
                    storePostLoading,
                    storePostError
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
        const { location, history } = this.props;
        const { storePost, storePostError } = prevState;
        if(storePost !== null && location.pathname.includes('edit')) {
            this.props.change('postId', storePost && storePost.id);
        } else if(storePostError !== this.state.storePostError) {
            const { search } = location;
            const queryModel = queryString.parse(search);
            queryModel['id'] = undefined;
            alert(`다음과 같은 오류가 발생했습니다. 이전으로 돌아갑니다.\n오류 내용 : ${this.state.storePostError}`);
            history.push(`/bbs/list?${queryString.stringify(queryModel)}`);
        }
    }

    render(){
        const { handleSubmit } = this.props; 
        const { storeTypes, storeTypesLoading, storeTypesError } = this.state;
        
        let childrenMessage = 
            storeTypesLoading ?
                <p><i className="fa fa-spinner fa-spin" /> 게시판 종류를 불러오는 중입니다.</p> :
            storeTypesError !== null ?
                <p><i className="fas fa-exclamation-triangle" /> {storeTypesError}</p> : null;

        const selectChildren = 
            storeTypes.length > 0 ?
                storeTypes.map((type, idx) => (
                    <option key={`type_option_child_${idx}`} value={type && type.id}>
                        { type && type.name }
                    </option>
                )) : null;

        return (
            <Form onSubmit={handleSubmit(validateAndSaving)}>
                <Field name="title" type="text" component={TextInputRender} label="제목" placeholder="제목을 입력하세요." />
                <Field name="writer" type="text" component={TextInputRender} label="작성자" placeholder="작성자를 입력하세요." />
                <Field name="type" component={SelectInputRender} label="게시판 선택" children={selectChildren} />
                <div className="text-left" style={{ marginTop : '5px' }}>
                    {childrenMessage}
                </div>
                <div className="my_quill" style={{ marginBottom : '20px' }}>
                    <Field name="context" component={WysiwygInputRender} />
                </div>
                <div className="d-flex justify-content-end" style={{ marginTop : '5px' }}>
                    <Button type="submit" color="primary"><i className="fas fa-check" /> 저장</Button>
                </div>
            </Form>
        );
    }
}

PostEditForm = reduxForm({
    form : 'postEditForm',
    validate,
    enableReinitialize : true,
    keepDirtyOnReinitialize : true
})(PostEditForm);

export default withRouter(
    connect(mapStateToProps)(PostEditForm)
);