import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type";
const { FETCH_MENU_NAME } = ActionTyps;

export const getmodule = () => async (dispatch) => {
    const result = await axioslogin.get('/menumaster')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_MENU_NAME, payload: data })
    }
}