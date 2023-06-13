import { ActionTyps } from '../constants/action.type'
const { FETCH_COM_EMP_MAP } = ActionTyps;
//intial state
const comEmpMap = {
    comEmpMapList: [],
    loadingStatus: false
}
/*** Diet action type check then payload set to the state and loading status set as true */
export const setComEmpMap = (state = comEmpMap, { type, payload }) => {
    switch (type) {
        case FETCH_COM_EMP_MAP:
            return { ...state, comEmpMapList: payload, loadingStatus: true }
        default:
            return state
    }

}