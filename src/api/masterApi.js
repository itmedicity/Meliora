import { axioslogin } from 'src/views/Axios/Axios'

export const getbackupTypeList = async () => {
  return axioslogin.get('/backuptypemast/getBackupType').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getsimOperatorList = async () => {
  return axioslogin.get('/simOperators/getsimOperator').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
