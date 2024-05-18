import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const {
    FETCH_COMPLAINT_LIST_ALL
} = ActionTyps

export const getTotalcomplaintsall = () => async (dispatch) => {
    const result = await axioslogin.get('/complaintreg/compalint/all');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_COMPLAINT_LIST_ALL, payload: data, status: false })
    }
    else {
        dispatch({ type: FETCH_COMPLAINT_LIST_ALL, payload: [], status: false })
    }
}