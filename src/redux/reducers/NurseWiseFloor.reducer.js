import { ActionTyps } from '../constants/action.type'
const { FETCH_NURSWISE_FLOOR } = ActionTyps;
//intial state
const nursewisefloor = {
    nursewisefloorList: [],
    loadingStatus: false
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const getnursewisefloor = (state = nursewisefloor, { type, payload }) => {
    switch (type) {
        case FETCH_NURSWISE_FLOOR:
            return { ...state, nursewisefloorList: payload, loadingStatus: true }
        default:
            return state
    }
}