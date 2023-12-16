import { ActionTyps } from '../constants/action.type'
const { FETCH_NDRFCLINICAL_DASHPENDING } = ActionTyps;
//intial state
const ClinicalNDRFPending = {
    ClinicalNDRFPendingList: [],
    loadingStatus: false
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setClinicalNDRFPending = (state = ClinicalNDRFPending, { type, payload }) => {
    switch (type) {
        case FETCH_NDRFCLINICAL_DASHPENDING:
            return { ...state, ClinicalNDRFPendingList: payload, loadingStatus: true }
        default:
            return state
    }

}