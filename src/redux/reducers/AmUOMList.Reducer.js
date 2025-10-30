import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_UOM } = ActionTyps
//intial state
const unitOfMeasurement = {
  uomList: [],
  loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getUOM = (state = unitOfMeasurement, { type, payload }) => {
  switch (type) {
    case FETCH_ASSET_UOM:
      return { ...state, uomList: payload, loadingStatus: true }
    default:
      return state
  }
}
