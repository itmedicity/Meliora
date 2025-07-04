import { ActionTyps } from '../constants/action.type'
const { FETCH_SUBMODULE_GROUP } = ActionTyps
//initial state
const subModuleGroup = {
  subModuleGroupList: [],
  loadingStatus: false
}
/*** Sub module group action type check then payload set to the state and loading status set as true */
export const getSubModuleGroup = (state = subModuleGroup, { type, payload }) => {
  switch (type) {
    case FETCH_SUBMODULE_GROUP:
      return { ...state, subModuleGroupList: payload, loadingStatus: true }
    default:
      return state
  }
}
