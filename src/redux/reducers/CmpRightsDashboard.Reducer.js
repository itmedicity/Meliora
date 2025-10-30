import { ActionTyps } from '../constants/action.type'
const { FETCH_COMPLAINTRIGHTS_DASHBOARD } = ActionTyps
//intial state
const complaintsrights = {
  complaintRightsLists: [],
  loadingStatus: false
}

export const getComplaintRights = (state = complaintsrights, { type, payload }) => {
  switch (type) {
    case FETCH_COMPLAINTRIGHTS_DASHBOARD:
      return { ...state, complaintRightsLists: payload, loadingStatus: true }
    default:
      return state
  }
}
