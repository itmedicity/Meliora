import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ASSIGNEDLIST } = ActionTyps

export const getAssignedComplaintLists = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/complaintassign/user/${id}`);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ASSIGNEDLIST, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_ASSIGNEDLIST, payload: [], loadingStatus: false })
    }

}