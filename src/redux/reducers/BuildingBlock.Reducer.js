import { ActionTyps } from '../constants/action.type'
const { FETCH_BUILDING_BLOCK_SELECT } = ActionTyps
//initial state
const buildingBlock = {
  buildingBlockList: [],
  loadingStatus: false,
}
/*** Department action type check then payload set to the state and loading status set as true */
export const getBuildingBlock = (state = buildingBlock, { type, payload }) => {
  switch (type) {
    case FETCH_BUILDING_BLOCK_SELECT:
      return { ...state, buildingBlockList: payload, loadingStatus: true }
    default:
      return state
  }
}
