
import { ActionTyps } from '../constants/action.type'
const { FETCH_AMITEM_DEPTSEC_BASED } = ActionTyps;
//intial state
const ItemBasedSection = {
    ItemBasedSectionList: [],
    loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getItemBasedSection = (state = ItemBasedSection, { type, payload }) => {
    switch (type) {
        case FETCH_AMITEM_DEPTSEC_BASED:
            return { ...state, ItemBasedSectionList: payload, loadingStatus: true }
        default:
            return state
    }

}