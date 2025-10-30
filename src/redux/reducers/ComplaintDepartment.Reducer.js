import { ActionTyps } from '../constants/action.type'
const { FETCH_COMPLAINT_DEPARTMENT } = ActionTyps
//intial state
const complaintdeptName = {
  complaintdeptList: [],
  loadingStatus: false
}
/*** Complaint Department action type check then payload set to the state and loading status set as true */
export const getComplaintDept = (state = complaintdeptName, { type, payload }) => {
  switch (type) {
    case FETCH_COMPLAINT_DEPARTMENT:
      return { ...state, complaintdeptList: payload, loadingStatus: true }
    default:
      return state
  }
}
