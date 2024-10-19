import { Box } from '@mui/joy'
import { Grid, Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import PurchaseGridView from '../Components/PurchaseGridView'
import { format } from 'date-fns'
import CrfStoreDetailedView from '../CRFPurchaseStatus/CrfStoreDetailedView'
import { axioslogin } from 'src/views/Axios/Axios'
import DeliveryMarkingTable from './DeliveryMarkingTable'
import PODetailsModalView from '../../ItemCheckingCRS/Component/PODetailsModalView'
import StoreAckTableView from './StoreAckTableView'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import CompletedCRFView from './CompletedCRFView'
import itemcheckimg from '../../../../assets/images/CRF/itemcheck.png'
import pendingPoimg from '../../../../assets/images/CRF/poPending.png'
import delvMarkimg from '../../../../assets/images/CRF/deliverymark.png'
import partiallyimg from '../../../../assets/images/CRF/partiallyRcv.png'
import fullyimg from '../../../../assets/images/CRF/fullyRcv.png'
import storeackimg from '../../../../assets/images/CRF/storeack.png'
import userackimg from '../../../../assets/images/CRF/userack.png'
import crfcomimg from '../../../../assets/images/CRF/complete.png'

const CRFStoreStatus = ({ storeData }) => {
    const [crsPending, setCrsPending] = useState([])
    const [storeFlag, setStoreFlag] = useState(0)
    const [tableData, setTableData] = useState([])
    const [disData, setDisData] = useState([])
    const [heading, setHeading] = useState('')
    const [poFlag, setPoFlag] = useState(0)
    const [partiallyRecv, setpartiallyRecv] = useState([])
    const [fullyRecv, setfullyRecv] = useState([])
    const [allDelivered, setAllDelivered] = useState([])
    const [delvFlag, setDelvFlag] = useState(0)
    const [poDetails, setPoDetails] = useState([])
    const [poItems, setPoItems] = useState([])
    const [modalopen, setModalOpen] = useState(false)
    const [modFlag, setModFlag] = useState(0)
    const [storeAck, setstoreAck] = useState([])
    const [userAck, setuserAck] = useState([])
    const [completeCRF, setCompleteCRF] = useState([])
    const [userAckFlag, setUserAckFlag] = useState(0)
    const [ackFlag, setackFlag] = useState(0)
    const [comFlag, setComFlag] = useState(0)

    useEffect(() => {
        const searchdata = {
            from: format(new Date(), 'yyyy-MM-dd 00:00:00'),
            to: format(new Date(), 'yyyy-MM-dd 23:59:59'),
        }
        const getData = async (searchdata) => {
            try {
                const result = await axioslogin.post('/newCRFRegister/delivery', searchdata)
                const { success, data } = result.data
                if (success === 1) {

                    const newData = data?.map((po) => {
                        return {
                            delivery_mark_slno: po.delivery_mark_slno,
                            supplier_name: po.supplier_name,
                            dc_mark_date: po.dc_mark_date,
                            dc_receive_date: po.dc_receive_date,
                            mt_direct: po.mt_direct === 1 ? 'Direct' : '',
                            mt_courier: po.mt_courier === 1 ? 'Courier' : '',
                            package_count: po.package_count,
                            delivered_bill_no: po.delivered_bill_no,
                            delivered_bill_date: po.delivered_bill_date,
                            remarks: po.remarks,
                            received_user: po.received_user,
                        }
                    })
                    setAllDelivered(newData)
                }
            } catch (error) {
                warningNotify("Error fetching Delivery Marking details:", error)
                setAllDelivered([])
            }
        }
        getData(searchdata)

        const getCheckItems = async (searchdata) => {
            try {
                const result = await axioslogin.post('/newCRFRegister/checkItem', searchdata)
                const { success, data } = result.data
                if (success === 1) {
                    const newData = data
                        .filter((po, index, self) =>
                            index === self.findIndex((val) => val.marking_po_slno === po.marking_po_slno))
                        .map((po) => (
                            {
                                marking_po_slno: po.marking_po_slno,
                                po_number: po.po_number,
                                po_date: po.po_date,
                                main_store: po.main_store,
                                expected_delivery: po.expected_delivery === null ? 'Nil' : format(new Date(po.expected_delivery), 'dd-MM-yyyy')
                            }
                        ))
                    setPoDetails(newData)
                    const poItem = data?.map((val) => {
                        return {
                            marking_po_slno: val.marking_po_slno,
                            checking_item_slno: val.checking_item_slno,
                            item_code: val.item_code,
                            item_name: val.item_name,
                            item_qty: val.item_qty,
                            received_qty: val.received_qty,
                        }
                    })
                    setPoItems(poItem)

                } else {
                    setPoItems([])
                }
            } catch (error) {
                warningNotify("Error fetching item details:", error)
                setPoItems([])
            }
        }
        getCheckItems(searchdata)


        const getstoreackDetails = async (searchdata) => {
            try {
                const result = await axioslogin.post('/newCRFRegister/storeack', searchdata)
                const { success, data } = result.data
                if (success === 1) {
                    setstoreAck(data)
                } else {
                    setstoreAck([])
                }
            } catch (error) {
                warningNotify("Error fetching acknowledgment details:", error)
                setstoreAck([])
            }
        }
        getstoreackDetails(searchdata)

        const getUserackDetails = async (searchdata) => {
            try {
                const result = await axioslogin.post('/newCRFRegister/userack', searchdata)
                const { success, data } = result.data
                if (success === 1) {
                    setuserAck(data)
                } else {
                    setuserAck([])
                }
            } catch (error) {
                warningNotify("Error fetching acknowledgment details:", error)
                setuserAck([])
            }
        }
        getUserackDetails(searchdata)

        const getCompletedCRFDetails = async (searchdata) => {
            try {
                const result = await axioslogin.post('/newCRFRegister/compCRF', searchdata)
                const { success, data } = result.data
                if (success === 1) {
                    setCompleteCRF(data)
                } else {
                    setCompleteCRF([])
                }
            } catch (error) {
                warningNotify("Error fetching acknowledgment details:", error)
                setCompleteCRF([])
            }
        }
        getCompletedCRFDetails(searchdata)

    }, [])
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
                        crm_purchase_slno: po.crm_purchase_slno,
                        po_detail_slno: po.po_detail_slno,
                        po_to_supplier: po.po_to_supplier,
                        po_to_supplier_date: po.po_to_supplier_date,
                        po_no: po.po_number,
                        po_date: po.po_date,
                        supplier_name: capitalizeWords(po.supplier_name),
                        storeName: capitalizeWords(po.main_store),
                        sub_store_name: capitalizeWords(po.sub_store_name),
                        po_delivery: capitalizeWords(po.po_delivery),
                        po_types: po.po_type === 'S' ? 'Stock Order' : 'Specific',
                        po_amount: po.po_amount,
                        po_expiry: po.po_expiry ? format(new Date(po.po_expiry), 'dd-MM-yyyy') : 'Not Updated',
                        expected_delvery: po.expected_delivery ? format(new Date(po.expected_delivery), 'dd-MM-yyyy') : 'Not Updated',
                        crs_store_code: po.crs_store_code,
                        store_recieve: po.store_recieve,
                        store_user: po.store_user !== null ? po.store_user.toLowerCase() : 'Not Updated',
                        store_receive_date: po.store_receive_date,
                        sub_store_recieve: po.sub_store_recieve,
                        now_who: po.sub_store_recieve === 1 ? "Store Receive" :
                            po.store_recieve === 0 ? "CRS Store Receive" :
                                po.store_recieve === 1 ? "Transfer To Store" :
                                    po.po_to_supplier === 1 ? "CRF Acknowledged" : '',
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
                    item_receive_status: val.item_receive_status,
                    grn_qnty: val.grn_qnty,
                    received_qnty: val.received_qnty,
                    grn_no: val.grn_no
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
            const crspending = combinedData?.filter((val) => {
                return val.po_to_supplier === 1 && val.store_recieve === null
            })
            setCrsPending(crspending)
            const partially = combinedData?.filter((val) => {
                return val.po_to_supplier === 1 && val.store_recieve === 0
            })
            setpartiallyRecv(partially)

            const fully = combinedData?.filter((val) => {
                return val.po_to_supplier === 1 && val.store_recieve === 1
            })
            setfullyRecv(fully)
        }
    }, [storeData])

    const crsPendingView = useCallback(() => {
        setTableData(crsPending)
        setDisData(crsPending)
        setHeading("CRS Receive Pending")
        setStoreFlag(1)
        setPoFlag(1)
        setDelvFlag(0)
    }, [crsPending])

    const deliveryMarkingToday = useCallback(() => {
        if (allDelivered.length !== 0) {
            setTableData(allDelivered)
            setDisData(allDelivered)
            setHeading("Delivery Marking Details")
            setStoreFlag(0)
            setPoFlag(0)
            setDelvFlag(1)
        } else {
            infoNotify("No Report Found")
        }
    }, [allDelivered])

    const itemCheckView = useCallback(() => {
        if (poDetails.length !== 0) {
            setModalOpen(true)
            setModFlag(1)
        } else {
            setModalOpen(false)
            setModFlag(0)
        }
    }, [poDetails])


    const partiallyReceived = useCallback(() => {
        if (partiallyRecv.length !== 0) {
            setTableData(partiallyRecv)
            setDisData(partiallyRecv)
            setHeading("Partially Received")
            setStoreFlag(1)
            setPoFlag(1)
            setDelvFlag(0)
        } else {
            infoNotify("No Report Found")
        }
    }, [partiallyRecv])

    const fullyReceived = useCallback(() => {
        if (fullyRecv.length !== 0) {
            setTableData(fullyRecv)
            setDisData(fullyRecv)
            setHeading("Fully Received")
            setStoreFlag(1)
            setPoFlag(1)
            setDelvFlag(0)
        } else {
            infoNotify("No Report Found")
        }
    }, [fullyRecv])

    const storeAcknowledge = useCallback(() => {
        if (storeAck.length !== 0) {
            setDisData(storeAck)
            setHeading("Store Acknowledgement")
            setUserAckFlag(1)
            setackFlag(1)
        } else {
            infoNotify("No Report Found")
            setUserAckFlag(0)
            setackFlag(0)
        }
    }, [storeAck])

    const userAcknowledge = useCallback(() => {
        if (userAck.length !== 0) {
            setDisData(userAck)
            setHeading("User Acknowledgement")
            setUserAckFlag(2)
            setackFlag(1)
        } else {
            infoNotify("No Report Found")
            setUserAckFlag(0)
            setackFlag(0)
        }

    }, [userAck])

    const completedCRFView = useCallback(() => {
        if (completeCRF.length !== 0) {
            setDisData(completeCRF)
            setHeading("Today Completed CRF")
            setComFlag(1)
        } else {
            infoNotify("No Report Found")
            setComFlag(0)
        }
    }, [completeCRF])

    const handleClose = useCallback(() => {
        setModalOpen(false)
        setModFlag(0)
    }, [setModalOpen])
    return (
        <Fragment>
            {modFlag === 1 ? <PODetailsModalView handleClose={handleClose} open={modalopen} poItems={poItems} poDetails={poDetails} /> : null}
            {poFlag === 1 ? <CrfStoreDetailedView storeFlag={storeFlag} setStoreFlag={setStoreFlag} setPoFlag={setPoFlag} disData={disData}
                setDisData={setDisData} tableData={tableData} heading={heading} /> :
                delvFlag === 1 ? <DeliveryMarkingTable allDelivered={allDelivered} setDelvFlag={setDelvFlag} heading={heading} /> :
                    ackFlag === 1 ? <StoreAckTableView userAckFlag={userAckFlag} setackFlag={setackFlag} disData={disData} heading={heading} /> :
                        comFlag === 1 ? <CompletedCRFView setComFlag={setComFlag} disData={disData} heading={heading} /> :
                            (
                                <Box sx={{ pt: 1.5, px: 0.5, height: window.innerHeight - 160, bgcolor: 'white', flexGrow: 1 }}>
                                    <Paper variant='plain' sx={{ padding: 2, bgcolor: 'white', flexWrap: 'wrap' }}>
                                        <Grid container spacing={2}>
                                            <PurchaseGridView
                                                title="Pending PO (CRF)"
                                                imageView={pendingPoimg}
                                                imName="pending"
                                                viewDataClick={crsPendingView}
                                                allCount={crsPending.length}
                                            />
                                            <PurchaseGridView
                                                title="Today Delivery Marking"
                                                imageView={delvMarkimg}
                                                imName="delv"
                                                viewDataClick={deliveryMarkingToday}
                                                allCount={allDelivered.length}
                                            />
                                            <PurchaseGridView
                                                title="Total Item/Bill Checked"
                                                imageView={itemcheckimg}
                                                imName="item"
                                                viewDataClick={itemCheckView}
                                                allCount={poDetails.length}
                                            />
                                            <PurchaseGridView
                                                title="Partially Received"
                                                imageView={partiallyimg}
                                                imName="part"
                                                viewDataClick={partiallyReceived}
                                                allCount={partiallyRecv.length}
                                            />
                                            <PurchaseGridView
                                                title="Fully Received"
                                                imageView={fullyimg}
                                                imName="crs"
                                                viewDataClick={fullyReceived}
                                                allCount={fullyRecv.length}
                                            />
                                            <PurchaseGridView
                                                title="Today Store Acknowledged"
                                                imageView={storeackimg}
                                                imName="strack"
                                                viewDataClick={storeAcknowledge}
                                                allCount={storeAck.length}
                                            />
                                            <PurchaseGridView
                                                title="Today User Acknowledged"
                                                imageView={userackimg}
                                                imName="userack"
                                                viewDataClick={userAcknowledge}
                                                allCount={userAck.length}
                                            />
                                            <PurchaseGridView
                                                title="Today Completed CRF"
                                                imageView={crfcomimg}
                                                imName="crf"
                                                viewDataClick={completedCRFView}
                                                allCount={completeCRF.length}
                                            />
                                        </Grid>
                                    </Paper>
                                </Box>
                            )
            }
        </Fragment>
    )
}
export default memo(CRFStoreStatus)