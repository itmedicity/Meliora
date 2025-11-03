import { Box, CssVarsProvider, Dropdown, Input, Menu, MenuButton, MenuItem, Table, Tooltip, Typography, IconButton } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import SupplierSelect from '../../CentralRequestManagement/DeliveryMarking/Components/SupplierSelect'
import { format, isValid } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNotify, infoNotify, warningNotify } from 'src/views/Common/CommonCode';
import { Virtuoso } from 'react-virtuoso';
import moment from 'moment';
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { getDeliveryMarking } from 'src/api/CommonApiCRF';
// import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ReqImageDisModal from 'src/views/CentralRequestManagement/ComonComponent/ImageUploadCmp/ReqImageDisModal';
import JSZip from 'jszip'
import { useQuery } from '@tanstack/react-query';

const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
};
const DeliveryMarking_Report = () => {
    const [tableData, setTableData] = useState([])
    const [supCode, setSupCode] = useState(0)
    const [startDate, setStartDate] = useState(formatDateForInput(new Date()));
    const [endDate, setEndDate] = useState(formatDateForInput(new Date()));
    const [billList, setBillList] = useState([])
    const [reqCheck, setReqCheck] = useState(false)
    const [imagearray, setImageArry] = useState([])
    const [openDropdown, setOpenDropdown] = useState({ index: null, type: null });
    const [previewFile, setPreviewFile] = useState({ url: "", type: "" });
    const [imageshowFlag, setimageshowFlag] = useState(0)
    const [imageshow, setimageshow] = useState(false)
    // const [viewFlag, setViewFlag] = useState(0)


    const searchToday = useMemo(() => {
        return {
            from: format(new Date(), 'yyyy-MM-dd 00:00:00'),
            to: format(new Date(), 'yyyy-MM-dd 23:59:59'),
        }
    }, [])

    const { data: delData, isLoading: isDeliveryLoading, error: deliveryError } = useQuery({
        queryKey: ['deliverMarking', searchToday],
        queryFn: () => getDeliveryMarking(searchToday),
    });
    const deliveryData = useMemo(() => delData, [delData])
    useEffect(() => {
        if (deliveryData) {
            if (reqCheck === false && deliveryData.length > 0) {
                const newData = deliveryData?.map((val) => {
                    return {
                        delivery_mark_slno: val.delivery_mark_slno,
                        supplier_code: val.supplier_code,
                        supplier_name: val.supplier_name,
                        dc_mark_date: val.dc_mark_date,
                        dc_receive_date: val.dc_receive_date,
                        mt_direct: val.mt_direct === 1 ? 'Direct' : '',
                        mt_courier: val.mt_courier === 1 ? 'Courier' : '',
                        package_count: val.package_count,
                        delivery_bill_details: val.delivery_bill_details,
                        remarks: val.remarks,
                        received_user: val.received_user
                    }
                })
                setTableData(newData)
            }
        } else {
            return;
        }
    }, [reqCheck, deliveryData])

    const handleStartDateChange = useCallback((e) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);
        if (endDate && new Date(endDate) < new Date(newStartDate)) {
            setEndDate('');
            return;
        }
        if (endDate && new Date(endDate) < new Date(newStartDate)) {
            infoNotify('End date cannot be earlier than the start date.');
            return;
        }
    }, [endDate]);

    const handleEndDateChange = useCallback((e) => {
        setEndDate(e.target.value);
    }, []);

    const searchdata = useMemo(() => {
        const formattedStartDate = isValid(new Date(startDate))
            ? format(new Date(startDate), 'yyyy-MM-dd 00:00:00')
            : null;

        const formattedEndDate = isValid(new Date(endDate))
            ? format(new Date(endDate), 'yyyy-MM-dd 23:59:59')
            : null;

        return {
            supCode: supCode,
            from: formattedStartDate,
            to: formattedEndDate,
        };
    }, [supCode, startDate, endDate]);

    const viewDetails = useCallback(() => {
        if (reqCheck === false) {
            infoNotify("Select Date to View Details")
            return;
        }
        const getData = async (searchdata) => {
            try {
                const result = await axioslogin.post('/deliveryMarking/viewDelv', searchdata)
                const { success, data } = result.data
                if (success === 1) {
                    const newData = data?.map((val) => {
                        return {
                            delivery_mark_slno: val.delivery_mark_slno,
                            supplier_code: val.supplier_code,
                            supplier_name: val.supplier_name,
                            dc_mark_date: val.dc_mark_date,
                            dc_receive_date: val.dc_receive_date,
                            mt_direct: val.mt_direct === 1 ? 'Direct' : '',
                            mt_courier: val.mt_courier === 1 ? 'Courier' : '',
                            package_count: val.package_count,
                            delivery_bill_details: val.delivery_bill_details,
                            remarks: val.remarks,
                            received_user: val.received_user
                        }
                    })
                    setTableData(newData)
                } else if (success === 2) {
                    setTableData([])
                    infoNotify("No Report Found")
                }
                else {
                    warningNotify("Error Occured")
                }
            } catch (error) {
                warningNotify("Error to fetch delivery marking details:", error);
                setTableData([])
            }
        }
        getData(searchdata)
    }, [searchdata, reqCheck])

    // const backToDeliveryMarking = useCallback(async () => {
    //     setViewFlag(0)
    // }, [setViewFlag])

    const viewBillDetails = useCallback(async (val) => {
        const bill = JSON?.parse(val?.delivery_bill_details)
        if (bill.length !== 0) {
            setBillList(bill)
        } else {
            infoNotify("Bill Details Not Found")
        }
    }, [])
    const clearSearch = useCallback(async () => {
        setTableData([])
        setSupCode(0)
        setStartDate(formatDateForInput(new Date()))
        setEndDate(formatDateForInput(new Date()))
        setBillList([])
        setReqCheck(false)
    }, [])
    //show image
    // const viewimage = useCallback(async (val) => {
    //     const getImage = async (delivery_mark_slno) => {
    //         const result = await axioslogin.get(`/newCRFRegisterImages/crfDMimageGet/${delivery_mark_slno}`)
    //         const { success, data } = result.data
    //         if (success === 1) {
    //             const fileNames = data;
    //             const fileUrls = fileNames.map((fileName) => {
    //                 // return `${PUBLIC_NAS_FOLDER}/CRF/DeliveryMarking/${delivery_mark_slno}/${fileName}`;
    //             });
    //             const savedFiles = fileUrls.map((val) => {
    //                 const parts = val.split('/');
    //                 const fileNamePart = parts[parts.length - 1];
    //                 const obj = {
    //                     imageName: fileNamePart,
    //                     url: val
    //                 }
    //                 return obj
    //             })
    //             setImageArry(savedFiles)


    //         } else {
    //             setImageArry([])
    //             warningNotify("No Image to Show")
    //         }
    //     }
    //     getImage(val?.delivery_mark_slno)


    // }, [])

    const viewimage = useCallback(async val => {
        const getImage = async delivery_mark_slno => {

            try {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfDMimageGet/${delivery_mark_slno}`, {
                    responseType: 'blob'
                });

                const contentType = result.headers['content-type'] || '';
                if (contentType?.includes('application/json')) {
                    return;
                } else {
                    const zip = await JSZip.loadAsync(result.data);
                    // Extract image files (e.g., .jpg, .png)
                    const imageEntries = Object.entries(zip.files).filter(
                        ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
                    );
                    const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
                        // Get the original blob (no type)
                        const originalBlob = await fileObj.async('blob');
                        // Determine MIME type based on filename extension (or any other logic)
                        let mimeType = '';
                        if (filename.endsWith('.pdf')) {
                            mimeType = 'application/pdf';
                        } else if (filename.endsWith('.png')) {
                            mimeType = 'image/png';
                        } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
                            mimeType = 'image/jpeg';
                        } else {
                            mimeType = 'application/octet-stream'; // fallback
                        }
                        // Recreate blob with correct type
                        const blobWithType = new Blob([originalBlob], { type: mimeType });
                        // Create URL from new blob
                        const url = URL.createObjectURL(blobWithType);
                        return { imageName: filename, url, blob: blobWithType };
                    });
                    const images = await Promise.all(imagePromises);
                    setImageArry(images)

                }
            } catch (error) {
                errorNotify('Error fetching or processing images:', error);
                setImageArry([])
                warningNotify('No Image to Show')
            }
        }
        getImage(val?.delivery_mark_slno)
    }, [])





    const ViewImage = useCallback((file) => {
        const fileType = file.imageName
            ? file.imageName.toLowerCase().endsWith(".pdf")
                ? "pdf"
                : "image"
            : file.type.includes("application/pdf")
                ? "pdf"
                : "image";

        const fileUrl = file.url || URL.createObjectURL(file);
        setPreviewFile({ url: fileUrl, type: fileType });
        setimageshow(true);
        setimageshowFlag(1);
    }, []);

    const menuIconStyle = {
        bgcolor: 'white',
        borderRadius: 2,
        position: 'relative',
        '&:before': {
            content: '""',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid background.paper',
            position: 'absolute',
            bottom: -8,
            left: '50%',
        },
        '&:hover': {
            bgcolor: 'white'
        },
    };

    const buttonStyle = {
        border: '1px solid #bbdefb', width: '100%',
        fontSize: 13, height: 38, lineHeight: '1.2', color: '#1D617A',
        bgcolor: 'white', borderRadius: 6,
        '&:hover': {
            bgcolor: 'white',
            color: '#1976d2'
        },
    }
    const handleClose = useCallback(() => {
        setimageshow(false)
        setimageshowFlag(0)
    }, [])
    if (isDeliveryLoading) return <p>Loading...</p>;
    if (deliveryError) return <p>Error occurred.</p>;
    return (
        <Fragment>
            {imageshowFlag === 1 ? <ReqImageDisModal open={imageshow} handleClose={handleClose}
                previewFile={previewFile} /> : null}
            <Box sx={{ height: window.innerHeight - 80, flexWrap: 'wrap', bgcolor: 'white', width: '100%' }}>
                <Box sx={{
                    width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', pb: 1,
                    border: '1px solid #B4F5F0', borderTop: 'none'
                }}>
                    <Box sx={{ pt: 1, width: { xs: '100%', md: '80vw', lg: '70vw', xl: '70vw', flexWrap: 'wrap', } }}>
                        <Box sx={{ px: 1, display: 'flex', flexWrap: 'wrap', }} >
                            <Box sx={{ flex: 1.5 }}>
                                <Typography sx={{ fontSize: 13, color: '#1D617A', pl: 1.5, pt: 0.5, fontWeight: 550 }} >Supplier</Typography>
                                <Box sx={{ pl: 0.5, pt: 0.5 }}>
                                    <SupplierSelect supCode={supCode} setSupCode={setSupCode} />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 2, display: 'flex' }}>
                                <Box sx={{ flex: 1, pl: 0.5, flexWrap: 'wrap', }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ fontSize: 16, color: 'red', fontWeight: 550, pl: 1.5 }}>*</Typography>
                                        <Typography sx={{ fontSize: 13, color: '#1D617A', fontWeight: 550, pl: 0.3 }}>DC Received Date</Typography>
                                        <Box sx={{ pl: 1 }}>
                                            <CusCheckBox
                                                variant="outlined"
                                                size="md"
                                                name="reqCheck"
                                                value={reqCheck}
                                                onCheked={(e) => setReqCheck(e.target.checked)}
                                                checked={reqCheck}
                                                className={{ color: '#1D617A', pb: 0.1 }}
                                            />
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 0.5, pt: 0.1 }}>
                                        {['Start Date', 'End Date'].map((label, idx) => (
                                            <CssVarsProvider key={label}>
                                                <Input
                                                    startDecorator={
                                                        <Typography sx={{ fontSize: 14, color: '#1D617A', fontWeight: 550, pr: 0.5 }}>
                                                            {label}
                                                        </Typography>
                                                    }
                                                    sx={{
                                                        height: 25, borderRadius: 6, border: '1px solid #bbdefb', width: '100%',
                                                        color: '#0d47a1', fontSize: 14
                                                    }}
                                                    size="md"
                                                    type="date"
                                                    name={idx === 0 ? 'startDate' : 'endDate'}
                                                    value={idx === 0 ? startDate : endDate}
                                                    disabled={!reqCheck}
                                                    onChange={idx === 0 ? handleStartDateChange : handleEndDateChange}
                                                    slotProps={{
                                                        input: {
                                                            min: idx === 1 ? startDate : undefined,
                                                            max: moment(new Date()).format('YYYY-MM-DD')
                                                        }
                                                    }}
                                                />
                                            </CssVarsProvider>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.5, pl: 1.5, pt: 3.2 }}>
                                <CssVarsProvider>
                                    <IconButton
                                        sx={buttonStyle}
                                        onClick={viewDetails}
                                    >
                                        View
                                    </IconButton>
                                </CssVarsProvider>

                            </Box>
                            {/* <Box sx={{ flex: 0.5, pt: 3.2, pl: 0.3 }}>
                                <IconButton
                                    sx={buttonStyle}
                                    onClick={backToDeliveryMarking}
                                >
                                    Back
                                </IconButton>
                            </Box> */}
                            <Box sx={{ flex: 0.5, pt: 3.2, pl: 0.3 }}>
                                <CssVarsProvider>
                                    <IconButton
                                        sx={buttonStyle}
                                        onClick={clearSearch}
                                    >
                                        Clear
                                    </IconButton>
                                </CssVarsProvider>

                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ bgcolor: 'white', overflow: 'auto', }}>
                    {tableData && tableData.length > 0 ?

                        <Box sx={{ width: '100%' }}>
                            <Box display="flex" justifyContent="space-between" sx={{
                                bgcolor: '#e3f2fd', flexWrap: 'nowrap', py: 0.5, position: 'sticky',
                                top: 0, zIndex: 1, borderBottom: '1px solid lightgrey'
                            }}>
                                <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Sl.No</Typography>
                                {/* <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>DC Marking Date</Typography> */}
                                <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Supplier</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>DC Received Date</Typography>
                                <Typography sx={{ width: 170, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Mode Of Transport</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Package Count</Typography>
                                <Typography sx={{ width: 100, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Bill Details</Typography>
                                <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Image</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Remarks</Typography>
                                <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Receiver</Typography>

                            </Box>
                            <Virtuoso
                                style={{ height: window.innerHeight - 260, bgcolor: 'blue' }}
                                data={tableData}
                                itemContent={(index, val) => (
                                    <React.Fragment key={val.delivery_mark_slno}>
                                        <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}>
                                            <Typography sx={{ width: 40, textAlign: 'center', fontSize: 12, my: 1 }}>{index + 1}</Typography>
                                            {/* <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.dc_mark_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography> */}
                                            <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>{val.supplier_name}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.dc_receive_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                            <Typography sx={{ width: 170, textAlign: 'left', fontSize: 12, my: 1 }}>
                                                {(val.mt_direct || val.mt_courier) ? [val.mt_direct, val.mt_courier].filter(Boolean).join(', ') : 'Not Updated'}
                                            </Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{val.package_count ? val.package_count : 'Not Updated'}</Typography>
                                            < Box sx={{ width: 100, display: 'flex', textAlign: 'center', cursor: 'pointer' }}>
                                                <Dropdown>
                                                    <CssVarsProvider>
                                                        <MenuButton sx={{ border: 0, }}>
                                                            <Tooltip
                                                                key="unique-key"
                                                                title={
                                                                    <Box sx={{ bgcolor: 'white', color: '#003060', p: 0.5, textAlign: 'center', textTransform: 'capitalize' }}
                                                                    >View
                                                                    </Box>
                                                                }
                                                                placement="top"
                                                                arrow
                                                                sx={{
                                                                    bgcolor: '#BFD7ED',
                                                                    [`& .MuiTooltip-arrow`]: {
                                                                        color: 'blue',
                                                                    },
                                                                }}
                                                            >
                                                                <ReceiptLongSharpIcon sx={{
                                                                    color: '#1976d2', height: 23, width: 23,
                                                                    '&:hover': {
                                                                        bgcolor: 'white',
                                                                    },
                                                                }} onClick={() => viewBillDetails(val)} />
                                                            </Tooltip>
                                                        </MenuButton>
                                                    </CssVarsProvider>

                                                    {billList && billList.length > 0 ?
                                                        <CssVarsProvider>
                                                            <Menu sx={menuIconStyle}>
                                                                <MenuItem sx={{ width: '20vw' }}>
                                                                    <Table aria-label="table with sticky header" borderAxis='both' padding={"none"} stickyHeader size='sm'>
                                                                        <thead style={{ alignItems: 'center' }}>
                                                                            <tr style={{ height: 0.5 }}>
                                                                                <th size='sm' style={{ width: 60, fontSize: 14, textAlign: 'center', backgroundColor: '#e3f2fd' }}>&nbsp; Sl.No</th>
                                                                                <th size='sm' style={{ width: 100, fontSize: 14, backgroundColor: '#e3f2fd' }}>&nbsp;Bill No.</th>
                                                                                <th size='sm' style={{ width: 150, fontSize: 14, backgroundColor: '#e3f2fd' }}>&nbsp;Bill Date</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody size='small'>
                                                                            {billList?.map((val, index) => (
                                                                                <tr key={val.bill_slno} size='small' style={{ maxHeight: 2, cursor: 'pointer' }}>
                                                                                    <td size='sm' style={{ fontSize: 12, textAlign: 'center', }}>{index + 1}</td>
                                                                                    <td size='sm' style={{ fontSize: 12, }}>&nbsp;{val.delivered_bill_no}</td>
                                                                                    <td size='sm' style={{ fontSize: 12, }}>&nbsp;{format(new Date(val.delivered_bill_date), 'dd-MM-yyyy')}</td>

                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </Table>
                                                                </MenuItem>
                                                            </Menu>
                                                        </CssVarsProvider>

                                                        : null}
                                                </Dropdown>
                                            </Box>
                                            <Box sx={{ width: 100, display: 'flex', textAlign: 'center', cursor: 'pointer', }}>
                                                <Dropdown
                                                    open={openDropdown.index === index && openDropdown.type === 'image'}
                                                    onOpenChange={() => {
                                                        if (openDropdown.index === index && openDropdown.type === 'image') {
                                                            setOpenDropdown({ index: null, type: null });
                                                        } else {
                                                            setOpenDropdown({ index, type: 'image' });
                                                        }
                                                    }}
                                                >
                                                    <CssVarsProvider>
                                                        <MenuButton sx={{ border: 0, p: 0 }}>
                                                            <Tooltip
                                                                key="unique-key"
                                                                title={
                                                                    <Box sx={{ bgcolor: 'white', color: '#003060', textAlign: 'center', textTransform: 'capitalize' }}>
                                                                        View image
                                                                    </Box>
                                                                }
                                                                placement="top"
                                                                arrow
                                                                sx={{
                                                                    bgcolor: '#BFD7ED',
                                                                    [`& .MuiTooltip-arrow`]: {
                                                                        color: 'blue',
                                                                    },
                                                                }}
                                                            >
                                                                <ImageOutlinedIcon
                                                                    sx={{
                                                                        color: '#1976d2',
                                                                        height: 23,
                                                                        width: 23,
                                                                        '&:hover': {
                                                                            bgcolor: 'white',
                                                                        },
                                                                    }}
                                                                    onClick={() => viewimage(val)}
                                                                />
                                                            </Tooltip>
                                                        </MenuButton>
                                                    </CssVarsProvider>
                                                    {imagearray && imagearray.length > 0 ? (
                                                        <CssVarsProvider>
                                                            <Menu
                                                                sx={{
                                                                    width: 500,
                                                                    maxHeight: 300,
                                                                    overflowY: 'auto',
                                                                    borderRadius: 2,
                                                                    boxShadow: 'md',
                                                                    p: 1,
                                                                    bgcolor: 'background.surface',
                                                                }}
                                                            >
                                                                <MenuItem
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        gap: 1,
                                                                        px: 1,
                                                                        py: 0.5,
                                                                        alignItems: 'flex-start',
                                                                        bgcolor: 'rgba(25, 118, 210, 0.08)',
                                                                        '&:hover': {
                                                                            bgcolor: 'transparent', // avoid hover effect on whole item
                                                                        },
                                                                    }}
                                                                >
                                                                    {imagearray.map((img, index) => (
                                                                        <Box
                                                                            key={index}
                                                                            onClick={() => ViewImage(img)}
                                                                            sx={{
                                                                                width: '100%',
                                                                                fontSize: 13,
                                                                                color: '#1976d2',
                                                                                cursor: 'pointer',
                                                                                px: 1,
                                                                                py: 0.5,
                                                                                borderRadius: 1,
                                                                                transition: 'background-color 0.2s',
                                                                                '&:hover': {
                                                                                    color: '#0d47a1',
                                                                                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                                                                },
                                                                            }}
                                                                        >
                                                                            {img.imageName}
                                                                        </Box>
                                                                    ))}
                                                                </MenuItem>
                                                            </Menu>
                                                        </CssVarsProvider>
                                                    ) : null}


                                                </Dropdown>
                                            </Box>


                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{val.remarks ? val.remarks : 'Not Updated'}</Typography>
                                            <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>{val.received_user}</Typography>

                                        </Box>
                                    </React.Fragment>
                                )}
                            />
                        </Box>
                        : null}
                </Box>
            </Box >
        </Fragment >)
}

export default memo(DeliveryMarking_Report)