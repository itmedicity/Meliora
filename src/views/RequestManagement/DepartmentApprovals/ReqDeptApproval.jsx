import { Box } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getInchargeHodData } from 'src/redux/actions/InchargeHodChecks.action'
import { getReqApprovDept } from 'src/redux/actions/ReqAppovDept.action'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import DeptApprovModel from './DeptApprovModel'
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import { axioslogin } from 'src/views/Axios/Axios'

const ReqDeptApproval = () => {
    /*** Initializing */
    const history = useHistory();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)
    //redux for geting login id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    //redux for geting login section id
    const secid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    const [deptsecArry, setdeptSecArry] = useState([])
    console.log(deptsecArry);

    useEffect(() => {
        const getdetptsections = async (id) => {
            const result = await axioslogin.get(`/common/getdeptHoddeptsec/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                console.log(data);
                const xx = data.map((val) => {
                    return val.dept_section
                })
                setdeptSecArry(xx)
            }
        }
        getdetptsections(id)
    }, [id])



    useEffect(() => {
        dispatch(getInchargeHodData(id))
        dispatch(getReqApprovDept(deptsecArry))
    }, [dispatch, id, deptsecArry, count])

    const HodIncharge = useSelector((state) => {
        return state.setInchargeHodData.InchargeHoddata
    })

    const [isIncharge, setincharge] = useState(0)
    const [ishod, setHod] = useState(0)

    const tabledata = useSelector((state) => {
        return state.setReqApprvDept.ReqApprvDeptdata
    })

    useEffect(() => {
        if (HodIncharge.length !== 0) {
            const { hod, incharge } = HodIncharge[0]
            setincharge(incharge)
            setHod(hod)
        }
    }, [HodIncharge])

    const hod = tabledata.filter((val) => {
        return val.hod_req === 1 && val.incharge_approve === 1
    })

    //column title setting
    const [columnHod] = useState([
        {
            headerName: 'Action', minWidth: 80, cellRenderer: params => {
                if (params.data.manag_operation_approv !== null) {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <PublishedWithChangesOutlinedIcon />
                    </IconButton>
                } else {
                    return <IconButton onClick={() => rowSelect(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="Approval">
                            <PublishedWithChangesOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }
        },
        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Req. Date", field: "req_date", minWidth: 250 },
        { headerName: "OM Approve Status", field: "manag_operation_approvs", minWidth: 150, wrapText: true, },
        { headerName: "OM Remarks", field: "manag_operation_remarks", minWidth: 300, wrapText: true, },
        { headerName: "SMO Approve Status", field: "senior_manage_approvs", minWidth: 150, wrapText: true, },
        { headerName: "SMO Remarks", field: "senior_manage_remarks", minWidth: 300, wrapText: true, },
        { headerName: "CAO/COO/MD Approve Status", field: "cao_approves", minWidth: 150, wrapText: true, },
        { headerName: "CAO/COO/MD Remarks", field: "cao_approve_remarks", minWidth: 300, wrapText: true, },
        { headerName: "ED/MD Approve Status", field: "ed_approves", minWidth: 150, wrapText: true, },
        { headerName: "ED/MD Remarks", field: "ed_approve_remarks", minWidth: 300, wrapText: true, },

    ])
    const [model, setmodel] = useState(0)
    const [open, setOpen] = useState(false);
    const [datas, setdatas] = useState([])


    //Data set for edit
    const rowSelect = useCallback((params) => {
        setOpen(true)
        const data = params.api.getSelectedRows()
        setdatas(data);
        setmodel(1)
    }, [])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])

    return (
        <CardCloseOnly
            title="Hod Approval"
            close={backtoSetting}
        >
            {model === 1 ?
                <DeptApprovModel open={open}
                    setOpen={setOpen}
                    isIncharge={isIncharge}
                    ishod={ishod}
                    datas={datas}
                    count={count}
                    setCount={setCount}
                    id={id} /> : null}
            <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={columnHod}
                    tableData={hod}
                />
            </Box>
        </CardCloseOnly>
    )
}

export default memo(ReqDeptApproval)