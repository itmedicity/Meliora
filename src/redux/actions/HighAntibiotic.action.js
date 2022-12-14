import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_HIGHBIOTIC_DETL } = ActionTyps

export const getHighAntibiotic = () => async (dispatch) => {
    const result = await axioslogin.get(`/highBioticMast/getbio`);
    const { success, data } = result.data
    if (success === 1) {

        dispatch({ type: FETCH_HIGHBIOTIC_DETL, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_HIGHBIOTIC_DETL, payload: [], loadingStatus: false })
    }

}