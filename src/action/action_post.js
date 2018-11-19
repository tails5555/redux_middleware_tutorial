import axios from 'axios';
import queryString from 'query-string';

const ROOT_URL = 'http://127.0.0.1:8000/bbs_exp/post';

function get_post_list_by_query_api(queryModel) {
    const serverQuery = {
        type : queryModel && queryModel.type,
        page : queryModel && queryModel.pg,
        ordering : queryModel && (queryModel.ordering || '-id'),
        search : queryModel && queryModel.st
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
    payload : response.data
});

const fetch_post_list_by_query_failure = (error) => ({
    type : FETCH_POST_LIST_BY_QUERY_FAILURE,
    payload : error
})