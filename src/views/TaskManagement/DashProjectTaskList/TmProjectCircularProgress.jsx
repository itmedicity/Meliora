import React, { memo, useEffect, useMemo, useState } from 'react'
import Stack from '@mui/joy/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import { Box, Tooltip, Typography } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
const TmProjectCircularProgress = ({ val, }) => {

    const { tm_project_slno } = val
    const [progress, setProgress] = useState(0)
    const searchData = useMemo(() => {
        return {
            tm_project_slno: tm_project_slno,
        }
    }, [tm_project_slno])

    useEffect(() => {
        const getEmpTaskCount = async () => {
            const result = await axioslogin.post('/TmTableView/TTCTcountUnderProject', searchData);
            const { success, data } = result.data;
            if (success === 2) {
                const { TT, TC } = data[0]
                const valueProgress = Math.round((TC / TT) * 100)
                setProgress(valueProgress)
            }
        }
        getEmpTaskCount(searchData)
    }, [searchData])

    return (
        <Box>
            <Tooltip title="Task Completed Under this Project">
                <Stack spacing={1}>
                    <CircularProgress size="md" determinate
                        sx={{ bgcolor: 'white' }}
                        value={progress}
                    >
                        <Typography sx={{ fontSize: 10 }}>
                            {progress}%
                        </Typography>
                    </CircularProgress>

                </Stack>
            </Tooltip>
        </Box>
    )
}

export default memo(TmProjectCircularProgress)