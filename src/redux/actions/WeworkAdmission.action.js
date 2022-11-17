import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_TOTAL_ADMISSION } = ActionTyps

export const getTotalAdmission = () => async (dispatch) => {
    const result = await axioslogin.get(`/wewrkdash/admission/count`);
    const { success, data } = result.data
    if (success === 1) {
        const { total_admission } = data[0]
        dispatch({ type: FETCH_TOTAL_ADMISSION, payload: total_admission, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_TOTAL_ADMISSION, payload: [], loadingStatus: false })
    }

}
