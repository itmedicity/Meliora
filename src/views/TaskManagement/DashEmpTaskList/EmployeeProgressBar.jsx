import { Box } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import FormLabel from '@mui/joy/FormLabel';
import { axioslogin } from 'src/views/Axios/Axios';
import { LinearProgress, Typography } from '@mui/joy';

const EmployeeProgressBar = ({ val }) => {
    const [progress, setProgress] = useState(0)
    const { emslno } = val
    const searchData = useMemo(() => {
        return {

            tm_assigne_emp: emslno
        }
    }, [emslno])

    useEffect(() => {
        const getEmpTaskCount = async () => {
            const result = await axioslogin.post('/TmTableView/EmployeeTTCTcount', searchData);
            const { success, data } = result.data;
            if (success === 2) {
                const { TT, TC } = data[0]
                if (TT > 0 && TC > 0) {
                    const valueProgress = Math.round((TC / TT) * 100)
                    setProgress(valueProgress)
                } else {
                    setProgress(0)
                }

            }
        }
        getEmpTaskCount(searchData)
    }, [searchData,])

    return (
        <Box>
            <FormLabel sx={{ fontSize: 15, flex: 9 }}>
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
                        color: '#1F3541'
                    }}
                >
                    <Typography
                        fontSize={14}

                        sx={{ mixBlendMode: 'difference', color: 'white' }}
                    >
                        Progress &nbsp;
                        {`${Math.round(Number(progress))}%`}
                    </Typography>
                </LinearProgress>
            </FormLabel>
        </Box>
    )
}

export default memo(EmployeeProgressBar)