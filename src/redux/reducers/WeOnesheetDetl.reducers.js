import { ActionTyps } from '../constants/action.type'
const { FETCH_ONESHEET_DETL } = ActionTyps

const noshiftdetl = {
  noshiftdetlList: [],
  loadingStatus: false
}

export const getwenoShiftdetl = (state = noshiftdetl, { type, payload }) => {
  switch (type) {
    case FETCH_ONESHEET_DETL:
      return { ...state, noshiftdetlList: payload, loadingStatus: true }
    default:
      return state
  }
}
