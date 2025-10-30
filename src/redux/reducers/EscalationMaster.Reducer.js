import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_MASTER } = ActionTyps
//Intial state
const escalation = {
  escalationList: [],
  loadingStatus: false
}
/*** Escalation action type check then payload set to the state and loading status set as true */
export const getEscalationMaster = (state = escalation, { type, payload }) => {
  switch (type) {
    case FETCH_ESCALATION_MASTER:
      return { ...state, escalationList: payload, loadingStatus: true }
    default:
      return state
  }
}
