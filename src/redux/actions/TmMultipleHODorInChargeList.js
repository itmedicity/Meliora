import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_MULT_HOD_INCHARGE } = ActionTyps
/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getMultHodInCharge = (deptSecIds) => async (dispatch) => {

    const result = await axioslogin.post('/TmDropDowns/getMultHodInChargeUnderSection', deptSecIds)

    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_MULT_HOD_INCHARGE, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_MULT_HOD_INCHARGE, payload: [], loadingStatus: false })
    }

}