import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_TOTAL_ADMISSION, FETCH_TOTAL_DAMA, FETCH_TOTAL_BHRC, FETCH_TOTAL_DOCVISIT, FETCH_TOTAL_DISAFTERNOON } =
  ActionTyps

export const getTotalAdmission = () => async dispatch => {
  const result = await axioslogin.get(`/wewrkdash/admission/count`)
  // console.log(result);
  const { success, data } = result.data
  if (success === 1) {
    const { total_admission } = data[0]
    dispatch({ type: FETCH_TOTAL_ADMISSION, payload: total_admission, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_TOTAL_ADMISSION, payload: [], loadingStatus: false })
  }
}
export const getTotalDama = () => async dispatch => {
  const result = await axioslogin.get('/wewrkdash/count')
  const { success, data } = result.data
  if (success === 1) {
    const { dama_count } = data[0]
    dispatch({ type: FETCH_TOTAL_DAMA, payload: dama_count, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_TOTAL_DAMA, payload: [], loadingStatus: false })
  }
}
export const getTotalBhrc = () => async dispatch => {
  const result = await axioslogin.get('/wewrkdash/countbhrc')
  const { success, data } = result.data
  if (success === 1) {
    const { count_bhrc } = data[0]
    dispatch({ type: FETCH_TOTAL_BHRC, payload: count_bhrc, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_TOTAL_BHRC, payload: [], loadingStatus: false })
  }
}
export const getVisitCountafterNoon = () => async dispatch => {
  const result = await axioslogin.get('/wewrkdash/visitcount')
  const { success, data } = result.data
  if (success === 1) {
    const { shift_count } = data[0]
    dispatch({ type: FETCH_TOTAL_DOCVISIT, payload: shift_count, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_TOTAL_DOCVISIT, payload: [], loadingStatus: false })
  }
}
export const getDischargecountAfternoon = () => async dispatch => {
  const result = await axioslogin.get('/wewrkdash/DischargeCount')
  const { success, data } = result.data
  if (success === 1) {
    const { Discharge_count } = data[0]
    dispatch({ type: FETCH_TOTAL_DISAFTERNOON, payload: Discharge_count, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_TOTAL_DISAFTERNOON, payload: [], loadingStatus: false })
  }
}
