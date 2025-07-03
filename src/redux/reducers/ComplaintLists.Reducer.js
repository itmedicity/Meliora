import { ActionTyps } from '../constants/action.type'
const { FETCH_COMPLAINTLISTS } = ActionTyps
//intial state
const complaints = {
  complaintLists: [],
  loadingStatus: false,
}
export const getComplaintLists = (state = complaints, { type, payload }) => {
  switch (type) {
    case FETCH_COMPLAINTLISTS:
      return { ...state, complaintLists: payload, loadingStatus: true }
    default:
      return state
  }
}
