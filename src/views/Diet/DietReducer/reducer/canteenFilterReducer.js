import { CANTEEN_FILTER_ACTIONS } from "../action/canteenFilter.actions"

export const initialCanteenFilterState = {
    bed: '',
    patient: '',
    meal: '',
    type: '',
    search: '',
    status: ''
}

export const canteenFilterReducer = (state, action) => {

    switch (action.type) {

        case CANTEEN_FILTER_ACTIONS.SET_BED:
            return { ...state, bed: action.payload }

        case CANTEEN_FILTER_ACTIONS.SET_PATIENT:
            return { ...state, patient: action.payload }

        case CANTEEN_FILTER_ACTIONS.SET_MEAL_ID:
            return { ...state, meal: action.payload }

        case CANTEEN_FILTER_ACTIONS.SET_TYPE:
            return { ...state, type: action.payload }

        case CANTEEN_FILTER_ACTIONS.SET_SEARCH:
            return { ...state, search: action.payload }

        case CANTEEN_FILTER_ACTIONS.SET_STATUS:
            return { ...state, status: action.payload }

        case CANTEEN_FILTER_ACTIONS.RESET_ALL:
            return initialCanteenFilterState

        default:
            return state
    }
}