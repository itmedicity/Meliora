import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_GROUP } = ActionTyps
//intial state
const AssetGroup = {
  AssetGroupList: [],
  loadingStatus: false,
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getGroup = (state = AssetGroup, { type, payload }) => {
  switch (type) {
    case FETCH_ASSET_GROUP:
      return { ...state, AssetGroupList: payload, loadingStatus: true }
    default:
      return state
  }
}
