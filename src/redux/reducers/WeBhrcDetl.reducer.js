import { ActionTyps } from '../constants/action.type'
const { FETCH_BHRC_DETAIL } = ActionTyps

const WeBhrcDetl = {
  WeBhrcList: [],
  loadingStatus: false
}

export const getWeBhrcDetl = (state = WeBhrcDetl, { type, payload }) => {
  switch (type) {
    case FETCH_BHRC_DETAIL:
      return { ...state, WeBhrcList: payload, loadingStatus: true }
    default:
      return state
  }
}
