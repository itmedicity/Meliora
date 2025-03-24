import { Box, Chip, Typography } from '@mui/joy';
import React, { useEffect, useMemo, useState } from 'react'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { errorNotify, warningNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns';
import ComFileView from 'src/views/ComManagement/CmFileView/ComFileView';
import ServiceFileAttach from '../../ServiceListSpare/ServiceFileAttach';

const ServiceDetailsCondemnation = ({ AssetDetails }) => {

    const { spare_asset_no_only, item_asset_no_only, item_asset_no, spare_asset_no, item_asset_name, item_spare_name, cat_asset_name, cat_spare_name, } = AssetDetails

    const item_name = item_asset_name !== null ? item_asset_name : item_spare_name
    const category_name = cat_asset_name !== null ? cat_asset_name : cat_spare_name
    const formattedItemNo = spare_asset_no_only !== null ? spare_asset_no_only : item_asset_no_only !== null ? item_asset_no_only : 0;
    const ItemPrefix = spare_asset_no !== null ? spare_asset_no : item_asset_no !== null ? item_asset_no : 0;

    const [alldetailsService, setAlldetailsService] = useState([])
    const [servicefileDetails, setServicefileDetails] = useState([])
    const [imageServiceUrls, setImageServiceUrls] = useState([])
    const [selectedImages, setSelectedImages] = useState([])
    const [fileDetails, setfileDetails] = useState([])
    const [imageUrls, setImageUrls] = useState([])
    const [deptServiceempList, setdeptServiceempList] = useState({});

    const searchData = useMemo(() => {
        return {
            service_item_slno: formattedItemNo,
            service_asset_spare: ItemPrefix
        }
    }, [formattedItemNo, ItemPrefix]);


    const [flags, setFlags] = useState({
        serviceCheck: 0,
        image: 0,
        imageServiceFlag: 0,
    })

    const [viewStates, setViewStates] = useState({
        imageViewOpen: false,
        serviceimageViewOpen: false,
    })

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
    }, [searchData])

    // const fileViewAssetService = async (val) => {
    //     const { am_service_details_slno } = val;
    //     setServicefileDetails(val);
    //     try {
    //         const result = await axioslogin.get(`/AmServiceFileUpload/uploadFile/getAssetServiceFile/${am_service_details_slno}`);
    //         const { success } = result.data;
    //         if (success === 1) {
    //             const data = result.data;
    //             const fileNames = data.data;
    //             const fileUrls = fileNames.map((fileName) => {
    //                 return `${PUBLIC_NAS_FOLDER}/AssetService/${am_service_details_slno}/${fileName}`;
    //             });
    //             setImageServiceUrls(fileUrls);
    //             if (fileUrls.length > 0) {
    //                 setSelectedImages(val);

    //             } else {
    //                 warningNotify("No Files attached");
    //             }
    //         } else {
    //             warningNotify("No Files Attached");
    //         }
    //     } catch (error) {
    //         warningNotify('Error in fetching files:', error);
    //     }
    // };

    // const fileView = async (val) => {
    //     const { complaint_slno } = val;

    //     setfileDetails(val)
    //     try {
    //         const result = await axioslogin.get(`/complaintFileUpload/uploadFile/getComplaintFile/${complaint_slno}`);
    //         const { success } = result.data;
    //         if (success === 1) {
    //             const data = result.data;
    //             const fileNames = data.data;
    //             const fileUrls = fileNames.map((fileName) => {
    //                 return `${PUBLIC_NAS_FOLDER}/ComplaintManagement/${complaint_slno}/${fileName}`;
    //             });
    //             setImageUrls(fileUrls)
    //             if (fileUrls.length > 0) {

    //                 setSelectedImages(val);
    //             } else {
    //                 warningNotify("No Image attached");
    //             }
    //         } else {
    //             warningNotify("No Image Attached");
    //         }
    //     } catch (error) {
    //         warningNotify('Error in fetching files:', error);
    //     }
    // };

    const fileView = async (val) => {
        const { complaint_slno } = val;
        setFlags(prevState => ({
            ...prevState,
            image: 1
        }));
        setfileDetails(val)
        try {
            const result = await axioslogin.get(`/complaintFileUpload/uploadFile/getComplaintFile/${complaint_slno}`);
            const { success } = result.data;
            if (success === 1) {
                const data = result.data;
                const fileNames = data.data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/ComplaintManagement/${complaint_slno}/${fileName}`;
                });
                setImageUrls(fileUrls)
                if (fileUrls.length > 0) {
                    setViewStates(prevState => ({
                        ...prevState,
                        image: 1,
                        imageViewOpen: true
                    }));
                    setSelectedImages(val);
                } else {
                    warningNotify("No Image attached");
                    setViewStates(prevState => ({
                        ...prevState,
                        image: 0,
                        imageViewOpen: false
                    }));
                }
            } else {
                setViewStates(prevState => ({
                    ...prevState,
                    image: 0,
                    imageViewOpen: false
                }));
                warningNotify("No Image Attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    };


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
                if (fileUrls.length > 0) {
                    setSelectedImages(val);
                    setFlags(prevState => ({
                        ...prevState,
                        imageServiceFlag: 1
                    }));
                    setViewStates(prevState => ({
                        ...prevState,
                        serviceimageViewOpen: true
                    }));
                } else {
                    warningNotify("No Files attached");
                }
            } else {
                warningNotify("No Files Attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    };


    useEffect(() => {
        if (alldetailsService.length !== 0) {
            const getServEmployees = async () => {
                const updatedServEmployees = {};
                for (let deptServiceemp of alldetailsService) {
                    const searchDeptServiceData = {
                        serviced_emp_detail_slno: deptServiceemp.serviced_emp_details_slno,
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
                        errorNotify("Error fetching employee details:", error);
                    }
                }
                setdeptServiceempList(updatedServEmployees)
            };
            getServEmployees();
        }
    }, [alldetailsService]);

    return (
        <Box>
            {flags.image === 1 ? (
                <ComFileView
                    imageUrls={imageUrls}
                    imageViewOpen={viewStates.imageViewOpen}
                    selectedImages={selectedImages}
                    fileDetails={fileDetails}
                    setimage={(value) => setFlags(prevFlags => ({ ...prevFlags, image: value }))}
                    setimageViewOpen={(value) => setViewStates(prevViewStates => ({ ...prevViewStates, imageViewOpen: value }))}
                />
            ) : null}

            {flags.imageServiceFlag === 1 ? (
                <ServiceFileAttach
                    imageServiceUrls={imageServiceUrls}
                    serviceimageViewOpen={viewStates.serviceimageViewOpen}
                    servicefileDetails={servicefileDetails}
                    setimageServiceFlag={(value) => setFlags(prevFlags => ({ ...prevFlags, imageServiceFlag: value }))}
                    setServiceimageViewOpen={(value) => setViewStates(prevViewStates => ({ ...prevViewStates, serviceimageViewOpen: value }))}
                    item_name={item_name}
                    category_name={category_name}
                />
            ) : null}
            {alldetailsService.length !== 0 ?
                <Box>
                    {alldetailsService?.map((val, index) => {
                        return (
                            <Box
                                key={index} sx={{ ml: .5, my: .8, border: 1, py: 2, mr: 1 }}>
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
                                                :{val.compalint_date
                                                    ? format(new Date(val.compalint_date), 'dd MMM yyyy,  hh:mm a')
                                                    : 'Invalid Date'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Assingees
                                            </Typography>
                                            <Box sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                {val.assigned_employees?.split(',').filter(Boolean).map((name, index) => (
                                                    <Chip
                                                        key={index}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ bgcolor: '#D3C7A1', fontSize: 13, px: 0.8, marginRight: 0.1 }}
                                                    >
                                                        {name.trim()}
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
                                                        {emp.serviced_date
                                                            ? format(new Date(emp.serviced_date), 'dd MMM yyyy,  hh:mm a')
                                                            : 'Invalid Date'}
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
                                            Serviced Details
                                        </Typography>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Serviced Date
                                            </Typography>
                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                :    {val.suppl_serviced_date
                                                    ? format(new Date(val.suppl_serviced_date), 'dd MMM yyyy,  hh:mm a')
                                                    : 'Not updated'}
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
                                            Service Completion Marked Details
                                        </Typography>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Marked date
                                            </Typography>
                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                :    {val.add_to_store_date
                                                    ? format(new Date(val.add_to_store_date), 'dd MMM yyyy,  hh:mm a')
                                                    : 'Not updated'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Marked Employee
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
                <Box sx={{
                    height: 500, fontWeight: 600,
                    color: 'lightgray', fontSize: 20, flex: 1, display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    bgcolor: 'transparent'
                }}>
                    No Service Done Yet!
                </Box>}
        </Box>
    )
}

export default ServiceDetailsCondemnation