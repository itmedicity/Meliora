import { ActionTyps } from '../constants/action.type'
const { FETCH_OUTLET_ORA } = ActionTyps
//intial state
const outlet = {
    outletList: [],
    loadingStatus: false
}
/*** Oultlet action type check then payload set to the state and loading status set as true */
export const getOutlet = (state = outlet, { type, payload }) => {
    switch (type) {
        case FETCH_OUTLET_ORA:
            return { ...state, outletList: payload, loadingStatus: true }
        default:
            return state
    }

}