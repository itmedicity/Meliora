import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { editicon } from 'src/color/Color'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import CardMaster from 'src/views/Components/CardMaster'
import ComplistAgGridcmp from 'src/views/Components/ComplistAgGridcmp'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { IconButton } from '@mui/material';
import { Fragment } from 'react'
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
            headerName: 'Rectify', minWidth: 120,
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
            headerName: "SlNo",

            field: "complaint_slno"
        },
        { headerName: "Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 350 },
        { headerName: "Department", field: "sec_name", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Request Type", field: "req_type_name", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Complaint Type", field: "complaint_type_name", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Hic Policy", field: "hic_policy_name", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Assign emp", field: "em_name", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true },
        { headerName: "complaint status", field: "compalint_status1", autoHeight: true, wrapText: true, width: 300 },
        { headerName: "Req.Date", field: "assigned_date", autoHeight: true, wrapText: true, width: 300 },
        { headerName: "Rectified Status", field: "cm_rectify_status1", autoHeight: true, wrapText: true, width: 290 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", autoHeight: true, wrapText: true, width: 280 },


    ])
    //rectify complaint  click function on click model open and pass data
    const Rectifycomplaintdept = useCallback((params) => {
        const data = params.api.getSelectedRows()
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
        const getRectifycomplit = async () => {
            const result = await axioslogin.get(`Rectifycomplit/getRectifycomplit/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setgetdata(data)
            }
            else {
                setgetdata([])
            }
        }
        getRectifycomplit();
    }, [count, id])
    //close function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])



    return (
        <Fragment >
            {mdopen !== 0 ? <Rectifymodel open={open} detail={detail}
                setCount={setCount} count={count} setOpen={setOpen} /> : null}
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
export default RectifyCompalint