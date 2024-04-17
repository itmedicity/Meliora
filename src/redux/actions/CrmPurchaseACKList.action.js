import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_PURCHASE_ACK_PEND } = ActionTyps


export const getCRMPurchaseAckPending = () => async (dispatch) => {
    const result = await axioslogin.get('/newCRFPurchase/getPurchaseAckPending')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_PURCHASE_ACK_PEND, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_PURCHASE_ACK_PEND, payload: [], loadingStatus: false })
    }
}