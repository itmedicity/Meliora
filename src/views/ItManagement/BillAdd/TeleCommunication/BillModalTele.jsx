import { Box, Chip, Modal, ModalDialog, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BillFile from '../FileView/BillFile';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns';
import AttachmentIcon from '@mui/icons-material/Attachment';
import imageCompression from 'browser-image-compression';
import CloseIcon from '@mui/icons-material/Close';
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';

const BillModalTele = ({ modalOpen, setModalFlag, setModalOpen, billDatas, filezUrls, index_no, setFilezUrls }) => {

    const { it_bill_type_name, it_bill_category_name, bill_name, bill_number, bill_tariff, bill_amount, bill_date, bill_paid_date, bill_due_date,
    } = billDatas

    const [billViewmodalFlag, setBillViewModalFlag] = useState(0)
    const [billViewmodalOpen, setBillViewModalOpen] = useState(false)
    const [selectFile, setSelectFile] = useState([]);

    const handleClose = useCallback(() => {
        setModalFlag(0)
        setModalOpen(false)
    }, [setModalFlag, setModalOpen,])

    const openBillModal = useCallback(() => {
        if (filezUrls.length !== 0) {
            setBillViewModalFlag(1)
            setBillViewModalOpen(true)
        }
        else {
            infoNotify('No Bills Attached')
        }
    }, [filezUrls])

    const handleFileChange = useCallback((e) => {
        const newFiles = [...selectFile]
        newFiles.push(e.target.files[0])
        setSelectFile(newFiles)
    }, [selectFile, setSelectFile])

    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(imageFile, options)
        return compressedFile
    }, []);

    const handleRemoveFile = (index) => {
        setSelectFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };
    const uploadBills = useCallback((e) => {
        e.preventDefault()
        if (bill_tariff === 1) {
            const getbillsFile = async () => {
                const result = await axioslogin.get(`/ItImageUpload/uploadFile/getMonthlyBillImages/${index_no}`);
                const { success, data } = result.data;
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/Bills/MonthlyBill/${index_no}/${fileName}`;
                    });
                    setFilezUrls(fileUrls);
                }
            }
            getbillsFile(index_no)
            const InsertFile = async (selectFile, index_no) => {
                try {
                    const formData = new FormData();
                    formData.append('id', index_no);
                    for (const fileMonthly of selectFile) {
                        if (fileMonthly.type.startsWith('image')) {
                            const compressedFile = await handleImageUpload(fileMonthly);
                            formData.append('files', compressedFile, compressedFile.name);
                        } else {
                            formData.append('files', fileMonthly, fileMonthly.name);
                        }
                    }
                    // Use the Axios instance and endpoint that matches your server setup
                    const uploadResult = await axioslogin.post('/ItImageUpload/uploadFile/Monthly', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    return uploadResult.data;
                } catch (error) {
                    warningNotify('An error occurred during file upload.');
                }
            };
            if (selectFile.length !== 0) {
                InsertFile(selectFile, index_no).then((value) => {
                    const { success } = value
                    if (success === 1) {
                        succesNotify('bill attached successfully')
                        setSelectFile([])
                        getbillsFile(index_no)
                    }
                    else {
                        warningNotify('failed to upload file')
                    }
                })
            }
            else {
                infoNotify('Select File')
            }
        }
        else if (bill_tariff === 2) {
            const getbillsFile = async () => {
                const result = await axioslogin.get(`/ItImageUpload/uploadFile/getQuaterlyBillImages/${index_no}`);
                const { success } = result.data;
                if (success === 1) {
                    const data = result.data;
                    const fileNames = data.data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/Bills/Quarterly/${index_no}/${fileName}`;
                    });
                    setFilezUrls(fileUrls);
                } else {
                    setFilezUrls([])
                }
            }
            const InsertFileQuarter = async (selectFile, index_no) => {
                try {
                    const formData = new FormData();
                    formData.append('id', index_no);
                    for (const fileQuarterly of selectFile) {
                        if (fileQuarterly.type.startsWith('image')) {
                            const compressedFile = await handleImageUpload(fileQuarterly);
                            formData.append('files', compressedFile, compressedFile.name);
                        } else {
                            formData.append('files', fileQuarterly, fileQuarterly.name);
                        }
                    }
                    // Use the Axios instance and endpoint that matches your server setup
                    const uploadResult = await axioslogin.post('/ItImageUpload/uploadFile/Quaterly', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    return uploadResult.data;
                } catch (error) {
                    warningNotify('An error occurred during file upload.');
                }
            };
            if (selectFile.length !== 0) {
                InsertFileQuarter(selectFile, index_no).then((value) => {
                    const { success } = value
                    if (success === 1) {
                        succesNotify('Bill Updated with bill attach successfully')
                        setSelectFile([])
                        getbillsFile(index_no)
                    }
                    else {
                        warningNotify('failed to upload file')
                    }
                })
            }
            else {
                infoNotify('Select File')
            }
        } else if (bill_tariff === 3) {
            const getbillsFile = async () => {
                const result = await axioslogin.get(`/ItImageUpload/uploadFile/getYearlyBillImages/${index_no}`);
                const { success } = result.data;
                if (success === 1) {
                    const data = result.data;
                    const fileNames = data.data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/Bills/YearlyBill/${index_no}/${fileName}`;
                    });
                    setFilezUrls(fileUrls);
                } else {
                    setFilezUrls([])
                }
            }
            const InsertFileYearly = async (selectFile, index_no) => {
                try {
                    const formData = new FormData();
                    formData.append('id', index_no);
                    for (const fileYearly of selectFile) {
                        if (fileYearly.type.startsWith('image')) {
                            const compressedFile = await handleImageUpload(fileYearly);
                            formData.append('files', compressedFile, compressedFile.name);
                        } else {
                            formData.append('files', fileYearly, fileYearly.name);
                        }
                    }
                    // Use the Axios instance and endpoint that matches your server setup
                    const uploadResult = await axioslogin.post('/ItImageUpload/uploadFile/Yearly', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    return uploadResult.data;
                } catch (error) {
                    warningNotify('An error occurred during file upload.');
                }
            };

            if (selectFile.length !== 0) {
                InsertFileYearly(selectFile, index_no).then((value) => {
                    const { success } = value
                    if (success === 1) {
                        succesNotify('Bill Updated with bill attach successfully')
                        setSelectFile([])
                        getbillsFile(index_no)
                    }
                    else {
                        warningNotify('failed to upload file')
                    }
                })
            }
            else {
                infoNotify('Select File')
            }
        }
        else {
            const getbillsFile = async () => {
                const result = await axioslogin.get(`/ItImageUpload/uploadFile/getOtherBillImages/${index_no}`);
                const { success } = result.data;
                if (success === 1) {
                    const data = result.data;
                    const fileNames = data.data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/Bills/OtherBill/${index_no}/${fileName}`;
                    });
                    setFilezUrls(fileUrls);
                } else {
                    setFilezUrls([])
                }
            }

            const InsertOtherFile = async (selectFile, index_no) => {
                try {
                    const formData = new FormData();
                    formData.append('id', index_no);
                    for (const fileOthers of selectFile) {
                        if (fileOthers.type.startsWith('image')) {
                            const compressedFile = await handleImageUpload(fileOthers);
                            formData.append('files', compressedFile, compressedFile.name);
                        } else {
                            formData.append('files', fileOthers, fileOthers.name);
                        }
                    }
                    // Use the Axios instance and endpoint that matches your server setup
                    const uploadResult = await axioslogin.post('/ItImageUpload/uploadFile/Others', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    return uploadResult.data;
                } catch (error) {
                    warningNotify('An error occurred during file upload.');
                }
            };

            if (selectFile.length !== 0) {
                InsertOtherFile(selectFile, index_no).then((value) => {
                    const { success } = value
                    if (success === 1) {
                        succesNotify('Bill Updated with file attach successfully')
                        setSelectFile([])
                        getbillsFile(index_no)
                    }
                    else {
                        warningNotify('failed to upload file')
                    }
                })
            }
            else {
                infoNotify('Select File')
            }
        }
    }, [selectFile, handleImageUpload, index_no, bill_tariff, setFilezUrls])

    return (
        <Box >
            {billViewmodalFlag === 1 ?
                <BillFile
                    billViewmodalOpen={billViewmodalOpen} setBillViewModalOpen={setBillViewModalOpen}
                    setBillViewModalFlag={setBillViewModalFlag} filezUrls={filezUrls} /> : null}
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={modalOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10, }}>
                <ModalDialog variant="outlined"
                    sx={{ width: 650, bgcolor: '#1896A0' }}>
                    <Box>
                        <Box sx={{ flex: 1, textAlign: 'right' }}> <Tooltip title="Close">
                            < HighlightOffSharpIcon sx={{
                                cursor: 'pointer',
                                color: '#BA0F30',
                                height: 25, width: 25,
                                '&:hover': {
                                    color: 'white',
                                },
                            }}
                                onClick={handleClose}
                            />
                        </Tooltip></Box>
                        <Box sx={{ flex: 1, }}>
                            <Box sx={{ flex: 1, textAlign: 'center' }}> <TaskAltIcon sx={{
                                fontSize: 45,
                                color: 'white'
                            }} /></Box>
                            <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 20, color: 'white', fontStyle: 'Georgia' }}>{it_bill_type_name}</Box>
                            <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 15, color: 'white' }}>{bill_name}</Box>
                        </Box>
                    </Box>
                    <Box sx={{ overflow: 'auto', px: 2, bgcolor: 'white', borderRadius: 10, pb: 1 }}>
                        <Box sx={{
                            flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 20, color: '#4C5270', fontFamily: 'Georgia', borderColor: '#CAD7E0', pt: 1
                        }}>
                            Bill Details</Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 3, fontSize: 13, fontWeight: 800, }}>Bill Category</Box>
                            <Box sx={{ flex: 5, fontSize: 14, textAlign: 'right', fontWeight: 700, }}>{it_bill_category_name}</Box>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 1, fontSize: 13, fontWeight: 800, }}> Bill Tariff</Box>
                            <Box sx={{ flex: 5, fontSize: 14, textAlign: 'right', fontWeight: 700, }}>{bill_tariff === 1 ? 'Monthly' : bill_tariff === 2 ? "Qaurterly" : bill_tariff === 3 ? 'Yearly' : 'Others'}</Box>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 3, fontSize: 13, fontWeight: 800, }}> Bill Number/Invoice number</Box>
                            <Box sx={{ flex: 5, fontSize: 15, textAlign: 'right', fontWeight: 700, }}>{bill_number}</Box>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 3, fontSize: 13, fontWeight: 800, }}> Bill Date</Box>
                            <Box sx={{ flex: 5, fontSize: 14, textAlign: 'right', fontWeight: 700, }}>
                                {format(new Date(bill_date), 'dd-MMM-yyyy')}
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 3, fontSize: 13, fontWeight: 800, }}>Bill Duedate</Box>
                            <Box sx={{ flex: 5, fontSize: 14, textAlign: 'right', fontWeight: 700, }}>
                                {format(new Date(bill_due_date), 'dd-MMM-yyyy')}
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 3, fontSize: 13, fontWeight: 800, }}>Bill Paid Date</Box>
                            <Box sx={{ flex: 5, fontSize: 14, textAlign: 'right', fontWeight: 700, }}>
                                {format(new Date(bill_paid_date), 'dd-MMM-yyyy')}
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 3, fontSize: 13, fontWeight: 800, }}>Bill Amount</Box>
                            <Box sx={{ flex: 5, textAlign: 'right', fontWeight: 700, color: '#385E72' }}>
                                <Chip sx={{ fontSize: 18, fontWeight: 800, color: '#970C10', bgcolor: '#CED6CA' }}>
                                    <CurrencyRupeeIcon fontSize='md' sx={{ color: '#970C10' }} />
                                    {new Intl.NumberFormat('en-IN').format(bill_amount)}
                                </Chip>
                            </Box>
                        </Box>
                        <Box sx={{
                            border: '1px', borderStyle: 'dashed', mt: .5, py: .3, borderColor: '#41729F', pl: .5, borderRadius: '2px', minHeight: 60,
                            flex: 1,
                        }}>
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <label htmlFor="file-input">
                                    <Box sx={{ cursor: 'pointer', fontWeight: 600, color: '#145DA0', }}>
                                        <AttachmentIcon sx={{ fontWeight: 800, color: '#145DA0' }} />Choose Files (Bills)
                                    </Box>
                                </label>
                            </Box>
                            <Box sx={{ flex: 6, mr: .5, }}>
                                <input
                                    id="file-input"
                                    type="file"
                                    accept=".jpg, .jpeg, .png, .pdf"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    name="file"
                                    multiple // Add this attribute to allow multiple file selections
                                />
                                {selectFile && selectFile.map((file, index) => (
                                    <Box sx={{
                                        display: "flex", backgroundColor: '#D6E2E8', mx: 1, borderRadius: 8, my: .5, px: 1,
                                        border: 1, borderColor: '#0C2D48'
                                    }}
                                        key={index}
                                    >
                                        <Box sx={{ flex: 1 }}>{file.name}</Box>
                                        <CloseIcon size={'sm'} sx={{ cursor: 'pointer', width: 20, '&:hover': { color: '#055C9D' }, }}
                                            onClick={() => handleRemoveFile(index)} />
                                    </Box>
                                ))}
                            </Box>
                            {selectFile.length !== 0 ?
                                < Box sx={{
                                    flex: 1, mx: 24, bgcolor: '#003B73', cursor: 'pointer', pb: .4, fontWeight: 600, color: 'white', borderRadius: 20,
                                    '&:hover': { bgcolor: '#2283D5 ' }

                                }}
                                    onClick={uploadBills}
                                >
                                    <Box sx={{ width: 50, margin: 'auto', borderRadius: 10 }}>
                                        upload
                                    </Box>
                                </Box> :
                                null}
                        </Box>
                        <Box sx={{ flex: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{
                                mt: .5, borderRadius: 8, width: 134, pl: 1, fontSize: 13, bgcolor: '#5F7950', color: '#F8F8F0', py: .5, cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: '1px 2px 10px'
                                    , bgcolor: '#5F7950',
                                    color: '#4C411A'
                                },
                            }}
                                onClick={openBillModal}>
                                <FilePresentIcon sx={{
                                    cursor: 'pointer', bgcolor: '#3D5B59', height: 22, width: 23, borderRadius: 10, color: 'white',
                                    '&:hover': {
                                        color: '#4C411A'
                                    },
                                }} />&nbsp;Uploaded bills
                            </Box>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(BillModalTele)