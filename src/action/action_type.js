import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8000/bbs_exp/type';

function get_type_list_api() {
    return axios({
        url : ROOT_URL,
        method : 'get'
    });
}

function get_type_single_api(id){
    return axios({
        url : `${ROOT_URL}/${id}`,
        method : 'get'
    });
}

export const FETCH_ALL_BBS_TYPES = 'FETCH_ALL_BBS_TYPES';
export const FETCH_ALL_BBS_TYPES_SUCCESS = 'FETCH_ALL_BBS_TYPES_SUCCESS';
export const FETCH_ALL_BBS_TYPES_FAILURE = 'FETCH_ALL_BBS_TYPES_FAILURE';

export const fetch_all_bbs_types = () => (dispatch) => {
    dispatch(fetch_all_bbs_types_start());
    
    return get_type_list_api().then((response) => {
        setTimeout(() => {
            dispatch(fetch_all_bbs_types_success(response));
        }, 2000);
    }).catch(error => {
        dispatch(fetch_all_bbs_types_failure(error.message));
    });
}

const fetch_all_bbs_types_start = () => ({ 
    type : FETCH_ALL_BBS_TYPES
});

const fetch_all_bbs_types_success = (response) => ({
    type : FETCH_ALL_BBS_TYPES_SUCCESS,
    payload : response.data
});

const fetch_all_bbs_types_failure = (error) => ({
    type : FETCH_ALL_BBS_TYPES_FAILURE,
    payload : error
});