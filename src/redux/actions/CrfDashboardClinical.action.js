import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_CRFCLINICAL_DASHPENDING } = ActionTyps


export const getClinicalCrfPending = () => async (dispatch) => {
    const result = await axioslogin.get('/crfDashBoard/getDashClinicalCRF');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_CRFCLINICAL_DASHPENDING, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_CRFCLINICAL_DASHPENDING, payload: [], loadingStatus: false })
    }
}