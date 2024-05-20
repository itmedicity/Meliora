import { ActionTyps } from '../constants/action.type'
const { FETCH_IT_MANAGEMENT_BILL_CATEGORY } = ActionTyps;

const BillCategory = {
    BillCategorylist: [],
    loadingStatus: false

}

export const getBillCategory = (state = BillCategory, { type, payload }) => {

    switch (type) {
        case FETCH_IT_MANAGEMENT_BILL_CATEGORY:
            return { ...state, BillCategorylist: payload, loadingStatus: true }
        default:
            return state

    }
}