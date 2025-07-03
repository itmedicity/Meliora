import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_MAPPING_TOPLVL_IT } = ActionTyps
//Intial state
const escalationmappingToplvlIt = {
  escalationMappingToplvlIt: [],
  loadingStatus: false,
}
/*** Escalation action type check then payload set to the state and loading status set as true */
export const getEscalationMappingToplvlIt = (
  state = escalationmappingToplvlIt,
  { type, payload }
) => {
  switch (type) {
    case FETCH_ESCALATION_MAPPING_TOPLVL_IT:
      return { ...state, escalationMappingToplvlIt: payload, loadingStatus: true }
    default:
      return state
  }
}
