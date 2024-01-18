import { ActionTyps } from '../constants/action.type'
const { FETCH_CRFNONCLINICAL_DASHPENDING } = ActionTyps;
//intial state
const NonClinicalCrfPending = {
    NonClinicalCrfPendingList: [],
    loadingStatus: false
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setNonClinicalCrfPending = (state = NonClinicalCrfPending, { type, payload }) => {
    switch (type) {
        case FETCH_CRFNONCLINICAL_DASHPENDING:
            return { ...state, NonClinicalCrfPendingList: payload, loadingStatus: true }
        default:
            return state
    }

}