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

export const FETCH_BBS_TYPE_ELEMENT_BY_ID = 'FETCH_BBS_TYPE_ELEMENT_BY_ID';
export const FETCH_BBS_TYPE_ELEMENT_BY_ID_SUCCESS = 'FETCH_BBS_TYPE_ELEMENT_BY_ID_SUCCESS';
export const FETCH_BBS_TYPE_ELEMENT_BY_ID_FAILURE = 'FETCH_BBS_TYPE_ELEMENT_BY_ID_FAILURE';

export const fetch_bbs_type_element_by_id = (typeId) => (dispatch) => {
    dispatch(fetch_bbs_type_element_by_id_start())

    return get_type_single_api(typeId).then((response) => {
        setTimeout(() => {
            dispatch(fetch_bbs_type_element_by_id_success(response));
        }, 1000);
    }).catch(error => {
        dispatch(fetch_bbs_type_element_by_id_failure(error.message));
    });
}

const fetch_bbs_type_element_by_id_start = () => ({
    type : FETCH_BBS_TYPE_ELEMENT_BY_ID
});

const fetch_bbs_type_element_by_id_success = (response) => ({
    type : FETCH_BBS_TYPE_ELEMENT_BY_ID_SUCCESS,
    payload : response.data
});

const fetch_bbs_type_element_by_id_failure = (error) => ({
    type : FETCH_BBS_TYPE_ELEMENT_BY_ID_FAILURE,
    payload : error
});