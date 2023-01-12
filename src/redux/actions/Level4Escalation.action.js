import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ESCALATION_LEVEL4 } = ActionTyps

export const getescalationlvl4 = (timeescalationData) => async (dispatch) => {
    const result = await axioslogin.post(`/timeescalation4/level4`, timeescalationData);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ESCALATION_LEVEL4, payload: data })
    }
    else {
        dispatch({ type: FETCH_ESCALATION_LEVEL4, payload: 0 })
    }
}
