import React from 'react'
import Axios from 'axios'
import { API_URL, ELLIDER_API_URL, API_URL_KMC } from '../Constant/Static'
import { toast } from 'react-toastify'

// CONNECTION TO THE MELIORA MYSQL DATABASE

export const axioslogin = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'en-GB,en',
  },
})

// axioslogin.interceptors.request.use(
//   function (config) {
//     const userinfo = sessionStorage.getItem('userDetl')
//     const accessToken = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).token : 0
//     config.headers.Authorization = `Bearer ${accessToken}`
//     return config
//   },
//   function (err) {
//     console.log(err)
//   },
// )

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
    const originalRequest = error.config
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
          theme: 'light',
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
    'Accept-Language': 'en-GB,en',
  },
})

axiosellider.interceptors.request.use(
  function (config) {
    const userinfo = localStorage.getItem('userDetl')
    const accessToken = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).token : 0
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  function (err) {
    console.log(err)
  }
)

// CONNECTION TO THE KMC MYSQL DATABASE

export const axioskmc = Axios.create({
  baseURL: API_URL_KMC,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'en-GB,en',
  },
})

axioskmc.interceptors.request.use(
  function (config) {
    const userinfo = sessionStorage.getItem('userDetl')
    const accessToken = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).token : 0
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  function (err) {
    console.log(err)
  }
)
