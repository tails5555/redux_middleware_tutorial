import { call, put } from 'redux-saga/effects';
import * as MemoActions from '../action/action_memo';
import * as MemoAPI from './api_request';

export function* fetch_memo_list_saga(action){
    try {
        const response = yield call(MemoAPI.fetch_memo_api, action.queryModel);
        yield put(MemoActions.fetch_memo_list_success(response))
    } catch (error) {
        yield put(MemoActions.fetch_memo_list_failure(error && error.message));
    }
}