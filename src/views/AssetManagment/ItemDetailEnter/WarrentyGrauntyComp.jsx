import { Box, Chip, CssVarsProvider, Input, Textarea } from '@mui/joy'
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

const WarrentyGrauntyComp = ({ detailArry, assetSpare }) => {

    const { am_item_map_slno, am_spare_item_map_slno } = detailArry

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [warrantyStatus, setwarrantyStatus] = useState(false)
    const [garantyStatus, setgarantyStatus] = useState(false)
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

    const updatewarrantyStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setwarrantyStatus(true)
            setgarantyStatus(false)
        } else {
            setwarrantyStatus(false)
            setgarantyStatus(false)
            const frmdata = {
                fromdate: '',
                toDate: '',
                trollFree: '',
                phone1: '',
                phone2: '',
                adress: '',
            }
            setUserdata(frmdata)
        }

    }, [])

    const updategarantyStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setgarantyStatus(true)
            setwarrantyStatus(false)
        } else {
            setgarantyStatus(false)
            setwarrantyStatus(false)
            const frmdata = {
                fromdate: '',
                toDate: '',
                trollFree: '',
                phone1: '',
                phone2: '',
                adress: '',
            }
            setUserdata(frmdata)
        }
    }, [])

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
            create_user: id
        }
    }, [am_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, id])

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
            create_user: id
        }
    }, [am_spare_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, id])

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
            edit_user: id,
            am_item_map_slno: am_item_map_slno,
        }
    }, [am_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, id])

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
            edit_user: id,
            am_spare_item_map_slno: am_spare_item_map_slno,
        }
    }, [am_spare_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
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
    )
}

export default memo(WarrentyGrauntyComp)

