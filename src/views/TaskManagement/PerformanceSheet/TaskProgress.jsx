import React, { memo, useEffect, useMemo, useState } from 'react'
import { Box, CssVarsProvider, FormControl, FormLabel, LinearProgress, Typography } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';

const TaskProgress = ({ val }) => {

    const { tm_task_slno, tm_task_status } = val
    const [MainTaskprogress, setMainTaskProgress] = useState(0)
    const searchData = useMemo(() => {
        return {
            main_task_slno: tm_task_slno,
        }
    }, [tm_task_slno,])

    useEffect(() => {
        if (tm_task_status === 1) {
            setMainTaskProgress(100)
        } else {
            const getEmpTask = async () => {
                const result = await axioslogin.post('/TmTableView/subTaskUnderTask', searchData);
                const { success, data } = result.data;
                if (success === 2) {
                    const complete = data?.filter((val) => (val.tm_task_status === 1))
                    const progress = Math.round((complete.length / data.length) * 100)
                    setMainTaskProgress(progress === 0 ? 0 : progress - 6)
                }
            }
            getEmpTask(searchData)
        }
    }, [tm_task_status, searchData])
    return (
        <Box sx={{ pt: 1 }}>
            <CssVarsProvider>
                <FormControl orientation="horizontal" sx={{ pl: 2, flex: 3 }}>
                    <FormLabel sx={{ fontSize: 15, flex: 9 }}>
                        <LinearProgress
                            determinate
                            variant="outlined"
                            color="neutral"
                            size="sm"
                            thickness={11}
                            value={MainTaskprogress}
                            sx={{
                                '--LinearProgress-radius': '15px',
                                '--LinearProgress-thickness': '11px',
                                bgcolor: 'white',
                                color: '#92443A',
                                height: 17
                            }}
                        >
                            <Typography
                                fontSize={12}
                                sx={{ mixBlendMode: 'difference', color: 'white' }}
                            >
                                Progress &nbsp;
                                {`${Math.round(Number(MainTaskprogress))}%`}
                            </Typography>
                        </LinearProgress>
                    </FormLabel>
                </FormControl>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(TaskProgress)