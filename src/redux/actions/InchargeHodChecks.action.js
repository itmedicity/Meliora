import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_INCHARGE_HOD_CHECK } = ActionTyps
/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */

export const getInchargeHodData = no => async dispatch => {
  const result = await axioslogin.get(`/common/inchargehod/${no}`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_INCHARGE_HOD_CHECK, payload: data, loadingStatus: true })
  } else {
    let deflt = [{ hod: 0, incharge: 0 }]
    dispatch({
      type: FETCH_INCHARGE_HOD_CHECK,
      payload: deflt,
      loadingStatus: false,
    })
  }
}
