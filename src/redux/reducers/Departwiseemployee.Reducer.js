import { ActionTyps } from "../constants/action.type";
const { FETCH_DEPARTMENTWISEEMPLOYEE } = ActionTyps
//intial state
const departemployee = {
    departempList: [],
    loadingStatus: false
}
/***  Departmentemployee action type check then payload set to the state and loading status set as true */
export const getDepartemployee = (state = departemployee, { type, payload }) => {
    switch (type) {
        case FETCH_DEPARTMENTWISEEMPLOYEE:
            return { ...state, departempList: payload, loadingStatus: true }
        default:
            return state
    }

}