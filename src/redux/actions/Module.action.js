import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type";
const { FETCH_MODULE_NAME_LIST } = ActionTyps;

export const getmodule = () => async (dispatch) => {
    const result = await axioslogin.get('/modulemaster')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_MODULE_NAME_LIST, payload: data })
    }
}