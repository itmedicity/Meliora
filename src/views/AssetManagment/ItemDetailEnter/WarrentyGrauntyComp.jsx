<<<<<<< HEAD
import { Box, Input, Textarea } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CusIconButton from 'src/views/Components/CusIconButton';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { getWarrGarAsset, getWarrGarSpare } from 'src/api/AssetApis';
import { useQuery } from 'react-query';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import imageCompression from 'browser-image-compression';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import FileView from '../AssetFileView/FileView';
import AttachmentSharpIcon from '@mui/icons-material/AttachmentSharp';
import FileViewSingle from 'src/views/Components/FileViewSingle'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
=======
import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import { Typography, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { Box, Checkbox, CssVarsProvider, Table, Textarea } from '@mui/joy';
import { useQuery } from 'react-query';
import EditIcon from '@mui/icons-material/Edit';
>>>>>>> 80f0a90c60c9e7d8c39dd00ff2d7488ac4edf138

const WarrentyGrauntyComp = ({ detailArry, assetSpare }) => {

    const { am_item_map_slno, am_spare_item_map_slno } = detailArry

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [warrantyStatus, setwarrantyStatus] = useState(false)
    const [garantyStatus, setgarantyStatus] = useState(false)
<<<<<<< HEAD
    const [count, setCount] = useState(0)
    const [assetData, setassetData] = useState([])
    const [spareData, setspareData] = useState([])
    const [selectFile, setSelectFile] = useState([])
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [imageshow, setImageShow] = useState(false)
    const [attachFile, setattachFile] = useState(0)
    const [slno, setslno] = useState(0)
    const [fileUploadStatus, setfileUploadStatus] = useState(0)
=======
    const [editFlag, seteditFlag] = useState(0)
    const [warGarSlno, setwarGarSlno] = useState('')
    const [count, setcount] = useState(0)

    const [userdata, setUserdata] = useState({
        fromdate: '',
        toDate: '',
        trollFree: '',
        phone1: '',
        phone2: '',
        adress: '',
        remark: ''
    })
    const { fromdate, toDate, trollFree, phone1, phone2, adress, remark } = userdata

    const updatewarrenGuranDetails = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUserdata({ ...userdata, [e.target.name]: value })
    }, [userdata])
>>>>>>> 80f0a90c60c9e7d8c39dd00ff2d7488ac4edf138

    const updatewarrantyStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setwarrantyStatus(true)
            setgarantyStatus(false)
        } else {
            setwarrantyStatus(false)
            setgarantyStatus(false)
        }
    }, [])

    const updategarantyStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setgarantyStatus(true)
            setwarrantyStatus(false)
        } else {
            setgarantyStatus(false)
            setwarrantyStatus(false)
        }
    }, [])

<<<<<<< HEAD
    const [userdata, setUserdata] = useState({
        fromdate: '',
        toDate: '',
        trollFree: '',
        phone1: '',
        phone2: '',
        adress: '',
    })

    const { fromdate, toDate, trollFree, phone1, phone2, adress } = userdata

    const updatewarrenGuranDetails = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUserdata({ ...userdata, [e.target.name]: value })
    }, [userdata])

    const { data: wargarAssetData, isSuccess } = useQuery({
        queryKey: ['getWarrGarAsset', count],
        enabled: am_item_map_slno !== undefined,
        queryFn: () => getWarrGarAsset(am_item_map_slno),
    });

    const wargarAsset = useMemo(() => wargarAssetData, [wargarAssetData])

    useEffect(() => {
        if (isSuccess && wargarAsset && wargarAsset.length > 0) {
            const { from_date, to_date, troll_free, ph_one, ph_two, address, warrenty_status, guarenty_status, am_item_wargar_slno, file_upload_status } = wargarAsset[0];
            const UpdatedData = {
                fromdate: from_date,
                toDate: to_date,
                trollFree: troll_free,
                phone1: ph_one,
                phone2: ph_two,
                adress: address,
            };

            setUserdata(UpdatedData);
            setwarrantyStatus(warrenty_status === 1);
            setgarantyStatus(guarenty_status === 1);
            setassetData(wargarAsset);
            setslno(am_item_wargar_slno);
            setfileUploadStatus(file_upload_status);
        }
    }, [isSuccess, wargarAsset]);


    const { data: wargarSpareData, Succes } = useQuery({
        queryKey: ['getWarrGarSpare', count],
        enabled: am_spare_item_map_slno !== undefined,
        queryFn: () => getWarrGarSpare(am_spare_item_map_slno),
    });

    const wargarSpare = useMemo(() => wargarSpareData, [wargarSpareData])

    useEffect(() => {
        if (Succes && wargarSpare && wargarSpare.length > 0) {
            const {
                from_date,
                to_date,
                troll_free,
                ph_one,
                ph_two,
                address,
                warrenty_status,
                guarenty_status,
                am_item_wargar_slno,
                file_upload_status,
            } = wargarSpare[0];

            const UpdatedData = {
                fromdate: from_date,
                toDate: to_date,
                trollFree: troll_free,
                phone1: ph_one,
                phone2: ph_two,
                adress: address,
            };

            setUserdata(UpdatedData);
            setwarrantyStatus(warrenty_status === 1);
            setgarantyStatus(guarenty_status === 1);
            setspareData(wargarSpare);
            setslno(am_item_wargar_slno);
            setfileUploadStatus(file_upload_status);
        }
    }, [Succes, wargarSpare]);


=======
    const WarGarReferesh = useCallback(() => {
        const frmdata = {
            fromdate: '',
            toDate: '',
            trollFree: '',
            phone1: '',
            phone2: '',
            adress: '',
            remark: ''
        }
        setUserdata(frmdata)
        setwarrantyStatus(false)
        setgarantyStatus(false)
        seteditFlag(0)
    }, [])
>>>>>>> 80f0a90c60c9e7d8c39dd00ff2d7488ac4edf138

    const postData = useMemo(() => {
        return {
            am_item_map_slno: am_item_map_slno,
            warrenty_status: warrantyStatus === true ? 1 : 0,
            guarenty_status: garantyStatus === true ? 1 : 0,
            from_date: fromdate,
            to_date: toDate,
            troll_free: trollFree,
            ph_one: phone1,
            ph_two: phone2,
            address: adress,
<<<<<<< HEAD
=======
            remarks: remark,
            file_upload_status: 1,
>>>>>>> 80f0a90c60c9e7d8c39dd00ff2d7488ac4edf138
            create_user: id
        }
    }, [am_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, remark, id])

    const postDataSpare = useMemo(() => {
        return {
            am_spare_item_map_slno: am_spare_item_map_slno,
            warrenty_status: warrantyStatus === true ? 1 : 0,
            guarenty_status: garantyStatus === true ? 1 : 0,
            from_date: fromdate,
            to_date: toDate,
            troll_free: trollFree,
            ph_one: phone1,
            ph_two: phone2,
            address: adress,
<<<<<<< HEAD
            create_user: id
        }
    }, [am_spare_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, id])
=======
            remarks: remark,
            file_upload_status: 1,
            create_user: id
        }
    }, [am_spare_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, remark, id])
>>>>>>> 80f0a90c60c9e7d8c39dd00ff2d7488ac4edf138

    const patchdata = useMemo(() => {
        return {
            warrenty_status: warrantyStatus === true ? 1 : 0,
            guarenty_status: garantyStatus === true ? 1 : 0,
            from_date: fromdate,
            to_date: toDate,
            troll_free: trollFree,
            ph_one: phone1,
            ph_two: phone2,
            address: adress,
<<<<<<< HEAD
=======
            remarks: remark,
            file_upload_status: 1,
>>>>>>> 80f0a90c60c9e7d8c39dd00ff2d7488ac4edf138
            edit_user: id,
            am_item_map_slno: am_item_map_slno,
            am_item_wargar_slno: warGarSlno,
        }
    }, [am_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, remark, warGarSlno, id])

    const patchdataSpare = useMemo(() => {
        return {
            warrenty_status: warrantyStatus === true ? 1 : 0,
            guarenty_status: garantyStatus === true ? 1 : 0,
            from_date: fromdate,
            to_date: toDate,
            troll_free: trollFree,
            ph_one: phone1,
            ph_two: phone2,
            address: adress,
<<<<<<< HEAD
=======
            remarks: remark,
            file_upload_status: 1,
>>>>>>> 80f0a90c60c9e7d8c39dd00ff2d7488ac4edf138
            edit_user: id,
            am_spare_item_map_slno: am_spare_item_map_slno,
            am_item_wargar_slno: warGarSlno
        }
    }, [am_spare_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
<<<<<<< HEAD
        phone2, adress, id])

    const uploadFile = useCallback(async (e) => {
        if (e.target.files[0].type === "application/pdf") {
            if ((e.target.files[0].size) > 2000000) {
                warningNotify("File Size Is to Large")
            } else {
                const newFiles = [...selectFile]
                newFiles.push(e.target.files[0])
                setSelectFile(newFiles)
            }
        } else {
            const newFiles = [...selectFile]
            newFiles.push(e.target.files[0])
            setSelectFile(newFiles)
        }
    }, [selectFile, setSelectFile])

    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 25,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(imageFile, options)
        return compressedFile
    }, []);

    const handleRemoveFile = (index) => {
        setSelectFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
    };

    const reset = useCallback(() => {
        const frmdata = {
            fromdate: '',
            toDate: '',
            trollFree: '',
            phone1: '',
            phone2: '',
            adress: '',
        }
        setUserdata(frmdata)
        setwarrantyStatus(false)
        setgarantyStatus(false)
    }, [])
=======
        phone2, adress, remark, warGarSlno, id])
>>>>>>> 80f0a90c60c9e7d8c39dd00ff2d7488ac4edf138

    const ViewWarrentyImage = useCallback(() => {
        const getImage = async (slno) => {
            const result = await axioslogin.get(`/AssetFileUpload/GaurenteeWarrenteefileView/${slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Asset/GuaranteeWarranty/${slno}/${fileName}`;
                });
                setImageArry(fileUrls);
                setImageShowFlag(1)
                setImageShow(true)
            } else {
                warningNotify("Error Occured to display image")
                setImageShowFlag(0)
                setImageShow(false)
                setImageArry([])
            }
        }
        getImage(slno)
    }, [slno])

    const SaveWarGarDetails = useCallback((e) => {
        e.preventDefault()
<<<<<<< HEAD

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
                // Use the Axios instance and endpoint that matches your server setup
                const result = await axioslogin.post('/AssetFileUpload/asset/GaurenteeWarrentee', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return result.data
            } catch (error) {
                warningNotify('An error occurred during file upload.');

            }
        }
        const InsertItemDetail = async (postData) => {
            const result = await axioslogin.post('/ItemMapDetails/WarentGraruntyInsert', postData)
            const { success, message, insertId } = result.data
            if (success === 1) {
                if (selectFile.length !== 0) {
                    FileInsert(selectFile, insertId).then((val) => {
                        const { success, message } = val
                        if (success === 1) {
                            succesNotify(message)
                            setCount(count + 1)
                            setSelectFile([])
                            setattachFile(0)
                        }
                    })
                } else {
                    succesNotify(message)
                    setCount(count + 1)
                    setattachFile(0)
                }

            } else {
                infoNotify(message)
            }
        }
        const InsertItemDetailSpare = async (postDataSpare) => {
            const result = await axioslogin.post('/ItemMapDetails/WarentGraruntyInsertSpare', postDataSpare)
            const { success, message, insertId } = result.data
            if (success === 1) {
                if (selectFile.length !== 0) {
                    FileInsert(selectFile, insertId).then((val) => {
                        const { success, message } = val
                        if (success === 1) {
                            succesNotify(message)
                            setCount(count + 1)
                            setSelectFile([])
                            setattachFile(0)

                        }
                    })
                } else {

                    succesNotify(message)
                    setCount(count + 1)
                    setattachFile(0)
                }
            } else {
                infoNotify(message)
            }
        }
        const updateGRNDetails = async (patchdata) => {
            const result = await axioslogin.patch('/ItemMapDetails/WarentGraruntyUpdate', patchdata);
            const { message, success } = result.data;
            if (success === 2) {
                if (selectFile.length !== 0) {
                    FileInsert(selectFile, slno).then((val) => {
                        const { success, message } = val
                        if (success === 1) {
                            succesNotify(message)
                            setCount(count + 1)
                            setSelectFile([])
                        }
                    })
                } else {

                    succesNotify(message)
                    setCount(count + 1)
                }
            }
            else {
                warningNotify(message)
            }
        }
        const updateGRNDetailsSpare = async (patchdataSpare) => {
            const result = await axioslogin.patch('/ItemMapDetails/WarentGraruntyUpdateSpare', patchdataSpare);
            const { message, success } = result.data;
            if (success === 2) {
                if (selectFile.length !== 0) {
                    FileInsert(selectFile, slno).then((val) => {
                        const { success, message } = val
                        if (success === 1) {
                            succesNotify(message)
                            setCount(count + 1)
                            setSelectFile([])
                            setattachFile(0)
                        }
                    })
                } else {
                    succesNotify(message)
                    setCount(count + 1)
                }
            }
            else {
                warningNotify(message)
            }
        }
        if (assetData.length > 0 || spareData.length > 0) {
            if (assetSpare === 1) {
                updateGRNDetails(patchdata)
            } else {
                updateGRNDetailsSpare(patchdataSpare)
            }
        }
        else {
            if (assetSpare === 1) {
                if (fromdate !== '' && toDate !== '') {
                    InsertItemDetail(postData);
                } else {
                    infoNotify("Please Fill the feild")
                }
            } else {
                if (fromdate !== '' && toDate !== '') {
                    InsertItemDetailSpare(postDataSpare)
                } else {
                    infoNotify("Please Fill the feild")
                }
            }
        }
        setattachFile(0)
    }, [postData, setCount, count, postDataSpare, patchdata, assetSpare, assetData, spareData, patchdataSpare, selectFile, slno, setattachFile, fromdate,
        handleImageUpload, toDate])


    const Attachfile = useCallback(() => {
        setattachFile(prev => (prev === 1 ? 0 : 1));
    }, []);
    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])


    const [imageShowsingle, setImagesingle] = useState(0)
    const [imageShowSingle, setImageShowSingle] = useState(false)
    const [previewFile, setPreviewFile] = useState({ url: "", type: "" });


    const ViewImage = useCallback((file) => {
        const fileType = file.url
            ? file.url.endsWith(".pdf")
                ? "pdf"
                : "image"
            : file.type.includes("application/pdf")
                ? "pdf"
                : "image";

        const fileUrl = file.url || URL.createObjectURL(file);
        setPreviewFile({ url: fileUrl, type: fileType });
        setImageShowSingle(true)
        setImagesingle(1)
    }, [])

    const CloseFile = useCallback(() => {
        setImagesingle(0)
        setImageShowSingle(false)
    }, [])




=======
        if (editFlag === 1) {
            const updateWarGardetails = async (patchdata) => {
                const result = await axioslogin.patch('/ItemMapDetails/WarentGraruntyUpdate', patchdata);
                const { message, success } = result.data;
                if (success === 2) {
                    setcount(count + 1)
                    succesNotify(message)
                    seteditFlag(0)
                    WarGarReferesh()

                }
                else {
                    warningNotify(message)
                }
            }
            const updateWarGardetailsSpare = async (patchdataSpare) => {
                const result = await axioslogin.patch('/ItemMapDetails/WarentGraruntyUpdateSpare', patchdataSpare);
                const { message, success } = result.data;
                if (success === 2) {
                    setcount(count + 1)
                    succesNotify(message)
                    seteditFlag(0)
                    WarGarReferesh()
                }
                else {
                    warningNotify(message)
                }
            }
            if (assetSpare === 1) {
                updateWarGardetails(patchdata)
            } else {
                updateWarGardetailsSpare(patchdataSpare)
            }
        } else {
            const InsertItemDetail = async (postData) => {
                const result = await axioslogin.post('/ItemMapDetails/WarentGraruntyInsert', postData)
                const { success, message } = result.data
                if (success === 1) {
                    setcount(count + 1)
                    succesNotify(message)
                    seteditFlag(0)
                    WarGarReferesh()
                } else {
                    infoNotify(message)
                }
            }
            const InsertItemDetailSpare = async (postDataSpare) => {
                const result = await axioslogin.post('/ItemMapDetails/WarentGraruntyInsertSpare', postDataSpare)
                const { success, message } = result.data
                if (success === 1) {
                    setcount(count + 1)
                    succesNotify(message)
                    seteditFlag(0)
                    WarGarReferesh()
                } else {
                    infoNotify(message)
                }
            }
            if (assetSpare === 1) {
                InsertItemDetail(postData);
            } else {
                InsertItemDetailSpare(postDataSpare)
            }
        }

    }, [postData, assetSpare, postDataSpare, patchdata, patchdataSpare, count, setcount, WarGarReferesh, editFlag])

    const [tableData, setTableData] = useState([]);

    const { data: AssetWarGar = [] } = useQuery(
        ['getAllWarGarInAsset', count],
        async () => {
            const result = await axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNot/${am_item_map_slno}`);
            return result.data?.data || [];
        },
        { enabled: !!am_item_map_slno }
    );

    const { data: SpareWarGar = [] } = useQuery(
        ['getAllWarGarInSpare', count],
        async () => {
            const result = await axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNotSpare/${am_spare_item_map_slno}`);
            return result.data?.data || [];
        },
        { enabled: !!am_spare_item_map_slno }

    );
    useEffect(() => {
        setTableData((prevData) => {
            const newData =
                AssetWarGar.length > 0 ? AssetWarGar :
                    SpareWarGar.length > 0 ? SpareWarGar : [];

            return JSON.stringify(prevData) !== JSON.stringify(newData) ? newData : prevData;
        });
    }, [AssetWarGar, SpareWarGar]);

    const RowSelect = useCallback((val) => {
        seteditFlag(1)
        const {
            address, am_item_wargar_slno, from_date, guarenty_status, ph_one, ph_two, remarks,
            to_date, troll_free, warrenty_status
        } = val
        const frmdata = {
            fromdate: from_date || '',
            toDate: to_date || '',
            trollFree: troll_free || '',
            phone1: ph_one || '',
            phone2: ph_two || '',
            adress: address || '',
            remark: remarks
        }
        setUserdata(frmdata)
        setwarrantyStatus(warrenty_status === 1 ? true : false)
        setgarantyStatus(guarenty_status === 1 ? true : false)
        setwarGarSlno(am_item_wargar_slno)
    }, [])

>>>>>>> 80f0a90c60c9e7d8c39dd00ff2d7488ac4edf138

    return (
        <Box>
            {imageshowFlag === 1 ? <FileView open={imageshow} handleClose={handleClose}
                images={imagearray} />
                : null}
            {imageShowsingle === 1 ?
                < Box >
                    <FileViewSingle previewFile={previewFile} imageShow={imageShowSingle} CloseFile={CloseFile} />
                </Box> :
                null}
            <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2 }}>
                <TextComponent
                    text={"WARRENTY/GAURANTEE DETAILS"}
                    sx={{
                        flex: 1,
                        fontWeight: 500,
                        color: 'black',
                        fontSize: 15,
                    }}
                />
                <Box sx={{
<<<<<<< HEAD
                    display: 'flex', mt: 2,
                }} >
                    <Box sx={{ width: 120 }}></Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ display: 'flex', p: 0.5, flexDirection: 'column' }} >
                            <CusCheckBox
                                variant="outlined"
                                color="primary"
                                size="md"
                                name="warrantyStatus"
                                label={<span style={{ color: '#0B6BCB', fontWeight: 500 }}>Warrenty</span>}
                                value={warrantyStatus}
                                onCheked={updatewarrantyStatus}
                                checked={warrantyStatus}

                            />
                        </Box>
                        <Box sx={{ display: 'flex', p: 0.5, flexDirection: 'column' }} >
                            <CusCheckBox
                                variant="outlined"
                                color="primary"
                                size="md"
                                name="garantyStatus"
                                label={<span style={{ color: '#0B6BCB', fontWeight: 500 }}>Guarantee</span>}
                                value={garantyStatus}
                                onCheked={updategarantyStatus}
                                checked={garantyStatus}
                            />
                        </Box>
                    </Box>

=======
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap', mx: 1, mt: 1
                }} >
                    <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >

                        <CssVarsProvider>
                            <Checkbox
                                variant="outlined"
                                color="danger"
                                size="md"
                                name="warrantyStatus"
                                checked={warrantyStatus}
                                onChange={updatewarrantyStatus}
                                label="Warranty"
                            />
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                        <CssVarsProvider>
                            <Checkbox
                                variant="outlined"
                                color="danger"
                                size="md"
                                name="garantyStatus"
                                checked={garantyStatus}
                                label="Guarantee"
                                onChange={updategarantyStatus}
                            />
                        </CssVarsProvider>
                    </Box>
>>>>>>> 80f0a90c60c9e7d8c39dd00ff2d7488ac4edf138
                </Box>
                <Box sx={{ flex: 1, display: 'flex', }} >
                    <Box sx={{ width: 500 }}>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={"From Date"}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    pt: 1,
                                    width: 120

<<<<<<< HEAD
                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <TextFieldCustom
                                    type="date"
                                    size="sm"
                                    name="fromdate"
                                    value={fromdate}
                                    onchange={updatewarrenGuranDetails}
                                ></TextFieldCustom>
                            </Box>

                        </Box>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={"To date"}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    pt: 1,
                                    width: 120

                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <TextFieldCustom
                                    type="date"
                                    size="sm"
                                    name="toDate"
                                    value={toDate}
                                    onchange={updatewarrenGuranDetails}
                                ></TextFieldCustom>
                            </Box>


                        </Box>

                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={" Toll-free No."}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    pt: 1,
                                    width: 120

                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <TextFieldCustom
                                    type="text"
                                    size="sm"
                                    name="trollFree"
                                    value={trollFree}
                                    onchange={updatewarrenGuranDetails}
                                ></TextFieldCustom>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={"Contact No. 1"}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    pt: 1,
                                    width: 120

                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <TextFieldCustom
                                    type="text"
                                    size="sm"
                                    name="phone1"
                                    value={phone1}
                                    slotProps={{
                                        input: {
                                            maxLength: 10,
                                        },
                                    }}

                                    onchange={updatewarrenGuranDetails}
                                ></TextFieldCustom>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={"Contact No. 2"}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    pt: 1,
                                    width: 120

                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <TextFieldCustom
                                    type="text"
                                    size="sm"
                                    name="phone2"
                                    value={phone2}
                                    slotProps={{
                                        input: {
                                            maxLength: 10,
                                        },
                                    }}
                                    onchange={updatewarrenGuranDetails}

                                ></TextFieldCustom>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={"Address"}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    pt: 1,
                                    width: 120

                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Textarea
                                    type="text"
                                    size="sm"
                                    name="adress"
                                    value={adress}
                                    minRows={1}
                                    onChange={updatewarrenGuranDetails}
                                ></Textarea>
                            </Box>
                        </Box>
                        {attachFile === 1 ?
                            <>
                                {selectFile.length !== 0 ?
                                    <Box sx={{ display: 'flex', pt: .5 }}>
                                        <Box sx={{ width: 120 }}>
                                        </Box>
                                        <Box sx={{ display: 'flex', flex: 1, overflowY: 'auto', border: 1, borderColor: 'lightgrey', p: .4, }}>
                                            {selectFile.length !== 0 &&
                                                selectFile.map((file, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            border: "1px solid #e0e0e0",
                                                            borderRadius: "4px",
                                                            p: 0.5, mr: .5
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
                                                        <ClearSharpIcon
                                                            sx={{
                                                                pl: .3, pb: .3, height: 20, width: 20, cursor: 'pointer', color: '#4D0011', mx: .5,
                                                                '&:hover': { color: '#BA0F30' },
                                                            }}
                                                            onClick={() => handleRemoveFile(index)}
                                                        />
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                    </Box>
                                    : null}

                                <Box sx={{ flex: 1, display: 'flex' }}>
                                    <Box sx={{
                                        width: 120
                                    }}>
                                    </Box>
                                    <Box sx={{
                                        flex: 1, border: .1, borderRadius: 3, borderStyle: 'dashed', mt: .8, textAlign: 'center', borderColor: '#0B6BCB',
                                        bgcolor: '#F3F5F7', pt: 1, cursor: 'pointer'
                                    }} >
                                        <label htmlFor="file-input">
                                            <UploadFileIcon sx={{ color: '#0B6BCB', cursor: 'pointer' }} />
                                            <TextComponent
                                                text={"Attach Bill"}
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#0B6BCB',
                                                    pb: 1, cursor: 'pointer'
                                                }}
                                            />
                                        </label>
                                        <Input
                                            id="file-input"
                                            type="file"
                                            accept=".jpg, .jpeg, .png, .pdf"
                                            style={{ display: 'none' }}
                                            onChange={uploadFile}
                                        />
                                    </Box>
                                </Box>
                            </> : null}

                        <Box sx={{ display: 'flex', }}>
                            <Box sx={{ width: 120 }}>
                            </Box>
                            <Box sx={{ flex: 1, my: .5 }}>
                                {
                                    fileUploadStatus === 1 ?
                                        <Box
                                            sx={{
                                                bgcolor: '#7AB75E',
                                                width: 120,
                                                textAlign: 'center',
                                                borderRadius: 4,
                                                color: 'white',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                py: .3,
                                                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.6)',
                                                transform: 'translateZ(0)',
                                                transition: 'transform 0.2s ease',
                                                '&:hover': {
                                                    boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.7)',
                                                }
                                            }}
                                            onClick={ViewWarrentyImage}
                                        >
                                            Attached File
                                        </Box>
                                        : null
                                }
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Box sx={{ width: 120 }}>
                            </Box>
                            <Box sx={{ flex: 1, gap: .5, display: 'flex' }}>
                                <Box>
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true"
                                        onClick={SaveWarGarDetails}>
                                        <LibraryAddIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>
                                <Box >
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true"
                                        onClick={reset}>
                                        <RefreshIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>
                                <Box >
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true"
                                        onClick={Attachfile}>
                                        <AttachmentSharpIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                    </Box>
                </Box>
            </Box>
        </Box >
=======
                {
                    warrantyStatus === true || garantyStatus === true ?
                        <Box sx={{ m: 1 }}>
                            <Box sx={{
                                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                            }} >

                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >From Date</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="date"
                                            size="sm"
                                            name="fromdate"
                                            value={fromdate}
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >To Date</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="date"
                                            size="sm"
                                            name="toDate"
                                            value={toDate}
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Trool Free No</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="trollFree"
                                            value={trollFree}
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Phone No 1</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="phone1"
                                            value={phone1}
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Phone No 2</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="phone2"
                                            value={phone2}
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex', flexDirection: 'row', flexWrap: 'wrap'
                            }} >

                                <Box sx={{ display: 'flex', width: '40%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Address</Typography>
                                    <Box>
                                        <CssVarsProvider>
                                            <Textarea
                                                type="text"
                                                size="sm"
                                                name="adress"
                                                value={adress}
                                                onChange={updatewarrenGuranDetails}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '40%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Remarks</Typography>
                                    <Box>
                                        <CssVarsProvider>
                                            <Textarea
                                                type="text"
                                                size="sm"
                                                name="remark"
                                                value={remark}
                                                onChange={updatewarrenGuranDetails}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <CustomeToolTip title="Save" placement="top" >
                                    <Box sx={{ pt: 3, pl: 1 }}>
                                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveWarGarDetails} >
                                            <LibraryAddIcon fontSize='small' />
                                        </CusIconButton>
                                    </Box>
                                </CustomeToolTip>
                                <CustomeToolTip title="Refresh" placement="top" >
                                    <Box sx={{ pt: 3, pl: 1 }}>
                                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={WarGarReferesh} >
                                            <RefreshIcon fontSize='small' />
                                        </CusIconButton>
                                    </Box>
                                </CustomeToolTip>
                            </Box>

                        </Box> : null
                }
            </Box>

            <Box
                sx={{
                    m: 1,
                    // flex: 1,
                    display: 'flex',
                    overflow: "auto",
                    border: 1,
                    borderColor: 'lightgray'
                }}
            >

                <CssVarsProvider>
                    <Table stickyHeader size="sm"
                        sx={{
                            flex: 1,
                            width: '100%'

                        }}>
                        <thead>
                            <tr>
                                <th style={{ width: 40, textAlign: 'center' }}>#</th>
                                <th style={{ width: 37 }}>Edit</th>
                                <th style={{ width: 85 }}>Wrnty/Gnty </th>
                                <th style={{ width: 90 }}>From Date</th>
                                <th style={{ width: 90 }}>To Date</th>
                                <th style={{ width: 130 }}>Toll-Free No.</th>
                                <th style={{ width: 100 }}>Ph No. 1</th>
                                <th style={{ width: 100 }}>Ph No. 2</th>
                                <th style={{ flexGrow: 1 }}>Address</th>
                                <th style={{ flexGrow: 1 }}>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData?.length > 0 ? (
                                tableData.map((val, index) => (
                                    <tr key={index} >
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td><EditIcon sx={{ color: 'black', cursor: 'pointer' }} onClick={() => RowSelect(val)} /></td>
                                        <td>{val.warrenty_status === 1 ? 'Warranty' : 'Guarantee'}</td>
                                        <td>{val.from_date}</td>
                                        <td>{val.to_date}</td>
                                        <td>{val.troll_free || '-'}</td>
                                        <td>{val.ph_one || '-'}</td>
                                        <td>{val.ph_two || '-'}</td>
                                        <td>{val.address || '-'}</td>
                                        <td style={{ minHeight: 20, maxHeight: 100 }}>{val.remarks || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" style={{ textAlign: 'center', padding: '10px' }}>
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </CssVarsProvider>

            </Box>
        </Paper >
>>>>>>> 80f0a90c60c9e7d8c39dd00ff2d7488ac4edf138
    )
}

export default memo(WarrentyGrauntyComp)

