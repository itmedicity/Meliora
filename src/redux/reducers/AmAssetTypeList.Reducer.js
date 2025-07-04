import { ActionTyps } from '../constants/action.type'
const { FETCH_AM_ASSET_TYPE } = ActionTyps
//intial state
const AssetType = {
  AssetTypeList: [],
  loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getAmAssetType = (state = AssetType, { type, payload }) => {
  switch (type) {
    case FETCH_AM_ASSET_TYPE:
      return { ...state, AssetTypeList: payload, loadingStatus: true }
    default:
      return state
  }
}
