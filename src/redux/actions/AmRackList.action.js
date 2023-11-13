import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_AM_RACK } = ActionTyps


export const getRackList = () => async (dispatch) => {
    const result = await axioslogin.get('/amSelectComponent/rackselect');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_AM_RACK, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_AM_RACK, payload: [], loadingStatus: false })
    }
}