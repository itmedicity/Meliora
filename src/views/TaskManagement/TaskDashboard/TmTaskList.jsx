import React, { memo, useCallback, } from 'react'
import { Box, Paper } from '@mui/material'
import TmDashBoadTaskView from './TmDashBoadTaskView'
import { CssVarsProvider, Tooltip } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CusIconButton from 'src/views/Components/CusIconButton';

const TmTaskList = () => {

    const history = useHistory();
    const backToDash = useCallback(() => {
        history.push(`/Home/TaskManagementDashboard`)
    }, [history])
    return (
        <Paper sx={{ pb: .3, }}>
            <Box sx={{ height: 35, borderBottom: 1, borderColor: 'lightgrey', display: 'flex', pb: .5 }}>
                <Box sx={{ flex: 1, pt: .8, pl: .5, color: '#C7C8CB' }}>
                    My Department Task
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: "flex-end", }}>
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

            </Box>
            <Box sx={{
                mt: .5,
                border: .1, borderRadius: 1, borderColor: '#D396FF',
            }}>
                <TmDashBoadTaskView />
            </Box>

        </Paper>
    )
}

export default memo(TmTaskList)