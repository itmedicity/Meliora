import { Box } from '@mui/joy'
import React from 'react'
import DietTextComponent from '../DietComponent/DietTextComponent'
import { FILTER_ACTIONS } from '../DietReducer/action/kotPreparationFilter.actions'

const StationCard = ({ station, isActive, dispatch }) => {
    return (
        <Box
            onClick={() =>
                dispatch({
                    type: FILTER_ACTIONS.SET_NURSING_STATION,
                    payload: station.fb_ns_code
                })
            }
            sx={{
                p: 1,
                borderRadius: 4,
                cursor: 'pointer',
                textAlign: 'center',
                border: isActive ? '1px solid #7b2cbf' : '1px solid #e0e0e0',
                bgcolor: isActive ? '#f4eaff' : '#fff',
                transition: 'all 0.25s ease',
                '&:hover': {
                    borderColor: '#7b2cbf',
                    bgcolor: '#f4eaff'
                }
            }}
        >
            <DietTextComponent size={13} value={station.fb_ns_name} />
        </Box>
    )
}

export default StationCard