import { ActionTyps } from '../constants/action.type'
const { FETCH_HIC_POLICY } = ActionTyps;
//intial state
const hicPolicy = {
    hicpolicyList: [],
    loadingStatus: false
}
/*** Hicpolicy action type check then payload set to the state and loading status set as true */
export const getHicpolicy = (state = hicPolicy, { type, payload }) => {
    switch (type) {
        case FETCH_HIC_POLICY:
            return { ...state, hicpolicyList: payload, loadingStatus: true }
        default:
            return state
    }

}