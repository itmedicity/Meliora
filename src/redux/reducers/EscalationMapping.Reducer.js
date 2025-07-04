import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_MAPPING } = ActionTyps
//Intial state
const escalationmapping = {
  escalationMapping: [],
  loadingStatus: false
}
/*** Escalation action type check then payload set to the state and loading status set as true */
export const getEscalationMapping = (state = escalationmapping, { type, payload }) => {
  switch (type) {
    case FETCH_ESCALATION_MAPPING:
      return { ...state, escalationMapping: payload, loadingStatus: true }
    default:
      return state
  }
}
