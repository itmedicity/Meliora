import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_LEVEL4 } = ActionTyps

const Escalationlvl4 = {
  lvl4scalation: [],
  loadingStatus: false,
}
export const getescalationlvl4 = (state = Escalationlvl4, { type, payload }) => {
  switch (type) {
    case FETCH_ESCALATION_LEVEL4:
      return { ...state, lvl4scalation: payload, loadingStatus: true }
    default:
      return state
  }
}
