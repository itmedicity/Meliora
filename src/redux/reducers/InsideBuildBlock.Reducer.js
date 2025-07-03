import { ActionTyps } from '../constants/action.type'
const { FETCH_INSIDE_BUILDING_BLOCK_SELECT } = ActionTyps
//initial state
const insideBuildBlock = {
  insideBuildList: [],
  loadingStatus: false,
}
/*** Department action type check then payload set to the state and loading status set as true */
export const getInsideBuildingBlock = (state = insideBuildBlock, { type, payload }) => {
  switch (type) {
    case FETCH_INSIDE_BUILDING_BLOCK_SELECT:
      return { ...state, insideBuildList: payload, loadingStatus: true }
    default:
      return state
  }
}
