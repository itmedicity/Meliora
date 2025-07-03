import { ActionTyps } from '../constants/action.type'
const { FETCH_REQ_OTHER_DEPT } = ActionTyps
//intial state
const ReqApprovOthers = {
  ReqApprovOthersList: [],
  loadingStatus: false,
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setReqApprovOthers = (state = ReqApprovOthers, { type, payload }) => {
  switch (type) {
    case FETCH_REQ_OTHER_DEPT:
      return { ...state, ReqApprovOthersList: payload, loadingStatus: true }
    default:
      return state
  }
}
