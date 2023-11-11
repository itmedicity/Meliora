import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_PASSWORD_CREDENTIAL } = ActionTyps


export const getPasswordCredential = () => async (dispatch) => {
    const result = await axioslogin.get('/itSelectcomponent/passwordCredential');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_PASSWORD_CREDENTIAL, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_PASSWORD_CREDENTIAL, payload: [], loadingStatus: false })
    }
}