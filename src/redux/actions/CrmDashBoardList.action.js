import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_CRM_DASHBOARD, FETCH_CRM_PURCHASE_DASHBOARD, FETCH_PO_STORE_DASHBOARD } = ActionTyps


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

export const getCRFPurchaseDashboard = () => async (dispatch) => {
    const result = await axioslogin.get('/newCRFRegister/crfpurchase/Dashboard');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_CRM_PURCHASE_DASHBOARD, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_CRM_PURCHASE_DASHBOARD, payload: [], loadingStatus: false })
    }
}

export const getPOStoreDashboard = () => async (dispatch) => {
    const result = await axioslogin.get('/newCRFRegister/crfStore/Dashboard');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_PO_STORE_DASHBOARD, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_PO_STORE_DASHBOARD, payload: [], loadingStatus: false })
    }
}