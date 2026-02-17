import { FILTER_ACTIONS } from "../action/kotPreparationFilter.actions"

export const initialFilterState = {
    nursingStation: '',
    nursingBed: '',
    dietName: '',
    dietPatient: '',
    ptsearch: '',
    diettype: '',
    assignee: '',
    selectedPatients: []
}

export const kotPreparationFilterReducer = (state, action) => {
    switch (action.type) {

        case FILTER_ACTIONS.SET_NURSING_STATION:
            return {
                ...state,
                nursingStation: action.payload,
                // nursingBed: '',
                // dietName: '',
                // dietPatient: ''
            }

        case FILTER_ACTIONS.SET_NURSING_BED:
            return {
                ...state,
                nursingBed: action.payload,
                // dietName: '',
                // dietPatient: ''
            }

        case FILTER_ACTIONS.SET_DIET_NAME:
            return {
                ...state,
                dietName: action.payload,
                // dietPatient: '',

            }

        case FILTER_ACTIONS.SET_DIET_PATIENT:
            return {
                ...state,
                dietPatient: action.payload
            }

        case FILTER_ACTIONS.SET_PT_SEARCH:
            return {
                ...state,
                ptsearch: action.payload
            }

        case FILTER_ACTIONS.SET_DIET_TYPE:
            return {
                ...state,
                diettype: action.payload
            }
        case FILTER_ACTIONS.SET_ASSIGNEE:
            return {
                ...state,
                assignee: action.payload
            }
        // case FILTER_ACTIONS.TOGGLE_SELECTED_PATIENT:
        //     return {
        //         ...state,
        //         selectedPatients: state.selectedPatients?.includes(action.payload)
        //             ? state.selectedPatients?.filter(id => id !== action.payload)
        //             : [...state.selectedPatients, action.payload]
        //     }
        case FILTER_ACTIONS.TOGGLE_SELECTED_PATIENT: {
            const exists = state.selectedPatients.some(
                item => item.order_id === action.payload.order_id
            )

            return {
                ...state,
                selectedPatients: exists
                    ? state.selectedPatients.filter(
                        item => item.order_id !== action.payload.order_id
                    )
                    : [...state.selectedPatients, action.payload]
            }
        }
        case FILTER_ACTIONS.REMOVE_SELECTED_PATIENT:
            return {
                ...state,
                selectedPatients: state.selectedPatients.filter(
                    item => item.order_id !== action.payload
                )
            };


        case FILTER_ACTIONS.SET_SELECTED_PATIENTS:
            return {
                ...state,
                selectedPatients: action.payload
            }

        case FILTER_ACTIONS.CLEAR_SELECTED_PATIENTS:
            return {
                ...state,
                selectedPatients: []
            }

        case FILTER_ACTIONS.RESET_ALL:
            return initialFilterState

        default:
            return state
    }
}
