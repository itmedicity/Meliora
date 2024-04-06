import { ActionTyps } from '../constants/action.type'
const { FETCH_CRM_DASHBOARD } = ActionTyps;
//intial state
const CRMDashboard = {
    setCRMDashboardList: [],
    loadingStatus: false
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setCRMDashBoard = (state = CRMDashboard, { type, payload }) => {
    switch (type) {
        case FETCH_CRM_DASHBOARD:
            return { ...state, setCRMDashboardList: payload, loadingStatus: true }
        default:
            return state
    }

}