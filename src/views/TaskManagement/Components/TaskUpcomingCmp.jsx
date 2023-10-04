import { Box, CssVarsProvider, Sheet } from '@mui/joy'
import React from 'react'
import { memo } from 'react'
import Table from '@mui/joy/Table';
import Button from '@mui/joy/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TaskTableRow from './TaskTableRow';
import { innerHeight } from 'src/views/Constant/Constant';

const task = [
    { slno: 1, task: "Lorpam 1mg Tablet is used in the treatment of Short term anxiety,Anxiety disorder.", due: '2023-09-25' },
    { slno: 2, task: "dasdasdasds dsfsdfsf sfsdfsd  dgdfgd  dgfdfgfdg", due: new Date() },
    { slno: 3, task: "dasdasdasds sdfsdf sdfsdf sdfgdfg yj tyujyt ty ty", due: new Date() },
    { slno: 4, task: "dasdasdasds trfyhrty rt tyrtytr rtyrty sfsdf sdfsdfsyuh ytutyuytu ", due: new Date() },
    { slno: 5, task: "dasdasdasds", due: '2023-09-25' },
    { slno: 5, task: "dasdasdasds", due: '2023-09-26' },
    { slno: 5, task: "dasdasdasds", due: '2023-09-27' },
    { slno: 5, task: "dasdasdasds", due: '2023-09-28' },
    { slno: 5, task: "dasdasdasds", due: '2023-09-29' },
    { slno: 5, task: "dasdasdasds", due: '2023-09-30' },
    { slno: 5, task: "dasdasdasds", due: '2023-10-01' },
    { slno: 5, task: "dasdasdasds", due: '2023-10-02' },
    { slno: 5, task: "dasdasdasds", due: '2023-10-03' },
    { slno: 4, task: "dasdasdasds trfyhrty rt tyrtytr rtyrty sfsdf sdfsdfsyuh ytutyuytu ", due: new Date() },
    { slno: 4, task: "dasdasdasds trfyhrty rt tyrtytr rtyrty sfsdf sdfsdfsyuh ytutyuytu ", due: new Date() },
    { slno: 4, task: "dasdasdasds trfyhrty rt tyrtytr rtyrty sfsdf sdfsdfsyuh ytutyuytu ", due: new Date() },
    { slno: 4, task: "dasdasdasds trfyhrty rt tyrtytr rtyrty sfsdf sdfsdfsyuh ytutyuytu ", due: new Date() },
    { slno: 4, task: "dasdasdasds trfyhrty rt tyrtytr rtyrty sfsdf sdfsdfsyuh ytutyuytu ", due: new Date() },
    { slno: 4, task: "dasdasdasds trfyhrty rt tyrtytr rtyrty sfsdf sdfsdfsyuh ytutyuytu ", due: new Date() },
    { slno: 4, task: "dasdasdasds trfyhrty rt tyrtytr rtyrty sfsdf sdfsdfsyuh ytutyuytu ", due: new Date() },
]
const TaskUpcomingCmp = () => {
    return (
        <CssVarsProvider>
            <Box sx={{
                paddingBottom: 1
            }} >
                <Button onClick={function () { }} variant="plain" startDecorator={<AddIcon />} size="sm" >Create task</Button>
            </Box>
            <Sheet sx={{ height: `${innerHeight - 450}px`, overflow: 'auto' }}>
                <Table
                    aria-label="basic table"
                    sx={{
                        "--TableCell-height": "28px",
                        "--TableCell-paddingX": "0px",
                        "--TableCell-paddingY": "0px",
                        "--Table-headerUnderlineThickness": "1px",
                        borderTop: 1,
                        borderTopColor: '#d0d2d5',
                    }}
                    hoverRow
                    stickyFooter
                    borderAxis='x'
                    size='sm'
                >
                    <tbody>
                        {
                            task?.map((e, idx) => <TaskTableRow key={idx} taskName={e.task} dueDate={e.due} />)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>dsfsd</td>
                        </tr>
                    </tfoot>
                </Table>
            </Sheet>
        </CssVarsProvider>
    )
}

export default memo(TaskUpcomingCmp) 