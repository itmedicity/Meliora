import { ActionTyps } from '../constants/action.type'
const { FETCH_NDRFNONCLINICAL_DASHPENDING } = ActionTyps
//intial state
const NonClinicalNDRFPending = {
  NonClinicalNDRFPendingList: [],
  loadingStatus: false
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setNonClinicalNDRFPending = (state = NonClinicalNDRFPending, { type, payload }) => {
  switch (type) {
    case FETCH_NDRFNONCLINICAL_DASHPENDING:
      return { ...state, NonClinicalNDRFPendingList: payload, loadingStatus: true }
    default:
      return state
  }
}
