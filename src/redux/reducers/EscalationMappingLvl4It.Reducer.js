import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_MAPPING_LVL4_IT } = ActionTyps
//Intial state
const escalationmappingLvl4lIt = {
  escalationMappingLvl4It: [],
  loadingStatus: false,
}
/*** Escalation action type check then payload set to the state and loading status set as true */
export const getEscalationMappingLvl4It = (state = escalationmappingLvl4lIt, { type, payload }) => {
  switch (type) {
    case FETCH_ESCALATION_MAPPING_LVL4_IT:
      return { ...state, escalationMappingLvl4It: payload, loadingStatus: true }
    default:
      return state
  }
}
