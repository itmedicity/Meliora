import { ActionTyps } from '../constants/action.type'
const { FETCH_TOTAL_INPATIENT } = ActionTyps;
//intial state
const TotalInPateint = {
    InPateintList: [],
    loadingStatus: false
}
/*** Diet action type check then payload set to the state and loading status set as true */
export const setTotalInPateint = (state = TotalInPateint, { type, payload }) => {
    switch (type) {
        case FETCH_TOTAL_INPATIENT:
            return { ...state, InPateintList: payload, loadingStatus: true }
        default:
            return state
    }

}