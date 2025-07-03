import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_BACKUP_SCHEDULE_TIME } = ActionTyps

export const getScheduleTime = () => async dispatch => {
  const result = await axioslogin.get('/scheduletime/list')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_BACKUP_SCHEDULE_TIME, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_BACKUP_SCHEDULE_TIME, payload: [], loadingStatus: false })
  }
}
