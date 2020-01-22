import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/';

export const callApi = (url, data, headers, method) => axios({
    method,
    url: baseUrl + url,
    data,
    headers
})