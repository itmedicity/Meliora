import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_BHRC_PATIENT } = ActionTyps

export const getTotalbhrcPatientList = () => async (dispatch) => {
    const result = await axioslogin.get(`/WeWork/getbhrcPat/bhrc`);
    const { success, data } = result.data
    if (success === 1) {

        dispatch({ type: FETCH_BHRC_PATIENT, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BHRC_PATIENT, payload: [], loadingStatus: false })
    }

}