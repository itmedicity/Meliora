import React, { createContext, useContext, useReducer, useMemo } from 'react'
import { kotPreparationFilterReducer, initialFilterState } from '../reducer/KotFilterReducer'


const KotFilterContext = createContext(null)

export const KotFilterProvider = ({ children }) => {

    const [state, dispatch] = useReducer(
        kotPreparationFilterReducer,
        initialFilterState
    )

    // memoized value → avoids useless re-renders
    const value = useMemo(() => ({
        state,
        dispatch
    }), [state])

    return (
        <KotFilterContext.Provider value={value}>
            {children}
        </KotFilterContext.Provider>
    )
}

export const useKotFilter = () => {
    const context = useContext(KotFilterContext)
    if (!context) {
        throw new Error('useKotFilter must be used inside KotFilterProvider')
    }
    return context
}
