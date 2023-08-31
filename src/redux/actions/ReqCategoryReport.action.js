import { axioslogin } from "src/views/Axios/Axios";
import { ActionTyps } from "../constants/action.type";
const { FETCH_COM_CATEGORY_REPORT } = ActionTyps
/*** when call dispatch function call aa api 
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getReqCategoryReportList = (postdata) => async (dispatch) => {
    const result = await axioslogin.post(`/getTatReports/ReqComCategorty`, postdata);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_COM_CATEGORY_REPORT, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_COM_CATEGORY_REPORT, payload: [], loadingStatus: false })
    }
}