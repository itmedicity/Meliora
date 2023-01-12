import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ESCALATION_TOPLEVEL } = ActionTyps

export const getescalationtoplvl = (timeescalationData) => async (dispatch) => {
    const result = await axioslogin.post(`/timeescalationtoplvl/toplevel`, timeescalationData);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ESCALATION_TOPLEVEL, payload: data })
    }
    else {
        dispatch({ type: FETCH_ESCALATION_TOPLEVEL, payload: 0 })
    }
}