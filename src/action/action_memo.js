// Memo 데이터베이스의 CRUD는 Redux-Saga 를 이용하겠습니다.

export const FETCH_MEMO_LIST = 'FETCH_MEMO_LIST';
export const FETCH_MEMO_LIST_SUCCESS = 'FETCH_MEMO_LIST_SUCCESS';
export const FETCH_MEMO_LIST_FAILURE = 'FETCH_MEMO_LIST_FAILURE';

export const fetch_memo_list = (queryModel) => ({
    type : FETCH_MEMO_LIST,
    queryModel
});

export const fetch_memo_list_success = (response) => ({
    type : FETCH_MEMO_LIST_SUCCESS,
    payload : response.data
});

export const fetch_memo_list_failure = (error) => ({
    type : FETCH_MEMO_LIST_FAILURE,
    payload : error
});

export const FETCH_MEMO_ELEMENT_BY_ID = 'FETCH_MEMO_ELEMENT_BY_ID';
export const FETCH_MEMO_ELEMENT_BY_ID_SUCCESS = 'FETCH_MEMO_ELEMENT_BY_ID_SUCCESS';
export const FETCH_MEMO_ELEMENT_BY_ID_FAILURE = 'FETCH_MEMO_ELEMENT_BY_ID_FAILURE';

export const fetch_memo_element_by_id = (id) => ({
    type : FETCH_MEMO_ELEMENT_BY_ID,
    id
});

export const fetch_memo_element_by_id_success = (response) => ({
    type : FETCH_MEMO_ELEMENT_BY_ID_SUCCESS,
    payload : response.data
});

export const fetch_memo_element_by_id_failure = (error) => ({
    type : FETCH_MEMO_ELEMENT_BY_ID_FAILURE,
    payload : error
});
