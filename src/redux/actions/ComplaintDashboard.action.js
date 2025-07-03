import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const {
  FETCH_TOTAL_COMPLAINTS,
  FETCH_ONHOLDCOMPLAINTS_DASH,
  FETCH_ASSIST_RECTY_EMP,
  FETCH_PENDING_ONHOLD_EMP,
} = ActionTyps

export const getTotalcomplaints = id => async dispatch => {
  const result = await axioslogin.get(`/cmdashboard/totalcomplaints/${id}`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_TOTAL_COMPLAINTS, payload: data, status: false })
  } else {
    dispatch({ type: FETCH_TOTAL_COMPLAINTS, payload: 0, status: false })
  }
}

export const getOnholdcomplaints = id => async dispatch => {
  const result = await axioslogin.get(`/cmdashboard/onholdcomplaints/${id}`)
  const { success3, data } = result.data
  if (success3 === 1) {
    dispatch({ type: FETCH_ONHOLDCOMPLAINTS_DASH, payload: data, status: false })
  } else {
    dispatch({ type: FETCH_ONHOLDCOMPLAINTS_DASH, payload: 0, status: false })
  }
}

export const getAssistRectifybasedOnEmp = id => async dispatch => {
  const result = await axioslogin.get(`/cmdashboard/asistRecty/empwise/${id}`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_ASSIST_RECTY_EMP, payload: data, status: false })
  } else {
    dispatch({ type: FETCH_ASSIST_RECTY_EMP, payload: 0, status: false })
  }
}

export const getPendingOnholdbasedOnEmp = id => async dispatch => {
  const result = await axioslogin.get(`/cmdashboard/pendingOnhold/empwise/${id}`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_PENDING_ONHOLD_EMP, payload: data, status: false })
  } else {
    dispatch({ type: FETCH_PENDING_ONHOLD_EMP, payload: 0, status: false })
  }
}
