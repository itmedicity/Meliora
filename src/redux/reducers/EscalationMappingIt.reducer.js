import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_MAPPINGIT } = ActionTyps
//Intial state
const escalationmappingIt = {
  escalationMappingIt: [],
  loadingStatus: false
}
/*** Escalation action type check then payload set to the state and loading status set as true */
export const getEscalationMappingIt = (state = escalationmappingIt, { type, payload }) => {
  switch (type) {
    case FETCH_ESCALATION_MAPPINGIT:
      return { ...state, escalationMappingIt: payload, loadingStatus: true }
    default:
      return state
  }
}
