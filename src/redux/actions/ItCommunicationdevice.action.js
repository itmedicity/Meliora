import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_COMMUNICATION_DEVICE_TYPE } = ActionTyps


export const getDeviceType = () => async (dispatch) => {
    const result = await axioslogin.get('/itSelectcomponent/communicationDeviceDropDown');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_COMMUNICATION_DEVICE_TYPE, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_COMMUNICATION_DEVICE_TYPE, payload: [], loadingStatus: false })
    }
}