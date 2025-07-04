import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_MAPPING_LVL3_IT } = ActionTyps
//Intial state
const escalationmappingLvl3lIt = {
  escalationMappingLvl3It: [],
  loadingStatus: false
}
/*** Escalation action type check then payload set to the state and loading status set as true */
export const getEscalationMappingLvl3It = (state = escalationmappingLvl3lIt, { type, payload }) => {
  switch (type) {
    case FETCH_ESCALATION_MAPPING_LVL3_IT:
      return { ...state, escalationMappingLvl3It: payload, loadingStatus: true }
    default:
      return state
  }
}
