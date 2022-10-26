import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_COMPLAINTRIGHTS_DASHBOARD } = ActionTyps

export const getComplaintRights = (id) => async (dispatch) => {
    const result = await axioslogin.get(`common/dashrights/${id}`);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_COMPLAINTRIGHTS_DASHBOARD, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_COMPLAINTRIGHTS_DASHBOARD, payload: [], loadingStatus: false })
    }

}