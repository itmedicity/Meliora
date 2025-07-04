import { ActionTyps } from '../constants/action.type'
const { FETCH_LEVEL1_IT_ESCLATION, FETCH_LEVEL1_MAINTENANCE_ESCLATION } = ActionTyps

const Escalation = {
  Itescalation: [],
  Maintenanceescalation: []
}

export const getEscalation = (state = Escalation, { type, payload }) => {
  switch (type) {
    case FETCH_LEVEL1_IT_ESCLATION:
      return { ...state, Itescalation: payload }
    case FETCH_LEVEL1_MAINTENANCE_ESCLATION:
      return { ...state, Maintenanceescalation: payload }
    default:
      return state
  }
}
