import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_OUTLET_ORA } = ActionTyps
/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
/*** Outlet action type check then payload set to the state and loading status set as true */
export const getOutlet = () => async (dispatch) => {
    const result = await axioslogin.get('/deptsecmaster/outlet');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_OUTLET_ORA, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_OUTLET_ORA, payload: [], loadingStatus: false })
    }
}