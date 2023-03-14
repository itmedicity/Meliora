import { ActionTyps } from "../constants/action.type"
const { FETCH_HIC_COMPLAINT_LIST } = ActionTyps
//intial state
const Hiccomplaints = {
    HiccomplaintsLists: [],
    loadingStatus: false
}
export const setHICComplaintLists = (state = Hiccomplaints, { type, payload }) => {
    switch (type) {
        case FETCH_HIC_COMPLAINT_LIST:
            return { ...state, HiccomplaintsLists: payload, loadingStatus: true }
        default:
            return state
    }

}

