import { axioslogin } from "src/views/Axios/Axios";
import { ActionTyps } from "../constants/action.type";
const { FETCH_TAT_PERCOMP_ASSIGNEE } = ActionTyps
/*** when call dispatch function call aa api 
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getAssignToRectifyList = (postdata) => async (dispatch) => {
    const result = await axioslogin.post(`/getTatReports/AssignToRectify`, postdata);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_TAT_PERCOMP_ASSIGNEE, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_TAT_PERCOMP_ASSIGNEE, payload: [], loadingStatus: false })
    }
}