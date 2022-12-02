import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_TOT_WRWRKADMISSION } = ActionTyps

export const getTotalWeworkAdmission = () => async (dispatch) => {
    const result = await axioslogin.get(`/WeWork/total/admission`);
    const { success, data } = result.data
    if (success === 1) {

        dispatch({ type: FETCH_TOT_WRWRKADMISSION, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_TOT_WRWRKADMISSION, payload: [], loadingStatus: false })
    }

}
