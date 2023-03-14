import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const {
    FETCH_HIC_COMPLAINT_LIST
} = ActionTyps

export const getHiccomplaintsall = () => async (dispatch) => {
    const result = await axioslogin.get('/Hic/compalint/all');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_HIC_COMPLAINT_LIST, payload: data, status: false })
    }
    else {
        dispatch({ type: FETCH_HIC_COMPLAINT_LIST, payload: 0, status: false })
    }
}