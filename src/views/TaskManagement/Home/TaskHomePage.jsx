import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Button, CssVarsProvider, Typography, Box } from '@mui/joy'
import DoneIcon from '@mui/icons-material/Done';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockIcon from '@mui/icons-material/Lock';
import { Table, TableBody, TableCell, TableContainer, TableRow, IconButton, FormControl, Select, MenuItem } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Face4OutlinedIcon from '@mui/icons-material/Face4Outlined';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const TaskHomePage = () => {

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empname

    })
    const monthdate = moment(new Date()).format('MMM-D')
    const dayss = moment(new Date()).format('dddd')

    const [myTask, setMyTask] = useState(0)
    const [addTask, setAddTask] = useState(0)
    const [task, setTask] = useState('')
    const AddTAsk = () => {
        setAddTask(1)
    }
    const upComming = () => {
        setMyTask(1)

    }

    const overdue = () => {
        setMyTask(2)


    }

    const completed = () => {
        setMyTask(3)



    }

    const UpdateOverDue = () => {

    }


    const aa = [{ slno: 1, task: "dgfgfgfg", date: "Yesterday" },
    { slno: 2, task: "dgfgfgfg", date: "Yesterday" }, { slno: 3, task: "dgfgfgfg", date: "Yesterday" },
    { slno: 4, task: "dgfgfgfg", date: "Yesterday" }, { slno: 5, task: "fgfdgdf", date: "Yesterday" },
    { slno: 2, task: "dgfgfgfg", date: "Yesterday" }, { slno: 3, task: "dgfgfgfg", date: "Yesterday" },
    { slno: 4, task: "dgfgfgfg", date: "Yesterday" }, { slno: 5, task: "fgfdgdf", date: "Yesterday" }]




    const createNewProject = () => {



    }
    return (
        <Box sx={{
            height: 900,
            // width: "100%",
            backgroundColor: "white"
        }}>

            {/* 1st */}
            <Box sx={{
                width: "100%"
            }}>
                <CssVarsProvider>
                    <Typography sx={{ fontSize: 22, pl: 2 }}>Home</Typography>
                </CssVarsProvider>
            </Box>
            {/* 2nd */}
            <Box sx={{
                width: "100%",
                textAlign: "center"
            }}>
                <CssVarsProvider>
                    <Typography sx={{ fontSize: 20 }}>{dayss}, {monthdate}</Typography>
                </CssVarsProvider>
            </Box>
            {/* 3rd */}
            <Box sx={{
                width: "100%",
                textAlign: "center"
            }}>
                <CssVarsProvider>
                    <Typography sx={{ textTransform: "capitalize", bold: true, fontSize: 25, font: 'Roboto' }}>Good Morning,{id.toLowerCase()}</Typography>
                </CssVarsProvider>
            </Box>

            {/* 4th */}
            <Box sx={{
                width: "65%",
                textAlign: "center",
                pl: 65,
            }}>
                <CssVarsProvider>
                    <Button
                        size="xs"
                        variant="outlined"
                        fullWidth
                        sx={{ backgroundColor: "#eeeeee" }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row"
                            }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15, pl: 0.5, pr: 2 }}>My Week</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row"
                            }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15, pr: 1 }}><DoneIcon /></Typography>
                                <Typography sx={{ fontSize: 15, pl: 0.5 }}>0</Typography>
                                <Typography sx={{ fontSize: 15, pl: 0.5, pr: 2 }}>Tasks Completed</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box
                            sx={{
                                pr: 8, display: "flex",
                                flexDirection: "row"
                            }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}><GroupAddOutlinedIcon /></Typography>
                                <Typography sx={{ fontSize: 15, pl: 1 }}>0</Typography>
                                <Typography sx={{ fontSize: 15, pl: 1 }}>Collaborators</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Button>
                </CssVarsProvider>
            </Box>
            {/* 5th */}
            <Box sx={{
                width: "100%",
                justifyItems: "center",
                display: "flex",
                flexDirection: "column",
                pt: 3
            }}>
                <Box sx={{
                    width: "100%",
                    justifyItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    pt: 3, pl: 20, pr: 20
                }}>

                    {/* //1st box in top in detail */}

                    <Box sx={{
                        display: "flex",

                        fontWeight: 'bold',
                        textAlign: 'left',
                        height: 300,
                        pl: 1,
                        pt: 1,
                        //flexShrink: 3,
                        width: 650,
                        border: 0.4,
                        flexDirection: "column",
                    }}>
                        <Box sx={{
                            width: "100%",
                            justifyItems: "center",
                            display: "flex",
                            flexDirection: "row",
                            pt: 1,
                            height: 100,
                        }}>
                            <Box sx={{
                                width: "10%",
                                justifyItems: "center",

                            }}>
                                <AccountCircleOutlinedIcon size={25} />
                            </Box>
                            <Box sx={{
                                width: "90%",
                                justifyItems: "center",
                                pb: 2,
                                height: 50,
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        pr: 8, display: "flex",
                                        flexDirection: "row"
                                    }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ bold: true, fontSize: 20, fontWeight: 500 }}>MY Tasks</Typography>
                                        <Typography sx={{ fontSize: 15, pl: 1 }}><LockIcon /></Typography>

                                    </CssVarsProvider>
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
                                    <CssVarsProvider>
                                        <Button
                                            onClick={upComming}
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                        >Up Comming
                                        </Button>
                                    </CssVarsProvider>
                                    <CssVarsProvider>
                                        <Button
                                            onClick={overdue}
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                        >Overdue
                                        </Button>
                                    </CssVarsProvider>
                                    <CssVarsProvider>
                                        <Button
                                            onClick={completed}
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                        >Completed
                                        </Button>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Box>


                        {/* <Divider /> */}
                        <Box>

                        </Box>

                        <Box sx={{
                            width: "100%",
                            justifyItems: "center",
                            display: "flex",
                            flexDirection: "row",
                        }}>


                            {
                                myTask === 1 ?
                                    <Box sx={{
                                        width: "100%",
                                        height: "100%"
                                    }}>

                                        <TableContainer sx={{ maxHeight: 200, pt: 0 }} >
                                            <Table size="small"
                                                stickyHeader aria-label="sticky table"

                                            >

                                                {
                                                    addTask === 1 ?

                                                        <TableBody>
                                                            <TableCell align="left" width={0}>
                                                                <IconButton
                                                                    sx={{ paddingY: 0.5 }}
                                                                    onClick={() => AddTAsk()}
                                                                >
                                                                    <CheckCircleOutlinedIcon size={10} />
                                                                </IconButton >
                                                            </TableCell>
                                                            <TableCell align="left" width={0.2}>

                                                                <TextFieldCustom
                                                                    placeholder="This space is yours,Fill it up"
                                                                    type="text"
                                                                    size="sm"
                                                                    disabled={true}
                                                                    name="task"
                                                                    value={task}
                                                                    onchange={setTask}
                                                                />


                                                            </TableCell>
                                                            <TableCell align="right" width={0.2}></TableCell>
                                                            <TableCell align="right" width={0.2}></TableCell>
                                                            <TableCell align="right" width={0.2}></TableCell>
                                                        </TableBody>

                                                        :
                                                        <TableBody>
                                                            <TableCell align="left" width={0.2}>
                                                                <IconButton
                                                                    sx={{ paddingY: 0.5 }}
                                                                    onClick={() => AddTAsk()}
                                                                >
                                                                    <CheckCircleOutlinedIcon size={25} />
                                                                </IconButton >
                                                            </TableCell>
                                                            <TableCell align="left" width={0.2}>Click Here to add a task</TableCell>
                                                        </TableBody>
                                                }
                                            </Table>
                                        </TableContainer>
                                    </Box>

                                    : myTask === 3 ?
                                        <Box sx={{
                                            width: "100%",
                                            height: "100%"
                                        }}>

                                            <TableContainer sx={{ maxHeight: 200, pt: 0 }}>
                                                <Table size="small"
                                                    stickyHeader aria-label="sticky table"

                                                >
                                                    <TableBody>
                                                        {aa && aa.map((val, index) => {
                                                            return <TableRow
                                                                key={val.id}
                                                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell align="left" width={0.2}>
                                                                    <IconButton
                                                                        sx={{ color: "#388e3c", paddingY: 0.5 }}
                                                                        onClick={() => UpdateOverDue(val.slno)}
                                                                    >
                                                                        <CheckCircleIcon size={25} />
                                                                    </IconButton >
                                                                </TableCell>
                                                                <TableCell align="left" width={0.2}>{val.slno}</TableCell>
                                                                <TableCell align="left" width={5}>{val.task}</TableCell>
                                                                <TableCell align="right">{val.date}</TableCell>


                                                            </TableRow>
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box> :

                                        <Box sx={{
                                            width: "100%",
                                            height: "100%"
                                        }}>

                                            <TableContainer sx={{ maxHeight: 200, pt: 0 }} >
                                                <Table size="small"
                                                    stickyHeader aria-label="sticky table"
                                                >
                                                    <TableBody>
                                                        {aa && aa.map((val, index) => {
                                                            return <TableRow
                                                                key={val.id}
                                                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell align="left" width={0.2}>
                                                                    <IconButton
                                                                        sx={{ paddingY: 0.5 }}
                                                                        onClick={() => UpdateOverDue(val.slno)}
                                                                    >
                                                                        <CheckCircleOutlinedIcon size={25} />
                                                                    </IconButton >
                                                                </TableCell>
                                                                <TableCell align="left" width={0.2}>{val.slno}</TableCell>
                                                                <TableCell align="left" width={5}>{val.task}</TableCell>
                                                                <TableCell align="right">{val.date}</TableCell>


                                                            </TableRow>
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                            }



                        </Box>
                    </Box>

                    {/* Spacing betweeen two box */}
                    <Box sx={{ width: 20 }}>

                    </Box>


                    {/* 2nd Box in first Row */}
                    <Box sx={{
                        display: "flex",
                        fontWeight: 'bold',
                        textAlign: 'left',
                        height: 300,
                        pl: 1,
                        pt: 1,
                        //flexShrink: 3,
                        width: 650,
                        border: 0.4,
                        flexDirection: "column",
                    }}>
                        <Box sx={{
                            width: "100%",
                            justifyItems: "center",
                            display: "flex",
                            flexDirection: "row",
                            height: 100,
                        }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row"
                                }}>
                                <Box sx={{
                                    width: "10%",
                                    height: "100%",
                                    pr: 1
                                }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ bold: true, fontSize: 20, fontWeight: 500 }}>Projects</Typography>
                                    </CssVarsProvider>
                                </Box>

                                <Box sx={{
                                    width: "30%",
                                    height: "100%",
                                    pl: 3, pt: 1
                                }}>
                                    <FormControl fullWidth size="small"  >
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={value}
                                            // onChange={(e) => setValue(e.target.value)}
                                            size="small"
                                            fullWidth
                                            // variant='outlined'
                                            sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                                        >
                                            {/* <MenuItem value={0} >Recents</MenuItem> */}
                                            <MenuItem value={1}>Recents</MenuItem>
                                            <MenuItem value={2}> Starred</MenuItem>
                                            <MenuItem value={3}>Recommended</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                        </Box>


                        {/* <Divider /> */}
                        <Box>

                        </Box>

                        <Box sx={{
                            width: "100%",
                            justifyItems: "center",
                            // backgroundColor: "green",
                            display: "flex",
                            flexDirection: "row",
                            // pt: 3,
                            // height: 400
                        }}>
                            <Box sx={{
                                width: "50%",
                                height: 60,
                                // backgroundColor: "green",
                                justifyItems: "center",
                            }}>

                                <IconButton
                                    onClick={() => createNewProject()}
                                >
                                    <CustomeToolTip title="create">
                                        <AddCircleOutlineIcon style={{ fontSize: '200%' }} />
                                    </CustomeToolTip>
                                </IconButton>
                                <CssVarsProvider>
                                    <Button
                                        onClick={createNewProject}
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                    >Create Projects
                                    </Button>
                                </CssVarsProvider>


                            </Box>


                        </Box>
                    </Box>
                </Box>


                {/* 2nd Row Starts Here */}

                <Box sx={{
                    width: "100%",
                    justifyItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    pt: 3, pl: 20, pr: 20
                }}>

                    {/* //1st box in top in detail */}

                    <Box sx={{
                        display: "flex",

                        fontWeight: 'bold',
                        textAlign: 'left',
                        height: 300,
                        pl: 1,
                        pt: 1,
                        //flexShrink: 3,
                        width: 650,
                        border: 0.4,
                        flexDirection: "column",
                    }}>
                        <Box sx={{
                            width: "100%",
                            justifyItems: "center",
                            display: "flex",
                            flexDirection: "row",

                            height: 100,
                        }}>

                            <Box sx={{
                                width: "90%",
                                justifyItems: "center",
                                pb: 2,
                                height: 50,
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        pr: 8, display: "flex",
                                        flexDirection: "row"
                                    }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ bold: true, fontSize: 20, fontWeight: 500 }}>Tasks I have assigned</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
                                    <CssVarsProvider>
                                        <Button
                                            onClick={upComming}
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                        >Up Comming
                                        </Button>
                                    </CssVarsProvider>
                                    <CssVarsProvider>
                                        <Button
                                            onClick={upComming}
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                        >Overdue
                                        </Button>
                                    </CssVarsProvider>
                                    <CssVarsProvider>
                                        <Button
                                            onClick={upComming}
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                        >Completed
                                        </Button>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Box>


                        {/* <Divider /> */}
                        <Box>

                        </Box>

                        <Box sx={{
                            width: "100%",
                            justifyItems: "center",
                            // backgroundColor: "green",
                            display: "flex",
                            flexDirection: "row",
                            // pt: 3,
                            // height: 400
                        }}>
                            {/* <CssVarsProvider>
                                <Button
                                    onClick={upComming}
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                >Completed
                                </Button>
                            </CssVarsProvider> */}



                        </Box>
                    </Box>

                    {/* Spacing betweeen two box */}
                    <Box sx={{ width: 20 }}>

                    </Box>


                    {/* 2nd Box in first Row */}
                    <Box sx={{
                        display: "flex",
                        fontWeight: 'bold',
                        textAlign: 'left',
                        height: 300,
                        pl: 1,
                        pt: 1,
                        //flexShrink: 3,
                        width: 650,
                        border: 0.4,
                        flexDirection: "column",
                    }}>
                        <Box sx={{
                            width: "100%",
                            justifyItems: "center",
                            display: "flex",
                            flexDirection: "row",
                            height: 50,
                        }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    pr: 8, display: "flex",
                                    flexDirection: "row"
                                }}>
                                <CssVarsProvider>
                                    <Typography sx={{ bold: true, fontSize: 20, fontWeight: 500 }}>People</Typography>
                                </CssVarsProvider>

                            </Box>

                        </Box>


                        {/* <Divider /> */}
                        <Box>

                        </Box>

                        <Box sx={{
                            width: "100%",
                            justifyItems: "center",
                            // backgroundColor: "green",
                            display: "flex",
                            flexDirection: "column",
                            // pt: 3,
                            // height: 400
                        }}>
                            <Box sx={{
                                width: "100%",
                                justifyItems: "center",
                                // backgroundColor: "green",
                                display: "flex",
                                flexDirection: "row",
                                // pt: 3,
                                // height: 400
                            }}>

                                <Box sx={{
                                    height: 100,
                                    width: 200,
                                    //  backgroundColor: "red"
                                }}>


                                    <IconButton
                                        sx={{ paddingY: 0.5 }}
                                    // onClick={() => UpdateOverDue(val.slno)}
                                    >
                                        <Face4OutlinedIcon size={500} />
                                    </IconButton >

                                    <CssVarsProvider>
                                        <Button
                                            color='#9e9e9e'
                                            variant="contained" disabled
                                        >
                                        </Button>
                                    </CssVarsProvider>
                                </Box>

                                <Box sx={{
                                    height: 100,
                                    width: 200,
                                    //  backgroundColor: "red"
                                }}>


                                    <IconButton
                                        sx={{ paddingY: 0.5 }}
                                    // onClick={() => UpdateOverDue(val.slno)}
                                    >
                                        <Face4OutlinedIcon size={500} />
                                    </IconButton >

                                    <CssVarsProvider>
                                        <Button
                                            color='#9e9e9e'
                                            variant="contained" disabled
                                        >
                                        </Button>
                                    </CssVarsProvider>
                                </Box>

                            </Box>



                        </Box>
                    </Box>
                </Box>







            </Box>
        </Box >
    )
}

export default memo(TaskHomePage)