import { ActionTyps } from '../constants/action.type'
const { FETCH_AREA_WISE_REPORT } = ActionTyps

const AreaWise = {
  AreaWiseList: [],
  loadingStatus: false,
}

export const getAreaWiseList = (state = AreaWise, { type, payload }) => {
  switch (type) {
    case FETCH_AREA_WISE_REPORT:
      return { ...state, AreaWiseList: payload, loadingStatus: true }
    default:
      return state
  }
}
