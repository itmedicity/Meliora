import { ActionTyps } from '../constants/action.type'
const { FETCH_RMMASTERMELI } = ActionTyps;
//intial state
const rmmastermeli = {
    rmmastermeliList: [],
    loadingStatus: false
}
/*** roommaster meliora action check then payload set to the state and loading status set as true */
export const getRmmastermeliora = (state = rmmastermeli, { type, payload }) => {
    switch (type) {
        case FETCH_RMMASTERMELI:
            return { ...state, rmmastermeliList: payload, loadingStatus: true }
        default:
            return state
    }

}