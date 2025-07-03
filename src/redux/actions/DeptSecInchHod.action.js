import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_DEPTSEC_INCH_HOD } = ActionTyps
/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getDeptSecInchHod = deptsec => async dispatch => {
  const result = await axioslogin.get(`/common/deptSec/InchHod/${deptsec}`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_DEPTSEC_INCH_HOD, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_DEPTSEC_INCH_HOD, payload: [], loadingStatus: false })
  }
}
