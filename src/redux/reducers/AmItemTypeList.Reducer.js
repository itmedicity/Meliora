import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_ITEM_TYPE } = ActionTyps
//intial state
const ItemType = {
  ItemTypeList: [],
  loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getAmItemType = (state = ItemType, { type, payload }) => {
  switch (type) {
    case FETCH_ASSET_ITEM_TYPE:
      return { ...state, ItemTypeList: payload, loadingStatus: true }
    default:
      return state
  }
}
