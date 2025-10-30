import { ActionTyps } from '../constants/action.type'
const { FETCH_IT_MANAGEMENT_SIM_TYPE } = ActionTyps
//initial state

const SimType = {
  SimTypeList: [],
  loadingStatus: false
}

export const getSimType = (state = SimType, { type, payload }) => {
  switch (type) {
    case FETCH_IT_MANAGEMENT_SIM_TYPE:
      return { ...state, SimTypeList: payload, loadingStatus: true }
    default:
      return state
  }
}
