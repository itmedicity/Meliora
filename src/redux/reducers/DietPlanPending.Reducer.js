import { ActionTyps } from '../constants/action.type'
const { FETCH_DIETPLAN_PENDING_LIST } = ActionTyps;
//intial state
const DietPlanPending = {
    planPendingList: [],
    loadingStatus: false
}
/*** Diet action type check then payload set to the state and loading status set as true */
export const setDietPlanPending = (state = DietPlanPending, { type, payload }) => {
    switch (type) {
        case FETCH_DIETPLAN_PENDING_LIST:
            return { ...state, planPendingList: payload, loadingStatus: true }
        default:
            return state
    }

}