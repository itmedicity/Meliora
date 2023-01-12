import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_MAPPING_LVL2_IT } = ActionTyps
//Intial state
const escalationmappingLvl2vlIt = {
    escalationMappingLvl2It: [],
    loadingStatus: false
}
/*** Escalation action type check then payload set to the state and loading status set as true */
export const getEscalationMappingLvl2It = (state = escalationmappingLvl2vlIt, { type, payload }) => {
    switch (type) {
        case FETCH_ESCALATION_MAPPING_LVL2_IT:
            return { ...state, escalationMappingLvl2It: payload, loadingStatus: true }
        default:
            return state
    }
}