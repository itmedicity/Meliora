import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_MODEL } = ActionTyps
//intial state
const model = {
  modelList: [],
  loadingStatus: false,
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getAmModel = (state = model, { type, payload }) => {
  switch (type) {
    case FETCH_ASSET_MODEL:
      return { ...state, modelList: payload, loadingStatus: true }
    default:
      return state
  }
}
