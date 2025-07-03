import { ActionTyps } from '../constants/action.type'
const { FETCH_CRM_PURCHASE } = ActionTyps
//intial state
const CRMPurchase = {
  setCRMPurchaseList: [],
  loadingStatus: false,
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setCRMPurchase = (state = CRMPurchase, { type, payload }) => {
  switch (type) {
    case FETCH_CRM_PURCHASE:
      return { ...state, setCRMPurchaseList: payload, loadingStatus: true }
    default:
      return state
  }
}
