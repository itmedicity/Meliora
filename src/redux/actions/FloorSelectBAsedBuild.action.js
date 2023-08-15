import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_FLOOR_BASED_BUILD } = ActionTyps
/*** when call dispatch function call aa api 
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getFloorBasedOnBuild = (build) => async (dispatch) => {
    const result = await axioslogin.get(`/selectComponent/getFloorBasedOnBuild/${build}`)
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_FLOOR_BASED_BUILD, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_FLOOR_BASED_BUILD, payload: [], loadingStatus: false })
    }

}