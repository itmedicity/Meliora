import React from 'react'
import { useState, useCallback, useEffect, Fragment, memo } from 'react'
import { editicon } from 'src/color/Color'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import CardMaster from 'src/views/Components/CardMaster'
import ComplistAgGridcmp from 'src/views/Components/ComplistAgGridcmp'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { IconButton } from '@mui/material';
import Rectifymodel from './Rectifymodel'
import { useSelector } from 'react-redux'
import { Box } from '@mui/system'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import CusCheckBox from 'src/views/Components/CusCheckBox'
const RectifyCompalint = () => {
    const history = useHistory()
    //state for table
    const [tabledata, setTabledata] = useState([])
    const [getdata, setgetdata] = useState([])
    const [detail, setdeatial] = useState([])
    //state for modal dispaly
    const [mdopen, setmdopen] = useState(0)
    //state for modal open
    const [open, setOpen] = useState(false);
    //state for table render
    const [count, setCount] = useState(0)
    //for getting login id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [rectify, setRectify] = useState(false)
    const [notRecty, setNotRectify] = useState(false)
    const [check, setCheck] = useState(0)
    const updateRecty = useCallback((e) => {
        if (e.target.checked === true) {
            setRectify(true)
            setCheck(1)
            setNotRectify(false)
        }
        else {
            setRectify(false)
            setCheck(0)
            setNotRectify(false)
        }
    }, [])
    const updateNotRecty = useCallback((e) => {
        if (e.target.checked === true) {
            setNotRectify(true)
            setCheck(2)
            setRectify(false)
        }
        else {
            setRectify(false)
            setCheck(0)
            setNotRectify(false)
        }
    }, [])
    //data setting in table
    const [column] = useState([
        {
            headerName: 'Rectify', minWidth: 100,
            cellRenderer: params => {
                if (params.data.compalint_status === 2 || params.data.compalint_status === 3) {
                    return <IconButton disabled
                        sx={{ color: editicon, paddingY: 0.5 }}>
                        <CustomeToolTip title="Rectify Complaint ">
                            < AssignmentTurnedInIcon />
                        </CustomeToolTip>
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                        onClick={() => Rectifycomplaintdept(params)}>
                        <CustomeToolTip title="Rectify Complaint ">
                            < AssignmentTurnedInIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }
        },
        {
            headerName: "SlNo", field: "complaint_slno", minWidth: 100,
        },
        { headerName: "Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 300 },
        { headerName: "Department", field: "sec_name", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Complaint Type", field: "complaint_type_name", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Assign Employee", field: "em_name", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Section", field: "location", minWidth: 200, autoHeight: true, wrapText: true },
        {
            headerName: "Location",
            field: "rm_room_name",
            minWidth: 300,
            cellRendererFramework: (params) => {
                const { rm_room_name, rm_roomtype_name, rm_insidebuildblock_name, rm_floor_name } = params.data;
                return (
                    <div>
                        {rm_room_name !== null ?
                            <div>
                                {`${rm_room_name} (${rm_roomtype_name} - ${rm_insidebuildblock_name} - ${rm_floor_name})`}
                            </div> :
                            <div>
                                Location not added
                            </div>}
                    </div>
                );
            }
        },
        { headerName: "complaint status", field: "compalint_status1", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Request Date", field: "assigned_date", autoHeight: true, wrapText: true, minWidth: 180 },
        { headerName: "Rectified Status", field: "cm_rectify_status1", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", autoHeight: true, wrapText: true, minWidth: 200 },
    ])

    const [empName, setempname] = useState([])

    //rectify complaint  click function on click model open and pass data
    const Rectifycomplaintdept = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { complaint_slno } = data[0]
        const getEmployeees = async () => {
            const result = await axioslogin.get(`Rectifycomplit/getAssignEmps/${complaint_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setempname(data)
            }
            else {
                setempname([])
            }
        }
        getEmployeees();
        setdeatial(data)
        setmdopen(1)
        setOpen(true)
    }, [])

    useEffect(() => {
        if (check === 1) {
            const arry = getdata && getdata.filter((val) => {
                return val.compalint_status === 2 ? val : null
            })
            setTabledata(arry)
        }
        else {
            const arrys = getdata && getdata.filter((val) => {
                return val.compalint_status === 1 ? val : null
            })
            setTabledata(arrys)
        }
    }, [check, getdata])


    //get assigned complaint
    useEffect(() => {
        const getRectifycomplit = async (id) => {
            const result = await axioslogin.get(`Rectifycomplit/getRectifycomplit/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setgetdata(data)
            }
            else {
                setgetdata([])
            }
        }
        getRectifycomplit(id);
    }, [count, id])
    //close function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])



    return (
        <Fragment >
            {mdopen !== 0 ? <Rectifymodel open={open} detail={detail}
                setCount={setCount} count={count} setOpen={setOpen}
                empName={empName} setempname={setempname} /> : null}
            <CardMaster
                close={backtoSetting}
                title="Rectify complaint"
            >
                <Box sx={{
                    width: "100%",
                    pl: 1, pt: 0.5, pr: 1, pb: 0.5, flex: 1,
                    display: "flex",
                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    justifyContent: 'center',
                }}>
                    <Box sx={{ width: "13%", pr: 1, mt: 1 }}>
                        <CusCheckBox
                            label="Rectified"
                            color="danger"
                            size="md"
                            name="rectify"
                            value={rectify}
                            checked={rectify}
                            onCheked={updateRecty}
                        />
                    </Box>
                    <Box sx={{ width: "13%", mt: 1 }}>
                        <CusCheckBox
                            label="Not Rectified"
                            color="danger"
                            size="md"
                            name="notRecty"
                            value={notRecty}
                            checked={notRecty}
                            onCheked={updateNotRecty}
                        />
                    </Box>
                </Box>
                <Box sx={{ p: 1 }}>
                    {check === 0 ?
                        <ComplistAgGridcmp
                            columnDefs={column}
                            tableData={getdata}
                            count={count}
                        /> : <ComplistAgGridcmp
                            columnDefs={column}
                            tableData={tabledata}
                            count={count}
                        />
                    }
                </Box>
            </CardMaster>
        </Fragment>
    )
}
export default memo(RectifyCompalint)