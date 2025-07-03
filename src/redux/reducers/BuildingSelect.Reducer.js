import { ActionTyps } from '../constants/action.type'
const { FETCH_BUILDING_SELECT } = ActionTyps

const BuildingName = {
  buildingList: [],
  loadingStatus: false,
}
export const getBuildingdata = (state = BuildingName, { type, payload }) => {
  switch (type) {
    case FETCH_BUILDING_SELECT:
      return { ...state, buildingList: payload, loadingStatus: true }
    default:
      return state
  }
}
