import { ActionTyps } from '../constants/action.type'
const { FETCH_CRM_INCHHOD } = ActionTyps
//intial state
const CRMInchargeHod = {
  setCRMInchargeHodList: [],
  loadingStatus: false
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setCRMInchargeHod = (state = CRMInchargeHod, { type, payload }) => {
  switch (type) {
    case FETCH_CRM_INCHHOD:
      return { ...state, setCRMInchargeHodList: payload, loadingStatus: true }
    default:
      return state
  }
}
