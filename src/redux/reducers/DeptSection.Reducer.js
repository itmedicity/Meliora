import { ActionTyps } from '../constants/action.type'
const { FETCH_DEPARTMENT_SECTION } = ActionTyps;
//intial state
const deptSection = {
    deptsectionList: [],
    loadingStatus: false
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const getDeptsection = (state = deptSection, { type, payload }) => {
    switch (type) {
        case FETCH_DEPARTMENT_SECTION:
            return { ...state, deptsectionList: payload, loadingStatus: true }
        default:
            return state
    }
}