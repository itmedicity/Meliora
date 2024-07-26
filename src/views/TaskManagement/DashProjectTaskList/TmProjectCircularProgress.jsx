import React, { memo, useEffect, useMemo, useState } from 'react'
import Stack from '@mui/joy/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import { Box, Tooltip, Typography } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';

const TmProjectCircularProgress = ({ val, }) => {

    const { tm_project_slno, tm_project_status } = val
    const [progress, setProgress] = useState(0)
    const searchData = useMemo(() => {
        return {
            tm_project_slno: tm_project_slno,
        }
    }, [tm_project_slno])

    useEffect(() => {
        if (tm_project_status === 1) {
            setProgress(100)
        } else {
            const getEmpTaskCount = async () => {
                const result = await axioslogin.post('/TmTableView/TTCTcountUnderProject', searchData);
                const { success, data } = result.data;
                if (success === 2) {
                    const { TT, TC } = data[0]
                    const valueProgress = Math.round((TC / TT) * 100)
                    setProgress(valueProgress === 0 ? 0 : valueProgress - 6)
                }
            }
            getEmpTaskCount(searchData)
        }
    }, [searchData, tm_project_status])

    return (
        <Box>
            <Tooltip title="Task Completed Under this Project">
                <Stack spacing={1}>
                    <CircularProgress size="sm" determinate
                        sx={{ bgcolor: 'white' }}
                        value={progress}
                    >
                        <Typography sx={{ fontSize: 10, p: 1 }}>
                            {progress}%
                        </Typography>
                    </CircularProgress>

                </Stack>
            </Tooltip>
        </Box>
    )
}

export default memo(TmProjectCircularProgress)