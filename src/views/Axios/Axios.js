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
    'Accept-Language': 'en-GB,en'
  }
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

// axiosellider.interceptors.request.use(
//   function (config) {
//     const userinfo = localStorage.getItem('userDetl')
//     const accessToken = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).token : 0
//     config.headers.Authorization = `Bearer ${accessToken}`
//     return config
//   },
//   function (err) {
//     console.log(err)
//   }
// )

// CONNECTION TO THE KMC MYSQL DATABASE

export const axioskmc = Axios.create({
  baseURL: API_URL_KMC,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'en-GB,en'
  }
})

// axioskmc.interceptors.request.use(
//   function (config) {
//     const userinfo = sessionStorage.getItem('userDetl')
//     const accessToken = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).token : 0
//     config.headers.Authorization = `Bearer ${accessToken}`
//     return config
//   },
//   function (err) {
//     console.log(err)
//   }
// )

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


// import Axios from 'axios'
// import { loadApiConfig } from './configService'
// import { toast } from 'react-toastify'
// import React from 'react'

// let axioslogin = null
// let axiosellider = null
// let axioskmc = null

// export async function initAxiosInstances() {
//   const config = await loadApiConfig()
//   const { crf_api_kmc, static_api, elider_api } = config[0]

//   axioslogin = Axios.create({
//     baseURL: API_URL,
//     withCredentials: true,
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       'Accept-Language': 'en-GB,en'
//     }
//   })

//   axiosellider = Axios.create({
//     baseURL: ELLIDER_API_URL,
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       'Accept-Language': 'en-GB,en'
//     }
//   })

//   axioskmc = Axios.create({
//     baseURL: crf_api_kmc,
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       'Accept-Language': 'en-GB,en'
//     }
//   })

//   const addAuth = (instance, useSession = true) => {
//     instance.interceptors.request.use(config => {
//       const storage = useSession ? sessionStorage : localStorage
//       const userinfo = storage.getItem('userDetl')
//       const token = userinfo ? JSON.parse(userinfo).token : ''
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//       }
//       return config
//     }, error => Promise.reject(error))
//   }

//   const addLoginResponseInterceptor = instance => {
//     instance.interceptors.response.use(
//       response => response,
//       async error => {
//         const originalRequest = error.config
//         const localData = localStorage.getItem('app_auth')
//         const userSlno = localData ? atob(JSON.parse(localData)?.authNo || '') : null

//         if (error.response?.status === 401 && !originalRequest._retry && userSlno) {
//           originalRequest._retry = true
//           try {
//             await instance.get(`/user/getRefershToken/${userSlno}`, { withCredentials: true })
//             return instance(originalRequest)
//           } catch (refreshError) {
//             localStorage.removeItem('app_auth')
//             toast.error(
//               <div className="flex h-20 flex-col">Your Session has been Expired</div>,
//               {
//                 position: 'top-center',
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: 'light'
//               }
//             )
//             setTimeout(() => {
//               window.location.href = '/'
//             }, 2000)
//           }
//         }

//         if (error.response?.status === 403) {
//           localStorage.removeItem('app_auth')
//           setTimeout(() => {
//             window.location.href = '/'
//           }, 3000)
//         }

//         return Promise.reject(error)
//       }
//     )
//   }

//   // Add request interceptors
//   addAuth(axioslogin, true)     // sessionStorage
//   addAuth(axiosellider, true)  // localStorage
//   addAuth(axioskmc, true)       // sessionStorage

//   // Add response interceptor only for axioslogin
//   addLoginResponseInterceptor(axioslogin)
// }

// export { axioslogin, axiosellider, axioskmc }
