import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ROOM_DEPTSEC_BASED } = ActionTyps
/*** when call dispatch function call aa api 
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getRoomBasedOnDeptSec = (deptsec) => async (dispatch) => {
    const result = await axioslogin.get(`/amSelectComponent/RoomBasedOnDeptSec/${deptsec}`)
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ROOM_DEPTSEC_BASED, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_ROOM_DEPTSEC_BASED, payload: [], loadingStatus: false })
    }

}