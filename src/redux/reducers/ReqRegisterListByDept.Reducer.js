import { ActionTyps } from '../constants/action.type'
const { FETCH_REQ_REGISTERLIST_BYDEPT } = ActionTyps
//intial state
const RequestList = {
  RequestListall: [],
  loadingStatus: false,
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const setRequestListByDeptSec = (state = RequestList, { type, payload }) => {
  switch (type) {
    case FETCH_REQ_REGISTERLIST_BYDEPT:
      return { ...state, RequestListall: payload, loadingStatus: true }
    default:
      return state
  }
}
