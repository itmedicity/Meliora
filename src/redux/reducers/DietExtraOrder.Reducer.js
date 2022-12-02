import { ActionTyps } from '../constants/action.type'
const { FETCH_EXTRAORDER_LIST } = ActionTyps;
//intial state
const extraorder = {
    extraorderList: [],
    loadingStatus: false
}
/*** Diettype action type check then payload set to the state and loading status set as true */
export const setExtraOrderList = (state = extraorder, { type, payload }) => {
    switch (type) {
        case FETCH_EXTRAORDER_LIST:
            return { ...state, extraorderList: payload, loadingStatus: true }
        default:
            return state
    }
}