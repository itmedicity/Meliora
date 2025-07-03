import { ActionTyps } from '../constants/action.type'
const { FETCH_COMPLAINT_TYPE } = ActionTyps
//intial state
const complaintType = {
  complainttypeList: [],
  loadingStatus: false,
}
/*** Complainttype action type check then payload set to the state and loading status set as true */
export const getComplainttype = (state = complaintType, { type, payload }) => {
  switch (type) {
    case FETCH_COMPLAINT_TYPE:
      return { ...state, complainttypeList: payload, loadingStatus: true }
    default:
      return state
  }
}
