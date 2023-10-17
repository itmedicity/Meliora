import Axios from 'axios';

import { API_URL, ELLIDER_API_URL } from '../Constant/Static'

export const axioslogin = Axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Accept-Language": "en-GB,en"
    }
});


axioslogin.interceptors.request.use(function (config) {
    const userinfo = sessionStorage.getItem('userDetl');
    const accessToken = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).token : 0;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
}, function (err) {
    console.log(err);
})

export const axiosellider = Axios.create({
    baseURL: ELLIDER_API_URL,
    headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Accept-Language": "en-GB,en"
    }
});


axiosellider.interceptors.request.use(function (config) {
    const userinfo = sessionStorage.getItem('userDetl');
    const accessToken = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).token : 0;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
}, function (err) {
    console.log(err);
})
