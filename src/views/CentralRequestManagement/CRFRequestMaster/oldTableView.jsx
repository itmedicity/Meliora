import React, { useEffect, useState, memo, Fragment, useCallback } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import { Box } from '@mui/system'
import { useSelector } from 'react-redux'
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import CrfUserAckModal from './CrfUserAckModal';

const oldTableView = ({ count, rowSelect, userAcknoldge, setCount }) => {

    // const handleAddOrUpdate = () => {
    //     const newData = { text: inputValue };

    //     // Check if the data already exists
    //     const isDuplicate = tableData.some(
    //         (data, index) => data.text === inputValue && index !== editIndex
    //     );

    //     if (isDuplicate) {
    //         setErrorMessage("Data already exists!"); // Show error message if duplicate
    //         return;
    //     }

    //     if (editIndex !== null) {
    //         // Update existing row
    //         const updatedData = tableData.map((data, index) =>
    //             index === editIndex ? newData : data
    //         );
    //         setTableData(updatedData);
    //         setEditIndex(null); // Reset edit index after update
    //     } else {
    //         // Add new row
    //         setTableData([...tableData, newData]);
    //     }

    //     setInputValue(""); // Clear input field
    //     setErrorMessage(""); // Clear any previous error message
    // };




    //redux for geting login emp secid
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })
    const [disData, setDisData] = useState([])
    const [userAckPend, setuserAckPend] = useState([])


    useEffect(() => {
        const getReqDeptsecList = async (empsecid) => {
            const result = await axioslogin.get(`/newCRFRegister/getAllReqBasedDeptreq/${empsecid}`)
            const { success, data } = result.data
            if (success === 1) {
                const datas = data.map((val) => {
                    const obj = {
                        req_slno: val.req_slno,
                        actual_requirement: val.actual_requirement,
                        needed: val.needed,
                        request_dept_slno: val.request_dept_slno,
                        request_deptsec_slno: val.request_deptsec_slno,
                        category: val.category,
                        location: val.location,
                        emergency_flag: val.emergency_flag,
                        emer_slno: val.emer_slno,
                        emergeny_remarks: val.emergeny_remarks,
                        total_approx_cost: val.total_approx_cost,
                        image_status: val.image_status,
                        req_date: val.create_date,
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
                        gm_approve: val.gm_approve,
                        gm: val.gm_approve === 1 ? "Approved" : val.gm_approve === 2 ? "Reject" :
                            val.gm_approve === 3 ? "On-Hold" : "Not Updated",
                        gm_approve_remarks: val.gm_approve_remarks !== null ? val.gm_approve_remarks : "Not Updated",

                        md_approve: val.md_approve,
                        md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Reject" :
                            val.md_approve === 3 ? "On-Hold" : "Not Updated",
                        md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : "Not Updated",

                        ed_approve: val.ed_approve,
                        ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Reject" :
                            val.ed_approve === 3 ? "On-Hold" : "Not Updated",
                        ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",

                        sub_store_recieve: val.sub_store_recieve,
                        user_acknldge: val.user_acknldge,
                        store_receive: val.store_receive,
                        store_recieve_fully: val.store_recieve_fully,
                        po_to_supplier: val.po_to_supplier,
                        substore_slno: val.substore_slno,
                        sub_store_name: val.sub_store_name,
                        now_who: val.sub_store_recieve === 1 ? "Sub Store Receive" :
                            val.store_receive === 1 || 0 ? "CRS Store Receive" :
                                val.po_to_supplier === 1 ? "PO Send to Supplier" :
                                    val.po_complete === 1 ? "PO Completed" :
                                        val.po_prepartion === 1 ? "PO Prepairing" :
                                            val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                    val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                        val.ack_status === 1 ? "Puchase Acknowledged" :
                                                            val.ed_approve !== null ? "ED" :
                                                                val.md_approve !== null ? "MD" :
                                                                    val.gm_approve !== null ? "GM" :
                                                                        val.senior_manage_approv !== null ? "SMO" :
                                                                            val.manag_operation_approv !== null ? "MO" :
                                                                                val.ms_approve !== null ? "MS" :
                                                                                    val.dms_approve !== null ? "DMS" :
                                                                                        val.hod_approve !== null ? "HOD" :
                                                                                            val.incharge_approve !== null ? "INCHARGE" :
                                                                                                "Not Statrted",
                    }
                    return obj
                })

                const userAcklist = datas.filter((val) => {
                    return val.po_to_supplier === 1
                })

                setuserAckPend(userAcklist)
                const NotuserAcklist = datas.filter((val) => {
                    return val.po_to_supplier !== 1
                })
                setDisData(NotuserAcklist)
            } else {
                warningNotify("No CRF registred")
            }
        }
        getReqDeptsecList(empsecid);

    }, [empsecid, count])

    const [ackflag, setAckFlag] = useState(0)
    const [ackflagModal, setAckFlagModal] = useState(false)
    const [ackflagData, setAckFlagData] = useState([])

    const userAckModal = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setAckFlag(1)
        setAckFlagModal(true)
        setAckFlagData(data)
    }, [])


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
        { headerName: "Purpose", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Justification", field: "needed", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Req.Date", field: "req_date", minWidth: 200 },
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
    ])

    //column title setting
    const [columnAck] = useState([
        {
            headerName: 'Acknowledgement', minWidth: 200,
            cellRenderer: params => {
                if (params.data.user_acknldge !== null) {
                    return <IconButton disabled
                        sx={{ color: editicon, paddingY: 0.5 }}>
                        <GppGoodOutlinedIcon />
                    </IconButton>
                }
                else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                        onClick={() => userAckModal(params)}>
                        <CustomeToolTip title="Acknowledgement">
                            <GppGoodOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }
        },
        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
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
    ])


    const ModalClose = useCallback(() => {
        setAckFlag(0)
        setAckFlagModal(false)
        setAckFlagData([])

    }, [])
    console.log(userAckPend);


    return (
        <Fragment>

            {ackflag === 1 ? <CrfUserAckModal
                open={ackflagModal} ackflagData={ackflagData} setAckFlag={setAckFlag}
                count={count} setCount={setCount} setAckFlagData={setAckFlagData} ModalClose={ModalClose}
            /> : null}
            {userAcknoldge === false ?
                <Box sx={{ pt: 1 }}>
                    <CusAgGridMast
                        columnDefs={column}
                        tableData={disData}
                    />
                </Box> :
                <Box sx={{ pt: 1 }}>
                    <CusAgGridMast
                        columnDefs={columnAck}
                        tableData={userAckPend}
                    />
                </Box>
            }

        </Fragment>
    )
}

export default oldTableView