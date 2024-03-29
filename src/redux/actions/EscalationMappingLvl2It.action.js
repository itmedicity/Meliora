import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ESCALATION_MAPPING_LVL2_IT } = ActionTyps

/*** when call dispatch function call aa api 
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getEscalationMappingLvl2It = (postdata2) => async (dispatch) => {
    const result = await axioslogin.post(`/timeescalation2/level2countit`, postdata2);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ESCALATION_MAPPING_LVL2_IT, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_ESCALATION_MAPPING_LVL2_IT, payload: [], loadingStatus: false })
    }

}