import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ONESHEET_DETL } = ActionTyps

export const getNoshifingList = () => async (dispatch) => {
    const result = await axioslogin.get(`/WeWork/noshift/detl`);
    const { success, data } = result.data
    if (success === 1) {

        dispatch({ type: FETCH_ONESHEET_DETL, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_ONESHEET_DETL, payload: [], loadingStatus: false })
    }

}