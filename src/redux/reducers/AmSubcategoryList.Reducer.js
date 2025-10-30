import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_SUBCATEGORY } = ActionTyps
//intial state
const Subcategory = {
  SubcategoryList: [],
  loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getAmSubcategory = (state = Subcategory, { type, payload }) => {
  switch (type) {
    case FETCH_ASSET_SUBCATEGORY:
      return { ...state, SubcategoryList: payload, loadingStatus: true }
    default:
      return state
  }
}
