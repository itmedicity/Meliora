import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_TOTAL_COMPLAINT_ALL, FETCH_PENDING_ONHOLD_COMPLAINT_ALL } = ActionTyps

export const getTotalcomplaintsall = () => async dispatch => {
  const result = await axioslogin.get('/cmdashboard/totalcomplaints/alldept')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_TOTAL_COMPLAINT_ALL, payload: data, status: false })
  } else {
    dispatch({ type: FETCH_TOTAL_COMPLAINT_ALL, payload: 0, status: false })
  }
}

export const getPendingOnholdcomplaintsall = () => async dispatch => {
  const result = await axioslogin.get('/cmdashboard/onholdcomplaints/alldept')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_PENDING_ONHOLD_COMPLAINT_ALL, payload: data, status: false })
  } else {
    dispatch({ type: FETCH_PENDING_ONHOLD_COMPLAINT_ALL, payload: 0, status: false })
  }
}
