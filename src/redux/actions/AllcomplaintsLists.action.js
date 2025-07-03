import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_ALLCOMPLAINTS } = ActionTyps

export const getAllComplaintLists = em_department => async dispatch => {
  const result = await axioslogin.get(`/complaintassign/allcomplaint/${em_department}`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_ALLCOMPLAINTS, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_ALLCOMPLAINTS, payload: [], loadingStatus: false })
  }
}
