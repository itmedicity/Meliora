import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_GOALS_TASKMANAGEMENT } = ActionTyps
/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getGoalsList = () => async dispatch => {
  const result = await axioslogin.get('/TmDropDowns/getGoals')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_GOALS_TASKMANAGEMENT, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_GOALS_TASKMANAGEMENT, payload: [], loadingStatus: false })
  }
}
