import { ActionTyps } from '../constants/action.type'
const { FETCH_COMPLAINT_LIST_ALL } = ActionTyps

const complaints = {
  complaintList: [],
  loadingStatus: false
}

export const setCompListAllForMenu = (state = complaints, { type, payload }) => {
  switch (type) {
    case FETCH_COMPLAINT_LIST_ALL:
      return { ...state, complaintList: payload, loadingStatus: true }
    default:
      return state
  }
}
