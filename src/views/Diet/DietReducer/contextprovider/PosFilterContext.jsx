import React, { createContext, useContext, useMemo, useReducer } from 'react'
import {
    posFilterReducer,
    initialPosFilterState
} from '../reducer/posFilterReducer'

const PosFilterContext = createContext(null)

export const PosFilterProvider = ({ children }) => {

    const [state, dispatch] = useReducer(
        posFilterReducer,
        initialPosFilterState
    )

    const value = useMemo(() => ({
        state,
        dispatch
    }), [state])

    return (
        <PosFilterContext.Provider value={value}>
            {children}
        </PosFilterContext.Provider>
    )
}

export const usePosFilter = () => {
    const context = useContext(PosFilterContext)

    if (!context) {
        throw new Error(
            'usePosFilter must be used inside PosFilterProvider'
        )
    }

    return context
}