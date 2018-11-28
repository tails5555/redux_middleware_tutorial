import axios from 'axios';
import queryString from 'query-string';

const ROOT_URL = 'http://127.0.0.1:8000/bbs_exp/memo';

export const fetch_memo_api = (queryModel) => {
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