import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_DEPARTMENT_SECTION } = ActionTyps
/*** when call dispatch function call aa api 
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */

export const getDeptsection = () => async (dispatch) => {
    const result = await axioslogin.get('/deptsecmaster/status');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_DEPARTMENT_SECTION, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_DEPARTMENT_SECTION, payload: [], loadingStatus: false })
    }
}