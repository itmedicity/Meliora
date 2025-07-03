import { ActionTyps } from '../constants/action.type'
const { FETCH_CRM_OTHERS } = ActionTyps
//intial state
const CRMOthers = {
  setCRMOthersList: [],
  loadingStatus: false,
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setCRMOthers = (state = CRMOthers, { type, payload }) => {
  switch (type) {
    case FETCH_CRM_OTHERS:
      return { ...state, setCRMOthersList: payload, loadingStatus: true }
    default:
      return state
  }
}
