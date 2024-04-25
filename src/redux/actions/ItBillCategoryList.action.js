import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from '../constants/action.type'
const { FETCH_IT_MANAGEMENT_BILL_CATEGORY } = ActionTyps

export const getBillCategory = () => async (dispatch) => {
    const result = await axioslogin.get('/ItBillCategory/itBillCategory');
    const { success, data } = result.data

    if (success === 1) {
        dispatch({ type: FETCH_IT_MANAGEMENT_BILL_CATEGORY, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_IT_MANAGEMENT_BILL_CATEGORY, payload: [], loadingStatus: false })
    }
}