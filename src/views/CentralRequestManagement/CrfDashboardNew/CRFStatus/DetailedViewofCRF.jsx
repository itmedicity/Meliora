import { Box, CssVarsProvider, IconButton, Typography } from '@mui/joy'
import { format } from 'date-fns'
import React, { Fragment, memo, Suspense, useCallback, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { GetItemDetailsOfCRFCmp } from '../../ComonComponent/GetItemDetailsOfCRFCmp'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import CustomLoadComp from '../../ComonComponent/Components/CustomLoadComp';
const DashboardApprovalView = React.lazy(() => import("./DashboardApprovalView"))
const CrfDetailSearchComp = React.lazy(() => import("../Components/CrfDetailSearchComp"))

const DetailedViewofCRF = ({ setFlag, disData, setDisData, tableData }) => {

    const [modalData, setModalData] = useState([])
    const [modalopen, setModalOpen] = useState(false)
    const [modFlag, setModFlag] = useState(0)
    const [datacolData, setDataColData] = useState([])
    const [reqItems, setReqItems] = useState([])
    const [approveTableData, setApproveTableData] = useState([])
    const [poDetails, setPoDetails] = useState([])
    const [imagearray, setImageArry] = useState([])

    const viewDetails = useCallback(async (req_slno) => {
        const getImage = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                    });

                    const savedFiles = fileUrls.map((val) => {
                        const parts = val.split('/');
                        const fileNamePart = parts[parts.length - 1];
                        const obj = {
                            imageName: fileNamePart,
                            url: val
                        }
                        return obj
                    })
                    setImageArry(savedFiles)
                } else {
                    setImageArry([])
                }
            } catch (error) {
                warningNotify("An error occurred while getting data");
            }
        }
        GetItemDetailsOfCRFCmp(req_slno, setReqItems, setApproveTableData, setPoDetails)
        const checkDataCollectComplete = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/CRFRegisterApproval/DataCollectComplete/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const yy = data?.filter((val) => val.crf_dept_status === 1)
                    if (yy.length !== 0) {
                        const datas = yy.map((val) => {
                            const obj = {
                                req_slno: val.crf_requst_slno,
                                crf_dept_remarks: val.crf_dept_remarks,
                                datagive_user: val.datagive_user,
                                data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                                reqest_one: val.reqest_one,
                                req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
                                create_date: val.create_date,
                                update_date: val.update_date,
                                crf_req_remark: val.crf_req_remark,
                                data_coll_image_status: val.data_coll_image_status,
                                crf_data_collect_slno: val.crf_data_collect_slno,
                            }
                            return obj
                        })
                        setDataColData(datas)
                    }
                }
                else {
                    setDataColData([])
                }
            } catch (error) {
                warningNotify("An error occurred while getting data");
            }
        }
        const getDetails = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/newCRFRegister/AprvlDetailsView/${req_slno}`,);
                const { success, data, message } = result.data;
                if (success === 1) {
                    const newData = data?.map((val) => {
                        return {
                            req_slno: val.req_slno,
                            actual_requirement: val.actual_requirement !== null ? val.actual_requirement : 'Nil',
                            needed: val.needed !== null ? val.needed : 'Nil',
                            request_deptsec_slno: val.request_deptsec_slno,
                            req_deptsec: val.req_deptsec.toLowerCase(),
                            user_deptsection: val.user_deptsection.toLowerCase(),
                            user_deptsec: val.user_deptsec,
                            em_name: val.create_user.toLowerCase(),
                            category: val.category,
                            location: val.location,
                            image_status: val.image_status,
                            req_date: val.create_date,
                            expected_date: val.expected_date,
                            incharge_approve: val.incharge_approve,
                            incharge_req: val.incharge_req,
                            incharge_remarks: val.incharge_remarks !== null ? val.incharge_remarks : "Not Updated",
                            inch_detial_analysis: val.inch_detial_analysis,
                            incharge_apprv_date: val.incharge_apprv_date,
                            incharge_user: val.incharge_user !== null ? val.incharge_user.toLowerCase() : '',
                            incharge: val.incharge_approve === 1 ? "Approved" : val.incharge_approve === 2 ? "Rejected" :
                                val.incharge_approve === 3 ? "On-Hold" : "Not Done",
                            hod_req: val.hod_req,
                            hod_approve: val.hod_approve,
                            hod_remarks: val.hod_remarks !== null ? val.hod_remarks : "Not Updated",
                            hod_detial_analysis: val.hod_detial_analysis,
                            hod_approve_date: val.hod_approve_date,
                            hod_user: val.hod_user !== null ? val.hod_user.toLowerCase() : '',
                            hod: val.hod_approve === 1 ? "Approved" : val.hod_approve === 2 ? "Rejected" :
                                val.hod_approve === 3 ? "On-Hold" : "Not Done",
                            dms_req: val.dms_req,
                            dms_approve: val.dms_approve,
                            dms_remarks: val.dms_remarks !== null ? val.dms_remarks : "Not Updated",
                            dms_detail_analysis: val.dms_detail_analysis,
                            dms_approve_date: val.dms_approve_date,
                            dms_user: val.dms_user !== null ? val.dms_user.toLowerCase() : '',
                            dms: val.dms_approve === 1 ? "Approved" : val.dms_approve === 2 ? "Rejected" :
                                val.dms_approve === 3 ? "On-Hold" : "Not Done",
                            ms_approve_req: val.ms_approve_req,
                            ms_approve: val.ms_approve,
                            ms_approve_remark: val.ms_approve_remark !== null ? val.ms_approve_remark : "Not Updated",
                            ms_detail_analysis: val.ms_detail_analysis,
                            ms_approve_date: val.ms_approve_date,
                            ms_approve_user: val.ms_approve_user !== null ? val.ms_approve_user.toLowerCase() : '',
                            ms: val.ms_approve === 1 ? "Approved" : val.ms_approve === 2 ? "Rejected" :
                                val.ms_approve === 3 ? "On-Hold" : "Not Done",
                            manag_operation_req: val.manag_operation_req,
                            manag_operation_approv: val.manag_operation_approv,
                            manag_operation_remarks: val.manag_operation_remarks !== null ? val.manag_operation_remarks : "Not Updated",
                            om_detial_analysis: val.om_detial_analysis,
                            om_approv_date: val.om_approv_date,
                            manag_operation_user: val.manag_operation_user !== null ? val.manag_operation_user.toLowerCase() : '',
                            om: val.manag_operation_approv === 1 ? "Approved" : val.manag_operation_approv === 2 ? "Rejected" :
                                val.manag_operation_approv === 3 ? "On-Hold" : "Not Done",
                            senior_manage_req: val.senior_manage_req,
                            senior_manage_approv: val.senior_manage_approv,
                            senior_manage_remarks: val.senior_manage_remarks !== null ? val.senior_manage_remarks : "Not Updated",
                            smo_detial_analysis: val.smo_detial_analysis,
                            som_aprrov_date: val.som_aprrov_date,
                            senior_manage_user: val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : '',
                            smo: val.senior_manage_approv === 1 ? "Approved" : val.senior_manage_approv === 2 ? "Rejected" :
                                val.senior_manage_approv === 3 ? "On-Hold" : "Not Done",
                            gm_approve_req: val.gm_approve_req,
                            gm_approve: val.gm_approve,
                            gm_approve_remarks: val.gm_approve_remarks !== null ? val.gm_approve_remarks : "Not Updated",
                            gm_detial_analysis: val.gm_detial_analysis,
                            gm_approv_date: val.gm_approv_date,
                            gm_user: val.gm_user !== null ? val.gm_user.toLowerCase() : '',
                            gm: val.gm_approve === 1 ? "Approved" : val.gm_approve === 2 ? "Rejected" :
                                val.gm_approve === 3 ? "On-Hold" : "Not Done",
                            md_approve_req: val.md_approve_req,
                            md_approve: val.md_approve,
                            md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : "Not Updated",
                            md_detial_analysis: val.md_detial_analysis,
                            md_approve_date: val.md_approve_date,
                            md_user: val.md_user !== null ? val.md_user.toLowerCase() : '',
                            md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Rejected" :
                                val.md_approve === 3 ? "On-Hold" : "Not Done",
                            ed_approve_req: val.ed_approve_req,
                            ed_approve: val.ed_approve,
                            ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                            ed_detial_analysis: val.ed_detial_analysis,
                            ed_approve_date: val.ed_approve_date,
                            ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',
                            ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Rejected" :
                                val.ed_approve === 3 ? "On-Hold" : "Not Done",
                            hod_image: val.hod_image,
                            dms_image: val.dms_image,
                            ms_image: val.ms_image,
                            mo_image: val.mo_image,
                            smo_image: val.smo_image,
                            gm_image: val.gm_image,
                            md_image: val.md_image,
                            ed_image: val.ed_image,
                        }
                    })
                    setModalData(newData[0])
                    setModalOpen(true)
                    setModFlag(1)
                } else {
                    warningNotify(message)
                    setModalOpen(false)
                    setModFlag(0)
                }
            } catch (error) {
                warningNotify("An error occurred while getting data");
            }
        };
        getDetails(req_slno)
        getImage(req_slno)
        checkDataCollectComplete(req_slno)
    }, [])

    const handleClose = useCallback(() => {
        setModalOpen(false)
        setModFlag(0)
        setModalData([])
    }, [])

    return (
        <Fragment>
            <Suspense fallback={<CustomLoadComp />}>
                {modFlag === 1 ?
                    <DashboardApprovalView modalData={modalData} handleClose={handleClose} open={modalopen}
                        datacolData={datacolData} imagearray={imagearray} reqItems={reqItems} approveTableData={approveTableData}
                        poDetails={poDetails}
                    /> : null}
            </Suspense>
            < Box sx={{ height: window.innerHeight - 160, flexWrap: 'wrap', bgcolor: 'white', }}>
                <CrfDetailSearchComp setFlag={setFlag} setDisData={setDisData} tableData={tableData} />
                <Box sx={{ bgcolor: 'white', pt: 0.5, overflow: 'auto', }}>
                    {disData.length !== 0 ?
                        <Box sx={{ width: '100%' }}>
                            <Box display="flex" justifyContent="space-between" sx={{
                                bgcolor: '#41729F', flexWrap: 'nowrap', py: 0.5, position: 'sticky',
                                top: 0, zIndex: 1,
                            }}>
                                <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 550, fontSize: 12, color: 'white' }}>Sl.No</Typography>
                                <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Req.No</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Req.Date</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Dpt Section</Typography>
                                <Typography sx={{ width: 250, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Purpose</Typography>
                                <Typography sx={{ width: 250, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Justification</Typography>
                                <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Location</Typography>
                                <Typography sx={{ width: 100, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Expected Date</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white', mx: 0.5 }}>Approval Status</Typography>
                            </Box>
                            <Virtuoso
                                style={{ height: window.innerHeight - 282, width: '100%', }}
                                data={disData}
                                itemContent={(index, val) => (
                                    <React.Fragment key={index}>
                                        <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}>
                                            <Typography sx={{ width: 40, textAlign: 'center', fontSize: 12, my: 1 }}>{index + 1}</Typography>
                                            <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}>{"CRF/TMC/" + val.req_slno}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.req_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1, textTransform: 'capitalize' }}>{val.req_deptsec}</Typography>
                                            <Typography sx={{ width: 250, textAlign: 'left', fontSize: 12, my: 1 }}>{val.actual_requirement}</Typography>
                                            <Typography sx={{ width: 250, textAlign: 'left', fontSize: 12, my: 1 }}>{val.needed}</Typography>
                                            <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>{val.location}</Typography>
                                            <Typography sx={{ width: 100, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.expected_date), 'dd-MM-yyyy')}</Typography>
                                            <Box sx={{
                                                width: 150, cursor: 'pointer', m: 0.5, display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', pr: 0.5,
                                            }} >
                                                < CssVarsProvider >
                                                    <IconButton
                                                        sx={{
                                                            fontSize: 12, height: '25px', minHeight: '25px', lineHeight: '1.2',
                                                            bgcolor: '#BFD7ED', width: '150px', my: 0.5,
                                                            '&:hover': {
                                                                bgcolor: '#BFD7ED',
                                                            },
                                                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                        }}
                                                        onClick={() => viewDetails(val.req_slno)}
                                                    >
                                                        {val.now_who}&nbsp;&nbsp;{val.now_who_status === 1 ? "Approved" : val.now_who_status === 2 ? "Rejected" :
                                                            val.now_who_status === 3 ? "On-Hold" : ""}
                                                    </IconButton>

                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                    </React.Fragment>
                                )}
                            />
                        </Box>
                        :
                        <Box sx={{
                            display: 'flex', justifyContent: 'center', fontSize: 30, opacity: 0.5,
                            pt: 10, color: 'grey'
                        }}>
                            No Report Found
                        </Box>
                    }
                </Box>
            </Box >
        </Fragment >
    )
}

export default memo(DetailedViewofCRF)