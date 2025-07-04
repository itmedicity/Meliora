import { ActionTyps } from '../constants/action.type'
const { FETCH_COMPLAINTREG_TABLE } = ActionTyps
//intial state
const complaintRegTable = {
  complaintRegTableList: [],
  loadingStatus: false
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const setComplaintRegTable = (state = complaintRegTable, { type, payload }) => {
  switch (type) {
    case FETCH_COMPLAINTREG_TABLE:
      return { ...state, complaintRegTableList: payload, loadingStatus: true }
    default:
      return state
  }
}
