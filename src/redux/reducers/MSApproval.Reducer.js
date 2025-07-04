import { ActionTyps } from '../constants/action.type'
const { FETCH_MS_APPROVE_LIST } = ActionTyps
//intial state
const ReqApprovMS = {
  ReqApprovMSList: [],
  loadingStatus: false
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setReqApprovMS = (state = ReqApprovMS, { type, payload }) => {
  switch (type) {
    case FETCH_MS_APPROVE_LIST:
      return { ...state, ReqApprovMSList: payload, loadingStatus: true }
    default:
      return state
  }
}
