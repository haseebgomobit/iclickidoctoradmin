import cookie from 'js-cookie';
import { prod } from '../config/index.json';
export const getRequest = (url, isAuth = true) => {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        if (isAuth) {
            var token = JSON.parse(cookie.get("auth")).token;
            requestOptions.headers.Authorization = token;
        }
        fetch(prod.apibaseurl + url, requestOptions)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            }).catch(e => {
                reject(e);
            });
    })
}
export const postRequest = (url, data, isAuth = true) => {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        if (isAuth) {
            var token = JSON.parse(cookie.get("auth")).token;
            requestOptions.headers.Authorization = token;
        }
        fetch(prod.apibaseurl + url, requestOptions)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            }).catch(e => {
                reject(e);
            });
    })
}
export const postFormDataRequest = (url, data, isAuth = true) => {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: {},
            body: data
        };
        if (isAuth) {
            var token = JSON.parse(cookie.get("auth")).token;
            requestOptions.headers.Authorization = token;
        }
        fetch(prod.apibaseurl + url, requestOptions)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            }).catch(e => {
                reject(e);
            });
    })
}