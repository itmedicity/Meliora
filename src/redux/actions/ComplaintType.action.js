import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_COMPLAINT_TYPE } = ActionTyps
/*** when call dispatch function call aa api 
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */

export const getComplainttype = (comdept) => async (dispatch) => {
    const result = await axioslogin.get(`/complainttype/${comdept}`);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_COMPLAINT_TYPE, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_COMPLAINT_TYPE, payload: [], loadingStatus: false })
    }
}