import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_LEVEL3 } = ActionTyps

const Escalationlvl3 = {
  lvl3scalation: [],
  loadingStatus: false
}
export const getescalationlvl3 = (state = Escalationlvl3, { type, payload }) => {
  switch (type) {
    case FETCH_ESCALATION_LEVEL3:
      return { ...state, lvl3scalation: payload, loadingStatus: true }
    default:
      return state
  }
}
