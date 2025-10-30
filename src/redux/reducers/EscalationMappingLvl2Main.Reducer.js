import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_MAPPING_LVL2_MAINTENANCE } = ActionTyps
//Intial state
const escalationmappingLvl2vlItmain = {
  escalationMappingLvl2Main: [],
  loadingStatus: false
}
/*** Escalation action type check then payload set to the state and loading status set as true */
export const getEscalationMappingLvl2Main = (state = escalationmappingLvl2vlItmain, { type, payload }) => {
  switch (type) {
    case FETCH_ESCALATION_MAPPING_LVL2_MAINTENANCE:
      return { ...state, escalationMappingLvl2Main: payload, loadingStatus: true }
    default:
      return state
  }
}
