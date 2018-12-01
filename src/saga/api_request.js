import axios from 'axios';
import queryString from 'query-string';

const ROOT_URL = 'http://127.0.0.1:8000/bbs_exp/memo';

export const fetch_memo_list_api = (queryModel) => {
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

export const fetch_memo_element_api = (id) => {
    return axios({
        url : `${ROOT_URL}/${id}`,
        method : 'get'
    });
}

export const create_memo_api = (memoModel) => {
    return axios({
        url : ROOT_URL,
        method : 'post',
        data : memoModel
    });
}

export const update_memo_api = (memoId, memoModel) => {
    const memoFormModel = {
        id : memoId,
        title : memoModel && memoModel.title,
        writer : memoModel && memoModel.writer,
        context : memoModel && memoModel.context,
        created_at : null,
        updated_at : null 
    }

    return axios({
        url : `${ROOT_URL}/${memoId}`,
        method : 'put',
        data : memoFormModel
    });
}

export const delete_memo_api = (memoId) => {
    return axios({
        url : `${ROOT_URL}/${memoId}`,
        method : 'delete'
    });
}