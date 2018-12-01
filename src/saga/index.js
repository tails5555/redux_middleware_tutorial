import { takeLatest } from 'redux-saga/effects';

import { FETCH_MEMO_LIST, FETCH_MEMO_ELEMENT_BY_ID, CREATE_MEMO_CONTEXT, UPDATE_MEMO_CONTEXT, DELETE_MEMO_ELEMENT_BY_ID } from '../action/action_memo';
import { fetch_memo_list_saga, fetch_memo_element_saga, create_memo_context_saga, update_memo_context_saga, delete_memo_element_saga } from './saga_memo';

export default function* root() {
    yield [
        takeLatest(FETCH_MEMO_LIST, fetch_memo_list_saga),
        takeLatest(FETCH_MEMO_ELEMENT_BY_ID, fetch_memo_element_saga),
        takeLatest(CREATE_MEMO_CONTEXT, create_memo_context_saga),
        takeLatest(UPDATE_MEMO_CONTEXT, update_memo_context_saga),
        takeLatest(DELETE_MEMO_ELEMENT_BY_ID, delete_memo_element_saga)
    ]
}