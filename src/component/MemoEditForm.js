import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Form, Button } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';

import { create_memo_context } from '../action/action_memo';
import { TextInputRender } from './form';

const mapStateToProps = (state) => {
    const { memo } = state.memo.memoElement;
    return {
        initialValues : {
            title : memo && (memo.title || ''),
            writer : memo && (memo.writer || ''),
            context : memo && (memo.context || '') 
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

    if(!values.context || values.context.trim() === ''){
        errors.context = '내용을 입력하세요.';
        hasErrors = true;
    }

    return hasErrors && errors;
}

const validateAndSaving = (values, dispatch) => {
    const memoModel = {
        title : values && values.title,
        writer : values && values.writer,
        context : values && values.context
    }
    if(values && values.memoId === undefined){
        dispatch(create_memo_context(memoModel));
    }
}

class MemoEditForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { storeMemo : null, storeMemoLoading : false, storeMemoError : null };    
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { storeMemo, storeMemoLoading, storeMemoError } = nextProps;
        if(
            storeMemo === undefined && storeMemoLoading === undefined && storeMemoError === undefined
        ) {
            return null;
        } else if(
            prevState.storeMemo !== storeMemo ||
            prevState.storeMemoLoading !== storeMemoLoading ||
            prevState.storeMemoError !== storeMemoError
        ) {
            return {
                storeMemo,
                storeMemoLoading,
                storeMemoError
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
        const { location } = this.props;
        const { storeMemo, storeMemoError } = prevState;
        if(storeMemo !== null && location.pathname.includes('edit')) {
            this.props.change('memoId', storeMemo && storeMemo.id);
        } else if(storeMemoError !== this.state.storeMemoError) {
            const { history } = this.props;
            const { search } = location;
            const queryModel = queryString.parse(search);
            queryModel['id'] = undefined;
            alert(`다음과 같은 오류가 발생했습니다. 이전으로 돌아갑니다.\n오류 내용 : ${this.state.storeMemoError}`);
            history.push(`/memo/list/_ref?${queryString.stringify(queryModel)}`);
        }
    }

    render(){
        const { handleSubmit } = this.props;

        return (
            <Form onSubmit={handleSubmit(validateAndSaving)}>
                <Field name="title" type="text" component={TextInputRender} label="제목" placeholder="제목을 입력하세요." />
                <Field name="writer" type="text" component={TextInputRender} label="작성자" placeholder="작성자를 입력하세요." />
                <Field name="context" type="textarea" component={TextInputRender} label="내용" placeholder="내용을 입력하세요." />
                <div className="d-flex justify-content-end" style={{ marginTop : '5px' }}>
                    <Button type="submit" color="primary"><i className="fas fa-check" /> 저장</Button>
                </div>
            </Form>
        );
    }
}

MemoEditForm = reduxForm({
    form : 'memoEditForm',
    validate,
    enableReinitialize : true,
    keepDirtyOnReinitialize : true
})(MemoEditForm);

export default withRouter(
    connect(mapStateToProps)(MemoEditForm)
);