import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_MS_APPROVE_LIST } = ActionTyps
/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */

export const getReqApprovMS = () => async dispatch => {
  const result = await axioslogin.get('/requestRegister/getApprovList/MS')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_MS_APPROVE_LIST, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_MS_APPROVE_LIST, payload: [], loadingStatus: false })
  }
}
