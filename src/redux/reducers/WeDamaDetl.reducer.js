import { ActionTyps } from '../constants/action.type'
const { FETCH_DAMA_DETAIL } = ActionTyps

const WeDamaDetl = {
  damaList: [],
  loadingStatus: false
}

export const getDamaDetl = (state = WeDamaDetl, { type, payload }) => {
  switch (type) {
    case FETCH_DAMA_DETAIL:
      return { ...state, damaList: payload, loadingStatus: true, count: WeDamaDetl.length }
    default:
      return state
  }
}
