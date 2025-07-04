import { ActionTyps } from '../constants/action.type'
const { FETCH_ITEM_MASTER_EXTRA } = ActionTyps
//intial state
const itemExtra = {
  itemExtraList: [],
  loadingStatus: false
}
/*** Item action type check then payload set to the state and loading status set as true */
export const setItemExtra = (state = itemExtra, { type, payload }) => {
  switch (type) {
    case FETCH_ITEM_MASTER_EXTRA:
      return { ...state, itemExtraList: payload, loadingStatus: true }
    default:
      return state
  }
}
