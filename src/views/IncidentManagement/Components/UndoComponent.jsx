import { Box, Tooltip } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import { IoArrowUndoCircleOutline } from "react-icons/io5"

const UndoComponent = ({ setValue, CurrentStep }) => {

    // Function to Undo the step Functionality
    const HandleUndo = useCallback(() => {
        setValue(false)
        CurrentStep((prev) => prev - 1)
    }, []);

    return (
        <Box onClick={HandleUndo} sx={{
            position: 'absolute',
            right: 10,
            zIndex: 9999,
            cursor: 'pointer',
            top: 8
        }}>
            <Tooltip title="Undo Step">
                <span>
                    <IoArrowUndoCircleOutline fontSize={22} style={{
                        bgcolor: '#ede7f6', // light violet
                        boxShadow: '0 0 8px 4px rgba(103, 58, 183, 0.4)', // violet aura
                        borderRadius: '50%',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                        },
                    }} />
                </span>
            </Tooltip>
        </Box>
    )
}

export default memo(UndoComponent);