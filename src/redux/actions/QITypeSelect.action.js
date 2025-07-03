import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_QI_DEPT_TYPE } = ActionTyps

export const getQIDeptType = () => async dispatch => {
  const result = await axioslogin.get('/qiTypeList/active')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_QI_DEPT_TYPE, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_QI_DEPT_TYPE, payload: [], loadingStatus: false })
  }
}
