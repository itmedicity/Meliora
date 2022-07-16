import { ActionTyps } from '../constants/action.type'
const { FETCH_MODULE_NAME_LIST } = ActionTyps;
//initial state
const moduleName = {
    moduleNameSelect: [],
    loadingStatus: false
}
/*** User group action type check then payload set to the state and loading status set as true */
export const getModuleName = (state = moduleName, { type, payload }) => {

    switch (type) {
        case FETCH_MODULE_NAME_LIST:
            return { ...state, moduleNameSelect: payload, loadingStatus: true }
        default:
            return state

    }

}
