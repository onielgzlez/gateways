import axios from "axios";
const API_URL = 'http://localhost:4000/api/';

export const api = {
    get,
    post,
    put,
    delete: _delete
};

const instance = axios.create({
    baseURL: API_URL,
    timeout: 1500,
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json'
});

async function get(url) {
    const response = await instance.get(url);
    return handleResponse(response);
}

async function post(url, body) {
    const response = await instance.post(url, JSON.stringify(body));
    return handleResponse(response);
}

async function put(url, body) {
    const response = await instance.put(url, JSON.stringify(body));
    return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url) {
    const response = await instance.delete(url)
    return handleResponse(response);
}

// helper functions
function handleResponse(response) {
    if (!response.data) {
        const error = (response && response.message) || response.statusText;
        return Promise.reject(error);
    }
    return response.data;
}

export const handleError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return error.response.data.message;
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return error.request;
    } else {        // Something happened in setting up the request that triggered an Error
        return error.message;
    }
}