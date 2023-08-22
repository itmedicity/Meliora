
import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_CATEGORY } = ActionTyps;
//intial state
const AssetCategory = {
    AssetCategoryList: [],
    loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getCategory = (state = AssetCategory, { type, payload }) => {
    switch (type) {
        case FETCH_ASSET_CATEGORY:
            return { ...state, AssetCategoryList: payload, loadingStatus: true }
        default:
            return state
    }

}