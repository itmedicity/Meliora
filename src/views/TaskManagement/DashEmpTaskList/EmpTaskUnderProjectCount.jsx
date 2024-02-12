import React, { memo, useEffect, useMemo, useState } from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { axioslogin } from 'src/views/Axios/Axios';
import { LinearProgress, Tooltip, Typography } from '@mui/joy';
const EmpTaskUnderProjectCount = ({ val, emslno }) => {
    const [total, setTotal] = useState(0)
    const [complete, setComplete] = useState(0)
    const [progress, setProgress] = useState(0)
    const { tm_project_slno } = val
    const searchData = useMemo(() => {
        return {
            tm_project_slno: tm_project_slno,
            tm_assigne_emp: emslno
        }
    }, [tm_project_slno, emslno])

    useEffect(() => {
        const getEmpTaskCount = async () => {
            const result = await axioslogin.post('/TmTableView/EmpTaskCountUnderProject', searchData);
            const { success, data } = result.data;
            if (success === 2) {
                const { TT, TC } = data[0]
                const valueProgress = (TC / TT) * 100
                setProgress(valueProgress)
                setTotal(TT)
                setComplete(TC)
            }
        }
        getEmpTaskCount(searchData)
    }, [searchData])

    return (
        <FormControl orientation="horizontal" sx={{ pl: 2, flex: 3 }}>
            <FormLabel sx={{ fontSize: 15, flex: 6 }}>
                <LinearProgress
                    determinate
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    thickness={16}
                    value={progress}
                    sx={{
                        '--LinearProgress-radius': '20px',
                        '--LinearProgress-thickness': '18px',
                        bgcolor: 'white',
                        color: '#41729F'
                    }}
                >
                    <Typography
                        fontSize={14}
                        textColor="white"
                        sx={{ mixBlendMode: 'difference' }}
                    >
                        Progress &nbsp;
                        {`${Math.round(Number(progress))}%`}
                    </Typography>
                </LinearProgress>
            </FormLabel>
            <Tooltip title={'Completed Task'} placement="bottom">
                <FormLabel sx={{ fontSize: 15, flex: 1, cursor: 'grab', color: 'green', }}>({complete})</FormLabel>
            </Tooltip>
            <Tooltip title={'Total Task'} placement="bottom">
                <FormLabel sx={{ fontSize: 15, flex: 1, cursor: 'grab', color: '#523A28', }}>({total})</FormLabel>
            </Tooltip>
        </FormControl>
    )
}

export default memo(EmpTaskUnderProjectCount)