import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_COMPLAINTLISTS } = ActionTyps

export const getComplaintLists = (em_department) => async (dispatch) => {
    const result = await axioslogin.get(`/complaintassign/${em_department}`);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_COMPLAINTLISTS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_COMPLAINTLISTS, payload: [], loadingStatus: false })
    }

}