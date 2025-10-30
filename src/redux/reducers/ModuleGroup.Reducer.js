import { ActionTyps } from '../constants/action.type'
const { FETCH_MODULEGROUP_LIST } = ActionTyps
//initial state
const moduleGroup = {
  moduleGroupSelect: [],
  loadingStatus: false
}
/*** User group action type check then payload set to the state and loading status set as true */
export const getModuleGroup = (state = moduleGroup, { type, payload }) => {
  switch (type) {
    case FETCH_MODULEGROUP_LIST:
      return { ...state, moduleGroupSelect: payload, loadingStatus: true }
    default:
      return state
  }
}
