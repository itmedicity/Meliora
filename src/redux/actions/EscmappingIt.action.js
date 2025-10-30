import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_MAPPINGIT } = ActionTyps

/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getEscalationMappingIt = postdata2 => async dispatch => {
  const result = await axioslogin.post(`/timeescalation/countit`, postdata2)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_ESCALATION_MAPPINGIT, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_ESCALATION_MAPPINGIT, payload: [], loadingStatus: false })
  }
}
