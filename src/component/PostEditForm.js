import React from 'react';
import { Form, Button } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';

import * as postActions from '../action/action_post';
import { SelectInputRender, TextInputRender, WysiwygInputRender } from './form';

import './style/quill_style.css';

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
    dispatch(postActions.create_post_context(postModel));
}

class PostEditForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { post : null, storeTypes : [], storeTypesLoading : false, storeTypesError : null };    
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { storeTypes, storeTypesLoading, storeTypesError } = nextProps;
        if(
            prevState.storeTypes !== storeTypes ||
            prevState.storeTypesLoading !== storeTypesLoading ||
            prevState.storeTypesError !== storeTypesError
        ) {
            return {
                storeTypes,
                storeTypesLoading,
                storeTypesError
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

export default reduxForm({
    form : 'postEditForm',
    validate,
    enableReinitialize : true,
    keepDirtyOnReinitialize : true
})(PostEditForm);