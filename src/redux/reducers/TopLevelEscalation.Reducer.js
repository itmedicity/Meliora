import { ActionTyps } from '../constants/action.type'
const { FETCH_ESCALATION_TOPLEVEL } = ActionTyps

const Escalationtoplvl = {
  toplvlscalation: [],
  loadingStatus: false,
}
export const getescalationtoplvl = (state = Escalationtoplvl, { type, payload }) => {
  switch (type) {
    case FETCH_ESCALATION_TOPLEVEL:
      return { ...state, toplvlscalation: payload, loadingStatus: true }
    default:
      return state
  }
}
