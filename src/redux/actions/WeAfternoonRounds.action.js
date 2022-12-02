import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_AFTERNOONROUNDS_LIST } = ActionTyps

export const getAfternoonRoundList = () => async (dispatch) => {
    const result = await axioslogin.get(`/WeWork/get/visit`);
    const { success, data } = result.data
    if (success === 1) {

        dispatch({ type: FETCH_AFTERNOONROUNDS_LIST, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_AFTERNOONROUNDS_LIST, payload: [], loadingStatus: false })
    }

}