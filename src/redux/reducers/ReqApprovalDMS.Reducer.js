import { ActionTyps } from '../constants/action.type'
const { FETCH_DMSAPPROVAL } = ActionTyps
//intial state
const ReqApprovDMS = {
  ReqApprovDMSList: [],
  loadingStatus: false
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setReqApprovDMS = (state = ReqApprovDMS, { type, payload }) => {
  switch (type) {
    case FETCH_DMSAPPROVAL:
      return { ...state, ReqApprovDMSList: payload, loadingStatus: true }
    default:
      return state
  }
}
