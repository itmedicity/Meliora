import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ADMIT_BHRC } = ActionTyps

export const getTotalbhrcAdmitList = () => async (dispatch) => {
    const result = await axioslogin.get(`/WeWork/bhrc/admit`);
    const { success, data } = result.data
    if (success === 1) {

        dispatch({ type: FETCH_ADMIT_BHRC, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_ADMIT_BHRC, payload: [], loadingStatus: false })
    }

}