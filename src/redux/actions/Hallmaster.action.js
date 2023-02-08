import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_HALL_NAME } = ActionTyps
/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getHallname = () => async (dispatch) => {
    const result = await axioslogin.get('/hallBooking/hallname');
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_HALL_NAME, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_HALL_NAME, payload: [], loadingStatus: false })
    }
}