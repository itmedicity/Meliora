import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_BHRC_DETAIL } = ActionTyps

export const getTotalBhrcList = () => async (dispatch) => {
    const result = await axioslogin.get(`/WeWork/get/bhrcList`);
    const { success, data } = result.data
    if (success === 1) {

        dispatch({ type: FETCH_BHRC_DETAIL, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BHRC_DETAIL, payload: [], loadingStatus: false })
    }

}
