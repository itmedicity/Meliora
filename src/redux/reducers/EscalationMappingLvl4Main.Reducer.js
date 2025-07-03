import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_MAPPING_LVL4_MAINTENANCE } = ActionTyps
//Intial state
const escalationmappingLvl4lMain = {
  escalationMappingLvl4Main: [],
  loadingStatus: false,
}
/*** Escalation action type check then payload set to the state and loading status set as true */
export const getEscalationMappingLvl4Main = (
  state = escalationmappingLvl4lMain,
  { type, payload }
) => {
  switch (type) {
    case FETCH_ESCALATION_MAPPING_LVL4_MAINTENANCE:
      return { ...state, escalationMappingLvl4Main: payload, loadingStatus: true }
    default:
      return state
  }
}
