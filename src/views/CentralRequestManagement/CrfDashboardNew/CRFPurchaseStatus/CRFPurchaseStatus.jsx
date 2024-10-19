import { Box } from '@mui/joy';
import { Grid, Paper } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import PurchaseGridView from '../Components/PurchaseGridView';
import ackimg from '../../../../assets/images/CRF/prchseAck.png'
import qcallimg from '../../../../assets/images/CRF/quocall.png'
import qnegoimg from '../../../../assets/images/CRF/qnegot.png'
import qfiximg from '../../../../assets/images/CRF/quofix.png'
import poprepimg from '../../../../assets/images/CRF/poprepare.png'
import pocompimg from '../../../../assets/images/CRF/pocomplete.png'
import poapprove from '../../../../assets/images/CRF/poapprove.png'
import apprvManager from '../../../../assets/images/CRF/apprv2.png'
import apprvDirect from '../../../../assets/images/CRF/apprv3.png'

import CrfPurchaseDetailedView from './CrfPurchaseDetailedView';
import CrfStoreDetailedView from './CrfStoreDetailedView';
import { format } from 'date-fns';
import { infoNotify } from 'src/views/Common/CommonCode';


const CRFPurchaseStatus = ({ purchaseData, storeData }) => {
    const [purchseAck, setPurchseAck] = useState([])
    const [quotCall, setQuotCall] = useState([])
    const [quotNego, setQuotNego] = useState([])
    const [quoFix, setQuoFix] = useState([])
    const [poPrepareList, setPoPrepareList] = useState([])
    const [apprvalPurchase, setApprvalPurchase] = useState([])
    const [apprvalPManager, setApprvalPManager] = useState([])
    const [apprvalDirector, setApprvalDirector] = useState([])
    const [cflag, setCflag] = useState(0)
    const [tableData, setTableData] = useState([])
    const [disData, setDisData] = useState([])
    const [heading, setHeading] = useState('')
    const [poFlag, setPoFlag] = useState(0)

    const [poSupplierPending, setPoSupplierPending] = useState([])
    const [storeFlag, setStoreFlag] = useState(0)

    useEffect(() => {
        if (purchaseData.length !== 0) {
            const newData = purchaseData?.filter((val => val.crf_close !== 1))
            const datas = newData?.map((val) => {
                const obj = {
                    req_slno: val.req_slno,
                    actual_requirement: val.actual_requirement,
                    needed: val.needed,
                    category: val.category,
                    location: val.location,
                    dept_id: val.dept_id,
                    request_deptsec_slno: val.request_deptsec_slno,
                    req_deptsec: val.req_deptsec.toLowerCase(),
                    user_deptsection: val.user_deptsection.toLowerCase(),
                    em_name: val.create_user.toLowerCase(),
                    emergency_flag: val.emergency_flag,
                    emer_type_name: val.emer_type_name,
                    emer_slno: val.emer_slno,
                    emer_type_escalation: val.emer_type_escalation,
                    emergeny_remarks: val.emergeny_remarks,
                    req_date: val.create_date,
                    expected_date: val.expected_date,

                    ack_status: val.ack_status,
                    ack_remarks: val.ack_remarks,
                    ack_user: val.ack_user !== null ? val.ack_user.toLowerCase() : 'Not Updated',
                    ackdate: val.ackdate,

                    quatation_calling_status: val.quatation_calling_status,
                    quatation_calling_remarks: val.quatation_calling_remarks,
                    qcall_user: val.qcall_user !== null ? val.qcall_user.toLowerCase() : 'Not Updated',
                    quatation_calling_date: val.quatation_calling_date,

                    quatation_negotiation: val.quatation_negotiation,
                    quatation_negotiation_remarks: val.quatation_negotiation_remarks,
                    nego_user: val.nego_user !== null ? val.nego_user.toLowerCase() : 'Not Updated',
                    quatation_negotiation_date: val.quatation_negotiation_date,

                    quatation_fixing: val.quatation_fixing,
                    quatation_fixing_remarks: val.quatation_fixing_remarks,
                    fix_user: val.fix_user !== null ? val.fix_user.toLowerCase() : 'Not Updated',
                    quatation_fixing_date: val.quatation_fixing_date,
                    po_prepartion: val.po_prepartion,

                    now_who: val.quatation_fixing === 1 ? "Quotation Fixed" :
                        val.quatation_negotiation === 1 ? "Negotiated the Quotation" :
                            val.quatation_calling_status === 1 ? "Called for Quotations" :
                                val.ack_status === 1 ? "Puchase Acknowledged" : "Not Initiated",

                }
                return obj
            })
            const ackpendingList = datas?.filter((val) => {
                return val.ack_status === null
            })
            setPurchseAck(ackpendingList)

            const QuatPendingList = datas?.filter((val) => {
                return val.quatation_calling_status === 0 && val.ack_status === 1 && val.po_prepartion !== 1
            })
            setQuotCall(QuatPendingList)

            const QuatNegotiatnList = datas?.filter((val) => {
                return val.quatation_negotiation === 0 && val.quatation_calling_status === 1
            })
            setQuotNego(QuatNegotiatnList)

            const quatFinalizeList = datas?.filter((val) => {
                return val.quatation_fixing === 0 && val.quatation_negotiation === 1
            })
            setQuoFix(quatFinalizeList)

            // const PoPendingList = datas?.filter((val) => {
            //     return (val.po_prepartion === 0 && val.quatation_fixing === 1) ||
            //         (val.po_prepartion === 0 && val.quatation_calling_status === 0)
            // })
            // setPoPrepareList(PoPendingList)
        }

    }, [purchaseData])

    useEffect(() => {
        if (storeData.length !== 0) {
            const capitalizeWords = (str) => str ? str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
            const newData = storeData
                .filter((po, index, self) =>
                    index === self.findIndex((val) => val.po_number === po.po_number && val.req_slno === po.req_slno))
                .map((po, ind) => (
                    {
                        slno: ind + 1,
                        req_slno: po.req_slno,
                        po_prepartion: po.po_prepartion,
                        po_complete: po.po_complete,
                        crm_purchase_slno: po.crm_purchase_slno,
                        po_complt_user: po.po_complt_user !== null ? po.po_complt_user.toLowerCase() : 'Not Updated',
                        po_complete_date: po.po_complete_date,
                        po_detail_slno: po.po_detail_slno,
                        po_to_supplier: po.po_to_supplier,
                        po_to_supplier_date: po.po_to_supplier_date,
                        po_no: po.po_number,
                        po_date: po.po_date,
                        supplier_name: capitalizeWords(po.supplier_name),
                        storeName: capitalizeWords(po.main_store),
                        po_delivery: capitalizeWords(po.po_delivery),
                        po_types: po.po_type === 'S' ? 'Stock Order' : 'Specific',
                        po_amount: po.po_amount,
                        po_expiry: po.po_expiry ? format(new Date(po.po_expiry), 'dd-MM-yyyy') : 'Not Updated',
                        expected_delvery: po.expected_delivery ? format(new Date(po.expected_delivery), 'dd-MM-yyyy') : 'Not Updated',
                        approval: (po.po_complete === 1) ? (po.approval_level === 1 ? 'Purchase Dept Approved' :
                            po.approval_level === 2 ? 'Purchase Manager Approved' :
                                po.approval_level === 3 ? "Director's Approved" : 'Not Approved') : "Not Started",
                        aprv_status: po.approval_level,

                        crs_store_code: po.crs_store_code,
                        store_recieve: po.store_recieve,

                        store_user: po.store_user !== null ? po.store_user.toLowerCase() : 'Not Updated',
                        store_receive_date: po.store_receive_date,

                        sub_store_recieve: po.sub_store_recieve,
                        now_who: po.po_complete === 1 ? "PO Completed" :
                            po.po_prepartion === 1 ? "PO Prepared" : '',
                    }));
            const poItems = storeData?.map((val) => {
                const obj = {
                    po_detail_slno: val.po_detail_slno,
                    po_no: val.po_number,
                    item_code: val.item_code,
                    item_name: val.item_name,
                    item_qty: val.item_qty !== null ? val.item_qty : 0,
                    item_rate: val.item_rate !== null ? (val.item_rate) : 0,
                    item_mrp: val.item_mrp !== null ? (val.item_mrp) : 0,
                    tax: val.tax !== null ? val.tax : 'Nil',
                    tax_amount: val.tax_amount !== null ? (val.tax_amount) : 0,
                    net_amount: val.net_amount !== 0 ? (val.net_amount) : 0,
                }
                return obj
            })

            const combinedData = newData?.map(po => {
                const details = poItems?.filter(item => item.po_no === po.po_no && item.po_detail_slno === po.po_detail_slno);
                return {
                    ...po,
                    items: details
                };
            });
            const poCompletePending = combinedData?.filter((val) => {
                return val.po_complete === 0 && val.po_prepartion === 1
            })
            setPoPrepareList(poCompletePending)

            const poApprvaldpt = combinedData?.filter((val) => {
                return val.po_complete === 1 && val.aprv_status === null && val.po_to_supplier === 0
            })
            setApprvalPurchase(poApprvaldpt)

            const poApprvalmanger = combinedData?.filter((val) => {
                return val.po_complete === 1 && val.aprv_status === 1 && val.po_to_supplier === 0
            })
            setApprvalPManager(poApprvalmanger)

            const poApprvaldirec = combinedData?.filter((val) => {
                return val.po_complete === 1 && val.aprv_status === 2 && val.po_to_supplier === 0
            })
            setApprvalDirector(poApprvaldirec)

            // CRF Acknowledgement
            const posup = combinedData?.filter((val) => {
                return val.po_complete === 1 && val.po_to_supplier === 0 && val.aprv_status === 3
            })
            setPoSupplierPending(posup)
        }
    }, [storeData])

    const ackPending = useCallback(() => {
        if (purchseAck.length !== 0) {
            setCflag(1)
            setTableData(purchseAck)
            setDisData(purchseAck)
            setHeading("PO Acknowledgement")
            setPoFlag(0)
            setStoreFlag(0)
        } else {
            infoNotify("No Report Found")
        }
    }, [purchseAck])
    const quotationCall = useCallback(() => {
        if (quotCall.length !== 0) {
            setCflag(1)
            setTableData(quotCall)
            setDisData(quotCall)
            setHeading("Quotation Calling")
            setPoFlag(0)
            setStoreFlag(0)
        } else {
            infoNotify("No Report Found")
        }
    }, [quotCall])
    const quotationNego = useCallback(() => {
        if (quotNego.length !== 0) {
            setCflag(1)
            setTableData(quotNego)
            setDisData(quotNego)
            setHeading("Quotation Negotiation")
            setPoFlag(0)
            setStoreFlag(0)
        } else {
            infoNotify("No Report Found")
        }
    }, [quotNego])
    const quotationFix = useCallback(() => {
        if (quoFix.length !== 0) {
            setCflag(1)
            setTableData(quoFix)
            setDisData(quoFix)
            setHeading("Quotation Approval")
            setPoFlag(0)
            setStoreFlag(0)
        } else {
            infoNotify("No Report Found")
        }
    }, [quoFix])
    const poPreparationView = useCallback(() => {
        if (poPrepareList.length !== 0) {
            setCflag(0)
            setTableData(poPrepareList)
            setDisData(poPrepareList)
            setHeading("PO Preparation ")
            setPoFlag(1)
            setStoreFlag(0)
        } else {
            infoNotify("No Report Found")
        }
    }, [poPrepareList])
    const poPurchaseApproval = useCallback(() => {
        if (apprvalPurchase.length !== 0) {
            setCflag(0)
            setTableData(apprvalPurchase)
            setDisData(apprvalPurchase)
            setHeading("Purchase Approval")
            setPoFlag(1)
            setStoreFlag(0)
        } else {
            infoNotify("No Report Found")
        }
    }, [apprvalPurchase])
    const poMangerApproval = useCallback(() => {
        if (apprvalPManager.length !== 0) {
            setCflag(0)
            setTableData(apprvalPManager)
            setDisData(apprvalPManager)
            setHeading("Purchase Manager Approval")
            setPoFlag(1)
            setStoreFlag(0)
        } else {
            infoNotify("No Report Found")
        }
    }, [apprvalPManager])
    const poDirectorApproval = useCallback(() => {
        if (apprvalDirector.length !== 0) {
            setCflag(0)
            setTableData(apprvalDirector)
            setDisData(apprvalDirector)
            setHeading("Director's Approval")
            setPoFlag(1)
            setStoreFlag(0)
        } else {
            infoNotify("No Report Found")
        }
    }, [apprvalDirector])
    const poSupplierPendingView = useCallback(() => {
        if (poSupplierPending.length !== 0) {
            setCflag(0)
            setTableData(poSupplierPending)
            setDisData(poSupplierPending)
            setHeading("PO to Supplier Pending")
            setPoFlag(1)
            setStoreFlag(0)
        } else {
            infoNotify("No Report Found")
        }
    }, [poSupplierPending])

    return (
        <Fragment>
            {cflag === 1 ?
                <CrfPurchaseDetailedView setCflag={setCflag} disData={disData} setDisData={setDisData} tableData={tableData}
                    heading={heading} /> :
                poFlag === 1 ? <CrfStoreDetailedView storeFlag={storeFlag} setStoreFlag={setStoreFlag} setPoFlag={setPoFlag}
                    disData={disData} setDisData={setDisData} tableData={tableData} heading={heading} /> :
                    (
                        <Box sx={{ pt: 1.5, px: 0.5, height: window.innerHeight - 160, bgcolor: 'white', flexGrow: 1 }}>
                            <Paper variant='plain' sx={{ padding: 2, bgcolor: 'white', flexWrap: 'wrap' }}>
                                <Grid container spacing={2}>
                                    <PurchaseGridView
                                        title="PO Acknowledgement"
                                        imageView={ackimg}
                                        imName="ack"
                                        viewDataClick={ackPending}
                                        allCount={purchseAck.length}
                                    />
                                    <PurchaseGridView
                                        title="Quotation Calling"
                                        imageView={qcallimg}
                                        imName="qcall"
                                        viewDataClick={quotationCall}
                                        allCount={quotCall.length}
                                    />
                                    <PurchaseGridView
                                        title="Quotation Negotiation"
                                        imageView={qnegoimg}
                                        imName="qnego"
                                        viewDataClick={quotationNego}
                                        allCount={quotNego.length}
                                    />
                                    <PurchaseGridView
                                        title="Quotation Approval"
                                        imageView={qfiximg}
                                        imName="qfix"
                                        viewDataClick={quotationFix}
                                        allCount={quoFix.length}
                                    />
                                    <PurchaseGridView
                                        title="PO Preparation"
                                        imageView={poprepimg}
                                        imName="prepare"
                                        viewDataClick={poPreparationView}
                                        allCount={poPrepareList.length}
                                    />
                                    <PurchaseGridView
                                        title="PO Approval Purchase"
                                        imageView={pocompimg}
                                        imName="purchase"
                                        viewDataClick={poPurchaseApproval}
                                        allCount={apprvalPurchase.length}
                                    />
                                    <PurchaseGridView
                                        title="PO Approval Purchase Manager"
                                        imageView={apprvManager}
                                        imName="manager"
                                        viewDataClick={poMangerApproval}
                                        allCount={apprvalPManager.length}
                                    />
                                    <PurchaseGridView
                                        title="PO Approval Directors"
                                        imageView={apprvDirect}
                                        imName="director"
                                        viewDataClick={poDirectorApproval}
                                        allCount={apprvalDirector.length}
                                    />
                                    <PurchaseGridView
                                        title="CRF Acknowledgement"
                                        imageView={poapprove}
                                        imName="posup"
                                        viewDataClick={poSupplierPendingView}
                                        allCount={poSupplierPending.length}
                                    />
                                </Grid>
                            </Paper>
                        </Box>
                    )
            }
        </Fragment >
    )
}
export default memo(CRFPurchaseStatus)