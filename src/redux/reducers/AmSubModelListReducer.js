import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_SUBMODEL } = ActionTyps
//intial state
const Submodel = {
  SubmodelList: [],
  loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getSubmodel = (state = Submodel, { type, payload }) => {
  switch (type) {
    case FETCH_ASSET_SUBMODEL:
      return { ...state, SubmodelList: payload, loadingStatus: true }
    default:
      return state
  }
}
