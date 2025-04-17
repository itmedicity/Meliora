import React, { Fragment, memo, useCallback, useEffect, useMemo, useState, Suspense } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode';
import hodimg from '../../../../assets/images/CRF/HOD.png'
import dmsimg from '../../../../assets/images/CRF/DMS.png'
import msimg from '../../../../assets/images/CRF/MS.png'
import moimg from '../../../../assets/images/CRF/OM.png'
import smoimg from '../../../../assets/images/CRF/SMO.png'
import gmimg from '../../../../assets/images/CRF/GM.png'
import edimg from '../../../../assets/images/CRF/ED.png'
import mdimg from '../../../../assets/images/CRF/MD.png'
import CustomLoadComp from '../../ComonComponent/Components/CustomLoadComp';
const DetailedViewofCRF = React.lazy(() => import("./DetailedViewofCRF"))
const CRFStatusMainComp = React.lazy(() => import("./CRFStatusMainComp"))

const CRFStatusView = ({ crfData, companyData }) => {
    const [flag, setFlag] = useState(0)
    const [tableData, setTableData] = useState([])
    const [disData, setDisData] = useState([])

    const apprvdData = useMemo(() => crfData, [crfData])
    const [crfApprv, setCrfApprv] = useState({
        hod: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0 },
        dms: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0 },
        ms: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0 },
        mo: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0 },
        smo: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0 },
        gm: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0 },
        md: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0 },
        ed: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0 },
    })

    useEffect(() => {
        if (apprvdData?.length) {
            const hodPending = apprvdData?.filter(
                (item) =>
                    item.hod_req === 1 &&
                    item.hod_approve === null &&
                    item.manag_operation_approv === null &&
                    item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    (item.dms_req === 1 && item.dms_approve === null ||
                        item.dms_req === 0 && item.dms_approve === null) &&
                    (item.ms_approve_req === 1 && item.ms_approve === null ||
                        item.ms_approve_req === 0 && item.ms_approve === null)
            );

            const hodClinic = hodPending?.filter((item) => item.dms_req === 1);
            const hodNonClinic = hodPending?.filter((item) => item.dms_req === 0);

            const dmsPending = apprvdData?.filter(
                (item) =>
                    item.dms_req === 1 &&
                    item.dms_approve === null &&
                    item.ms_approve === null &&
                    item.manag_operation_approv === null &&
                    item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    (item.incharge_approve === 1 || item.hod_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            );
            const msPending = apprvdData?.filter(
                (item) =>
                    item.ms_approve_req === 1 &&
                    item.ms_approve === null &&
                    item.manag_operation_approv === null &&
                    item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    (item.incharge_approve === 1 || item.hod_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            );
            const moPending = apprvdData?.filter(
                (item) => item.manag_operation_approv === null &&
                    item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    (item.incharge_approve === 1 || item.hod_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            );
            const moClinic = moPending?.filter((item) => item.dms_req === 1);
            const moNonClinic = moPending?.filter((item) => item.dms_req === 0);

            const smoPending = apprvdData?.filter(
                (item) => item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    (item.incharge_approve === 1 || item.hod_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            );
            const smoClinic = smoPending?.filter((item) => item.dms_req === 1);
            const smoNonClinic = smoPending?.filter((item) => item.dms_req === 0);

            const gmPending = apprvdData?.filter(
                (item) => item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    (item.incharge_approve === 1 || item.hod_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            );
            const gmClinic = gmPending?.filter((item) => item.dms_req === 1);
            const gmNonClinic = gmPending?.filter((item) => item.dms_req === 0);

            const mdPending = apprvdData?.filter(
                (item) => item.md_approve === null &&
                    (item.incharge_approve === 1 || item.hod_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            );
            const mdClinic = mdPending?.filter((item) => item.dms_req === 1);
            const mdNonClinic = mdPending?.filter((item) => item.dms_req === 0);

            const edPending = apprvdData?.filter(
                (item) => item.ed_approve === null &&
                    (item.incharge_approve === 1 || item.hod_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            );
            const edClinic = edPending?.filter((item) => item.dms_req === 1);
            const edNonClinic = edPending?.filter((item) => item.dms_req === 0);

            setCrfApprv({
                hod: {
                    pending: hodPending?.length,
                    clinic: hodClinic?.length,
                    nonClinic: hodNonClinic?.length,
                    title: "HOD",
                    imageView: hodimg,
                    imName: "hod",
                    id: 1
                },
                dms: {
                    pending: dmsPending?.length,
                    clinic: dmsPending?.length,
                    nonClinic: 0,
                    title: companyData?.dms_status_name,
                    imageView: dmsimg,
                    imName: "dms",
                    id: 2
                },
                ms: {
                    pending: msPending?.length,
                    clinic: msPending?.length,
                    nonClinic: 0,
                    title: companyData?.ms_status_name,
                    imageView: msimg,
                    imName: "ms",
                    id: 3
                },
                mo: {
                    pending: moPending?.length,
                    clinic: moClinic?.length,
                    nonClinic: moNonClinic?.length,
                    title: companyData?.mo_status_name,
                    imageView: moimg,
                    imName: "mo",
                    id: 4,
                },
                smo: {
                    pending: smoPending?.length,
                    clinic: smoClinic?.length,
                    nonClinic: smoNonClinic?.length,
                    title: companyData?.smo_status_name,
                    imageView: smoimg,
                    imName: "smo",
                    id: 5
                },
                gm: {
                    pending: gmPending?.length,
                    clinic: gmClinic?.length,
                    nonClinic: gmNonClinic?.length,
                    title: companyData?.gmo_status_name,
                    imageView: gmimg,
                    imName: "gm",
                    id: 6
                },
                md: {
                    pending: mdPending?.length,
                    clinic: mdClinic?.length,
                    nonClinic: mdNonClinic?.length,
                    title: companyData?.md_status_name,
                    imageView: mdimg,
                    imName: "md",
                    id: 7
                },
                ed: {
                    pending: edPending?.length,
                    clinic: edClinic?.length,
                    nonClinic: edNonClinic?.length,
                    title: companyData?.ed_status_name,
                    imageView: edimg,
                    imName: "ed",
                    id: 8
                }
            });
        }
        else {
            setCrfApprv({
                hod: {
                    pending: 0,
                    clinic: 0,
                    nonClinic: 0,
                    title: "HOD",
                    imageView: hodimg,
                    imName: "hod",
                    id: 1
                },
                dms: {
                    pending: 0,
                    clinic: 0,
                    nonClinic: 0,
                    title: "DMS",
                    imageView: dmsimg,
                    imName: "dms",
                    id: 2
                },
                ms: {
                    pending: 0,
                    clinic: 0,
                    nonClinic: 0,
                    title: "MS",
                    imageView: msimg,
                    imName: "ms",
                    id: 3
                },
                mo: {
                    pending: 0,
                    clinic: 0,
                    nonClinic: 0,
                    title: "MO",
                    imageView: moimg,
                    imName: "mo",
                    id: 4,
                },
                smo: {
                    pending: 0,
                    clinic: 0,
                    nonClinic: 0,
                    title: "SMO",
                    imageView: smoimg,
                    imName: "smo",
                    id: 5
                },
                gm: {
                    pending: 0,
                    clinic: 0,
                    nonClinic: 0,
                    title: "GM",
                    imageView: gmimg,
                    imName: "gm",
                    id: 6
                },
                md: {
                    pending: 0,
                    clinic: 0,
                    nonClinic: 0,
                    title: "MD",
                    imageView: mdimg,
                    imName: "md",
                    id: 7
                },
                ed: {
                    pending: 0,
                    clinic: 0,
                    nonClinic: 0,
                    title: "ED",
                    imageView: edimg,
                    imName: "ed",
                    id: 8
                }
            });
        }
    }, [apprvdData]);

    const viewPednigDetails = useCallback(async (id) => {
        const getDetails = async (id) => {
            try {
                const result = await axioslogin.get(`/CRFDashboard/getApprvPending/Dashboard/${id}`,);
                const { success, data, message } = result.data;
                if (success === 1) {
                    // getAllApprovalPending(setDisData, setTableData, data)
                    const newData = data?.map((val) => {
                        const obj = {
                            req_slno: val.req_slno,
                            actual_requirement: val.actual_requirement !== null ? val.actual_requirement : 'Nil',
                            needed: val.needed !== null ? val.needed : 'Nil',
                            req_deptsec: val.req_deptsec.toLowerCase(),
                            user_deptsection: val.user_deptsection.toLowerCase(),
                            em_name: val.create_user.toLowerCase(),
                            request_deptsec_slno: val.request_deptsec_slno,
                            location: val.location,
                            expected_date: val.expected_date,
                            category: val.category,
                            req_date: val.create_date,
                            user_deptsec: val.user_deptsec,

                            incharge_req: val.incharge_req,
                            incharge_approve: val.incharge_approve,
                            incharge: val.incharge_approve === 1 ? "Approved" : val.incharge_approve === 2 ? "Rejected" :
                                val.incharge_approve === 3 ? "On-Hold" : "Not Done",
                            hod_req: val.hod_req,
                            hod_approve: val.hod_approve,
                            hod: val.hod_approve === 1 ? "Approved" : val.hod_approve === 2 ? "Rejected" :
                                val.hod_approve === 3 ? "On-Hold" : "Not Done",
                            dms_req: val.dms_req,
                            dms_approve: val.dms_approve,
                            dms: val.dms_approve === 1 ? "Approved" : val.dms_approve === 2 ? "Rejected" :
                                val.dms_approve === 3 ? "On-Hold" : val.dms_approve === 4 ? "Approved" : "Not Done",
                            ms_approve_req: val.ms_approve_req,
                            ms_approve: val.ms_approve,
                            ms: val.ms_approve === 1 ? "Approved" : val.ms_approve === 2 ? "Rejected" :
                                val.ms_approve === 3 ? "On-Hold" : val.ms_approve === 4 ? "Approved" : "Not Done",
                            manag_operation_req: val.manag_operation_req,
                            manag_operation_approv: val.manag_operation_approv,
                            om: val.manag_operation_approv === 1 ? "Approved" : val.manag_operation_approv === 2 ? "Rejected" :
                                val.manag_operation_approv === 3 ? "On-Hold" : val.manag_operation_approv === 4 ? "Approved"
                                    : "Not Done",
                            senior_manage_req: val.senior_manage_req,
                            senior_manage_approv: val.senior_manage_approv,
                            smo: val.senior_manage_approv === 1 ? "Approved" : val.senior_manage_approv === 2 ? "Rejected" :
                                val.senior_manage_approv === 3 ? "On-Hold" : val.senior_manage_approv === 4 ? "Approved" : "Not Done",
                            gm_approve_req: val.gm_approve_req,
                            gm_approve: val.gm_approve,
                            gm: val.gm_approve === 1 ? "Approved" : val.gm_approve === 2 ? "Rejected" :
                                val.gm_approve === 3 ? "On-Hold" : val.gm_approve === 4 ? "Approved" : "Not Done",
                            md_approve_req: val.md_approve_req,
                            md_approve: val.md_approve,
                            md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Rejected" :
                                val.md_approve === 3 ? "On-Hold" : val.md_approve === 4 ? "Approved" : "Not Done",
                            ed_approve_req: val.ed_approve_req,
                            ed_approve: val.ed_approve,
                            ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Rejected" :
                                val.ed_approve === 3 ? "On-Hold" : val.ed_approve === 4 ? "Approved" : "Not Done",
                            managing: val.managing_director_approve === 1 ? "Approved" : val.managing_director_approve === 2 ? "Rejected" :
                                val.managing_director_approve === 3 ? "On-Hold" : val.managing_director_approve === 4 ? "Approved" : "Not Done",

                            now_who: val.managing_director_approve !== null ? companyData?.managing_director_name :
                                val.ed_approve !== null ? companyData?.ed_status_name :
                                    val.md_approve !== null ? companyData?.md_status_name :
                                        val.gm_approve !== null ? companyData?.gmo_status_name :
                                            val.senior_manage_approv !== null ? companyData?.smo_status_name :
                                                val.manag_operation_approv !== null ? companyData?.mo_status_name :
                                                    val.ms_approve !== null ? companyData?.ms_status_name :
                                                        val.dms_approve !== null ? companyData?.dms_status_name :
                                                            val.hod_approve !== null ? companyData?.hod_status_name :
                                                                val.incharge_approve !== null ? companyData?.incharge_status_name :
                                                                    "Not Started",
                            now_who_status: val.managing_director_approve !== null ? val.managing_director_approve :
                                val.ed_approve !== null ? val.ed_approve :
                                    val.md_approve !== null ? val.md_approve :
                                        val.gm_approve !== null ? val.gm_approve :
                                            val.senior_manage_approv !== null ? val.senior_manage_approv :
                                                val.manag_operation_approv !== null ? val.manag_operation_approv :
                                                    val.ms_approve !== null ? val.ms_approve :
                                                        val.dms_approve !== null ? val.dms_approve :
                                                            val.hod_approve !== null ? val.hod_approve :
                                                                val.incharge_approve !== null ? val.incharge_approve :
                                                                    0,

                            dept_id: val.dept_id,
                            dept_name: val.dept_name
                        }
                        return obj
                    })
                    setDisData(newData)
                    setTableData(newData)
                    setFlag(1)
                } else if (success === 2) {
                    infoNotify(message)
                    setDisData([])
                    setFlag(0)
                } else {
                    warningNotify(message)
                    setFlag(0)
                }

            } catch (error) {
                warningNotify("An error occurred while getting data");
            }
        };
        getDetails(id)
    }, [companyData]);
    return (
        <Fragment>
            {flag === 1 ?
                <Suspense fallback={<CustomLoadComp />}>
                    <DetailedViewofCRF setFlag={setFlag} disData={disData} setDisData={setDisData} tableData={tableData} companyData={companyData} />
                </Suspense>
                :
                <CRFStatusMainComp crfApprv={crfApprv} viewPednigDetails={viewPednigDetails} />
            }
        </Fragment>
    )
}
export default memo(CRFStatusView)