import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_EMP_ID } = ActionTyps
/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const setEmpId = employeeNumber => async dispatch => {
  const result = await axioslogin.get(`/common/getempid/${employeeNumber}`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_EMP_ID, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_EMP_ID, payload: [], loadingStatus: false })
  }
}
