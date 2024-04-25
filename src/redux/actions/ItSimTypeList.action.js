import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_IT_MANAGEMENT_SIM_TYPE } = ActionTyps
/*** when call dispatch function call aa api 
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getSimType = () => async (dispatch) => {
    const result = await axioslogin.get('/ItSimType/simType');
    const { success, data } = result.data

    if (success === 1) {
        dispatch({ type: FETCH_IT_MANAGEMENT_SIM_TYPE, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_IT_MANAGEMENT_SIM_TYPE, payload: [], loadingStatus: false })
    }
}