import { Box, Button, CssVarsProvider, IconButton, Table, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { format } from 'date-fns';
import CrfSupplierSelect from 'src/views/CommonSelectCode/CrfSupplierSelect';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { axiosellider, axioslogin } from 'src/views/Axios/Axios';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';
import { useDispatch, useSelector } from 'react-redux';
import QIEmployeeSelect from 'src/views/CommonSelectCode/QIEmployeeSelect';
import _ from 'underscore'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import moment from 'moment';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import CustomInputDateCmp from '../ComonComponent/Components/CustomInputDateCmp';
import CustomCloseIconCmp from '../ComonComponent/Components/CustomCloseIconCmp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { editicon } from 'src/color/Color'
import DeliveryMarkingView from './Components/DeliveryMarkingView';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useQueryClient } from 'react-query';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import imageCompression from 'browser-image-compression';
import ClearIcon from '@mui/icons-material/Clear';
import ReqImageDisModal from '../ComonComponent/ImageUploadCmp/ReqImageDisModal';

const DeliveryMarkingStore = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const empdeptsec = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)
    const [deliveryState, setDeliveryState] = useState({
        receivedDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        directMode: false,
        courierMode: false,
        packageCount: '',
        billNumber: '',
        billDate: format(new Date(), "yyyy-MM-dd"),
        remarks: '',
        searchFlag: 0,
        editIndex: null
    })
    const { receivedDate, directMode, courierMode, packageCount, billNumber, billDate, remarks, searchFlag, editIndex } = deliveryState
    const [selectFile, setSelectFile] = useState([])
    const [previewFile, setPreviewFile] = useState({ url: "", type: "" });
    const [imageshowFlag, setimageshowFlag] = useState(0)
    const [imageshow, setimageshow] = useState(false)

    const [supName, setSupName] = useState('')
    const [supCode, setSupCode] = useState(0)
    const [storeList, setStoreList] = useState([])
    const [empName, setempName] = useState(0)
    const [combinedPO, setCombinedPO] = useState([])
    const [existPo, setExistPo] = useState([])
    const [elliderPoList, setElliderPoList] = useState([])
    const [insertArray, setinsertArray] = useState([])
    const [billDetails, setBillDetails] = useState([])
    useEffect(() => {
        if (empdeptsec !== null) {
            dispatch((getDepartSecemployee(empdeptsec)))
        }
    }, [dispatch, empdeptsec])

    const backtoHome = useCallback(() => {
        history.push('/Home');
    }, [history]);

    const updateOnchangeState = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDeliveryState({ ...deliveryState, [e.target.name]: value })
    }, [deliveryState])

    const SearchData = useCallback(() => {
        if (supCode === 0) {
            infoNotify("Select Supplier Name")
            setDeliveryState(prev => ({
                ...prev,
                searchFlag: 0
            }));
        } else {
            setDeliveryState(prev => ({
                ...prev,
                searchFlag: 1
            }));

            const getPendingPODetails = async (supCode) => {
                const result = await axioslogin.get(`/deliveryMarking/pendingPo/${supCode}`)
                return result.data
            }
            const getItemDetailsEllider = async (posearch) => {
                const result = await axiosellider.post('/crfpurchase/items', posearch);
                return result.data
            }
            const updateItemqty = async (patchQnty) => {
                const result = await axioslogin.post('/deliveryMarking/updateqty', patchQnty);
                return result.data
            }
            const updatepoStatusDetails = async (poStatusResult) => {
                const result = await axioslogin.post('/deliveryMarking/updatePoStatus', poStatusResult);
                return result.data
            }
            getPendingPODetails(supCode).then((val) => {
                const { success, data } = val
                if (success === 1) {
                    const posearch = data?.reduce((acc, val) => {
                        if (!acc.some(item => item.pono === val.po_number && item.stcode === val.crs_store_code)) {
                            acc.push({
                                pono: val.po_number,
                                stcode: val.crs_store_code
                            });
                        }
                        return acc;
                    }, []);
                    const poNumber = data?.map((val) => {
                        return {
                            pono: val.po_number,
                            stcode: val.crs_store_code,
                            marking_po_slno: val.marking_po_slno,
                            item_code: val.item_code,
                            item_slno: val.item_slno
                        }
                    })
                    getItemDetailsEllider(posearch).then((val) => {
                        const { success, ellData } = val
                        if (success === 1) {
                            const seen = new Set();
                            const patchQnty = ellData?.map(item => {
                                const poItems = poNumber?.filter(po => po.pono === item.PO_NO && po.stcode === item.ST_CODE && po.item_code === item.IT_CODE);
                                return poItems.map(poItem => {
                                    const uniqueKey = `${poItem.marking_po_slno}-${item.IT_CODE}-${item.PDN_SUPQTY}`;
                                    if (!seen.has(uniqueKey)) {
                                        seen.add(uniqueKey);
                                        let item_status;
                                        if (item.PDN_SUPQTY === 0) {
                                            // not received
                                            item_status = null;
                                        } else if (item.PDN_SUPQTY < item.PDN_QTY) {
                                            // partially received
                                            item_status = 0;
                                        } else if (item.PDN_SUPQTY >= item.PDN_QTY) {
                                            // fully received
                                            item_status = 1;
                                        }
                                        return {
                                            marking_po_slno: poItem.marking_po_slno,
                                            item_code: item.IT_CODE,
                                            item_slno: poItem.item_slno,
                                            received_qty: item.PDN_SUPQTY,
                                            item_status: item_status,
                                            edit_user: id
                                        }
                                    }
                                    return null;
                                }).filter(item => item !== null);
                            }).flat();

                            const poStatusArray = patchQnty.reduce((acc, curr) => {
                                if (!acc[curr.marking_po_slno]) {
                                    acc[curr.marking_po_slno] = { marking_po_slno: curr.marking_po_slno, item_statuses: [] };
                                }
                                acc[curr.marking_po_slno].item_statuses.push(curr.item_status);
                                return acc;
                            }, {});
                            const poStatusResult = Object.values(poStatusArray).map(val => {
                                const allNull = val.item_statuses.every(status => status === null);
                                const allOne = val.item_statuses.every(status => status === 1);
                                let po_status;
                                // () po_status = 1; means not received or partilly received)
                                if (allNull) {
                                    po_status = 1;
                                } else if (allOne) {
                                    //   po_status = 0  means all items received
                                    po_status = 0;
                                } else {
                                    po_status = 1;
                                }
                                return {
                                    po_status: po_status,
                                    edit_user: id,
                                    marking_po_slno: val.marking_po_slno,
                                };
                            });
                            updateItemqty(patchQnty).then((val) => {
                                const { success } = val
                                if (success === 1) {
                                    updatepoStatusDetails(poStatusResult).then((val) => {
                                        const { success, message } = val
                                        if (success === 1) {

                                        } else {
                                            warningNotify(message)
                                        }
                                    }).catch((error) => {
                                        warningNotify("Error in save Po Status:", error);
                                    });
                                } else {
                                    warningNotify("Error Occured while update item qty")
                                }
                            }).catch((error) => {
                                warningNotify("Error Occured while update item qty:", error);
                            });
                        }
                    })
                }
            }).catch((error) => {
                warningNotify("Error in getting Po List:", error);
            });

            // setSearchFlag(prevFlag => (prevFlag === 1 ? 0 : 1));
            const getCRSStore = async () => {
                try {
                    const result = await axioslogin.get('/newCRFPurchase/crsStores');
                    const { success, data } = result.data
                    if (success === 2) {
                        setStoreList(data);
                    }
                    else {
                        setStoreList([])
                    }
                } catch (error) {
                    warningNotify("Error to fetch Data:", error);
                    setStoreList([])
                }
            }
            getCRSStore()

            const getExistPoData = async (supCode) => {
                try {
                    const result = await axioslogin.get(`/deliveryMarking/existPo/${supCode}`)
                    const { success, data } = result.data
                    if (success === 1) {
                        setExistPo(data)
                    } else {
                        setExistPo([])
                    }
                } catch (error) {
                    warningNotify("Error to fetch PO Details:", error);
                    setExistPo([])
                }
            }
            getExistPoData(supCode)
            const getPOdetails = async (supCode) => {
                try {
                    const result = await axiosellider.get(`/crfpurchase/getPoDetails/${supCode}`);
                    return result.data;
                } catch (error) {
                    warningNotify('Error fetching PO details:', error);
                    return { success: 0, data: [] };
                }
            };
            getPOdetails(supCode).then((val) => {
                const { success, data } = val;
                if (success === 1) {
                    setElliderPoList(data);
                } else {
                    setElliderPoList([]);
                    infoNotify("Currently, there are no PO's linked to this supplier.")
                }
            });
        }

    }, [supCode, id])

    const addBillDetails = useCallback(() => {
        if (billNumber === '') {
            infoNotify("Enter Bill No:");
        } else {
            const newdata = {
                delivered_bill_no: billNumber,
                delivered_bill_date: billDate
            }
            const isDuplicate = billDetails?.some(
                (val) => val.delivered_bill_no === billNumber
            );
            if (isDuplicate) {
                warningNotify("Bill Details Already Exists!");
                return;
            }
            if (editIndex !== null) {
                const updatedData = billDetails.map((val, index) =>
                    index === editIndex ? newdata : val
                );
                const datas = updatedData?.map((val, index) => {
                    const obj = {
                        bill_slno: index + 1,
                        delivered_bill_no: val.delivered_bill_no,
                        delivered_bill_date: format(new Date(val.delivered_bill_date), "yyyy-MM-dd")
                    }
                    return obj
                })
                setBillDetails(datas);
                setDeliveryState(prev => ({
                    ...prev,
                    editIndex: null
                }));
            } else {
                const newArray = [...billDetails, newdata]
                const datas = newArray?.map((val, index) => {
                    const obj = {
                        bill_slno: index + 1,
                        delivered_bill_no: val.delivered_bill_no,
                        delivered_bill_date: format(new Date(val.delivered_bill_date), "yyyy-MM-dd")
                    }
                    return obj
                })
                setBillDetails(datas);
            }
            setDeliveryState(prev => ({
                ...prev,
                billNumber: '',
                billDate: format(new Date(), "yyyy-MM-dd")
            }));
        }
    }, [billNumber, billDate, billDetails, editIndex])

    const editSelect = useCallback((val, index) => {
        const { delivered_bill_no, delivered_bill_date } = val
        setDeliveryState(prev => ({
            ...prev,
            billNumber: delivered_bill_no,
            billDate: format(new Date(delivered_bill_date), "yyyy-MM-dd"),
            editIndex: index
        }));
    }, [])

    const deleteSelect = useCallback((val) => {
        if (billDetails.length !== 0) {
            const array = billDetails?.filter((value) => value.bill_slno !== val.bill_slno)
            setBillDetails(array)
        }
    }, [billDetails])

    useEffect(() => {
        if (elliderPoList.length !== 0) {
            if (existPo.length !== 0) {
                const insertNew = elliderPoList?.filter((val) => {
                    return !existPo?.find((value) => value.po_number === val.PO_NO && value.crs_store_code === val.ST_CODE)
                })
                setinsertArray(insertNew)
            } else {
                setinsertArray(elliderPoList)
            }
            // const array = elliderPoList
            //     .filter((po, index, self) =>
            //         index === self.findIndex((val) => val.ST_CODE === po.ST_CODE && val.PO_NO === po.PO_NO))

            // const newArray = array?.map((po) => {
            //     const newData = storeList?.find((value) => (value.crs_store_code === po.ST_CODE))
            //     return {
            //         pono: po.PO_NO,
            //         storecode: po.ST_CODE,
            //         podate: po.POD_DATE,
            //         delivery: po.POC_DELIVERY,
            //         expctDelivery: po.POD_EDD !== null ? format(new Date(po.POD_EDD), 'yyyy-MM-dd') : null,
            //         expiry: po.PO_EXPIRY !== null ? format(new Date(po.PO_EXPIRY), 'yyyy-MM-dd') : null,
            //         main_store_slno: newData ? newData.main_store_slno : 0,
            //         main_store: newData ? newData.main_store : '',
            //     }
            // })
            // setTableData(newArray)
        }
    }, [elliderPoList, existPo])

    useEffect(() => {
        if (insertArray.length !== 0) {
            const array = insertArray
                .filter((po, index, self) =>
                    index === self.findIndex((val) => val.ST_CODE === po.ST_CODE && val.PO_NO === po.PO_NO))

            const newArray = array?.map((po) => {
                const newData = storeList?.find((value) => (value.crs_store_code === po.ST_CODE))
                return {
                    po_no: po.PO_NO,
                    storecode: po.ST_CODE,
                    podate: po.POD_DATE,
                    delivery: po.POC_DELIVERY,
                    expctDelivery: po.POD_EDD !== null ? format(new Date(po.POD_EDD), 'yyyy-MM-dd') : null,
                    expiry: po.PO_EXPIRY !== null ? format(new Date(po.PO_EXPIRY), 'yyyy-MM-dd') : null,
                    main_store_slno: newData ? newData.main_store_slno : 0,
                    main_store: newData ? newData.main_store : '',
                }
            })
            // const patchQnty = ellData?.map(item => {
            //     console.log(ellData, "ellData");
            //     const poItems = poNumber?.filter(po => po.pono === item.PO_NO && po.stcode === item.ST_CODE && po.item_code === item.IT_CODE);
            //     return poItems.map(poItem => {
            //         const uniqueKey = `${poItem.marking_po_slno}-${item.IT_CODE}-${item.PDN_SUPQTY}`;
            //         if (!seen.has(uniqueKey)) {
            //             seen.add(uniqueKey);
            //             let item_status;
            //             if (item.PDN_SUPQTY === 0) {
            //                 item_status = null;
            //             } else if (item.PDN_SUPQTY < item.PDN_QTY) {
            //                 item_status = 0;
            //             } else if (item.PDN_SUPQTY >= item.PDN_QTY) {
            //                 item_status = 1;
            //             }
            //             return {
            //                 marking_po_slno: poItem.marking_po_slno,
            //                 item_code: item.IT_CODE,
            //                 item_slno: poItem.item_slno,
            //                 received_qty: item.PDN_SUPQTY,
            //                 item_status: item_status,
            //                 edit_user: id
            //             }
            //         }
            //         return null;
            //     }).filter(item => item !== null);
            // }).flat();

            const poItems = insertArray?.map((val, index) => {
                let item_status;
                if (val.PDN_SUPQTY === 0) {
                    item_status = null;
                } else if (val.PDN_SUPQTY < val.PDN_QTY) {
                    item_status = 0;
                } else if (val.PDN_SUPQTY >= val.PDN_QTY) {
                    item_status = 1;
                }
                const obj = {
                    slno: index + 1,
                    po_no: val.PO_NO,
                    storecode: val.ST_CODE,
                    item_code: val.IT_CODE,
                    item_name: val.ITC_DESC,
                    item_qty: val.PDN_QTY,
                    item_rate: (val.PDN_RATE).toFixed(2),
                    item_mrp: (val.PDN_ORIGINALMRP).toFixed(2),
                    received_qty: val.PDN_SUPQTY,
                    item_status: item_status
                }
                return obj
            })
            const combinedData = newArray?.map(po => {
                const details = poItems?.filter(item => item.po_no === po.po_no && item.storecode === po.storecode);
                return {
                    ...po,
                    items: details
                };
            });
            setCombinedPO(combinedData)
        }
    }, [insertArray, storeList])



    const ResetDetails = useCallback(() => {
        const formData = {
            receivedDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
            directMode: false,
            courierMode: false,
            packageCount: '',
            billNumber: '',
            billDate: format(new Date(), "yyyy-MM-dd"),
            remarks: '',
            searchFlag: 0,
            editIndex: null
        }
        setDeliveryState(formData)
        setSupName('')
        setSupCode(0)
        setempName(0)
        setCombinedPO([])
        setBillDetails([])

    }, [])
    const postData = useMemo(() => {
        return {
            supplier_code: supCode,
            supplier_name: supName,
            dc_mark_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            dc_receive_date: format(new Date(receivedDate), 'yyyy-MM-dd HH:mm:ss'),
            mt_direct: directMode === true ? 1 : 0,
            mt_courier: courierMode === true ? 1 : 0,
            package_count: packageCount,
            delivery_bill_details: billDetails,
            remarks: remarks,
            received_user: empName,
            create_user: id,
            po_exist_status: combinedPO.length === 0 ? 'No PO Found' : 'Exist'
        }
    }, [supCode, supName, receivedDate, packageCount, directMode, courierMode, billDetails, remarks, empName, id, combinedPO])

    //file upload
    const uploadFile = useCallback(
        (e) => {
            const files = Array.from(e.target.files);
            setSelectFile((prevFiles) => {
                const duplicateFiles = [];
                const validFiles = files?.filter((file) => {
                    if (
                        file.type === "application/pdf" ||
                        file.type === "image/png" ||
                        file.type === "image/jpeg" ||
                        file.type === "image/jpg"
                    ) {
                        if (file.size > 26214400) {
                            warningNotify(`The file "${file.name}" exceeds the 25MB size limit`);
                            return false;
                        }
                        const isDuplicate = prevFiles.some(
                            (prevFile) => prevFile.name === file.name && prevFile.size === file.size
                        );
                        // const duplicates = prevFiles?.filter(
                        //     (prevFile) => prevFile.name === file.name && prevFile.size === file.size
                        // );
                        // if (duplicates.length > 0) {
                        //     duplicateFiles.push(file.name);
                        //     return false;
                        // }

                        if (isDuplicate) {
                            duplicateFiles.push(file.name);
                            return false;
                        }
                        return true;
                    } else {
                        warningNotify(
                            `The file "${file.name}" is not a supported format! Only .png, .jpeg, and .pdf are allowed.`
                        );
                        return false;
                    }
                });
                if (duplicateFiles.length > 0) {
                    warningNotify(
                        `The following files are duplicates and were not added: ${duplicateFiles.join(", ")}`
                    );
                }
                return [...prevFiles, ...validFiles];
            });
        }, [setSelectFile]);
    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 25,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(imageFile, options)
        return compressedFile
    }, []);
    const SaveDetails = useCallback(async () => {

        if (supCode === 0) {
            infoNotify("Select Supplier")
        } else if (billNumber !== '' || billDetails.length === 0) {

            infoNotify("Add Bill Details Before Save")
        }
        else if (empName === 0) {
            infoNotify("Select Receiver")
        }
        else {
            const insertDeliveryMarking = async (postData) => {
                // try {
                const result = await axioslogin.post('/deliveryMarking/delMarkInsert', postData);
                return result.data;
                // } catch (error) {
                //     warningNotify("Error in insert Delivery Marking:", error);
                //     return { success: 0, message: "Failed to insert delivery marking" };
                // }
            };
            const savePoDetails = async (postdataDetl) => {
                // try {
                const result = await axioslogin.post('/deliveryMarking/insertPo', postdataDetl);
                return result.data;
                // } catch (error) {
                //     warningNotify("Error in save Po Details:", error);
                //     return { success: 0, message: "Failed to save PO details" };
                // }
            };

            const FileInsert = async (selectFile, insertid) => {
                try {
                    const formData = new FormData();
                    formData.append('id', insertid);
                    for (const file of selectFile) {
                        if (file.type.startsWith('image')) {
                            const compressedFile = await handleImageUpload(file);
                            formData.append('files', compressedFile, compressedFile.name);
                        } else {
                            formData.append('files', file, file.name);
                        }
                    }
                    const result = await axioslogin.post('/newCRFRegisterImages/InsertDMimage', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    return result.data
                } catch (error) {
                    // console.log(error, "while file uploading");
                    // setLoading(false)
                    warningNotify('An error occurred during file upload.', error);
                }
            }
            if (combinedPO.length !== 0) {
                insertDeliveryMarking(postData)
                    .then((val) => {
                        const { success, insert_id } = val;
                        if (success === 1) {
                            if (selectFile.length > 0) {
                                //file upload
                                FileInsert(selectFile, insert_id)
                                    .then((val) => {
                                        const { status, message } = val;

                                        if (status === 1) {
                                            setSelectFile([])
                                            succesNotify(message);

                                        } else {
                                            warningNotify("Error upload file:", message);
                                        }
                                    })
                                    .catch((error) => {
                                        warningNotify("Error upload file:", error);
                                    });
                            }

                            const postdataDetl = combinedPO?.map((val) => {
                                return {
                                    delivery_mark_slno: insert_id,
                                    supplier_code: supCode,
                                    po_number: val.po_no,
                                    po_date: format(new Date(val.podate), 'yyyy-MM-dd HH:mm:ss'),
                                    crs_store_code: val.storecode,
                                    crs_store: val.main_store_slno,
                                    expected_delivery: val.expctDelivery !== null ? format(new Date(val.expctDelivery), 'yyyy-MM-dd') : null,
                                    po_delivery: val.delivery,
                                    po_expiry: val.expiry !== null ? format(new Date(val.expiry), 'yyyy-MM-dd') : null,
                                    po_status: 1,
                                    create_user: id,
                                    items: val.items
                                };
                            });
                            savePoDetails(postdataDetl)
                                .then((val) => {
                                    const { success, message } = val;
                                    if (success === 1) {
                                        succesNotify(message);
                                        ResetDetails();
                                        queryClient.invalidateQueries('deliverMarking');
                                    } else {
                                        warningNotify("Error saving PO details:", message);
                                    }
                                })
                                .catch((error) => {
                                    warningNotify("Error in save Po Details:", error);
                                });

                        } else {
                            warningNotify("Error inserting delivery marking:", val.message);
                        }
                    })
                    .catch((error) => {
                        warningNotify("Error in insert Delivery Marking:", error);
                    });
            } else {
                insertDeliveryMarking(postData)
                    .then((val) => {
                        const { success, insert_id } = val;
                        if (success === 1) {
                            if (selectFile.length > 0) {
                                //file upload
                                FileInsert(selectFile, insert_id)
                                    .then((val) => {
                                        const { status, message } = val;
                                        if (status === 1) {
                                            succesNotify(message);
                                            setSelectFile([])
                                        } else {
                                            warningNotify("Error upload file:", message);
                                        }
                                    })
                                    .catch((error) => {
                                        warningNotify("Error upload file:", error);
                                    });
                            }
                            succesNotify("Delivery Details Marked")
                            ResetDetails()
                            queryClient.invalidateQueries('deliverMarking');
                        }
                    }).catch((error) => {
                        warningNotify("Error in insert Delivery Marking:", error);
                    });

            }
        }
    }, [postData, id, combinedPO, ResetDetails, billNumber, supCode, empName, billDetails, queryClient, selectFile])
    const [viewFlag, setViewFlag] = useState(0)
    const viewDeliveryDetails = useCallback(async () => {
        setViewFlag(1)
        ResetDetails()
    }, [ResetDetails])
    const ViewImage = useCallback((file) => {
        const fileType = file.imageName
            ? file.imageName.endsWith(".pdf")
                ? "pdf"
                : "image"
            : file.type.includes("application/pdf")
                ? "pdf"
                : "image";

        const fileUrl = file.url || URL.createObjectURL(file);
        setPreviewFile({ url: fileUrl, type: fileType });
        setimageshow(true)
        setimageshowFlag(1)
    }, [])
    const handleRemoveFile = (index) => {
        setSelectFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
    };
    const handleClose = useCallback(() => {
        setimageshow(false)
        setimageshowFlag(0)
    }, [])
    const buttonStyle = {
        px: 2,
        width: 80,
        fontSize: 13,
        height: '30px',
        minHeight: '30px',
        lineHeight: '1.2',
        color: 'black',
        bgcolor: 'white',
        border: '1px solid #bbdefb',
        '&:hover': {
            color: '#1e88e5',
            bgcolor: 'white'
        },
        borderRadius: 5,
    }
    return (
        <Fragment>
            {imageshowFlag === 1 ? <ReqImageDisModal open={imageshow} handleClose={handleClose}
                previewFile={previewFile} /> : null}
            <Box sx={{ height: window.innerHeight - 80 }}>
                <CssVarsProvider>
                    <Box sx={{ display: 'flex', backgroundColor: "#f0f3f5", border: '1px solid #B4F5F0' }}>
                        <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}> Delivery Marking</Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, m: 0.5 }}>
                            <CssVarsProvider>
                                <CustomCloseIconCmp
                                    handleChange={backtoHome}
                                />
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    {viewFlag === 1 ?
                        <DeliveryMarkingView setViewFlag={setViewFlag} setimageshow={setimageshow} setimageshowFlag={setimageshowFlag} setPreviewFile={setPreviewFile} />
                        :
                        <Box sx={{
                            pt: 0.5, bgcolor: 'white', height: window.innerHeight - 135, overflow: 'auto',
                            flexWrap: 'wrap',
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
                                <Typography sx={{ fontSize: 14, color: '#1565c0', pr: 1 }}>Delivery Chellan Marking Date &nbsp; :</Typography>
                                <Typography sx={{ fontSize: 13, color: '#1565c0', fontWeight: 650, pr: 2 }}>{format(new Date(), 'dd-MM-yyy hh:mm a')}</Typography>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Box sx={{ pt: 1, width: { xs: '100%', md: '60vw', lg: '50vw', xl: '50vw' } }}>
                                    <Box sx={{ px: 1 }} >
                                        <Box sx={{ pl: 1, fontSize: 12, }} >DC RECEIVED DATE <KeyboardArrowDownIcon fontSize='small' /></Box>
                                        <Box sx={{ pt: 0.5 }}>
                                            <CustomInputDateCmp
                                                // StartIcon={<CalendarMonthIcon sx={{ color: '#0070E0' }} />}
                                                className={{
                                                    width: '100%',
                                                    height: 35, borderRadius: 5, border: '1px solid #bbdefb',
                                                    fontSize: 14,
                                                }}
                                                slotProps={{
                                                    input: {
                                                        max: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                                    },
                                                }}
                                                size={'sm'}
                                                type={'datetime-local'}
                                                name={'receivedDate'}
                                                value={receivedDate}
                                                handleChange={updateOnchangeState}
                                            />
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', px: 1 }}>
                                        <Box sx={{ pt: 1, flex: 1.5 }}>
                                            <Box sx={{ pl: 1, fontSize: 12, }} >SUPPLIER <KeyboardArrowDownIcon fontSize='small' /></Box>
                                            <Box sx={{ pt: 0.5 }}>
                                                <CrfSupplierSelect supCode={supCode} setSupCode={setSupCode} setSupName={setSupName} />
                                            </Box>
                                        </Box>

                                        <Box sx={{ flex: 0.3, pt: 3.7, pl: 0.5 }}>
                                            <IconButton
                                                sx={{
                                                    border: '1px solid #bbdefb', width: '100%',
                                                    fontSize: 13, height: 38, lineHeight: '1.2', color: '#1D617A',
                                                    bgcolor: 'white', borderRadius: 6,
                                                    '&:hover': {
                                                        bgcolor: 'white',
                                                        color: '#1976d2'
                                                    },
                                                }}
                                                onClick={SearchData}
                                            >
                                                Search
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ flex: 0.3, pt: 3.7, pl: 0.5 }}>
                                            <IconButton
                                                sx={{
                                                    border: '1px solid #bbdefb', width: '100%',
                                                    fontSize: 13, height: 38, lineHeight: '1.2', color: '#1D617A',
                                                    bgcolor: 'white', borderRadius: 6,
                                                    '&:hover': {
                                                        bgcolor: 'white',
                                                        color: '#1976d2'
                                                    },
                                                }}
                                                onClick={viewDeliveryDetails}
                                            >
                                                View
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    {searchFlag === 1 ?
                                        <>
                                            <Box sx={{ pt: 1, px: 1 }}>
                                                <Box sx={{ pl: 1, fontSize: 12 }} >MODE OF TRANSPORT <KeyboardArrowDownIcon fontSize='small' /></Box>
                                                <Box sx={{ display: 'flex', pt: 0.5, pl: 1.5, borderRadius: 10 }}>
                                                    {/* <LocalShippingTwoToneIcon sx={{ color: '#0070E0', mt: 0.2 }} /> */}
                                                    <Box sx={{ pl: 1, pt: 0.4 }}>
                                                        <CusCheckBox color="primary" variant="outlined" label="Direct" size="md"
                                                            checked={directMode}
                                                            value={directMode}
                                                            name="directMode"
                                                            onCheked={updateOnchangeState}
                                                            sx={{ color: '#1565c0' }} />
                                                    </Box>
                                                    <Box sx={{ pl: 2, pt: 0.4 }}>
                                                        <CusCheckBox color="primary" variant="outlined" label="Courier" size="md"
                                                            checked={courierMode}
                                                            value={courierMode}
                                                            name="courierMode"
                                                            onCheked={updateOnchangeState}
                                                            sx={{ color: '#1565c0' }} />
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', flex: 1, px: 1 }}>
                                                <Box sx={{ pt: 1, width: "46%" }}>
                                                    <Box sx={{ pl: 1, fontSize: 12 }} >DC/BILL NO. <KeyboardArrowDownIcon fontSize='small' /></Box>
                                                    <Box sx={{ pl: 0.5, pt: 0.5, }}>
                                                        <CustomInputDateCmp
                                                            // StartIcon={<ReceiptLongTwoToneIcon sx={{ color: '#0070E0' }} />}
                                                            className={{
                                                                width: '100%', height: 35, borderRadius: 5,
                                                                border: '1px solid #bbdefb', fontSize: 14,
                                                            }}
                                                            placeholder="Enter Bill No"
                                                            autoComplete='off'
                                                            size={'sm'}
                                                            type='text'
                                                            name={'billNumber'}
                                                            value={billNumber}
                                                            handleChange={updateOnchangeState}
                                                        />
                                                    </Box>
                                                </Box>
                                                <Box sx={{ pt: 1, pl: 0.5, width: '46%' }}>
                                                    <Box sx={{ pl: 1, fontSize: 12 }} >DC/Bill Date <KeyboardArrowDownIcon fontSize='small' /></Box>
                                                    <Box sx={{ pl: 0.5, pt: 0.5, }}>
                                                        <CustomInputDateCmp
                                                            // StartIcon={<CalendarMonthIcon sx={{ color: '#0070E0' }} />}
                                                            className={{
                                                                width: '100%', height: 35, borderRadius: 5,
                                                                border: '1px solid #bbdefb', fontSize: 14,
                                                            }}
                                                            size={'sm'}
                                                            type={'date'}
                                                            name={'billDate'}
                                                            value={billDate}
                                                            slotProps={{
                                                                input: {
                                                                    max: moment(new Date()).format('YYYY-MM-DD'),
                                                                },
                                                            }}
                                                            handleChange={updateOnchangeState}
                                                        />
                                                    </Box>
                                                </Box>
                                                <Box sx={{ pl: 2.5, pt: 4, width: '4%' }}>
                                                    <Tooltip title="Add Bill Details" placement="bottom"  >
                                                        <AddCircleTwoToneIcon
                                                            sx={{
                                                                height: 28, width: 28, color: '#1565c0', cursor: "pointer",
                                                                ":hover": {
                                                                    color: '#1976d2'
                                                                }
                                                            }}
                                                            onClick={addBillDetails}
                                                        />
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                            {billDetails.length !== 0 ?
                                                <Box variant="outlined" sx={{ maxHeight: '50vh', pt: 0.4, mr: 3.6, ml: 2, overflow: 'auto', '&::-webkit-scrollbar': { height: 8 } }}>
                                                    <CssVarsProvider>
                                                        <Table aria-label="table with sticky header" borderAxis='both' padding={"none"} stickyHeader size='sm'>
                                                            <thead style={{ alignItems: 'center' }}>
                                                                <tr style={{ height: 0.5 }}>
                                                                    <th size='sm' style={{ width: 60, fontSize: 14, textAlign: 'center' }}>&nbsp; Sl.No</th>
                                                                    <th size='sm' style={{ width: 100, fontSize: 14 }}>&nbsp;Bill No.</th>
                                                                    <th size='sm' style={{ width: 150, fontSize: 14 }}>&nbsp;Bill Date</th>
                                                                    <th size='sm' style={{ width: 30, }}></th>
                                                                    <th size='sm' style={{ width: 30, }}></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody size='small'>
                                                                {billDetails?.map((val, index) => (
                                                                    <tr key={index} size='small' style={{ maxHeight: 2, cursor: 'pointer' }}>
                                                                        <td size='sm' style={{ fontSize: 12, textAlign: 'center' }}>{index + 1}</td>
                                                                        <td size='sm' style={{ fontSize: 12, }}>&nbsp;{val.delivered_bill_no}</td>
                                                                        <td size='sm' style={{ fontSize: 12 }}>&nbsp;{format(new Date(val.delivered_bill_date), 'dd-MM-yyyy')}</td>
                                                                        <td size='sm' style={{ fontSize: 12, textAlign: 'center' }}>
                                                                            <EditIcon
                                                                                sx={{
                                                                                    color: editicon,
                                                                                    ":hover": {
                                                                                        color: '#1565c0'
                                                                                    }
                                                                                }}
                                                                                onClick={(e) => editSelect(val, index)}
                                                                            />
                                                                        </td>
                                                                        <td size='sm' style={{ textAlign: 'center', height: 5 }}>
                                                                            <DeleteIcon
                                                                                sx={{
                                                                                    color: '#DC4731',
                                                                                    ":hover": {
                                                                                        color: '#B95C50',
                                                                                    }
                                                                                }}
                                                                                onClick={(e) => deleteSelect(val, index)}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    </CssVarsProvider>
                                                </Box>
                                                : null}

                                            <Box sx={{ p: 0.5 }}>
                                                <label htmlFor="file-input">
                                                    <Tooltip title="Upload File" placement="bottom" sx={{ bgcolor: "#e8eaf6", color: "#283593" }}>
                                                        <IconButton
                                                            aria-label="upload file"
                                                            variant="soft"
                                                            component="span"
                                                            sx={{
                                                                bgcolor: "white",
                                                                "&:hover": {
                                                                    bgcolor: "white",
                                                                },
                                                            }}
                                                        >
                                                            <CloudUploadTwoToneIcon
                                                                fontSize="small"
                                                                sx={{
                                                                    width: 35,
                                                                    height: 25,
                                                                    color: "#3949ab",
                                                                    "&:hover": {
                                                                        color: "#5c6bc0",
                                                                    },
                                                                }}
                                                            />
                                                            <Typography
                                                                sx={{
                                                                    fontSize: 12,
                                                                    color: "#3949ab",
                                                                    "&:hover": {
                                                                        color: "#5c6bc0",
                                                                    },
                                                                }}
                                                            >
                                                                Maximum Size 25MB
                                                            </Typography>
                                                        </IconButton>
                                                    </Tooltip>
                                                </label>
                                                <input
                                                    multiple
                                                    id="file-input"
                                                    type="file"
                                                    accept=".jpg, .jpeg, .png, .pdf"
                                                    style={{ display: "none" }}
                                                    onChange={uploadFile}
                                                />
                                            </Box>
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.2, width: "100%" }}>

                                                {selectFile.length !== 0 &&
                                                    selectFile.map((file, index) => (
                                                        <Box
                                                            key={index}
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                m: 0.3,
                                                                border: "1px solid #e0e0e0",
                                                                borderRadius: "4px",
                                                                p: 0.5,
                                                            }}
                                                        >
                                                            {file.type.includes("image") ? (
                                                                <img
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={file.name}
                                                                    style={{
                                                                        width: "40px",
                                                                        height: "40px",
                                                                        objectFit: "cover",
                                                                        borderRadius: "4px",
                                                                        marginRight: "8px",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    // onClick={() => ViewImage(URL.createObjectURL(file))}
                                                                    onClick={() => ViewImage(file)}
                                                                />
                                                            ) : file.type === "application/pdf" ? (
                                                                <PictureAsPdfIcon
                                                                    sx={{
                                                                        width: "40px",
                                                                        height: "40px",
                                                                        color: "#e53935",
                                                                        marginRight: "8px",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() => ViewImage(file)}
                                                                />
                                                            ) : (
                                                                <InsertDriveFileIcon
                                                                    sx={{
                                                                        width: "40px",
                                                                        height: "40px",
                                                                        color: "#9e9e9e",
                                                                        marginRight: "8px",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() => ViewImage(file)}
                                                                />
                                                            )}
                                                            <Box sx={{ fontSize: 14, cursor: "pointer", flexGrow: 1 }}>{file.name}</Box>
                                                            <ClearIcon
                                                                sx={{
                                                                    height: "16px",
                                                                    width: "16px",
                                                                    cursor: "pointer",
                                                                    color: "red",
                                                                    marginLeft: "8px",
                                                                }}
                                                                onClick={() => handleRemoveFile(index)}
                                                            />
                                                        </Box>
                                                    ))
                                                }
                                            </Box>
                                            <Box sx={{ pt: 1, flex: 1, px: 1 }}>
                                                <Box sx={{ pl: 1, fontSize: 12 }} >PACKAGE/BOX COUNT <KeyboardArrowDownIcon fontSize='small' /></Box>
                                                <Box sx={{ pl: 0.5, pt: 0.5, }}>
                                                    <CustomInputDateCmp
                                                        // StartIcon={<Inventory2TwoToneIcon sx={{ color: '#0070E0' }} />}
                                                        className={{
                                                            width: '100%', height: 35, borderRadius: 5, border: '1px solid #bbdefb',
                                                            fontSize: 14,
                                                        }}
                                                        placeholder="Enter Package Count"
                                                        autoComplete='off'
                                                        size={'sm'}
                                                        type='text'
                                                        name={'packageCount'}
                                                        value={packageCount}
                                                        handleChange={updateOnchangeState}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ pt: 1, flex: 1, px: 1 }}>
                                                <Box sx={{ pl: 1, fontSize: 12 }} >REMARKS <KeyboardArrowDownIcon fontSize='small' /></Box>
                                                <Box sx={{ pl: 0.5, pt: 0.5 }}>
                                                    <Textarea
                                                        // startDecorator={<HistoryEduTwoToneIcon sx={{ color: '#0070E0' }} />}
                                                        placeholder="Enter Remarks"
                                                        value={remarks}
                                                        name='remarks'
                                                        minRows={1}
                                                        maxRows={3}
                                                        onChange={updateOnchangeState}
                                                        sx={{
                                                            border: '1px solid #bbdefb', fontSize: 14, borderRadius: 5
                                                        }}
                                                    />
                                                </Box>
                                            </Box>

                                            <Box sx={{ pt: 1, flex: 1, px: 1 }}>
                                                <Box sx={{ pl: 1, fontSize: 12 }} >RECEIVER <KeyboardArrowDownIcon fontSize='small' /></Box>
                                                <Box sx={{ pl: 0.5, pt: 0.5 }}>
                                                    <QIEmployeeSelect empName={empName} setempName={setempName} />
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 2, textAlign: 'center', }}>
                                                <Box sx={{ ml: 0.7, }}>
                                                    <Button variant='outlined'
                                                        sx={buttonStyle}
                                                        onClick={SaveDetails} >
                                                        Save
                                                    </Button>
                                                </Box>
                                                <Box sx={{ ml: 0.7, mr: 1 }}>
                                                    <Button variant='outlined'
                                                        sx={buttonStyle}
                                                        onClick={ResetDetails} >
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            </Box>

                                        </>
                                        : null}

                                </Box>
                            </Box>


                        </Box>
                    }
                </CssVarsProvider >
            </Box >
        </Fragment >
    )
}

export default memo(DeliveryMarkingStore)