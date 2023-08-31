
import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_SUBGROUP } = ActionTyps;
//intial state
const SubGroup = {
    SubGroupList: [],
    loadingStatus: false

}
/*** Building action type check then payload set to the state and loading status set as true */
export const getAmSubGroupList = (state = SubGroup, { type, payload }) => {
    switch (type) {
        case FETCH_ASSET_SUBGROUP:
            return { ...state, SubGroupList: payload, loadingStatus: true }
        default:
            return state
    }

}