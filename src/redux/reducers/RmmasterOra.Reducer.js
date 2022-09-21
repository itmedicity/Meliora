import { ActionTyps } from '../constants/action.type'
const { FETCH_RMMASTERORA } = ActionTyps;
//intial state
const rmmasterora = {
    rmmasteroraList: [],
    loadingStatus: false
}
/*** roommasteroracleaction check then payload set to the state and loading status set as true */
export const getRmmasteroracle = (state = rmmasterora, { type, payload }) => {
    switch (type) {
        case FETCH_RMMASTERORA:
            return { ...state, rmmasteroraList: payload, loadingStatus: true }
        default:
            return state
    }

}