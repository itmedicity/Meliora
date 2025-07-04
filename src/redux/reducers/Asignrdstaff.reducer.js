import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSIGNED_STAFF } = ActionTyps
//intial state
const assignedstaff = {
  assignedstaffList: [],
  loadingStatus: false
}
/*** Complainttype action type check then payload set to the state and loading status set as true */
export const getAsignedstaffnurse = (state = assignedstaff, { type, payload }) => {
  switch (type) {
    case FETCH_ASSIGNED_STAFF:
      return { ...state, assignedstaffList: payload, loadingStatus: true }
    default:
      return state
  }
}
