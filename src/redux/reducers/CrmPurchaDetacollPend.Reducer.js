import { ActionTyps } from '../constants/action.type'
const { FETCH_PURCHASE_DATACOLLECT_PENDING } = ActionTyps
//intial state
const CRMPurchDataCollPending = {
  setCRMPurchDataCollPendingList: [],
  loadingStatus: false,
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setCRMPurchDataCollPending = (state = CRMPurchDataCollPending, { type, payload }) => {
  switch (type) {
    case FETCH_PURCHASE_DATACOLLECT_PENDING:
      return { ...state, setCRMPurchDataCollPendingList: payload, loadingStatus: true }
    default:
      return state
  }
}
