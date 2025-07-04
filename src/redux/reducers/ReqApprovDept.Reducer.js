import { ActionTyps } from '../constants/action.type'
const { FETCH_REQ_APPROV_DEPT } = ActionTyps
//intial state
const ReqApprvDept = {
  ReqApprvDeptdata: [],
  loadingStatus: false
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const setReqApprvDept = (state = ReqApprvDept, { type, payload }) => {
  switch (type) {
    case FETCH_REQ_APPROV_DEPT:
      return { ...state, ReqApprvDeptdata: payload, loadingStatus: true }
    default:
      return state
  }
}
