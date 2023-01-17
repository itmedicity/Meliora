import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_MAPPING_LVL3_MAINTENANCE } = ActionTyps
//Intial state
const escalationmappingLvl3main = {
    escalationMappingLvl3Main: [],
    loadingStatus: false
}
/*** Escalation action type check then payload set to the state and loading status set as true */
export const getEscalationMappingLvl3Main = (state = escalationmappingLvl3main, { type, payload }) => {
    switch (type) {
        case FETCH_ESCALATION_MAPPING_LVL3_MAINTENANCE:
            return { ...state, escalationMappingLvl3Main: payload, loadingStatus: true }
        default:
            return state
    }
}