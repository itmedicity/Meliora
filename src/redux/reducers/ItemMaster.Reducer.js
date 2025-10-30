import { ActionTyps } from '../constants/action.type'
const { FETCH_ITEM_MASTER } = ActionTyps
//intial state
const item = {
  itemList: [],
  loadingStatus: false
}
/*** Item action type check then payload set to the state and loading status set as true */
export const getItem = (state = item, { type, payload }) => {
  switch (type) {
    case FETCH_ITEM_MASTER:
      return { ...state, itemList: payload, loadingStatus: true }
    default:
      return state
  }
}
