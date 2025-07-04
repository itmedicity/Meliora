import { ActionTyps } from '../constants/action.type'
const { FETCH_CRFCLINICAL_DASHPENDING } = ActionTyps
//intial state
const ClinicalCrfPending = {
  ClinicalCrfPendingList: [],
  loadingStatus: false
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setClinicalCrfPending = (state = ClinicalCrfPending, { type, payload }) => {
  switch (type) {
    case FETCH_CRFCLINICAL_DASHPENDING:
      return { ...state, ClinicalCrfPendingList: payload, loadingStatus: true }
    default:
      return state
  }
}
