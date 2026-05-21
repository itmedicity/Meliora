import React, { createContext, useContext, useReducer, useMemo } from 'react'
import { canteenFilterReducer, initialCanteenFilterState } from '../reducer/canteenFilterReducer'

const CanteenFilterContext = createContext(null)

export const CanteenFilterProvider = ({ children }) => {

    const [state, dispatch] = useReducer(
        canteenFilterReducer,
        initialCanteenFilterState
    )

    const value = useMemo(() => ({
        state,
        dispatch
    }), [state])

    return (
        <CanteenFilterContext.Provider value={value}>
            {children}
        </CanteenFilterContext.Provider>
    )
}

export const useCanteenFilter = () => {
    const context = useContext(CanteenFilterContext)
    if (!context) {
        throw new Error('useCanteenFilter must be used inside CanteenFilterProvider')
    }
    return context
}