
import { ActionTyps } from '../constants/action.type'
const { FETCH_AM_RACK } = ActionTyps;
//intial state
const AssetRack = {
    AssetRackList: [],
    loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getRackList = (state = AssetRack, { type, payload }) => {
    switch (type) {
        case FETCH_AM_RACK:
            return { ...state, AssetRackList: payload, loadingStatus: true }
        default:
            return state
    }

}