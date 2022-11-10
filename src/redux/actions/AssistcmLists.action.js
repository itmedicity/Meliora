import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ASSISTLIST } = ActionTyps

export const getAssistComplaintLists = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/complaintassign/individual/assist/${id}`);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ASSISTLIST, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_ASSISTLIST, payload: [], loadingStatus: false })
    }

}
