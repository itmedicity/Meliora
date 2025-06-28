import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify } from 'src/views/Common/CommonCode'

const ValidateSession = () => {
  const history = useNavigate()

  useEffect(() => {
    axioslogin.get('/user').then((response) => {
      if (response.data.status !== 200) {
        localStorage.clear()
        infoNotify('session timed out...Please Login')
        history('/')
      }
    })
  }, [history])

  return <div></div>
}

export default ValidateSession
