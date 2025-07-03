import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_LOGIN_PROFILE_DATA } = ActionTyps
/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */

export const setLoginProfileData = id => async dispatch => {
  const result = await axioslogin.get(`/common/getLoginProfile/${id}`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_LOGIN_PROFILE_DATA, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_LOGIN_PROFILE_DATA, payload: [], loadingStatus: false })
  }
}
