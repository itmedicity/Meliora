import Axios from 'axios';
// import { API_URL } fro../Constant/Constantant";

const SERVER_API_URL = 'http://192.168.11.42:5000/api/';

export const axioslogin = Axios.create({
    baseURL: SERVER_API_URL,
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
