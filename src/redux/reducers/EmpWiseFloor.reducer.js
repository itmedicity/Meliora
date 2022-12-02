import { ActionTyps } from '../constants/action.type'
const { FETCH_FLOOR_EMP } = ActionTyps;
//intial state
const EmpWiseFloor = {
    EmpWiseFloorList: [],
    loadingStatus: false
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const getEmpfloor = (state = EmpWiseFloor, { type, payload }) => {
    switch (type) {
        case FETCH_FLOOR_EMP:
            return { ...state, EmpWiseFloorList: payload, loadingStatus: true }
        default:
            return state
    }
}