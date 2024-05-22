import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_SUPPLIER_SELECT } = ActionTyps
/*** when call dispatch function call aa api 
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getSupplierList = () => async (dispatch) => {
    const result = await axioslogin.get('/ItemMapDetails/GetSupplierSelect')
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_SUPPLIER_SELECT, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_SUPPLIER_SELECT, payload: [], loadingStatus: false })
    }

}