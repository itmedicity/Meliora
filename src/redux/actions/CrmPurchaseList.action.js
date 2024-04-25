import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_CRM_PURCHASE } = ActionTyps


export const getCRMPurchase = () => async (dispatch) => {
    const result = await axioslogin.get('/newCRFPurchase/getAllApprovedForPurchase')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_CRM_PURCHASE, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_CRM_PURCHASE, payload: [], loadingStatus: false })
    }
}