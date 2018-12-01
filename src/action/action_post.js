import axios from 'axios';
import queryString from 'query-string';

const ROOT_URL = 'http://127.0.0.1:8000/bbs_exp/post';

function get_post_list_by_query_api(queryModel) {
    const serverQuery = {
        type : queryModel && queryModel.type,
        page : queryModel && queryModel.pg,
        ordering : queryModel && (queryModel.ordering || '-id'),
        search : queryModel && queryModel.st,
        sz : queryModel && (queryModel.sz || 8)
    };
    return axios({
        url : `${ROOT_URL}?${queryString.stringify(serverQuery)}`,
        method : 'get'
    });
}

function get_post_single_api(id){
    return axios({
        url : `${ROOT_URL}/${id}`,
        method : 'get'
    });
}

function create_post_by_model_api(postModel){
    const requestBody = {
        id : 0,
        title : postModel && postModel.title,
        writer : postModel && postModel.writer,
        type : postModel && postModel.type,
        context : postModel && postModel.context,
        created_at : null,
        updated_at : null
    };
    return axios({
        url : ROOT_URL,
        data : requestBody,
        method : 'post'
    });
}

function update_post_by_model_api(postId, postModel){
    const requestBody = {
        id : postId,
        title : postModel && postModel.title,
        writer : postModel && postModel.writer,
        type : postModel && postModel.type,
        context : postModel && postModel.context,
        created_at : null,
        updated_at : null
    };
    return axios({
        url : `${ROOT_URL}/${postId}`,
        data : requestBody,
        method : 'put'
    });
}

function delete_post_by_id_api(postId){
    return axios({
        url : `${ROOT_URL}/${postId}`,
        method : 'delete'
    });
}

export const FETCH_POST_LIST_BY_QUERY = 'FETCH_POST_LIST_BY_QUERY';
export const FETCH_POST_LIST_BY_QUERY_SUCCESS = 'FETCH_POST_LIST_BY_QUERY_SUCCESS';
export const FETCH_POST_LIST_BY_QUERY_FAILURE = 'FETCH_POST_LIST_BY_QUERY_FAILURE';

export const fetch_post_list_by_query = (queryModel) => (dispatch) => {
    dispatch(fetch_post_list_by_query_start());
    
    return get_post_list_by_query_api(queryModel).then((response) => {
        setTimeout(() => {
            dispatch(fetch_post_list_by_query_success(response));
        }, 2000);
    }).catch(error => {
        dispatch(fetch_post_list_by_query_failure(error.message));
    });
}

const fetch_post_list_by_query_start = () => ({
    type : FETCH_POST_LIST_BY_QUERY
});

const fetch_post_list_by_query_success = (response) => ({
    type : FETCH_POST_LIST_BY_QUERY_SUCCESS,
    payload : response && response.data
});

const fetch_post_list_by_query_failure = (error) => ({
    type : FETCH_POST_LIST_BY_QUERY_FAILURE,
    payload : error
});

export const FETCH_POST_ELEMENT_BY_ID = 'FETCH_POST_ELEMENT_BY_ID';
export const FETCH_POST_ELEMENT_BY_ID_SUCCESS = 'FETCH_POST_ELEMENT_BY_ID_SUCCESS';
export const FETCH_POST_ELEMENT_BY_ID_FAILURE = 'FETCH_POST_ELEMENT_BY_ID_FAILURE';
export const RESET_FETCH_POST_ELEMENT_BY_ID = 'RESET_FETCH_POST_ELEMENT_BY_ID';

export const fetch_post_element_by_id = (postId) => (dispatch) => {
    dispatch(fetch_post_element_by_id_start());
    
    return get_post_single_api(postId).then((response) => {
        setTimeout(() => {
            dispatch(fetch_post_element_by_id_success(response));
        }, 2000);
    }).catch(error => {
        dispatch(fetch_post_element_by_id_failure(error.message));
    });
}

export const reset_fetch_post_element_by_id = () => (dispatch) => {
    dispatch(reset_fetch_post_element_by_id_start());
}

const fetch_post_element_by_id_start = () => ({
    type : FETCH_POST_ELEMENT_BY_ID
});

const fetch_post_element_by_id_success = (response) => ({
    type : FETCH_POST_ELEMENT_BY_ID_SUCCESS,
    payload : response && response.data
});

const fetch_post_element_by_id_failure = (error) => ({
    type : FETCH_POST_ELEMENT_BY_ID_FAILURE,
    payload : error
});

const reset_fetch_post_element_by_id_start = () => ({
    type : RESET_FETCH_POST_ELEMENT_BY_ID
});

export const CREATE_POST_CONTEXT = 'CREATE_POST_CONTEXT';
export const CREATE_POST_CONTEXT_SUCCESS = 'CREATE_POST_CONTEXT_SUCCESS';
export const CREATE_POST_CONTEXT_FAILURE = 'CREATE_POST_CONTEXT_FAILURE';
export const RESET_CREATE_POST_CONTEXT = 'RESET_CREATE_POST_CONTEXT';

export const create_post_context = (postModel) => (dispatch) => {
    dispatch(create_post_context_trying());
    
    return create_post_by_model_api(postModel).then((response) => {
        setTimeout(() => {
            dispatch(create_post_context_success(response));
        }, 2000);
    }).catch(error => {
        dispatch(create_post_context_failure(error.message));
    });
}

export const reset_create_post_context = () => (dispatch) => {
    dispatch(reset_create_post_context_trying());
}

const create_post_context_trying = () => ({
    type : CREATE_POST_CONTEXT
});

const create_post_context_success = (response) => ({
    type : CREATE_POST_CONTEXT_SUCCESS,
    payload : response && response.data
});

const create_post_context_failure = (error) => ({
    type : CREATE_POST_CONTEXT_FAILURE,
    payload : error
});

const reset_create_post_context_trying = () => ({
    type : RESET_CREATE_POST_CONTEXT
});

export const UPDATE_POST_CONTEXT = 'UPDATE_POST_CONTEXT';
export const UPDATE_POST_CONTEXT_SUCCESS = 'UPDATE_POST_CONTEXT_SUCCESS';
export const UPDATE_POST_CONTEXT_FAILURE = 'UPDATE_POST_CONTEXT_FAILURE';
export const RESET_UPDATE_POST_CONTEXT = 'RESET_UPDATE_POST_CONTEXT';

export const update_post_context = (postId, postModel) => (dispatch) => {
    dispatch(update_post_context_trying());

    return update_post_by_model_api(postId, postModel).then((response) => {
        setTimeout(() => {
            dispatch(update_post_context_success(response));
        }, 2000);
    }).catch(error => {
        dispatch(update_post_context_failure(error.message));
    });
}

export const reset_update_post_context = () => (dispatch) => {
    dispatch(reset_update_post_context_trying());
}

const update_post_context_trying = () => ({
    type : UPDATE_POST_CONTEXT
});

const update_post_context_success = (response) => ({
    type : UPDATE_POST_CONTEXT_SUCCESS,
    payload : response && response.data
});

const update_post_context_failure = (error) => ({
    type : UPDATE_POST_CONTEXT_FAILURE,
    payload : error
});

const reset_update_post_context_trying = () => ({
    type : RESET_UPDATE_POST_CONTEXT
});

export const DELETE_POST_ELEMENT_BY_ID = 'DELETE_POST_ELEMENT_BY_ID';
export const DELETE_POST_ELEMENT_BY_ID_SUCCESS = 'DELETE_POST_ELEMENT_BY_ID_SUCCESS';
export const DELETE_POST_ELEMENT_BY_ID_FAILURE = 'DELETE_POST_ELEMENT_BY_ID_FAILURE';
export const RESET_DELETE_POST_ELEMENT_BY_ID = 'RESET_DELETE_POST_ELEMENT_BY_ID';

export const delete_post_element_by_id = (postId) => (dispatch) => {
    dispatch(delete_post_element_by_id_trying());

    return delete_post_by_id_api(postId).then((response) => {
        setTimeout(() => {
            dispatch(delete_post_element_by_id_success(response));
        }, 2000);
    }).catch(error => {
        dispatch(delete_post_element_by_id_failure(error.message));
    });
}

export const reset_delete_post_element_by_id = () => (dispatch) => {
    dispatch(reset_delete_post_element_by_id_trying());
}

const delete_post_element_by_id_trying = () => ({
    type : DELETE_POST_ELEMENT_BY_ID
});

/* 
 * django REST Framework 에서 ModelViewSet 로 RESTful API 를 생성할 때, 
 * delete 요청에 대한 Response Status 값이 204(No Content) 이기 때문에
 * Status 값으로 Payload 설정.
 */
const delete_post_element_by_id_success = (response) => ({
    type : DELETE_POST_ELEMENT_BY_ID_SUCCESS,
    payload : response && response.status
});

const delete_post_element_by_id_failure = (error) => ({
    type : DELETE_POST_ELEMENT_BY_ID_FAILURE,
    payload : error
});

const reset_delete_post_element_by_id_trying = () => ({
    type : RESET_DELETE_POST_ELEMENT_BY_ID
});
