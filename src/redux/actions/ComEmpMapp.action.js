import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_COM_EMP_MAP } = ActionTyps
/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
/*** Diet action type check then payload set to the state and loading status set as true */
export const getComEmpMap = () => async (dispatch) => {
    const result = await axioslogin.get(`/comempmapping/getSelectBox`)
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_COM_EMP_MAP, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_COM_EMP_MAP, payload: [], loadingStatus: false })
    }
}