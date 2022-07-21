import { ActionTyps } from "../constants/action.type";
const { FETCH_ASSET_TYPE } = ActionTyps
//intial state
const assettypename = {
    assettypeList: [],
    loadingStatus: false
}
/*** Complaint Department action type check then payload set to the state and loading status set as true */
export const getAssetType = (state = assettypename, { type, payload }) => {
    switch (type) {
        case FETCH_ASSET_TYPE:
            return { ...state, assettypeList: payload, loadingStatus: true }
        default:
            return state
    }

}