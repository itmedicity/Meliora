import { ActionTyps } from '../constants/action.type'
const { FETCH_DIET } = ActionTyps;
//intial state
const diet = {
    dietList: [],
    loadingStatus: false
}
/*** Diet action type check then payload set to the state and loading status set as true */
export const getDiet = (state = diet, { type, payload }) => {
    switch (type) {
        case FETCH_DIET:
            return { ...state, dietList: payload, loadingStatus: true }
        default:
            return state
    }

}