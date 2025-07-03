import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_LEVEL2 } = ActionTyps

const Escalationlvl2 = {
  lvl2scalation: [],
  loadingStatus: false,
}
export const getEscalationlvl2 = (state = Escalationlvl2, { type, payload }) => {
  switch (type) {
    case FETCH_ESCALATION_LEVEL2:
      return { ...state, lvl2scalation: payload, loadingStatus: true }
    default:
      return state
  }
}
