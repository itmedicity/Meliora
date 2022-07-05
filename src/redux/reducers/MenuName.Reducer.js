import { ActionTyps } from '../constants/action.type'
const { FETCH_MENU_NAME } = ActionTyps;
//initial state
const menuName = {
    menuNameList: [],
    loadingStatus: false
}
/*** User group action type check then payload set to the state and loading status set as true */
export const setMenuName = (state = menuName, { type, payload }) => {
    switch (type) {
        case FETCH_MENU_NAME:
            return { ...state, menuNameList: payload, loadingStatus: true }
        default:
            return state
    }
}