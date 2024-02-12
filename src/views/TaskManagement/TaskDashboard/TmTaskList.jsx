import { Box, Paper } from '@mui/material'
import React, { useCallback, useState } from 'react'
import TmDashBoadTaskView from './TmDashBoadTaskView'
import { CssVarsProvider, Tooltip } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CusIconButton from 'src/views/Components/CusIconButton';

const TmTaskList = () => {
    const [tableCount, setTableCount] = useState(0)
    const history = useHistory();
    const backToDash = useCallback(() => {
        history.push(`/Home/TaskManagementDashboard`)
    }, [history])
    return (
        <Paper sx={{ height: '45vw' }}>
            <Box sx={{ height: 35, borderBottom: 1, borderColor: 'lightgrey', display: 'flex', justifyContent: "flex-end", pb: .5 }}>
                <CusIconButton size="sm" variant="outlined" color="primary"  >
                    <CssVarsProvider>
                        <Tooltip title="Close" placement="bottom">
                            < CloseIcon sx={{ cursor: 'pointer', size: 'sm', width: 30, height: 20, color: '#004F76', }}
                                onClick={backToDash}
                            />
                        </Tooltip>
                    </CssVarsProvider>
                </CusIconButton>
            </Box>
            <Box sx={{ mt: .5 }}>
                <TmDashBoadTaskView tableCount={tableCount} setTableCount={setTableCount} />
            </Box>

        </Paper>
    )
}

export default TmTaskList