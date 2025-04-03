import React, { useCallback, memo, Fragment, useState, useRef, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { CssVarsProvider, Tooltip, Typography, Box, IconButton } from '@mui/joy';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import { SiAdobeacrobatreader } from "react-icons/si";
import { CrfPdfWithDetails } from '../../CrfPdfView/CrfPdfWithDetail';
import { CrfPdfWithOutDetails } from '../../CrfPdfView/CrfPdfWithOutDetails';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import { keyframes } from '@mui/system';
import { Button } from '@mui/material';
import CountdownTimer from './CountdownTimer';
import { warningNotify } from 'src/views/Common/CommonCode';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { format } from 'date-fns';
import { useQueryClient } from 'react-query';
import CustomToolTipForCRF from '../../ComonComponent/Components/CustomToolTipForCRF';

const ImageDisplayModal = React.lazy(() => import("../../ComonComponent/ImageUploadCmp/ImageDisplayModal"))
const PurchaseModal = React.lazy(() => import("../PurchaseModal"))
const DataCollectnPendingModal = React.lazy(() => import("../../ComonComponent/DataCollectionComp/DataCollectnPendingModal"))

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const PurchaseApprovalButtonCmp = ({ val, company }) => {

    const { ack_status, image_status, now_who, now_who_status, expected_date } = val
    const queryClient = useQueryClient()
    const [puchaseFlag, setpuchaseFlag] = useState(0)
    const [puchaseModal, setpuchaseModal] = useState(false)
    const [puchaseData, setpuchaseData] = useState([])
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imagearray, setImageArry] = useState([])
    const [reqItems, setReqItems] = useState([])
    const [approveTableData, setApproveTableData] = useState([])
    const [poDetails, setPoDetails] = useState([])
    const [newlyApprvdItems, setNewlyApprvdItems] = useState([])

    const [datacollectdata, setDataCollectData] = useState([])
    const [colectDetlCheck, setCollectDetailCheck] = useState(false)
    // already collected datas view
    const [datacolflag, setDataColFlag] = useState(0)
    const [datacolData, setDataColData] = useState([])
    const [allImageList, setAllImageList] = useState([])

    const ModalOpenfctn = useCallback(() => {
        const capitalizeWords = (str) =>
            str ? str
                .toLowerCase()
                .trim()
                .replace(/\s+/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
                : '';

        if (val) {
            setpuchaseData(val);
            const { req_slno } = val
            const getItemDetails = async (req_slno) => {
                try {
                    const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
                    const { success, data } = result.data
                    if (success === 1) {
                        setReqItems(data)
                    } else {
                        setReqItems([])
                    }
                } catch (error) {
                    warningNotify("Error to fetch Data:", error);
                    setReqItems([])
                }
            }
            getItemDetails(req_slno)
            const getApproItemDetails = async (req_slno) => {
                try {
                    const result = await axioslogin.get(`/CRFRegisterApproval/getItemListApproval/${req_slno}`)
                    const { success, data } = result.data
                    if (success === 1) {
                        setApproveTableData(data)
                    } else {
                        setApproveTableData([])
                    }
                } catch (error) {
                    warningNotify("Error to fetch Data:", error);
                    setApproveTableData([])
                }
            }
            getApproItemDetails(req_slno)
            const getNewlyApprvdItems = async (req_slno) => {
                try {
                    const result = await axioslogin.get(`/CRFRegisterApproval/approvedItemsForPo/${req_slno}`)
                    const { succes, dataa } = result.data
                    if (succes === 1) {
                        setNewlyApprvdItems(dataa)
                    } else {
                        setNewlyApprvdItems([])
                    }
                } catch (error) {
                    warningNotify("Error to fetch Data:", error);
                    setNewlyApprvdItems([])
                }
            }
            getNewlyApprvdItems(req_slno)
            const getPODetails = async (req_slno) => {
                try {
                    const result = await axioslogin.get(`/newCRFPurchase/getPoDetails/${req_slno}`)
                    const { success, data } = result.data
                    if (success === 1) {
                        const newData = data?.filter((val) => val.crf_po_complete_status === 0)
                        const poLIst = newData
                            .filter((po, index, self) =>
                                index === self.findIndex((val) => val.po_number === po.po_number && val.req_slno === po.req_slno))
                            .map((po) => (
                                {
                                    po_detail_slno: po.po_detail_slno,
                                    req_slno: po.req_slno,
                                    po_number: po.po_number,
                                    po_date: format(new Date(po.po_date), 'dd-MM-yyyy hh:mm:ss a'),
                                    expected_delivery: po.expected_delivery ? format(new Date(po.expected_delivery), 'dd-MM-yyyy') : 'Not Updated',
                                    supply_store: po.supply_store,
                                    main_store_slno: po.main_store_slno,
                                    storeName: capitalizeWords(po.main_store),
                                    substoreName: capitalizeWords(po.sub_store_name),
                                    store_code: po.store_code,
                                    store_recieve: po.store_recieve,
                                    supplier_name: capitalizeWords(po.supplier_name),
                                    po_type: po.po_type === 'S' ? 'Stock Order' : 'Specific',
                                    po_delivery: po.po_delivery,
                                    po_amount: po.po_amount,
                                    po_to_supplier: po.po_to_supplier,
                                    approval_level: po.approval_level,
                                    po_expiry: po.po_expiry ? format(new Date(po.po_expiry), 'dd-MM-yyyy') : 'Not Updated',
                                }));
                        const poItems = newData?.map((val) => {
                            const obj = {
                                po_detail_slno: val.po_detail_slno,
                                po_number: val.po_number,
                                item_code: val.item_code,
                                item_name: val.item_name,
                                item_qty: val.item_qty !== null ? val.item_qty : 0,
                                item_rate: val.item_rate !== null ? (val.item_rate) : 0,
                                item_mrp: val.item_mrp !== null ? (val.item_mrp) : 0,
                                tax: val.tax !== null ? val.tax : 'Nil',
                                tax_amount: val.tax_amount !== null ? (val.tax_amount) : 0,
                                net_amount: val.net_amount !== 0 ? (val.net_amount) : 0
                            }
                            return obj
                        })
                        const combinedData = poLIst?.map(po => {
                            const details = poItems?.filter(item => item.po_number === po.po_number && item.po_detail_slno === po.po_detail_slno);
                            return {
                                ...po,
                                items: details
                            };
                        });
                        setPoDetails(combinedData)
                    }
                    else {
                        setPoDetails([])
                    }
                } catch (error) {
                    warningNotify("Error to fetch Data:", error);
                    setPoDetails([])
                }
            }
            getPODetails(req_slno)

            const checkDataCollectComplete = async (req_slno) => {
                const result = await axioslogin.get(`/CRFRegisterApproval/DataCollectComplete/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const xx = data?.filter((val) => val.crf_dept_status !== 1)
                    const yy = data?.filter((val) => val.crf_dept_status === 1)
                    queryClient.invalidateQueries('getQuotationData')
                    if (xx.length !== 0) {
                        const datas = xx.map((val) => {
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
                                crf_data_collect_slno: val.crf_data_collect_slno
                            }
                            return obj
                        })
                        setDataCollectData(datas)
                        setpuchaseFlag(2)
                        setCollectDetailCheck(true)
                    }
                    else {
                        setCollectDetailCheck(false)
                        setDataCollectData([])
                        setpuchaseFlag(1)
                        setpuchaseModal(true)
                    }
                    if (yy.length !== 0) {
                        setDataColFlag(1)
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
                    else {
                        setDataColFlag(0)
                        setDataColData([])
                    }
                }
                else {
                    setpuchaseFlag(1)
                    setpuchaseModal(true)
                    setCollectDetailCheck(false)
                }
            }
            checkDataCollectComplete(req_slno)


            const getImage = async (req_slno) => {
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
            }
            getImage(req_slno)

        } else {
            warningNotify("Purchase data is null or undefined");
        }
    }, [val, setpuchaseFlag, setpuchaseModal, setpuchaseData, queryClient]);

    const ViewImage = useCallback(() => {
        const { req_slno } = val
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });
                setAllImageList(fileUrls);
                setImageShowFlag(1)
                setImageShow(true)
            } else {
                setImageShowFlag(0)
                setImageShow(false)
            }
        }
        getImage(req_slno)
    }, [val])
    const PdfDownloadFctn = useCallback(() => {
        const { req_slno } = val
        const ItemDetailsGet = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
            return result.data
        }
        const ItemDetailsApproved = async (req_slno) => {
            const result = await axioslogin.get(`/CRFRegisterApproval/approvedItemsForPo/${req_slno}`)
            return result.data
        }
        ItemDetailsGet(req_slno).then((values) => {
            const { success, data } = values
            if (success === 1) {
                ItemDetailsApproved(req_slno).then((value) => {
                    const { succes, dataa } = value
                    if (succes === 1) {
                        CrfPdfWithDetails(val, data, dataa)
                    }
                    else {
                        const dataa = []
                        CrfPdfWithDetails(val, data, dataa)
                    }
                })
            }
            else if (success === 0) {
                CrfPdfWithOutDetails(val)
            }
            else {
                CrfPdfWithOutDetails(val)
            }
        })

    }, [val])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
    }, [])

    const dataCollectClose = useCallback(() => {
        setpuchaseFlag(0)
        setCollectDetailCheck(false)
        setDataCollectData([])
    }, [])
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const poModalClose = useCallback(() => {
        if (isMounted.current) {
            setpuchaseFlag(0);
            setpuchaseModal(false);
        }
    }, []);

    const approveComp = (val) => {
        return val === 1 ?
            <CssVarsProvider>
                <Tooltip title="Approved" arrow color="success" size="sm" variant="solid" placement="top" >
                    <ThumbUpAltTwoToneIcon sx={{ color: '#18A558', height: 18, width: 18, fontWeight: 650 }} /></Tooltip>
            </CssVarsProvider>
            : <CssVarsProvider>
                <Tooltip title="Approved" arrow color="success" size="sm" variant="solid" placement="top" >
                    <ThumbUpAltTwoToneIcon sx={{ color: '#18A558', height: 18, width: 18, fontWeight: 650 }} /></Tooltip>
            </CssVarsProvider>
        // : val === 2 ?
        //     <CssVarsProvider>
        //         <Tooltip title="Reject" arrow color="danger" size="sm" variant="solid" placement="top">
        //             <ThumbDownTwoToneIcon sx={{ color: '#F83C31', height: 18, width: 18, }} /></Tooltip>
        //     </CssVarsProvider>
        //     : val === 3 ?
        //         <CssVarsProvider>
        //             <Tooltip title="On Hold" arrow color='warning' size="sm" variant="solid" placement="top">
        //                 <PauseCircleFilledTwoToneIcon sx={{ color: '#FF9800', height: 18, width: 18, }} /></Tooltip>
        //         </CssVarsProvider>
        //         : <CssVarsProvider>
        //             <Tooltip title="Pending" arrow color="neutral" size="sm" variant="solid" placement="top">
        //                 < BackHandTwoToneIcon sx={{ color: '#607D8B', height: 18, width: 18, }} /></Tooltip>
        //         </CssVarsProvider>

    }
    const buttonstyle = {
        // textTransform: 'capitalize',
        px: 2,
        fontSize: 12,
        height: '30px',
        minHeight: '30px',
        lineHeight: '1.2',
        color: '#01579b',
        bgcolor: 'white',
        '&:hover': {
            bgcolor: '#F0F4F8',
        },
        borderRadius: 1,
    }
    return (
        < Fragment >
            {puchaseFlag === 2 ?
                <DataCollectnPendingModal open={colectDetlCheck} handleClose={dataCollectClose}
                    datacollectdata={datacollectdata} />
                : puchaseFlag === 1 ? <PurchaseModal open={puchaseModal} puchaseData={puchaseData} poModalClose={poModalClose}
                    setpuchaseData={setpuchaseData} approveTableData={approveTableData}
                    poDetails={poDetails} reqItems={reqItems} datacolflag={datacolflag} datacolData={datacolData}
                    imagearray={imagearray} newlyApprvdItems={newlyApprvdItems} company={company} /> : null
            }

            {imageshowFlag === 1 ? <ImageDisplayModal open={imageshow} handleClose={handleClose} images={allImageList} /> : null}
            <Box sx={{
                display: 'flex', flex: 1, bgcolor: '#e3f2fd', borderRadius: 2, borderTopLeftRadius: 0,
                borderTopRightRadius: 0, justifyContent: 'space-between', flexWrap: 'wrap', pb: 0.7
            }}>
                <Box sx={{ display: 'flex', }} >
                    <Box sx={{ pl: 2, pt: 0.6 }}>
                        <Button
                            variant="contained"
                            startIcon={
                                <AutoModeIcon
                                    sx={{
                                        height: 18,
                                        width: 18,
                                        color: '#0277bd',
                                        animation: `${rotate} 2s linear infinite`
                                    }}
                                />
                            }
                            sx={buttonstyle}
                            onClick={ModalOpenfctn}
                        >
                            Process
                        </Button>
                    </Box>
                    {ack_status === 1 ?
                        <Box sx={{ pl: 0.5, pt: 0.6 }}>
                            <Button
                                variant="contained"
                                startIcon={
                                    <SiAdobeacrobatreader
                                        sx={{
                                            height: 18,
                                            width: 18,
                                            color: '#0277bd',
                                            marginRight: '8px',
                                        }}
                                    />
                                }
                                sx={buttonstyle}
                                onClick={PdfDownloadFctn}
                            >
                                View
                            </Button>
                        </Box>
                        : null
                    }
                </Box>
                <Box sx={{ display: 'flex', }} >
                    <Box sx={{ pl: 2, pt: 0.6 }}>
                        <CountdownTimer endDate={expected_date} />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', pt: 0.6, pr: 2 }} >
                    <Button variant="plain"
                        sx={{
                            px: 1, height: '30px', minHeight: '30px', lineHeight: '1.2',
                            bgcolor: '#0277bd', borderRadius: 1,
                            '&:hover': {
                                bgcolor: '#0277bd'
                            },
                        }}>
                        <Typography sx={{ fontSize: 13, pl: 2, pr: 1, color: 'white', textTransform: 'capitalize', fontWeight: 550 }}>{now_who}</Typography>
                        <Typography sx={{ fontSize: 13, pr: 1, color: 'white', textTransform: 'capitalize', fontWeight: 550 }}>
                            {now_who_status === 1 ? "Approved" : now_who_status === 2 ? "Rejected" :
                                now_who_status === 3 ? "On-Hold" : ""
                            }</Typography>
                    </Button>
                    <Box sx={{ mx: 0.3 }}>
                        <CssVarsProvider>
                            <IconButton
                                sx={{
                                    fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                    width: '15px',
                                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                    bgcolor: 'white',
                                    '&:hover': {
                                        bgcolor: 'white',
                                    },
                                }}
                            > {approveComp(now_who_status)}
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                    {image_status === 1 ?
                        <Box sx={{ mr: 0.5 }}>
                            <CssVarsProvider>
                                <CustomToolTipForCRF title="File View" placement='top'>
                                    <IconButton
                                        sx={{
                                            fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                            color: 'primary.main', bgcolor: 'white', width: '15px',
                                            '&:hover': {
                                                bgcolor: '#F0F4F8',
                                            },
                                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                        }}
                                        onClick={ViewImage} >
                                        <AttachFileIcon fontSize='small' sx={{ color: '#0277bd' }} />
                                    </IconButton>
                                </CustomToolTipForCRF>
                            </CssVarsProvider>

                        </Box> : null
                    }

                </Box>
            </Box >
        </Fragment >
    )
}

export default memo(PurchaseApprovalButtonCmp)