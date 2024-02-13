import React, { useEffect, useState, memo, Fragment } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { getReqRegistListByDept } from 'src/redux/actions/ReqRegisterListByDept.action'
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';

const CrfReqstTableView = ({ count, rowSelect, }) => {

    const dispatch = useDispatch();
    //redux for geting login emp secid
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    useEffect(() => {
        dispatch(getReqRegistListByDept(empsecid))

    }, [dispatch, empsecid, count])

    /**reducer function for total Request */
    const total = useSelector((state) => {
        return state.setRequestListByDeptSec.RequestListall
    })
    const [disData, setDisData] = useState([])

    useEffect(() => {
        if (total.length !== 0) {
            const datas = total.map((val) => {
                const obj = {
                    req_slno: val.req_slno,
                    actual_requirement: val.actual_requirement,
                    needed: val.needed,
                    request_dept_slno: val.request_dept_slno,
                    request_deptsec_slno: val.request_deptsec_slno,
                    category: val.category,
                    location: val.location,
                    emergency: val.emergency,
                    total_approx_cost: val.total_approx_cost,
                    image_status: val.image_status,
                    remarks: val.remarks,
                    req_date: val.req_date,
                    expected_date: val.expected_date,
                    status: val.rm_ndrf === 1 ? "NDRF" : "CRF",
                    incharge_approve: val.incharge_approve,
                    incharge_req: val.incharge_req,
                    incharge: val.incharge_approve === 1 ? "Approved" : val.incharge_approve === 2 ? "Reject" :
                        val.incharge_approve === 3 ? "On-Hold" : "Not Updated",
                    incharge_remark: val.incharge_remarks !== null ? val.incharge_remarks : "Not Updated",
                    hod_approve: val.hod_approve,
                    hod: val.hod_approve === 1 ? "Approved" : val.hod_approve === 2 ? "Reject" :
                        val.hod_approve === 3 ? "On-Hold" : "Not Updated",
                    hod_remarks: val.hod_remarks !== null ? val.hod_remarks : "Not Updated",
                    dms_approve: val.dms_approve,
                    dms: val.dms_approve === 1 ? "Approved" : val.dms_approve === 2 ? "Reject" :
                        val.dms_approve === 3 ? "On-Hold" : "Not Updated",
                    dms_remarks: val.dms_remarks !== null ? val.dms_remarks : "Not Updated",
                    ms_approve: val.ms_approve,
                    ms: val.ms_approve === 1 ? "Approved" : val.ms_approve === 2 ? "Reject" :
                        val.ms_approve === 3 ? "On-Hold" : "Not Updated",
                    ms_approve_remark: val.ms_approve_remark !== null ? val.ms_approve_remark : "Not Updated",
                    manag_operation_approv: val.manag_operation_approv,
                    om: val.manag_operation_approv === 1 ? "Approved" : val.manag_operation_approv === 2 ? "Reject" :
                        val.manag_operation_approv === 3 ? "On-Hold" : "Not Updated",
                    manag_operation_remarks: val.manag_operation_remarks !== null ? val.manag_operation_remarks : "Not Updated",
                    senior_manage_approv: val.senior_manage_approv,
                    smo: val.senior_manage_approv === 1 ? "Approved" : val.senior_manage_approv === 2 ? "Reject" :
                        val.senior_manage_approv === 3 ? "On-Hold" : "Not Updated",
                    senior_manage_remarks: val.senior_manage_remarks !== null ? val.senior_manage_remarks : "Not Updated",
                    cao_approve: val.cao_approve,
                    cao: val.cao_approve === 1 ? "Approved" : val.cao_approve === 2 ? "Reject" :
                        val.cao_approve === 3 ? "On-Hold" : "Not Updated",
                    cao_approve_remarks: val.cao_approve_remarks !== null ? val.cao_approve_remarks : "Not Updated",

                    md_approve: val.md_approve,
                    md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Reject" :
                        val.md_approve === 3 ? "On-Hold" : "Not Updated",
                    md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : "Not Updated",

                    ed_approve: val.ed_approve,
                    ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Reject" :
                        val.ed_approve === 3 ? "On-Hold" : "Not Updated",
                    ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",


                    ndrf_coo: val.ndrf_cao_approve === 1 ? "Approved" : val.ndrf_cao_approve === 2 ? "Reject" :
                        val.ndrf_cao_approve === 3 ? "On-Hold" : "Not Updated",
                    ndrf_coo_remarks: val.ndrf_cao_approve_remarks !== null ? val.ndrf_cao_approve_remarks : "Not Updated",

                    ndrf_ed: val.ndrf_ed_approve === 1 ? "Approved" : val.ndrf_ed_approve === 2 ? "Reject" :
                        val.ndrf_ed_approve === 3 ? "On-Hold" : "Not Updated",
                    ndrf_ed_approve_remarks: val.ndrf_ed_approve_remarks !== null ? val.ndrf_ed_approve_remarks : "Not Updated",

                    ndrf_md: val.ndrf_md_approve === 1 ? "Approved" : val.ndrf_md_approve === 2 ? "Reject" :
                        val.ndrf_md_approve === 3 ? "On-Hold" : "Not Updated",
                    ndrf_md_remarks: val.ndrf_md_approve_remarks !== null ? val.ndrf_md_approve_remarks : "Not Updated",


                }
                return obj
            })
            setDisData(datas)
        }
    }, [total])


    //column title setting
    const [column] = useState([
        {
            headerName: 'Edit', minWidth: 80,
            cellRenderer: params => {
                if (params.data.hod_approve !== null) {
                    return <IconButton disabled
                        sx={{ color: editicon, paddingY: 0.5 }}>
                        <EditOutlinedIcon />
                    </IconButton>
                }
                else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                        onClick={() => rowSelect(params)}>
                        <CustomeToolTip title="Edit">
                            <EditOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }
        },
        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Status", field: "status", minWidth: 120 },
        { headerName: "Purpose", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Justification", field: "needed", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Req. Date", field: "req_date", minWidth: 200 },
        { headerName: "Inch.Status", field: "incharge", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Inch.Remark", field: "incharge_remark", autoHeight: true, minWidth: 250, wrapText: true, },
        { headerName: "Hod.Status", field: "hod", minWidth: 150, wrapText: true, },
        { headerName: "Hod.Remark", field: "hod_remarks", autoHeight: true, minWidth: 250, wrapText: true, },
        { headerName: "DMS.Status", field: "dms", minWidth: 150, wrapText: true, },
        { headerName: "DMS.Remark", field: "dms_remarks", autoHeight: true, minWidth: 250, wrapText: true, },
        { headerName: "MS.Status", field: "ms", minWidth: 150, wrapText: true, },
        { headerName: "MS.Remark", field: "ms_approve_remark", autoHeight: true, minWidth: 250, wrapText: true, },
        { headerName: "OM Status", field: "om", minWidth: 150, wrapText: true, },
        { headerName: "OM.Remark", field: "manag_operation_remarks", autoHeight: true, minWidth: 250, wrapText: true, },
        { headerName: "SMO Status", field: "smo", minWidth: 150, wrapText: true, },
        { headerName: "SMO.Remark", field: "senior_manage_remarks", autoHeight: true, minWidth: 250, wrapText: true, },
        { headerName: "GM Status", field: "cao", minWidth: 180, wrapText: true, },
        { headerName: "GM.Remark", field: "cao_approve_remarks", autoHeight: true, minWidth: 250, wrapText: true, },
        { headerName: "MD  Status", field: "md", minWidth: 150, wrapText: true, },
        { headerName: "MD.Remark", field: "md_approve_remarks", autoHeight: true, minWidth: 250, wrapText: true, },
        { headerName: "ED  Status", field: "ed", minWidth: 150, wrapText: true, },
        { headerName: "ED.Remark", field: "ed_approve_remarks", autoHeight: true, minWidth: 250, wrapText: true, },

        { headerName: "NDRF GM Status", field: "ndrf_coo", minWidth: 180, wrapText: true, },
        { headerName: "NDRF GM.Remark", field: "ndrf_coo_remarks", autoHeight: true, minWidth: 250, wrapText: true, },
        { headerName: "NDRF MD  Status", field: "ndrf_md", autoHeight: true, minWidth: 150, wrapText: true, },
        { headerName: "NDRF MD.Remark", field: "ndrf_md_remarks", autoHeight: true, minWidth: 250, wrapText: true, },
        { headerName: "NDRF ED  Status", field: "ndrf_ed", minWidth: 150, wrapText: true, },
        { headerName: "NDRF ED.Remark", field: "ndrf_ed_approve_remarks", autoHeight: true, minWidth: 250, wrapText: true, },

    ])



    return (
        <Fragment>
            <Box sx={{ pt: 1 }}>
                <CusAgGridMast
                    columnDefs={column}
                    tableData={disData}
                />
            </Box>
        </Fragment>
    )
}

export default memo(CrfReqstTableView)