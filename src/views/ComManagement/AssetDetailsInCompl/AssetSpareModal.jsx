import { Avatar, Box, Button, Chip, CssVarsProvider, Input, Modal, ModalDialog, Tab, tabClasses, Table, TabList, TabPanel, Tabs, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { axioslogin } from 'src/views/Axios/Axios';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { addDays, format } from 'date-fns';
import { useSelector } from 'react-redux';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import ItemQrDisplayModel from 'src/views/AssetManagment/ItemListView/ItemQrDisplayModel';
import CmSpareList from '../CmComponent/CmSpareList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ComFileView from '../CmFileView/ComFileView';
import ServiceFileAttach from 'src/views/AssetManagment/ServiceListSpare/ServiceFileAttach';
import ServiceDocumentModal from 'src/views/AssetManagment/ServiceListSpare/ServiceDocumentModal';
import serviceFold from '../../../../src/assets/images/assetservice/serviceFold.png'

const AssetSpareModal = ({ openSpare, setOpenSpare, setassetSpareFlag, assetSparedetails }) => {

    const { item_asset_no, item_name, am_item_map_slno, am_spare_item_map_slno, item_custodian_dept, category_name, item_asset_no_only } = assetSparedetails

    const [spareDetails, setSpareDetails] = useState([])
    const [dueDate, setDueDate] = useState('')
    const [dueDateCount, setdueDateCount] = useState(0)
    const [instalationDate, setinstalationDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [pmFlag, setPmFlag] = useState(0)
    const [qrFlag, setQrFlag] = useState(0)
    const [selectedData, setSelectedData] = useState([])
    const [qrOpen, setqrOpen] = useState(false)
    const [count, setCount] = useState(0)
    const [daysEnable, setdaysEnable] = useState(0)
    const [pmInsercheckFlag, setpmInsercheckFlag] = useState(0)
    const [sparez, setSparez] = useState(0)
    const [spareName, setSpareName] = useState('')
    const [spareData, setSpareData] = useState([])
    const [cmc_status, setcmc_status] = useState(0)
    const [amc_status, setamc_status] = useState(0)
    const [amc_slno, setamc_slno] = useState(null)
    const [alldetailsService, setAlldetailsService] = useState([])
    const [ticketsServicedDetails, setTicketsServicedDetails] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewOpen, setimageViewOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [fileDetails, setfileDetails] = useState([])
    const [deptServiceempList, setdeptServiceempList] = useState({});
    const [imageServiceFlag, setimageServiceFlag] = useState(0)
    const [imageServiceUrls, setImageServiceUrls] = useState([]);
    const [serviceimageViewOpen, setServiceimageViewOpen] = useState(false)
    const [servicefileDetails, setServicefileDetails] = useState([])
    const [billdetailsView, setBilldetailsView] = useState([]);
    const [amcCmcDocuments, setamcCmcDocuments] = useState([])
    const [leaseDocuments, setleaseDocuments] = useState([])
    const [assetabout, setassetabout] = useState([])
    const [assetSpecif, setassetSpecif] = useState([])
    const [am_bill_mastslno, setam_bill_mastslno] = useState(0)
    const [amccmc_slno, setamccmc_slno] = useState(0)
    const [am_lease_mast_slno, setam_lease_mast_slno] = useState(0)
    const [openDocuments, setopenDocuments] = useState(0)
    const [documetOpenCheck, setdocumetOpenCheck] = useState(false)

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const UpdateinstalationDate = useCallback((e) => {
        setinstalationDate(e.target.value)
        setPmFlag(0)
    }, [])

    useEffect(() => {
        const PmDetails = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/AmcPmInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { instalation_date, due_date, amc_status, cmc_status, amc_slno } = data[0]
                setinstalationDate(instalation_date)
                setDueDate(due_date)
                setpmInsercheckFlag(1)
                setcmc_status(cmc_status)
                setamc_status(amc_status)
                setamc_slno(amc_slno)
            }
            else {

            }
        }
        PmDetails(am_item_map_slno)
    }, [am_item_map_slno])

    useEffect(() => {
        const AssetSpecific = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/SpecificationInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                setassetSpecif(data)
            }
            else {
                setassetSpecif([])

            }
        }
        AssetSpecific(am_item_map_slno)
    }, [am_item_map_slno])

    const getData = useMemo(() => {
        return {
            am_item_map_slno: am_item_map_slno,
        }
    }, [am_item_map_slno])

    useEffect(() => {
        const AboutAsset = async () => {
            try {
                const result = await axioslogin.post('/assetSpareDetails/getAssetAlllDetails', getData);
                const { success, data } = result.data;
                const { am_bill_mastslno, amccmc_slno, am_lease_mast_slno } = data[0]
                if (success === 2) {
                    setassetabout(data)
                    setam_bill_mastslno(am_bill_mastslno)
                    setamccmc_slno(amccmc_slno)
                    setam_lease_mast_slno(am_lease_mast_slno)
                } else {
                    setassetabout({})

                }
            } catch (error) {
                warningNotify('Error fetching asset details:', error);
            }
        };
        AboutAsset();
    }, [getData,]);
    console.log("assetabout", assetabout);


    const Close = useCallback(() => {
        setassetSpareFlag(0)
        setOpenSpare(false)
    }, [setOpenSpare, setassetSpareFlag])

    useEffect(() => {
        const getAllSpare = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/complaintreg/SpareDetailsUndercomplaint/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                setSpareDetails(data)
            }
            else {
                setSpareDetails([])
            }
        }
        getAllSpare(am_item_map_slno)
    }, [am_item_map_slno, count])

    const postdata = useMemo(() => {
        return {
            am_item_map_slno: am_item_map_slno,
            amc_status: amc_status === null ? 0 : 1,
            cmc_status: cmc_status === null ? 0 : 1,
            instalation_date: instalationDate,
            due_date: dueDate === '' ? new Date() : dueDate,
            pm_status: 1,
            create_user: id,
            amc_slno: amc_slno === null ? null : amc_slno
        }
    }, [am_item_map_slno, instalationDate, dueDate, amc_slno, cmc_status, amc_status,
        id])

    const patchData = useMemo(() => {
        return {
            am_item_map_slno: am_item_map_slno,
            amc_status: amc_status === null ? 0 : 1,
            cmc_status: cmc_status === null ? 0 : 1,
            instalation_date: instalationDate,
            due_date: dueDate === '' ? new Date() : dueDate,
            pm_status: 1,
            create_user: id,
            amc_slno: amc_slno === null ? null : amc_slno
        }
    }, [am_item_map_slno, instalationDate, dueDate, amc_slno, cmc_status, amc_status,
        id])

    const SavePMDetails = useCallback((e) => {
        e.preventDefault()
        setPmFlag(1)
        const InsertAMCPMDetail = async (postdata) => {
            const result = await axioslogin.post('/ItemMapDetails/AmcPmInsert', postdata)
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setdueDateCount(0)
            } else {
                infoNotify(message)
            }
        }
        const updateAMCPMDetails = async (patchData) => {
            const result = await axioslogin.patch('/ItemMapDetails/AmcPmUpdate', patchData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setdueDateCount(0)
            }
        }

        if (pmInsercheckFlag === 1) {
            updateAMCPMDetails(patchData);
        } else {
            InsertAMCPMDetail(postdata);
        }
    }, [postdata, patchData, pmInsercheckFlag])

    const UpdatedueDateCount = useCallback((e) => {
        setdueDateCount(e.target.value)
        const Due = addDays(new Date(instalationDate), e.target.value)
        setDueDate(format(new Date(Due), "yyyy-MM-dd"))
        setPmFlag(0)
        setdaysEnable(1)

    }, [instalationDate])

    const qrCodeOpen = useCallback(() => {
        setSelectedData({
            am_item_map_slno: am_item_map_slno,
            am_spare_item_map_slno: am_spare_item_map_slno,
            assetno: item_asset_no + '/' + am_item_map_slno.toString().padStart(6, '0'),
        })
        setQrFlag(1)
        setqrOpen(true)
    }, [am_item_map_slno, am_spare_item_map_slno, item_asset_no])

    const handleClose = useCallback(() => {
        setqrOpen(false)
        setQrFlag(0)
    }, [setqrOpen, setQrFlag])

    const servicefunctn = useCallback((val) => {
        const { am_spare_item_map_slno, asset_spare_slno } = val
        const patchdata = {
            delete_user: id,
            asset_spare_slno: asset_spare_slno,
            am_spare_item_map_slno: am_spare_item_map_slno
        }

        const ServiceUpdate = async (patchdata) => {
            const result = await axioslogin.patch('/ItemMapDetails/spareService', patchdata);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
            } else {
                warningNotify(message)
                setCount(count + 1)
            }
        }
        ServiceUpdate(patchdata)
    }, [id, setCount, count])

    const AddNewSpare = useCallback((e) => {
        if (sparez === 0) {
            infoNotify('Please select Spare');
        } else {
            const isAlreadyAdded = spareData.some(item => item.am_spare_item_map_slno === sparez);
            if (isAlreadyAdded) {
                infoNotify('Spare already added');
                setSparez(0)
            } else {
                const newdata = {
                    am_item_map_slno: am_item_map_slno,
                    am_spare_item_map_slno: sparez,
                    spare_status: 1,
                    name: spareName,
                    create_user: id
                };
                const datass = [...spareData, newdata];
                setSpareData(datass);
                setSparez(0)
            }
        }
    }, [am_item_map_slno, spareData, sparez, spareName, id]);
    const handleDelete = (indexToDelete) => {
        setSpareData((prevArray) => {
            const updatedArray = prevArray.filter((_, index) => index !== indexToDelete);
            return updatedArray;
        });
    };
    const SparepostData = spareData && spareData.map((val) => {
        return {
            am_item_map_slno: val.am_item_map_slno,
            am_spare_item_map_slno: val.am_spare_item_map_slno,
            spare_status: 1,
            create_user: val.create_user,
        }
    })
    const AddNewSpareUnderAsset = useCallback((e) => {
        const SparedetailInsert = async (SparepostData) => {
            const result = await axioslogin.post(`/ItemMapDetails/SpareDetailsInsert`, SparepostData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify("New Spare Added Under Asset")
                setCount(count + 1)
                setSpareData([])
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        SparedetailInsert(SparepostData)
    }, [SparepostData, count])

    const searchData = useMemo(() => {
        return {
            service_item_slno: item_asset_no_only,
            service_asset_spare: item_asset_no
        }
    }, [item_asset_no_only, item_asset_no]);

    useEffect(() => {
        const getServiceDetailsAll = async () => {
            const result = await axioslogin.post('/assetSpareDetails/getAllserviceDetails', searchData);
            const { success, data } = result.data;
            if (success === 2) {
                if (data.length > 0) {
                    setAlldetailsService(data)
                }
                else {
                    setAlldetailsService([])
                }
            }
            else {
                setAlldetailsService([])
            }
        }
        getServiceDetailsAll()
    }, [searchData, count])

    useEffect(() => {
        if (alldetailsService.length !== 0) {
            const getAssignedEmployees = async () => {
                const updatedEmployees = {};
                for (let complaint of alldetailsService) {
                    const result = await axioslogin.get(`Rectifycomplit/getAssignEmps/${complaint.complaint_slno}`);
                    const { success, data } = result.data;
                    if (success === 1) {
                        updatedEmployees[complaint.complaint_slno] = data;
                    } else {
                        updatedEmployees[complaint.complaint_slno] = [];
                    }
                }
                setTicketsServicedDetails(updatedEmployees);
            };
            getAssignedEmployees();
        } else {

        }
    }, [alldetailsService]);

    const fileView = async (val) => {
        const { complaint_slno } = val;
        setimage(1);
        setimageViewOpen(true);
        setfileDetails(val);
        try {
            const result = await axioslogin.get(`/complaintFileUpload/uploadFile/getComplaintFile/${complaint_slno}`);
            const { success } = result.data;
            if (success === 1) {
                const data = result.data;
                const fileNames = data.data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/ComplaintManagement/${complaint_slno}/${fileName}`;
                });
                setImageUrls(fileUrls);
                // Open the modal only if there are files
                if (fileUrls.length > 0) {
                    setSelectedImages(val);
                } else {
                    warningNotify("No Image attached");
                }
            } else {
                warningNotify("No Image Attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    }

    const fileViewAssetService = async (val) => {
        const { am_service_details_slno } = val;
        setServicefileDetails(val);
        try {
            const result = await axioslogin.get(`/AmServiceFileUpload/uploadFile/getAssetServiceFile/${am_service_details_slno}`);
            const { success } = result.data;
            if (success === 1) {
                const data = result.data;
                const fileNames = data.data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/AssetService/${am_service_details_slno}/${fileName}`;
                });
                setImageServiceUrls(fileUrls);
                // Open the modal only if there are files
                if (fileUrls.length > 0) {
                    setSelectedImages(val);
                    setimageServiceFlag(1);
                    setServiceimageViewOpen(true);

                } else {
                    warningNotify("No Files attached");
                }
            } else {
                warningNotify("No Files Attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    }

    useEffect(() => {
        if (alldetailsService.length !== 0) {
            const getServEmployees = async () => {
                const updatedServEmployees = {};
                for (let deptServiceemp of alldetailsService) {
                    // Create the searchDeptServiceData object for each iteration
                    const searchDeptServiceData = {
                        serviced_emp_detail_slno: deptServiceemp.serviced_emp_details_slno, // Use the current service employee slno
                    };
                    try {
                        const result = await axioslogin.post(`assetSpareDetails/getDeptServiceDetailsData`, searchDeptServiceData);
                        const { success, data } = result.data;
                        if (success === 1) {
                            updatedServEmployees[deptServiceemp.serviced_emp_details_slno] = data;
                        } else {
                            updatedServEmployees[deptServiceemp.serviced_emp_details_slno] = [];
                        }
                    } catch (error) {
                        updatedServEmployees[deptServiceemp.serviced_emp_details_slno] = [];
                        console.error("Error fetching employee details:", error);
                    }
                }
                setdeptServiceempList(updatedServEmployees); // Set the updated list after all requests
            };
            getServEmployees();
        }
    }, [alldetailsService]);



    const OpenDocument = useCallback(() => {
        if (billdetailsView.length !== 0) {
            setopenDocuments(1)
            setdocumetOpenCheck(true)
        }
        else {
            infoNotify("No Bills Attached")
        }
    }, [billdetailsView])

    const OpenLeaseDocument = useCallback(() => {
        if (leaseDocuments.length !== 0) {
            setopenDocuments(2)
            setdocumetOpenCheck(true)
        }
        else {
            infoNotify("No Documents Attached")
        }
    }, [leaseDocuments])
    const OpenAMCCMCDocument = useCallback(() => {
        if (amcCmcDocuments.length !== 0) {
            setopenDocuments(3)
            setdocumetOpenCheck(true)
        }
        else {
            infoNotify("No Documents Attached")
        }
    }, [amcCmcDocuments])

    useEffect(() => {
        const getamcCmcDocuments = async () => {
            try {
                if (amccmc_slno) {
                    const result = await axioslogin.get(`/AssetFileUpload/AmcCmcImageView/${amccmc_slno}`)
                    const { success, data } = result.data;
                    if (success === 1 && data && Array.isArray(data)) {
                        const fileNames = data;
                        const fileUrls = fileNames.map((fileName) => {
                            return `${PUBLIC_NAS_FOLDER}/Asset/AMCCMC/${amccmc_slno}/${fileName}`;
                        });
                        setamcCmcDocuments(fileUrls);
                    } else {
                        setamcCmcDocuments([]);
                    }
                }
            } catch (error) {
                warningNotify(error);
                setamcCmcDocuments([]);
            }
        };

        getamcCmcDocuments();
    }, [amccmc_slno]);


    useEffect(() => {
        const getleaseDocuments = async () => {
            try {
                if (am_lease_mast_slno) {
                    const result = await axioslogin.get(`/AssetFileUpload/LeaseMasterImageView/${am_lease_mast_slno}`);
                    const { success, data } = result.data;
                    if (success === 1 && data && Array.isArray(data)) {
                        const fileNames = data;
                        const fileUrls = fileNames.map((fileName) => {
                            return `${PUBLIC_NAS_FOLDER}/Asset/LeaseMaster/${am_lease_mast_slno}/${fileName}`;
                        });
                        setleaseDocuments(fileUrls);
                    } else {
                        setleaseDocuments([]);
                    }
                }
            } catch (error) {
                warningNotify(error);
                setleaseDocuments([]);
            }
        };
        getleaseDocuments();
    }, [am_lease_mast_slno]);

    useEffect(() => {
        const getDocumentViewBill = async () => {
            try {
                if (am_bill_mastslno) {
                    const result = await axioslogin.get(`/AssetFileUpload/BillMasterImageView/${am_bill_mastslno}`);
                    const { success, data } = result.data;
                    if (success === 1 && data && Array.isArray(data)) {
                        const fileNames = data;
                        const fileUrls = fileNames.map((fileName) => {
                            return `${PUBLIC_NAS_FOLDER}/Asset/BillMaster/${am_bill_mastslno}/${fileName}`;
                        });
                        setBilldetailsView(fileUrls);
                    } else {
                        setBilldetailsView([]);
                    }
                }
            } catch (error) {
                warningNotify(error);
                setBilldetailsView([]);
            }
        };

        getDocumentViewBill();
    }, [am_bill_mastslno]);



    return (
        <Box>
            {qrFlag === 1 ? <ItemQrDisplayModel open={qrOpen} handleClose={handleClose} selectedData={selectedData}
            /> : null}

            {openDocuments === 1 ?
                <ServiceDocumentModal setopenDocuments={setopenDocuments} open={documetOpenCheck} setdocumetOpenCheck={setdocumetOpenCheck}
                    DocumentView={billdetailsView} />
                :
                openDocuments === 2 ?
                    <ServiceDocumentModal setopenDocuments={setopenDocuments} open={documetOpenCheck} setdocumetOpenCheck={setdocumetOpenCheck}
                        DocumentView={leaseDocuments} />
                    :
                    openDocuments === 3 ?
                        <ServiceDocumentModal setopenDocuments={setopenDocuments} open={documetOpenCheck} setdocumetOpenCheck={setdocumetOpenCheck}
                            DocumentView={amcCmcDocuments} />
                        : null
            }
            {image === 1 ?
                <ComFileView
                    imageUrls={imageUrls}
                    imageViewOpen={imageViewOpen}
                    selectedImages={selectedImages}
                    fileDetails={fileDetails}
                    setimage={setimage}
                    setimageViewOpen={setimageViewOpen}
                /> : null}

            {imageServiceFlag === 1 ?
                <ServiceFileAttach
                    imageServiceUrls={imageServiceUrls}
                    serviceimageViewOpen={serviceimageViewOpen}
                    servicefileDetails={servicefileDetails}
                    setimageServiceFlag={setimageServiceFlag}
                    setServiceimageViewOpen={setServiceimageViewOpen}
                    item_name={item_name}
                    category_name={category_name}
                /> : null}
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={openSpare}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                    <Box
                        sx={{
                            width: '90vw',
                            height: '98vh',
                            bgcolor: 'background.body',
                            borderRadius: 'md',
                            boxShadow: 'lg',
                            display: 'flex',
                            flexDirection: 'column',
                            py: 2, px: 2,

                        }}
                    >
                        <Box sx={{ flexShrink: 0 }}>
                            <Box sx={{ flex: 1, display: 'flex', p: 1, }}>
                                <Box sx={{ flex: 1, color: 'grey', fontWeight: 500, pl: 1.4, pt: .8 }}>
                                    Asset Detail View
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <CancelIcon
                                        sx={{ color: 'grey', cursor: 'pointer', height: 30, width: 30 }}
                                        onClick={Close}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ flex: 1, bgcolor: '#FBFCFE', border: 1, mx: 1.5, borderRadius: 5, py: .5, borderColor: '#EFEFEF' }}>
                                <Typography
                                    sx={{
                                        pl: 2, fontWeight: 600, fontSize: 18,
                                    }}
                                >
                                    Asset Details
                                </Typography>
                                <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                    <Typography sx={{ flex: .4, pl: 2, pt: .4, fontWeight: 400, fontSize: 14 }}>
                                        Asset Number
                                    </Typography>
                                    <Box sx={{ flex: 3, }}>
                                        <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 15 }}>
                                            {item_asset_no}/{item_asset_no_only.toString().padStart(6, '0')}
                                        </Chip>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', my: .5 }}>
                                    <Typography sx={{ flex: .4, pl: 2, fontWeight: 400, pt: .4, fontSize: 14 }}>
                                        Asset Name
                                    </Typography>
                                    <Box sx={{ flex: 3, fontWeight: 500 }}>
                                        <Chip sx={{ bgcolor: '#EBEFFB' }}>{item_name}</Chip>
                                    </Box>
                                </Box>
                            </Box>

                            <Box>
                                <Tabs
                                    size="sm"
                                    sx={{
                                        display: 'flex',
                                        mx: 2,
                                        bgcolor: 'white',
                                        mt: .5
                                    }}
                                >
                                    <TabList
                                        sx={{
                                            pt: 1,
                                            justifyContent: 'center',
                                            [`&& .${tabClasses.root}`]: {
                                                flex: 'initial',
                                                bgcolor: 'white',
                                                '&:hover': {
                                                    bgcolor: 'white',
                                                },
                                                [`&.${tabClasses.selected}`]: {
                                                    color: 'primary.plainColor',
                                                    borderBottom: 1.5,
                                                    '&::after': {
                                                        height: 20,
                                                        borderTopLeftRadius: 3,
                                                        borderTopRightRadius: 3,
                                                        bgcolor: 'primary.500',
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', flex: 1, mb: 0 }} >
                                            <Box sx={{ flex: 1, display: 'flex', gap: 2 }}>
                                                <Tab value={0} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, p: 0, }}>
                                                    <UnarchiveOutlinedIcon />&nbsp;Asset Upgrade
                                                </Tab>
                                                <Tab value={1} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, p: 0, }}>
                                                    <InfoOutlinedIcon />&nbsp;About
                                                </Tab>

                                                <Tab value={2} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, p: 0 }}>
                                                    <DeveloperBoardOutlinedIcon />&nbsp;PM Details
                                                </Tab>
                                                <Tab value={3} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, p: 0 }}>
                                                    <LayersOutlinedIcon />&nbsp;Breakdown Details
                                                </Tab>
                                                <Tab value={4} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, p: 0 }}>
                                                    <TextSnippetOutlinedIcon />&nbsp;Documents
                                                </Tab>
                                            </Box>
                                        </Box>
                                    </TabList>

                                    <TabPanel
                                        value={0} sx={{
                                            p: 0,
                                            flexGrow: 1,
                                            overflowY: 'auto',
                                            maxHeight: 'calc(90vh - 230px)',
                                        }}>
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                overflowY: 'auto',
                                                maxHeight: '100%',
                                                m: 0,
                                                pt: 2
                                            }}>


                                            {spareDetails.length !== 0 ?
                                                <Box sx={{ flex: 1, mb: 3 }}>
                                                    <Typography
                                                        sx={{
                                                            flex: 1, pl: 1,
                                                            fontWeight: 600,
                                                            color: '#394060',

                                                        }}
                                                    >
                                                        Asset Include Spares
                                                    </Typography>
                                                    {spareDetails.length !== 0 && (
                                                        <Box sx={{ flex: 1, mx: 1, mt: 1, display: 'flex', bgcolor: '#E6E4F5' }}>
                                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>#</Box>
                                                            <Box sx={{ flex: 2, fontSize: 14, fontWeight: 600 }}>Spare Number</Box>
                                                            <Box sx={{ flex: 10, fontSize: 14, fontWeight: 600 }}>Spare Name</Box>
                                                            <Box sx={{ flex: 1.5, textAlign: 'center', fontSize: 14, fontWeight: 600, }}>Service</Box>
                                                        </Box>
                                                    )}
                                                    {spareDetails.map((val, index) => {
                                                        const formattedSlno = val.spare_asset_no_only.toString().padStart(6, '0');
                                                        return (
                                                            <Box key={index} sx={{ flex: 1, mx: 1, display: 'flex', borderBottom: 1, borderColor: 'lightgrey', pt: .8 }}>
                                                                <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13, fontWeight: 500 }}>{index + 1}</Box>
                                                                <Box sx={{ flex: 2, fontSize: 13, fontWeight: 500 }}>{val.spare_asset_no}/{formattedSlno}</Box>
                                                                <Box sx={{ flex: 10, fontSize: 13, fontWeight: 500 }}>{val.item_name}</Box>

                                                                <Tooltip title={'Spare will be Transfer to Service List by clicking'}
                                                                    sx={{ width: 200, }} color='warning' placement='top'>
                                                                    <Box sx={{ flex: 1.2, textAlign: 'center', fontSize: 13, pr: .5, cursor: 'pointer' }}>
                                                                        <ManageAccountsSharpIcon sx={{
                                                                            color: '#603A70', cursor: 'pointer', p: .1,
                                                                            '&:hover': { color: '#0000FF' },
                                                                        }}
                                                                            onClick={() => servicefunctn(val)}
                                                                        />
                                                                    </Box>
                                                                </Tooltip>
                                                            </Box>
                                                        );
                                                    })}
                                                </Box> : null}
                                            {item_asset_no_only !== undefined ?
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography
                                                        sx={{
                                                            flex: 1, pl: 1,
                                                            fontWeight: 600,
                                                            color: '#394060',

                                                        }}
                                                    >
                                                        Spare Replace - From Asset
                                                    </Typography>
                                                    <Typography sx={{ flex: 1, fontSize: 15, fontWeight: 600, ml: 1.3, mt: .5 }}>
                                                        <u>Add new spare</u>
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flex: 1 }}>
                                                        <Box sx={{ ml: 1, flex: 1, }}>
                                                            <CmSpareList sparez={sparez} setSparez={setSparez}
                                                                item_custodian_dept={item_custodian_dept}
                                                                setSpareName={setSpareName} />
                                                        </Box>
                                                        <Box sx={{ ml: 1, mr: 5, pt: 1, }}>
                                                            <AddCircleIcon sx={{ height: 28, width: 28, cursor: 'pointer' }} onClick={AddNewSpare} />
                                                        </Box>
                                                    </Box>
                                                    {spareData.length !== 0 ?
                                                        <>
                                                            <Box sx={{ flex: 1, mx: 1, display: 'flex', bgcolor: '#D4D0F1   ', mt: 1 }}>
                                                                <Box sx={{ flex: .5, textAlign: 'center', fontSize: 15, fontWeight: 600, color: 'black', }}>#</Box>
                                                                <Box sx={{ flex: 10, fontSize: 14, fontWeight: 600, color: 'black', }}>Spare Name</Box>
                                                                <Box sx={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 600, pr: .3, color: 'black', }}>Action</Box>
                                                            </Box>
                                                            {spareData.map((val, index) => {
                                                                return (
                                                                    <Box key={index} sx={{
                                                                        flex: 1, mx: 1, display: 'flex', borderBottom: 1, borderColor: 'lightgrey', py: .5
                                                                    }}>
                                                                        <Box sx={{ flex: .5, textAlign: 'center', fontSize: 13 }}>{index + 1}</Box>
                                                                        <Box sx={{ flex: 10, fontSize: 13 }}>{val.name}</Box>
                                                                        <Tooltip title={'Spare will be removed  by clicking'}
                                                                            color='neutral' placement='left'>
                                                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13, pr: .5, cursor: 'pointer' }}>
                                                                                <DeleteForeverIcon sx={{
                                                                                    color: 'darkred', cursor: 'pointer', p: .1,
                                                                                    '&:hover': { color: 'red' },
                                                                                }}
                                                                                    onClick={() => handleDelete(index)}
                                                                                />

                                                                            </Box>
                                                                        </Tooltip>
                                                                    </Box>
                                                                );
                                                            })}

                                                            <Box sx={{ flex: 1, }}>
                                                                <Box sx={{
                                                                    bgcolor: '#D4D0F1', width: 100, textAlign: 'center', margin: 'auto', borderRadius: 5, color: 'Black',
                                                                    fontWeight: 600, cursor: 'pointer', mt: 1
                                                                }}
                                                                    onClick={AddNewSpareUnderAsset}>
                                                                    Add
                                                                </Box>
                                                            </Box>
                                                        </> : null}
                                                </Box> : null}

                                        </Box>
                                    </TabPanel>
                                    <TabPanel
                                        value={1} sx={{
                                            p: 0,
                                            flexGrow: 1,
                                            overflowY: 'auto',
                                            maxHeight: 'calc(90vh - 230px)',
                                        }}>
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                overflowY: 'auto',
                                                maxHeight: '100%',
                                                m: 0,
                                                pt: 2
                                            }}>
                                            <Typography sx={{ color: '#414766', fontWeight: 600 }}>
                                                Item Details
                                            </Typography>

                                            {assetabout && assetabout.length > 0 && assetabout.map((item, index) => (
                                                <Box key={index}>

                                                    <Box
                                                        sx={{
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(3, 1fr)',
                                                        }}
                                                    >
                                                        {item.asset_type_name !== null && (
                                                            <Box sx={{ flex: '1 1 300px', display: 'flex' }}>
                                                                <Typography sx={{ color: '#5B7485', flex: 1 }}>Asset type</Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14, pt: 0.4, flex: 2 }}>
                                                                    {item.asset_type_name}
                                                                </Typography>
                                                            </Box>
                                                        )}

                                                        {item.item_type_name !== null && (
                                                            <Box sx={{ flex: '1 1 300px', display: 'flex' }}>
                                                                <Typography sx={{ color: '#5B7485', flex: 1 }}>Item type</Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14, pt: 0.4, flex: 2 }}>
                                                                    {item.item_type_name}
                                                                </Typography>
                                                            </Box>
                                                        )}

                                                        {item.category_name !== null && (
                                                            <Box sx={{ flex: '1 1 300px', display: 'flex' }}>
                                                                <Typography sx={{ color: '#4C5D70', flex: 1 }}>Category</Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14, pt: 0.4, flex: 2 }}>
                                                                    {item.category_name}
                                                                </Typography>
                                                            </Box>
                                                        )}

                                                        {item.subcategory_name !== null && (
                                                            <Box sx={{ flex: '1 1 300px', display: 'flex' }}>
                                                                <Typography sx={{ color: '#4C5D70', flex: 1 }}>Sub category</Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14, flex: 2 }}>
                                                                    {item.subcategory_name}
                                                                </Typography>
                                                            </Box>
                                                        )}

                                                        {item.group_name !== null && (
                                                            <Box sx={{ flex: '1 1 250px', display: 'flex' }}>
                                                                <Typography sx={{ color: '#4C5D70', flex: 1 }}>Group</Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14, flex: 2 }}>
                                                                    {item.group_name}
                                                                </Typography>
                                                            </Box>
                                                        )}

                                                        {item.sub_group_name !== null && (
                                                            <Box sx={{ flex: '1 1 300px', display: 'flex' }}>
                                                                <Typography sx={{ color: '#4C5D70', flex: 1 }}>Sub group</Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14, flex: 2 }}>
                                                                    {item.sub_group_name}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                        {item.item_model_num !== null && (
                                                            <Box sx={{ flex: '1 1 250px', display: 'flex' }}>
                                                                <Typography sx={{ color: '#4C5D70', flex: 1 }}>Model No.</Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14, flex: 2 }}>
                                                                    {item.item_model_num}
                                                                </Typography>
                                                            </Box>
                                                        )}

                                                        {item.model_name !== null && (
                                                            <Box sx={{ flex: '1 1 300px', display: 'flex' }}>
                                                                <Typography sx={{ color: '#4C5D70', flex: 1 }}>Model Name</Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14, flex: 2 }}>
                                                                    {item.model_name}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                        {item.manufacture_name !== null && (
                                                            <Box sx={{ flex: '1 1 300px', display: 'flex' }}>
                                                                <Typography sx={{ color: '#4C5D70', flex: 1 }}>Manufacture</Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14, flex: 2 }}>
                                                                    {item.manufacture_name}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                        {item.item_specific_one !== null && (
                                                            <Box sx={{ flex: '1 1 300px', display: 'flex' }}>
                                                                <Typography sx={{ color: '#4C5D70', flex: 1 }}>Specification 1</Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14, flex: 2 }}>
                                                                    {item.item_specific_one}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                        {item.item_specific_two !== null && (
                                                            <Box sx={{ flex: '1 1 300px', display: 'flex' }}>
                                                                <Typography sx={{ color: '#4C5D70', flex: 1 }}>Specification 2</Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14, flex: 2 }}>
                                                                    {item.item_specific_two}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>




                                                    <Typography sx={{ color: '#414766', fontWeight: 600, mt: 2 }}>
                                                        Ownership Details
                                                    </Typography>
                                                    <Box sx={{ flex: 1, display: 'flex', pt: 1.5 }}>
                                                        {item.prim_cus !== null ?
                                                            <Box >
                                                                <Typography sx={{ color: '#5B7485' }}>
                                                                    Primary Custodian
                                                                </Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14 }}>
                                                                    {item.prim_cus}
                                                                </Typography>

                                                            </Box> : null}
                                                        {item.second_cus !== null ?
                                                            <Box sx={{ ml: 3 }}>
                                                                <Typography sx={{ color: '#5B7485' }}>
                                                                    Secondary Custodian
                                                                </Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14 }}>
                                                                    {item.second_cus}
                                                                </Typography>
                                                            </Box> : null}

                                                    </Box>
                                                    <Typography sx={{ color: '#414766', fontWeight: 600, mt: 2 }}>
                                                        Device Details
                                                    </Typography>
                                                    <Box sx={{ flex: 1, display: 'flex', pt: 1.5 }}>
                                                        {item.am_manufacture_no !== null ?
                                                            <Box sx={{ mr: 3 }}>
                                                                <Typography sx={{ color: '#5B7485' }}>
                                                                    Manufacture Slno.
                                                                </Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14 }}>
                                                                    {item.am_manufacture_no}
                                                                </Typography>

                                                            </Box> : null}
                                                        {item.am_asset_old_no !== null ?
                                                            <Box sx={{ mr: 3 }}>
                                                                <Typography sx={{ color: '#5B7485' }}>
                                                                    Asset Number Old
                                                                </Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14 }}>
                                                                    {item.am_asset_old_no}
                                                                </Typography>
                                                            </Box> : null}
                                                        {item.second_cus !== null ?
                                                            <Box sx={{ mr: 3 }}>
                                                                <Typography sx={{ color: '#5B7485' }}>

                                                                    Rack number
                                                                </Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14 }}>
                                                                    {item.second_cus}
                                                                </Typography>
                                                            </Box> : null}


                                                    </Box>
                                                    <Typography sx={{ color: '#414766', fontWeight: 600, mt: 2 }}>
                                                        GNR Details
                                                    </Typography>
                                                    <Box sx={{ flex: 1, display: 'flex', pt: 1.5 }}>
                                                        {item.am_grn_no !== null ?
                                                            <Box sx={{}}>
                                                                <Typography sx={{ color: '#5B7485' }}>
                                                                    GNR Number
                                                                </Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14 }}>
                                                                    {item.am_grn_no}
                                                                </Typography>

                                                            </Box> : null}
                                                        {item.am_grn_date !== null ?
                                                            <Box sx={{ ml: 3 }}>
                                                                <Typography sx={{ color: '#5B7485' }}>
                                                                    GNR Date
                                                                </Typography>
                                                                <Typography sx={{ color: 'black', fontSize: 14 }}>
                                                                    {item.am_grn_date}
                                                                </Typography>
                                                            </Box> : null}

                                                    </Box>
                                                </Box>
                                            ))}
                                            <Typography sx={{ color: '#414766', fontWeight: 600, mt: 2 }}>
                                                Asset Specification
                                            </Typography>
                                            {assetSpecif.length !== 0 ?
                                                <Box sx={{ mr: 3, mt: 1 }}>
                                                    <Table stickyHeader >
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: 40, align: "center" }}>#</th>
                                                                <th style={{ align: "center" }}>Specifications</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {assetSpecif && assetSpecif.map((val, index) => {
                                                                return <tr
                                                                    key={index}
                                                                    sx={{
                                                                        '&:last-child td, &:last-child th': { border: 0 },
                                                                        minHeight: 5
                                                                    }}
                                                                >
                                                                    <td style={{ height: 10 }}> {index + 1}</td>
                                                                    <td style={{ height: 10 }}> {val.specifications}</td>

                                                                </tr>
                                                            })}
                                                        </tbody>
                                                    </Table>
                                                </Box> : null
                                            }
                                        </Box>
                                    </TabPanel>
                                    <TabPanel
                                        value={2} sx={{
                                            p: 0,
                                            flexGrow: 1,
                                            overflowY: 'auto',
                                            maxHeight: 'calc(90vh - 230px)',
                                        }}>
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                overflowY: 'auto',
                                                maxHeight: '100%',
                                                m: 0,
                                                pt: 2
                                            }}>
                                            <Box sx={{ flex: 1, mt: 1.5 }} >
                                                <Box>
                                                    <Typography sx={{ flex: 1, fontSize: 15, fontWeight: 600, color: '#394060', }}>
                                                        PM Details
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', mt: 1 }}>
                                                        <Typography sx={{ fontWeight: 500, fontSize: 14, width: 150 }}>
                                                            Installation Date
                                                        </Typography>
                                                        :
                                                        <Typography sx={{ fontWeight: 500, fontSize: 14, pl: 1 }}>
                                                            {instalationDate}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', mt: 1 }}>
                                                        <Typography sx={{ fontWeight: 500, fontSize: 14, width: 150 }}>
                                                            Upcoming PM Date
                                                        </Typography>
                                                        :
                                                        <Typography sx={{ fontWeight: 500, fontSize: 14, pl: 1 }}>
                                                            {dueDate}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', flex: 1, mt: 2, gap: 1 }}>
                                                        <Box sx={{ flex: 1, }}>
                                                            <Typography sx={{ fontWeight: 500, fontSize: 14, pl: .5, color: '#0B6BCB' }}>
                                                                Installation Date
                                                            </Typography>
                                                            <Input
                                                                size="sm"
                                                                type='date'
                                                                sx={{

                                                                    borderColor: '#E6E4F5',
                                                                    fontSize: 14, fontWeight: 500
                                                                }}
                                                                name="instalationDate"
                                                                value={instalationDate}
                                                                onChange={UpdateinstalationDate}
                                                            />
                                                        </Box>
                                                        <Box sx={{ width: 150 }}>
                                                            <Typography sx={{ fontWeight: 500, fontSize: 14, pl: .5, color: '#0B6BCB' }}>
                                                                Next PM with in
                                                            </Typography>
                                                            <Input
                                                                size="sm"
                                                                type='number'
                                                                sx={{

                                                                    borderColor: '#E6E4F5',
                                                                    fontSize: 14, fontWeight: 500
                                                                }}
                                                                name="dueDateCount"
                                                                value={dueDateCount}
                                                                onChange={UpdatedueDateCount}
                                                                endDecorator={<Box>Days</Box>}
                                                            />
                                                        </Box>
                                                        <Box sx={{ flex: 1, }}>
                                                            <Typography sx={{ fontWeight: 500, fontSize: 14, pl: .5, color: '#0B6BCB' }}>
                                                                Next PM Date
                                                            </Typography>
                                                            <Input
                                                                size="sm"
                                                                type='date'
                                                                sx={{

                                                                    borderColor: '#E6E4F5',
                                                                    fontSize: 14, fontWeight: 500
                                                                }}
                                                                name="dueDate"
                                                                value={dueDate}
                                                                disabled={true}
                                                            />
                                                        </Box>
                                                        <Box sx={{ flex: 2, pt: 2, display: 'flex' }}>
                                                            <Tooltip title={'PM details will be added by clicking'} color='neutral' placement='top'>
                                                                <Box onClick={SavePMDetails} sx={{ display: "flex", cursor: 'pointer', pt: 1, px: .2 }} >
                                                                    {daysEnable === 1 ? <>
                                                                        <LibraryAddIcon sx={{ color: '#0B6BCB' }} />

                                                                    </> : null}
                                                                </Box>
                                                            </Tooltip>
                                                        </Box>
                                                    </Box>
                                                    {pmFlag === 1 ?
                                                        <Box sx={{ cursor: 'pointer', pt: 1.5, pl: .5, pb: 5 }} onClick={qrCodeOpen} >
                                                            <QrCode2Icon sx={{ color: 'black', border: 1, height: 50, width: 50, p: .3, borderRadius: 0, }} />
                                                            <Typography sx={{ fontSize: 14, color: 'black', pt: .5, fontWeight: 500 }}>
                                                                Print QR
                                                            </Typography>
                                                        </Box> : null}

                                                </Box>



                                            </Box>

                                        </Box>
                                    </TabPanel>
                                    <TabPanel
                                        value={3} sx={{
                                            p: 0,
                                            flexGrow: 1,
                                            overflowY: 'auto',
                                            maxHeight: 'calc(90vh - 230px)',
                                        }}>
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                overflowY: 'auto',
                                                maxHeight: '100%',
                                                m: 0,
                                                pt: 2
                                            }}>


                                            {alldetailsService.length !== 0 ?
                                                <Box >
                                                    <Typography
                                                        sx={{
                                                            pl: 1,
                                                            flex: 1,
                                                            fontWeight: 600,
                                                            color: '#394060',
                                                        }}
                                                    >

                                                        Serviced Details
                                                    </Typography>

                                                    {alldetailsService?.map((val, index) => {
                                                        return (
                                                            <Box
                                                                key={index} sx={{ ml: .5, mt: 1, mb: 2, border: 1, py: 2, mr: 1 }}>
                                                                <Box sx={{ display: 'flex' }}>
                                                                    <Box sx={{ px: 1, borderRadius: 10 }}>
                                                                        {index + 1}.
                                                                    </Box>
                                                                    <Box sx={{ flex: 1 }}>
                                                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                                Ticket No.
                                                                            </Typography>
                                                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                                : {val.complaint_slno !== null ? val.complaint_slno : 'Not Updated'}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                                Ticket type.
                                                                            </Typography>
                                                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                                : {val.complaint_type_name !== null ? val.complaint_type_name : 'Not Updated'}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                                Ticket desc.
                                                                            </Typography>
                                                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                                : {val.complaint_desc !== null ? val.complaint_desc : 'Not Updated'}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                                Section
                                                                            </Typography>
                                                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                                : {val.sec_name !== null ? val.sec_name : 'Not Updated'}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                                Location
                                                                            </Typography>
                                                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                                : {val.rm_room_name}
                                                                                {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name ?
                                                                                    ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name &&
                                                                                        val.rm_insidebuildblock_name ? ' - ' : ''}
                                                                ${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${(val.rm_insidebuildblock_name &&
                                                                                        val.rm_floor_name) ? ' - ' : ''}
                                                                ${val.rm_floor_name ? val.rm_floor_name : ''})`
                                                                                    : "Not Updated"}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                                Registered Date
                                                                            </Typography>
                                                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                                : {val.compalint_date !== null ? val.compalint_date : 'Not Updated'}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                                Assingees
                                                                            </Typography>
                                                                            <Box sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                                {ticketsServicedDetails[val.complaint_slno]?.map((emp, index) => (
                                                                                    <Chip
                                                                                        key={index}
                                                                                        size="small"
                                                                                        variant="outlined"
                                                                                        sx={{ bgcolor: '#D3C7A1', fontSize: 13, px: .8 }}>
                                                                                        {emp.em_name}
                                                                                    </Chip>
                                                                                ))}
                                                                            </Box>
                                                                        </Box>
                                                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                                Ticket Attachments
                                                                            </Typography>
                                                                            <Box sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, pt: .5 }}>
                                                                                <Box
                                                                                    onClick={() => fileView(val)}
                                                                                    sx={{ bgcolor: '#41729F', color: 'white', width: 85, pl: 1, borderRadius: 10, cursor: 'pointer' }}
                                                                                >
                                                                                    <FilePresentRoundedIcon sx={{
                                                                                        color: 'white',
                                                                                        cursor: 'pointer',
                                                                                        height: 20, width: 18, pb: .1
                                                                                    }} />file view
                                                                                </Box>
                                                                            </Box>
                                                                        </Box>
                                                                        <Typography sx={{ fontWeight: 700, mt: .5 }}>
                                                                            Department serviced Details
                                                                        </Typography>
                                                                        <Box sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, mr: 3 }}>
                                                                            <Box sx={{ display: 'flex', pl: .5, flex: 1, mt: .5, bgcolor: '#EBEFFB' }}>

                                                                                <Box sx={{ flex: .3 }} >
                                                                                    #
                                                                                </Box>
                                                                                <Box sx={{ flex: 1 }} >
                                                                                    Attended by
                                                                                </Box>
                                                                                <Box sx={{ flex: 2 }} >
                                                                                    Serviced Date
                                                                                </Box>
                                                                                <Box sx={{ flex: 3 }} >
                                                                                    Issues Identified
                                                                                </Box>
                                                                                <Box sx={{ flex: 3 }} >
                                                                                    Remarks
                                                                                </Box>
                                                                            </Box>
                                                                            {deptServiceempList[val.serviced_emp_details_slno]?.map((emp, index) => (
                                                                                <Box key={index} sx={{
                                                                                    display: 'flex', pl: .5, flex: 1, mt: .5, borderBottom: 1, borderBottomColor: 'lightgrey'
                                                                                }}>

                                                                                    <Box sx={{ flex: .3 }} >
                                                                                        {index + 1}
                                                                                    </Box>
                                                                                    <Box sx={{ flex: 1 }} >
                                                                                        {emp.em_name}
                                                                                    </Box>
                                                                                    <Box sx={{ flex: 2 }} >
                                                                                        {emp.serviced_date}
                                                                                    </Box>
                                                                                    <Box sx={{ flex: 3 }} >
                                                                                        {emp.service_issues_identified}
                                                                                    </Box>
                                                                                    <Box sx={{ flex: 3 }} >
                                                                                        {emp.serviced_issue_remarks}
                                                                                    </Box>
                                                                                </Box>
                                                                            ))}
                                                                        </Box>
                                                                        <Typography sx={{ fontWeight: 700, mt: 2 }}>
                                                                            Supplier serviced Details
                                                                        </Typography>
                                                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                                Serviced Date
                                                                            </Typography>
                                                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                                : {val.suppl_serviced_date !== null ? val.suppl_serviced_date : 'Not Updated'}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                                Services Performed
                                                                            </Typography>
                                                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                                : {val.suppl_serviced_remarks !== null ? val.suppl_serviced_remarks : 'Not Updated'}
                                                                            </Typography>
                                                                        </Box>

                                                                        <Typography sx={{ fontWeight: 700, mt: 2 }}>
                                                                            Restore Details
                                                                        </Typography>
                                                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                                Restore Date
                                                                            </Typography>
                                                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                                : {val.add_to_store_date !== null ? val.add_to_store_date : 'Not Updated'}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                                Restored Employee
                                                                            </Typography>
                                                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                                : {val.em_name !== null ? val.em_name : 'Not Updated'}
                                                                            </Typography>
                                                                        </Box>

                                                                        <Box
                                                                            onClick={() => fileViewAssetService(val)}
                                                                            sx={{
                                                                                bgcolor: '#41729F', color: 'white', width: 110,
                                                                                px: 1, borderRadius: 10, cursor: 'pointer',
                                                                                flex: 4, fontSize: 13, mt: 1, display: 'flex'
                                                                            }}
                                                                        >
                                                                            <FilePresentRoundedIcon sx={{
                                                                                color: 'white',
                                                                                cursor: 'pointer',
                                                                                height: 20, width: 18, pb: .1
                                                                            }} />Attachments
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        )
                                                    })}
                                                </Box> :
                                                <Box sx={{ my: 10, fontWeight: 600, color: 'lightgray', fontSize: 20, flex: 1, display: 'flex', justifyContent: 'center' }}>
                                                    No Service Done Yet!
                                                </Box>}

                                        </Box>
                                    </TabPanel>
                                    <TabPanel
                                        value={4} sx={{
                                            p: 0,
                                            flexGrow: 1,
                                            overflowY: 'auto',
                                            maxHeight: 'calc(90vh - 230px)',
                                        }}>
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                overflowY: 'auto',
                                                maxHeight: '100%',
                                                m: 0,
                                                pt: 2
                                            }}>
                                            {assetabout && assetabout.length > 0 && assetabout.map((item, index) => (
                                                <Box key={index}
                                                    sx={{
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                                        gap: 1
                                                    }}
                                                >
                                                    <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, }}>
                                                        <Typography
                                                            sx={{
                                                                flex: 1,
                                                                fontWeight: 600,
                                                                color: '#394060',
                                                            }}
                                                        >
                                                            Purchase Bills
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', flex: 1, mt: 1 }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                Bill No.
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.am_bill_no || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                Bill Date
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.am_bill_date || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                Bill Amount
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.am_bill_amount || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                Supplier
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.bill_supplier_name || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ flex: 1, height: 40, width: 40, m: 1, cursor: 'pointer' }}
                                                            onClick={OpenDocument}
                                                        >
                                                            <img src={serviceFold} alt={serviceFold} style={{ width: "100%", height: "100%" }} loading="lazy" />
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, }}>
                                                        <Typography
                                                            sx={{
                                                                flex: 1,
                                                                fontWeight: 600,
                                                                color: '#394060',
                                                                pb: 1
                                                            }}
                                                        >
                                                            AMC/CMC Details
                                                        </Typography>
                                                        <Chip sx={{ border: 1, borderColor: '#05445E' }}>
                                                            {item.amc_status === 1 ? "AMC" : item.cmc_status === 1 ? "CMC" : "not Updated"}
                                                        </Chip>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                From Date
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.from_date || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                To Date
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.to_date || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                Supplier
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.amc_cmc_suppliername || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ flex: 1, height: 40, width: 40, m: 1, cursor: 'pointer' }}
                                                            onClick={OpenAMCCMCDocument}
                                                        >
                                                            <img src={serviceFold} alt={serviceFold} style={{ width: "100%", height: "100%" }} loading="lazy" />
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, }}>
                                                        <Typography
                                                            sx={{
                                                                flex: 1,
                                                                fontWeight: 600,
                                                                color: '#394060',
                                                            }}
                                                        >
                                                            Lease Details
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', flex: 1, mt: 1 }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                From Date
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.lease_fromdate || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                To Date
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.lease_todate || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                Lease Amount
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.lease_amount || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                Supplier
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.lease_suppliername || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ flex: 1, height: 40, width: 40, m: 1, cursor: 'pointer' }}
                                                            onClick={OpenLeaseDocument}
                                                        >
                                                            <img src={serviceFold} alt={serviceFold} style={{ width: "100%", height: "100%" }} loading="lazy" />
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, }}>
                                                        <Typography
                                                            sx={{
                                                                flex: 1,
                                                                fontWeight: 600,
                                                                color: '#394060',
                                                                pb: 1
                                                            }}
                                                        >
                                                            Warrenty/Guarantee Details
                                                        </Typography>
                                                        <Chip sx={{ border: 1, borderColor: '#05445E' }}>
                                                            {item.warrenty_status === 1 ? "Warrenty" : item.guarenty_status === 1 ? "Guarentee" : "Not Updated"}
                                                        </Chip>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>

                                                            <Typography sx={{ width: 110 }}>
                                                                From Date
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.wargar_from_date || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                To Date
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.wargar_to_date || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                Toll Free No.
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.troll_free || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                Contact No. 1
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.ph_one || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                Contact No. 2
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.ph_two || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flex: 1, }}>
                                                            <Typography sx={{ width: 110 }}>
                                                                Address
                                                            </Typography>
                                                            <Typography sx={{ flex: 1, }}>
                                                                {item.address || "Not Updated"}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>))}






                                        </Box>
                                    </TabPanel>

                                </Tabs>
                            </Box>
                        </Box>
                    </Box >
                </Modal >
            </CssVarsProvider >



        </Box >
        // <Box>
        //     {qrFlag === 1 ? <ItemQrDisplayModel open={qrOpen} handleClose={handleClose} selectedData={selectedData}
        //     /> : null}

        //     <CssVarsProvider>
        //         <Modal
        //             aria-labelledby="modal-title"
        //             aria-describedby="modal-desc"
        //             open={openSpare}
        //             sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10, }}>

        //             <Box
        //                 sx={{
        //                     width: '70vw',
        //                     height: '90vh',
        //                     bgcolor: 'background.body',
        //                     borderRadius: 'md',
        //                     boxShadow: 'lg',
        //                     overflow: 'auto',
        //                     py: 2,
        //                 }}
        //             >


        //                 <Box sx={{ flex: 1, display: 'flex', mt: 1, py: 1, px: 3, flexShrink: 0, }}>
        //                     <Box sx={{ flex: 1, color: 'grey', }}>
        //                         Asset Spare Details
        //                     </Box>
        //                     <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        //                         <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }}
        //                             onClick={Close}
        //                         />
        //                     </Box>
        //                 </Box>



        //                 <Box sx={{
        //                     display: 'flex',
        //                     bgcolor: '#9186D1',
        //                     py: .5,
        //                     pl: 1,
        //                 }}>
        //                     <Avatar size='sm'  >
        //                         <SettingsSuggestIcon />
        //                     </Avatar>
        //                     <Typography sx={{ pt: .5, fontWeight: 500, fontSize: 14, pl: .5, color: 'white' }}>
        //                         ASSET :
        //                     </Typography>
        //                     <Box>
        //                         <Typography sx={{ pl: 1, pt: .5, color: 'white', fontWeight: 500, fontSize: 14 }}>
        //                             {item_name} - {item_asset_no}/{am_item_map_slno.toString().padStart(6, '0')}
        //                         </Typography>
        //                     </Box>
        //                 </Box>
        //                 <Box sx={{ ml: 3, mt: 3 }}>
        //                     <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 700, }}>
        //                         <u>Manufacture Details</u>
        //                     </Typography>
        //                     <Box sx={{ display: 'flex', ml: .5, mt: 1 }}>
        //                         <Typography sx={{ fontSize: 15, width: 130 }}>
        //                             Manufacture No.
        //                         </Typography>
        //                         :
        //                         <Chip sx={{
        //                             ml: 2,
        //                             border: 1,
        //                             bgcolor: 'white',
        //                             borderColor: '#E6E4F5',
        //                         }}>
        //                             {manufacturedetails}
        //                         </Chip>
        //                     </Box>

        //                 </Box>
        //                 <Box
        //                     sx={{ flex: 1, display: 'flex', ml: 3, mt: 1.5 }}
        //                 >
        //                     <Box >
        //                         <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 700, }}>
        //                             <u>PM Details</u>
        //                         </Typography>
        //                         <Box sx={{ display: 'flex', ml: .5, mt: 1 }}>
        //                             <Typography sx={{ fontSize: 15, width: 130 }}>
        //                                 Installation Date
        //                             </Typography>
        //                             :
        //                             <Input
        //                                 size="sm"
        //                                 type='date'
        //                                 sx={{
        //                                     minHeight: 25,
        //                                     maxHeight: 25,
        //                                     lineHeight: 1,
        //                                     borderRadius: 20,
        //                                     ml: 1.8,
        //                                     borderColor: '#E6E4F5',
        //                                     width: 110,
        //                                     fontSize: 12
        //                                 }}
        //                                 name="instalationDate"
        //                                 value={instalationDate}
        //                                 onChange={UpdateinstalationDate} />
        //                         </Box>
        //                         <Box sx={{ display: 'flex', ml: .5, mt: .3 }}>
        //                             <Typography sx={{ fontSize: 15, width: 130 }}>
        //                                 Next PM with in
        //                             </Typography>
        //                             :
        //                             <Input
        //                                 size="sm"
        //                                 type='number'
        //                                 sx={{
        //                                     minHeight: 25,
        //                                     maxHeight: 25,
        //                                     lineHeight: 1,
        //                                     borderRadius: 20,
        //                                     ml: 1.8,
        //                                     borderColor: '#E6E4F5',
        //                                     width: 110,
        //                                     fontSize: 12
        //                                 }}

        //                                 name="dueDateCount"
        //                                 value={dueDateCount}
        //                                 onChange={UpdatedueDateCount}
        //                                 endDecorator={<Box>Days</Box>}
        //                             />
        //                         </Box>
        //                         <Box sx={{ display: 'flex', ml: .5, mt: .3 }}>
        //                             <Typography sx={{ fontSize: 15, width: 130 }}>
        //                                 Next PM Dates
        //                             </Typography>
        //                             :
        //                             <Input
        //                                 size="sm"
        //                                 type='date'
        //                                 sx={{
        //                                     minHeight: 25,
        //                                     maxHeight: 25,
        //                                     lineHeight: 1,
        //                                     borderRadius: 20,
        //                                     ml: 1.8,
        //                                     borderColor: '#E6E4F5',
        //                                     width: 110,
        //                                     fontSize: 12
        //                                 }}
        //                                 name="dueDate"
        //                                 value={dueDate}
        //                                 disabled={true}
        //                             />
        //                         </Box>
        //                     </Box>

        //                     <Box sx={{ flex: 1, pt: 6, pl: 3, display: 'flex' }}>
        //                         <Tooltip title={'PM details will be added by clicking'} variant='soft' color='primary' placement='right'>
        //                             <Box onClick={SavePMDetails} sx={{ display: "flex", cursor: 'pointer', }} >
        //                                 {daysEnable === 1 ? <>
        //                                     {pmFlag === 1 ? <CheckBoxIcon sx={{ height: 28, width: 28, color: '#8B71D6', border: 1, }} /> :
        //                                         <CheckBoxOutlineBlankIcon sx={{ height: 28, width: 28, color: '#8B71D6', border: 1, }} />}
        //                                     <Typography sx={{ fontSize: 14, color: '#8B71D6', pt: .5, ml: .5, fontWeight: 500 }}>
        //                                         PM Changed
        //                                     </Typography>   </> : null}
        //                             </Box>
        //                         </Tooltip>
        //                         {pmFlag === 1 ?
        //                             <Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={qrCodeOpen} >
        //                                 <QrCode2Icon sx={{ color: 'black', border: 1, height: 28, width: 28, p: .3, borderRadius: 0, ml: 5 }} />
        //                                 <Typography sx={{ ml: .5, fontSize: 14, color: 'black', pt: .5, fontWeight: 500 }}>
        //                                     Print QR
        //                                 </Typography>
        //                             </Box> : null}
        //                     </Box>

        //                 </Box>
        //                 <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 700, ml: 3, mt: 1.5 }}>
        //                     <u>Add New Spare</u>
        //                 </Typography>
        //                 <Box sx={{ display: 'flex', flex: 1 }}>
        //                     <Box sx={{ ml: 3, flex: 1, mt: 1 }}>
        //                         <CmSpareList
        //                             sparez={sparez}
        //                             setSparez={setSparez}
        //                             item_custodian_dept={item_custodian_dept}
        //                             setSpareName={setSpareName} />
        //                     </Box>
        //                     <Box sx={{ ml: 1, mr: 5, pt: 1.5, }}>
        //                         <AddCircleIcon sx={{ height: 28, width: 28 }} onClick={AddNewSpare} />
        //                     </Box>
        //                 </Box>
        //                 {spareData.length !== 0 ?
        //                     <>
        //                         <Box sx={{ flex: 1, mx: 3, display: 'flex', bgcolor: '#BBAFE0', mt: 1 }}>
        //                             <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>#</Box>
        //                             <Box sx={{ flex: 10, fontSize: 14, fontWeight: 600 }}>Spare Name</Box>
        //                             <Box sx={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 600, pr: .3 }}>Action</Box>
        //                         </Box>

        //                         {spareData.map((val, index) => {
        //                             return (
        //                                 <Box key={index} sx={{
        //                                     flex: 1, mx: 3, display: 'flex', borderBottom: 1, borderColor: '#E6E4F5',
        //                                     bgcolor: 'white',
        //                                 }}>
        //                                     <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13 }}>{index + 1}</Box>
        //                                     <Box sx={{ flex: 10, fontSize: 13 }}>{val.name}</Box>
        //                                     <Tooltip title={'Spare will be removed  by clicking'}
        //                                         color='neutral' placement='left'>
        //                                         <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13, pr: .5, cursor: 'pointer' }}>
        //                                             <DeleteForeverIcon sx={{
        //                                                 color: '#4B443C', cursor: 'pointer', p: .1,
        //                                                 '&:hover': { color: 'darkred' },
        //                                             }}
        //                                                 onClick={() => handleDelete(index)}
        //                                             />

        //                                         </Box>
        //                                     </Tooltip>
        //                                 </Box>
        //                             );
        //                         })}

        //                         <Box sx={{ flex: 1, }}>
        //                             <Box sx={{
        //                                 bgcolor: '#BBAFE0', width: 100, textAlign: 'center', margin: 'auto', borderRadius: 5, color: 'balck',
        //                                 fontWeight: 600, cursor: 'pointer', mt: 1
        //                             }}
        //                                 onClick={AddNewSpareUnderAsset}>
        //                                 Add
        //                             </Box>
        //                         </Box>
        //                     </> : null}
        //                 {spareDetails.length !== 0 ?

        //                     <Box sx={{ flex: 1, mb: 2 }}>
        //                         <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 700, ml: 3, mt: 1 }}>
        //                             <u>Spares Under Asset</u>
        //                         </Typography>
        //                         {spareDetails.length !== 0 && (
        //                             <Box sx={{ flex: 1, mx: 3, mt: 1, display: 'flex', bgcolor: '#E6E4F5' }}>
        //                                 <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>#</Box>
        //                                 <Box sx={{ flex: 2, fontSize: 14, fontWeight: 600 }}>Spare Number</Box>
        //                                 <Box sx={{ flex: 10, fontSize: 14, fontWeight: 600 }}>Spare Name</Box>
        //                                 <Box sx={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 600, pr: 1.8 }}>Service</Box>
        //                             </Box>
        //                         )}

        //                         {spareDetails.map((val, index) => {
        //                             const formattedSlno = val.am_spare_item_map_slno.toString().padStart(6, '0');
        //                             return (
        //                                 <Box key={index} sx={{
        //                                     flex: 1, mx: 3, display: 'flex', borderBottom: 1, borderColor: '#E6E4F5',
        //                                     pt: .8,
        //                                     bgcolor: 'white',
        //                                 }}>
        //                                     <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13 }}>{index + 1}</Box>
        //                                     <Box sx={{ flex: 2, fontSize: 13 }}>{val.spare_asset_no}/{formattedSlno}</Box>
        //                                     <Box sx={{ flex: 10, fontSize: 13 }}>{val.item_name}</Box>
        //                                     <Tooltip title={'Spare will be Transfer to Service List by clicking'}
        //                                         sx={{ width: 200, }} color='warning' placement='left'>
        //                                         <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13, pr: .5, cursor: 'pointer' }}>
        //                                             <ManageAccountsSharpIcon sx={{
        //                                                 color: '#603A70', cursor: 'pointer', p: .1,
        //                                                 '&:hover': { color: '#0000FF' },
        //                                             }}
        //                                                 onClick={() => servicefunctn(val)}
        //                                             />
        //                                         </Box>
        //                                     </Tooltip>
        //                                 </Box>
        //                             );
        //                         })}
        //                     </Box>
        //                     :
        //                     <Box sx={{ flex: 1, fontWeight: 700, pt: 5, fontSize: 20, color: 'lightgrey', textAlign: 'center' }}>
        //                         Empty spare List
        //                     </Box>}


        //                 <Box sx={{
        //                     textAlign: 'right',
        //                     pb: 1,
        //                     mr: 1,
        //                     flexShrink: 0, // Prevents the button Box from shrinking
        //                     display: 'flex',
        //                     justifyContent: 'flex-end',
        //                 }}>
        //                     <Button
        //                         variant='plain'
        //                         onClick={Close}
        //                     >Cancel</Button>
        //                 </Box>

        //             </Box>
        //         </Modal>
        //     </CssVarsProvider >
        // </Box >
    )
}

export default memo(AssetSpareModal)