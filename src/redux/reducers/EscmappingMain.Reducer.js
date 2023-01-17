import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_MAPPINGMAINTENEANCE } = ActionTyps

//Intial state
const escalationmappingmaintenance = {
    escalationMappingmain: [],
    loadingStatus: false
}
/*** Escalation action type check then payload set to the state and loading status set as true */
export const getEscalationMappingmaintenenace = (state = escalationmappingmaintenance, { type, payload }) => {
    switch (type) {
        case FETCH_ESCALATION_MAPPINGMAINTENEANCE:
            return { ...state, escalationMappingmain: payload, loadingStatus: true }
        default:
            return state
    }
}
