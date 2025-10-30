import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_QUALITY_INDICATOR_DEPT } = ActionTyps

export const getQltyDept = id => async dispatch => {
  const result = await axioslogin.get(`/qidepartment/active/${id}`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_QUALITY_INDICATOR_DEPT, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_QUALITY_INDICATOR_DEPT, payload: [], loadingStatus: false })
  }
}
