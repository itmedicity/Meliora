import { ActionTyps } from '../constants/action.type'
const { FETCH_TOTAL_COMPLAINT_ALL, FETCH_PENDING_ONHOLD_COMPLAINT_ALL } = ActionTyps

const complaints = {
  complaintList: [],
  loadingStatus: false
}

const pendingOnhold = {
  pendingOnholdList: [],
  pendingOnholdStatus: false
}

export const setComplaintListAll = (state = complaints, { type, payload }) => {
  switch (type) {
    case FETCH_TOTAL_COMPLAINT_ALL:
      return { ...state, complaintList: payload, loadingStatus: true }
    default:
      return state
  }
}

export const setPendOnholdCompListAll = (state = pendingOnhold, { type, payload }) => {
  switch (type) {
    case FETCH_PENDING_ONHOLD_COMPLAINT_ALL:
      return { ...state, pendingOnholdList: payload, pendingOnholdStatus: true }
    default:
      return state
  }
}
