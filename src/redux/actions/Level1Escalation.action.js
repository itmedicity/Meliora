import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_LEVEL1_IT_ESCLATION, FETCH_LEVEL1_MAINTENANCE_ESCLATION } = ActionTyps

export const getItescalation = timeescalationData => async dispatch => {
  const result = await axioslogin.post(`/timeescalation/level1It`, timeescalationData)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_LEVEL1_IT_ESCLATION, payload: data })
  } else {
    dispatch({ type: FETCH_LEVEL1_IT_ESCLATION, payload: 0 })
  }
}

export const getMaintenanceescalation = () => async dispatch => {
  const result = await axioslogin.get(`/timeescalation/level1Main`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_LEVEL1_MAINTENANCE_ESCLATION, payload: data })
  } else {
    dispatch({ type: FETCH_LEVEL1_MAINTENANCE_ESCLATION, payload: data })
  }
}
