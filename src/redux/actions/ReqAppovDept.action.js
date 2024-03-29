import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_REQ_APPROV_DEPT } = ActionTyps
/*** when call dispatch function call aa api 
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */

export const getReqApprovDept = (deptsecArry) => async (dispatch) => {
    const result = await axioslogin.post('/requestRegister/getDeptApprovList', deptsecArry)
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_REQ_APPROV_DEPT, payload: data, loadingStatus: true })
    }
    else {
        dispatch({
            type: FETCH_REQ_APPROV_DEPT, payload: [], loadingStatus: false
        })
    }

}