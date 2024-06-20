import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_MULT_DEPT_SECTION } = ActionTyps
/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */

export const getDeptSections = (dept) => async (dispatch) => {
    const result = await axioslogin.post('/TmDropDowns/getMultDepSection', dept)
    const { success, data } = result.data

    if (success === 2) {
        dispatch({ type: FETCH_MULT_DEPT_SECTION, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_MULT_DEPT_SECTION, payload: [], loadingStatus: false })
    }
}