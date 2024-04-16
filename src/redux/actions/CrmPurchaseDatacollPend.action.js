import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_PURCHASE_DATACOLLECT_PENDING } = ActionTyps


export const getCRMPurchDataCollPending = () => async (dispatch) => {
    const result = await axioslogin.get('/newCRFPurchase/PurchsDataCollectionPending')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_PURCHASE_DATACOLLECT_PENDING, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_PURCHASE_DATACOLLECT_PENDING, payload: [], loadingStatus: false })
    }
}