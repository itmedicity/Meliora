import { Box } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const PatientsListView = ({ setSearchFlag, qidept }) => {

    const history = useHistory()
    const backtoHome = useCallback(() => {
        history.push('/Home/QIPatientMarking')
        setSearchFlag(0)
    }, [history, setSearchFlag])
    return (
        <Box>
            <Paper variant='outlined' square >
                <Box sx={{ height: 38 }}>
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', fontSize: 20, pt: 0.2, pr: 0.5 }}>
                        <HighlightOffIcon sx={{ cursor: 'pointer', height: 35, width: 35, opacity: 0.7 }} onClick={backtoHome} />
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(PatientsListView)