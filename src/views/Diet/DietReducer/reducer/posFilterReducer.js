export const initialPosFilterState = {
    bed: 0,
    patient: 0,
    party: 0
}

export const posFilterReducer = (state, action) => {
    switch (action.type) {

        case 'SET_BED':
            return {
                ...state,
                bed: action.payload
            }

        case 'SET_PATIENT':
            return {
                ...state,
                patient: action.payload
            }

        case 'SET_PARTY':
            return {
                ...state,
                party: action.payload
            }

        case 'RESET_FILTER':
            return initialPosFilterState

        default:
            return state
    }
}