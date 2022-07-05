import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type";
const { FETCH_USER_GROUP_NAME } = ActionTyps;

export const getUserGroup = () => async (dispatch) => {
    const result = await axioslogin.get('/usergroup')
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_USER_GROUP_NAME, payload: data })
    }
}