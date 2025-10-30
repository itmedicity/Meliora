import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_BACKUP_SCHEDULE_TYPE } = ActionTyps

export const getScheduleType = () => async dispatch => {
  const result = await axioslogin.get('/scheduletype/list')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_BACKUP_SCHEDULE_TYPE, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_BACKUP_SCHEDULE_TYPE, payload: [], loadingStatus: false })
  }
}
