import { ActionTyps } from '../constants/action.type'
const { FETCH_AMSPAREITEM_DEPTSEC_BASED } = ActionTyps
//intial state
const SpareItemBasedSection = {
  SpareItemBasedSectionList: [],
  loadingStatus: false,
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getSpareItemBasedSection = (state = SpareItemBasedSection, { type, payload }) => {
  switch (type) {
    case FETCH_AMSPAREITEM_DEPTSEC_BASED:
      return { ...state, SpareItemBasedSectionList: payload, loadingStatus: true }
    default:
      return state
  }
}
