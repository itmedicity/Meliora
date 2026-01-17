import React from 'react'
import Axios from 'axios'
import { API_URL, ELLIDER_API_URL, API_URL_KMC } from '../Constant/Static'
import { toast } from 'react-toastify'
import { warningNotify } from '../Common/CommonCode'

// CONNECTION TO THE MELIORA MYSQL DATABASE

export const axioslogin = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'en-GB,en'
  }
})


axioslogin.interceptors.request.use(
  config => {
    return config
  },
  error => Promise.reject(error)
)

axioslogin.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const localData = localStorage.getItem('app_auth')
    const userSlno = atob(JSON.parse(localData)?.authNo)
    const originalRequest = error.config;
    /*  for handling rate limit api by checking the status code as 429  */

    if (error.response?.status === 429) {
      const message =
        error.response?.data?.message ||
        "Too many requests. Please slow down and Wait.";
      warningNotify(message);
    }
    // Check if the error is due to an expired token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // Prevent infinite retries
      try {
        await axioslogin.get(`/user/getRefershToken/${userSlno}`, { withCredentials: true })
        return axioslogin(originalRequest)
      } catch (refreshError) {
        // console.log("Failed to refresh token:", refreshError);
        localStorage.removeItem('app_auth')
        // Handle logout or redirection to login page
        toast.error(<div className="flex h-20 flex-col">Your Session has been Expired</div>, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        setTimeout(() => {
          window.location.href = '/'
        }, 2000) // Wait 3 seconds before redirecting
      }
    }

    if (error.response?.status === 403) {
      localStorage.removeItem('app_auth')
      // Handle logout or redirection to login page
      setTimeout(() => {
        window.location.href = '/'
      }, 3000) // Wait 3 seconds before redirecting
    }

    return Promise.reject(error)
  }
)

// CONNECTION TO THE ELLIDER MYSQL DATABASE

export const axiosellider = Axios.create({
  baseURL: ELLIDER_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'en-GB,en'
  }
})
//geting elider token
export const fetchEliderToken = async () => {
  try {
    const result = await axioslogin.get(`/user/get-elider-token`)
    const { success, data } = result.data
    if (success === 1 && data.length > 0) {
      const token = data?.[0]?.Elider_token;
      return token
    } else {
      return null
    }
  } catch (err) {
    console.error("Failed to fetch elider token:", err);
    return null;
  }
};

axiosellider.interceptors.request.use(
  async function (config) {
    const userinfo = sessionStorage.getItem('userDetl')
    const accessToken = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).token : 0
    // const userId = localData ? atob(JSON.parse(localData)?.authNo) : null;
    const token = await fetchEliderToken();
    if (token) {
      config.headers.Authorization = `Token ${token} `;

    } else {
      // config.headers['x-access-token'] = accessToken;
      config.headers.Authorization = `Bearer ${accessToken} `;
    }
    return config;
  },
  function (err) {
    // console.log(err);
    return Promise.reject(err);
  }
);


// CONNECTION TO THE KMC MYSQL DATABASE

export const axioskmc = Axios.create({
  baseURL: API_URL_KMC,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'en-GB,en'
  }
})



export const fetchKmcToken = async () => {
  try {
    const result = await axioslogin.get(`/user/get-Kmc-token`)
    const { success, data } = result.data
    if (success === 1 && data.length > 0) {
      const token = data?.[0]?.Kmc_token;
      return token
    } else {
      return null
    }
  } catch (err) {
    // console.error("Failed to fetch elider token:", err);
    return null;
  }
};

axioskmc.interceptors.request.use(
  async function (config) {
    const userinfo = sessionStorage.getItem('userDetl')
    const accessToken = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).token : 0
    // const userId = localData ? atob(JSON.parse(localData)?.authNo) : null;
    const token = await fetchKmcToken();
    if (token) {
      config.headers.Authorization = `Token ${token} `;
    } else {
      // config.headers['x-access-token'] = accessToken;
      config.headers.Authorization = `Bearer ${accessToken} `;
    }
    return config;
  },
  function (err) {
    // console.log(err);
    return Promise.reject(err);
  }
);

