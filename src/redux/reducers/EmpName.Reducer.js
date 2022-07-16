import { ActionTyps } from '../constants/action.type'
const { FETCH_EMP_NAME_LIST } = ActionTyps;
//initial state
const employeeName = {
    employeeNameSelect: [],
    loadingStatus: false
}
/*** User group action type check then payload set to the state and loading status set as true */
export const getEmployeeName = (state = employeeName, { type, payload }) => {

    switch (type) {
        case FETCH_EMP_NAME_LIST:
            return { ...state, employeeNameSelect: payload, loadingStatus: true }
        default:
            return state

    }

}