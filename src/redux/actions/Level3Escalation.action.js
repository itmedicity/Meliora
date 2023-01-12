import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ESCALATION_LEVEL3 } = ActionTyps

export const getescalationlvl3 = (timeescalationData) => async (dispatch) => {
    const result = await axioslogin.post(`/timeescalation3/level3`, timeescalationData);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_ESCALATION_LEVEL3, payload: data })
    }
    else {
        dispatch({ type: FETCH_ESCALATION_LEVEL3, payload: 0 })
    }
}
