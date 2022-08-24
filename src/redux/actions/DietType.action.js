import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_DIET_TYPE } = ActionTyps
/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
/*** Diettype action type check then payload set to the state and loading status set as true */
export const getDiettype = () => async (dispatch) => {
    const result = await axioslogin.get('/ratelist/diettype');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_DIET_TYPE, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_DIET_TYPE, payload: [], loadingStatus: false })
    }
}