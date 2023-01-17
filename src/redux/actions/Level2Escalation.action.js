import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ESCALATION_LEVEL2 } = ActionTyps

export const getescalationlvl2 = (timeescalationData) => async (dispatch) => {
    const result = await axioslogin.post(`/timeescalation2/level2`, timeescalationData);
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_ESCALATION_LEVEL2, payload: data })
    }
    else {
        dispatch({ type: FETCH_ESCALATION_LEVEL2, payload: 0 })
    }
}


