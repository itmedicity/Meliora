import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_CRM_DASHBOARD } = ActionTyps


export const getCRMDashboard = () => async (dispatch) => {
    const result = await axioslogin.get('/newCRFRegister/getAllList/Dashboard');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_CRM_DASHBOARD, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_CRM_DASHBOARD, payload: [], loadingStatus: false })
    }
}