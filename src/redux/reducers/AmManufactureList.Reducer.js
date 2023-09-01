import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_MANUFACTURE } = ActionTyps;
//intial state
const Manufacture = {
    ManufactureList: [],
    loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getAmManufacture = (state = Manufacture, { type, payload }) => {
    switch (type) {
        case FETCH_ASSET_MANUFACTURE:
            return { ...state, ManufactureList: payload, loadingStatus: true }
        default:
            return state
    }

}






