import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_MAPPING_TOPLVL_MAINTENANCE } = ActionTyps

//Intial state
const escalationmappingtoplvlmaintenance = {
  escalationMappingToplvlMain: [],
  loadingStatus: false
}
/*** Escalation action type check then payload set to the state and loading status set as true */
export const getEscalationMappingToplvlmaintenenace = (
  state = escalationmappingtoplvlmaintenance,
  { type, payload }
) => {
  switch (type) {
    case FETCH_ESCALATION_MAPPING_TOPLVL_MAINTENANCE:
      return { ...state, escalationMappingToplvlMain: payload, loadingStatus: true }
    default:
      return state
  }
}
