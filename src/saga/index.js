import { takeLatest } from 'redux-saga/effects';

import { FETCH_MEMO_LIST } from '../action/action_memo';
import { fetch_memo_list_saga } from './saga_memo';

export default function* root() {
    yield [
        takeLatest(FETCH_MEMO_LIST, fetch_memo_list_saga)
    ]
}