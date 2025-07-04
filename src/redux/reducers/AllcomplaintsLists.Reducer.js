import { ActionTyps } from '../constants/action.type'
const { FETCH_ALLCOMPLAINTS } = ActionTyps
//intial state
const allcmp = {
  allcmpLists: [],
  loadingStatus: false
}
export const getAllComplaintLists = (state = allcmp, { type, payload }) => {
  switch (type) {
    case FETCH_ALLCOMPLAINTS:
      return { ...state, allcmpLists: payload, loadingStatus: true }
    default:
      return state
  }
}
