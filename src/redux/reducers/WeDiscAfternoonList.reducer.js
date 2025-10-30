import { ActionTyps } from '../constants/action.type'
const { FETCH_DISCAFTERNOON_LIST } = ActionTyps

const WedischrgeList = {
  DischargeList: [],
  loadingStatus: false
}

export const getDischargeList = (state = WedischrgeList, { type, payload }) => {
  switch (type) {
    case FETCH_DISCAFTERNOON_LIST:
      return { ...state, DischargeList: payload, loadingStatus: true }
    default:
      return state
  }
}
