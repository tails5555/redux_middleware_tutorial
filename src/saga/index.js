import { takeLatest } from 'redux-saga/effects';

import { FETCH_MEMO_LIST, FETCH_MEMO_ELEMENT_BY_ID } from '../action/action_memo';
import { fetch_memo_list_saga, fetch_memo_element_saga } from './saga_memo';

export default function* root() {
    yield [
        takeLatest(FETCH_MEMO_LIST, fetch_memo_list_saga),
        takeLatest(FETCH_MEMO_ELEMENT_BY_ID, fetch_memo_element_saga)
    ]
}