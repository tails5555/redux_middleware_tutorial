import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as MemoActions from '../action/action_memo';
import * as MemoAPI from './api_request';

export function* fetch_memo_list_saga(action){
    yield call(delay, 2000);
    try {
        const response = yield call(MemoAPI.fetch_memo_list_api, action.queryModel);
        yield put(MemoActions.fetch_memo_list_success(response));
    } catch (error) {
        yield put(MemoActions.fetch_memo_list_failure(error && error.message));
    }
}

export function* fetch_memo_element_saga(action){
    yield call(delay, 2000);
    try {
        const response = yield call(MemoAPI.fetch_memo_element_api, action.id);
        yield put(MemoActions.fetch_memo_element_by_id_success(response));
    } catch (error) {
        yield put(MemoActions.fetch_memo_element_by_id_failure(error && error.message));
    }
}

export function* create_memo_context_saga(action){
    yield call(delay, 2000);
    try {
        const response = yield call(MemoAPI.create_memo_api, action.memoModel);
        yield put(MemoActions.create_memo_context_success(response));
    } catch (error) {
        yield put(MemoActions.create_memo_context_failure(error && error.message));
    }
}