import { ActionTyps } from '../constants/action.type'
const { FETCH_BRANCH } = ActionTyps;
//initial state
const branchName = {
    branchList: [],
    loadingStatus: false
}
/*** Branch action type check then payload set to the state and loading status set as true */
export const getBranch = (state = branchName, { type, payload }) => {
    switch (type) {
        case FETCH_BRANCH:
            return { ...state, branchList: payload, loadingStatus: true }
        default:
            return state
    }
}