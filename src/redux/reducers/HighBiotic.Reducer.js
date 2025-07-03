import { ActionTyps } from '../constants/action.type'
const { FETCH_HIGHBIOTIC_DETL } = ActionTyps

const HighAntiBiotic = {
  AntibioticList: [],
  loadingStatus: false,
}

export const getHighAntibioticdetl = (state = HighAntiBiotic, { type, payload }) => {
  switch (type) {
    case FETCH_HIGHBIOTIC_DETL:
      return { ...state, AntibioticList: payload, loadingStatus: true }
    default:
      return state
  }
}
