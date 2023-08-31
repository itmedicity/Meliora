import { axioslogin } from "src/views/Axios/Axios";
import { ActionTyps } from "../constants/action.type";
const { FETCH_ASSIGN_TO_RECTIFY_TAT } = ActionTyps
/*** when call dispatch function call aa api 
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getAssignToRectifyList = (postdata) => async (dispatch) => {
    const result = await axioslogin.post(`/getTatReports/AssignToRectify`, postdata);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ASSIGN_TO_RECTIFY_TAT, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_ASSIGN_TO_RECTIFY_TAT, payload: [], loadingStatus: false })
    }
}