import React, { useCallback, useState, memo } from 'react'
import Button from '@mui/material/Button';
import { Box, IconButton, Input } from '@mui/material'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { CssVarsProvider, Typography } from '@mui/joy'
import { useSelector } from 'react-redux'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle';
import UploadFileIcon from '@mui/icons-material/UploadFile'
import imageCompression from 'browser-image-compression';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CardMaster from 'src/views/Components/CardMaster';
import AmcCmcAddedTable from './AmcCmcAddedTable';
import ImageDisplayModal from 'src/views/CentralRequestManagement/CRFRequestMaster/ImageDisplayModal';
import { getAmcCmcMaster } from 'src/redux/actions/AmAmcCmcSlect.action';
import { useDispatch } from 'react-redux'
import { useMemo } from 'react';
import CusIconButton from '../../Components/CusIconButton';
import BillSupplerListOracle from './BillSupplerListOracle';
import { getSupplierList } from 'src/redux/actions/AmSupplierListSelect';
import SupplierSelectMaster from './SupplierSelectMaster';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { format } from 'date-fns';


const AmcCmcAdding = ({ setNewAMCFlg, setSupplierdetl, setBillDate }) => {
    const dispatch = useDispatch();
    const [selectFile, setSelectFile] = useState([])
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [imageshow, setImageShow] = useState(false)
    const [value, setValue] = useState(0)
    const [count, setCount] = useState(0)
    const [amcStatus, setamcStatus] = useState(false)
    const [cmcStatus, setcmcStatus] = useState(false)
    const [supplier, setSupplier] = useState(0)
    const [amcCmcStatus, setamcCmcStatus] = useState(false)
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [amcfrm, setamcfrm] = useState({
        fromDate: '',
        toDate: '',
        FileStatus: '',
        Slno: ''
    })

    //Destructuring

    const { fromDate, toDate, FileStatus, Slno } = amcfrm
    const updateamcFrm = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setamcfrm({ ...amcfrm, [e.target.name]: value })
    }, [amcfrm])

    const updateamcStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setamcStatus(true)
            setcmcStatus(false)
        } else {
            setamcStatus(false)
            setcmcStatus(false)
        }

    }, [])

    const updatecmcStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setcmcStatus(true)
            setamcStatus(false)
        } else {
            setcmcStatus(false)
            setamcStatus(false)
        }

    }, [])
    const updateamcCmcStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setamcCmcStatus(true)
        } else {
            setamcCmcStatus(false)
        }

    }, [])

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
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };


    const postdata = useMemo(() => {
        return {
            suplier_slno: supplier,
            amc_status: amcStatus === true ? 1 : 0,
            cmc_status: cmcStatus === true ? 1 : 0,
            from_date: fromDate,
            to_date: toDate,
            amccmc_status: amcCmcStatus === true ? 1 : 0,
            create_user: id
        }
    }, [supplier, fromDate, toDate, id, amcStatus, cmcStatus, amcCmcStatus])


    const patch = useMemo(() => {
        return {
            suplier_slno: supplier,
            amc_status: amcStatus === true ? 1 : 0,
            cmc_status: cmcStatus === true ? 1 : 0,
            from_date: fromDate,
            to_date: toDate,
            amccmc_status: amcCmcStatus === true ? 1 : 0,
            edit_user: id,
            amccmc_slno: Slno
        }
    }, [supplier, fromDate, toDate, id, amcStatus, cmcStatus, Slno, amcCmcStatus])


    const reset = useCallback(() => {
        setSelectFile([])
        setImageShowFlag(0)
        setImageArry([])
        setValue(0)
        setCount(0)
        setamcStatus(false)
        setcmcStatus(false)
        setImageShow(false)
        const frmdata = {
            fromDate: '',
            toDate: '',
            FileStatus: '',
            Slno: ''
        }
        setamcfrm(frmdata)
        setNewAMCFlg(0)
        setamcCmcStatus(false)
        setSupplierdetl(0)
        setBillDate(format(new Date(), "yyyy-MM-dd"))
    }, [setNewAMCFlg, setSupplierdetl, setBillDate])

    const submitAmcCmcAdding = useCallback((e) => {
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
                const result = await axioslogin.post('/AssetFileUpload/asset/AmcCmcImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return result.data
            } catch (error) {
                warningNotify('An error occurred during file upload.');

            }
        }

        const InsertAmcCmc = async (postdata) => {
            const result = await axioslogin.post('/ItemMapDetails/AmcCMCInsert', postdata)
            const { message, success, insertid } = result.data
            if (success === 1) {
                if (selectFile.length !== 0) {
                    FileInsert(selectFile, insertid).then((val) => {
                        const { success, message } = val
                        if (success === 1) {
                            succesNotify(message)
                            setCount(count + 1)
                            setSelectFile([])
                            reset()
                            dispatch(getAmcCmcMaster())
                        }
                        else {
                            warningNotify(message)
                        }
                    })
                } else {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                    dispatch(getAmcCmcMaster())
                }

            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        const UpdateCustodiandept = async (patch) => {
            const result = await axioslogin.patch('/ItemMapDetails/AmcCmcUpdate', patch)
            const { message, success } = result.data
            if (success === 2) {
                if (selectFile.length !== 0) {
                    FileInsert(selectFile, Slno).then((val) => {
                        const { success, message } = val
                        if (success === 2) {
                            succesNotify(message)
                            setCount(count + 1)
                            setSelectFile([])
                            reset()
                            dispatch(getAmcCmcMaster())
                        }
                        else {
                            warningNotify(message)
                        }
                    })
                } else {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                    dispatch(getAmcCmcMaster())
                }
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }

        if (amcStatus === false && cmcStatus === false) {
            warningNotify("Please select AMC or CMC")

        } else {
            if (value === 0) {
                InsertAmcCmc(postdata)
            }
            else {
                UpdateCustodiandept(patch)
            }
        }
    }, [postdata, value, selectFile, Slno, patch, dispatch, amcStatus, cmcStatus, count, reset,
        handleImageUpload
    ])

    const rowSelect = useCallback((val) => {
        setValue(1)
        const { amccmc_slno, suplier_slno, amc_status, cmc_status, from_date, to_date, image_upload, amccmc_status } = val
        setamcStatus(amc_status === 1 ? true : false)
        setcmcStatus(cmc_status === 1 ? true : false)
        setamcCmcStatus(amccmc_status === 1 ? true : false)
        const frmdata = {
            fromDate: from_date,
            toDate: to_date,
            FileStatus: image_upload,
            Slno: amccmc_slno
        }
        setamcfrm(frmdata)
        setSupplier(suplier_slno)
    }, [])

    const gotoAmcPAge = useCallback(() => {
        setNewAMCFlg(0)
    }, [setNewAMCFlg])

    const refreshWindow = useCallback(() => {
        reset()
    }, [reset])

    const ViewAmcCmcImage = useCallback(() => {
        const getImage = async (Slno) => {
            const result = await axioslogin.get(`/AssetFileUpload/AmcCmcImageView/${Slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Asset/AMCCMC/${Slno}/${fileName}`;
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
        getImage(Slno)

    }, [Slno])
    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    const [oracleFlag, setOracleFlag] = useState(0)
    const [suppName, setSupName] = useState('')
    const [OracleList, setOracleList] = useState([])
    const [OracleListFlag, setOracleListFlag] = useState(0)
    const updateSuppName = useCallback((e) => {
        setSupName(e.target.value.toUpperCase())
    }, [])
    const searchBillList = useCallback(() => {
        setOracleFlag(1)
    }, [])

    const searchdata = useMemo(() => {
        return {
            SUC_NAME: suppName
        }

    }, [suppName])

    const SearchSupplOrcle = useCallback(() => {
        const gettingOrcleData = async (searchdata) => {
            const result = await axiosellider.post('/supplierList/supplier', searchdata)
            const { success, data } = result.data
            if (success === 1) {
                setOracleList(data)
                setOracleListFlag(1)
            } else {
                warningNotify("No supplier found")
                setOracleList([])
                setOracleListFlag(0)
            }
        }
        gettingOrcleData(searchdata)


    }, [searchdata])


    const SuppAddMeliora = useCallback((val) => {
        const { SUC_NAME, SUC_PHONE, SUC_MOBILE, SUC_EMAIL, SUC_PERSON1, SUC_PERSON2,
            // SUC_ADD1, SUC_ADD2, SUC_PERSON
        } = val

        const postdata = {
            it_supplier_name: SUC_NAME,
            it_supplier_land_one: parseInt(SUC_PHONE),
            it_supplier_mob_one: parseInt(SUC_MOBILE),
            it_supplier_email_one: SUC_EMAIL,
            it_supplier_escl_mob_one: parseInt(SUC_PERSON2),
            it_supplier_escl_land_one: parseInt(SUC_PERSON1),
            supplier_status: 1
        }
        const InsertSupplierInMeli = async (postdata) => {
            const result = await axioslogin.post('/ItemMapDetails/SupplierAdding', postdata)
            const { message, success } = result.data
            if (success === 1) {
                succesNotify(message)
                setOracleList([])
                setOracleListFlag(0)
                dispatch(getSupplierList())
                setSupName('')
            } else {
                warningNotify(message)
            }
        }
        InsertSupplierInMeli(postdata)
    }, [dispatch])

    return (

        <CardMaster
            title="AMC/CMC Adding"
            submit={submitAmcCmcAdding}
            close={gotoAmcPAge}
            refresh={refreshWindow}
        > {imageshowFlag === 1 ? <ImageDisplayModal open={imageshow} handleClose={handleClose}
            images={imagearray} /> : null}
            <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>

                <Box sx={{
                    width: "30%", display: "flex",
                    flexDirection: "column",
                }}>   <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: 'row', pb: 1
                }}>
                        <Box
                            sx={{ width: "35%", }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Suppiler Information</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: "55%", }}>
                            {OracleListFlag === 1 ?
                                <SupplierSelectMaster
                                    supplier={supplier}
                                    setSupplier={setSupplier}
                                /> : <SupplierSelectMaster
                                    supplier={supplier}
                                    setSupplier={setSupplier}
                                />
                            }

                        </Box>
                        <Box sx={{ width: "10%", pl: 1 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchBillList} >
                                <SearchOutlinedIcon fontSize='small' />
                            </CusIconButton>


                        </Box>
                    </Box>
                    {oracleFlag === 1 ?
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: 'row', pb: 1
                        }}>

                            <Box sx={{ display: 'flex', width: '55%', pt: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 15 }}>Enter Supplier Name</Typography>
                                <Box>
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="suppName"
                                        value={suppName}
                                        onchange={updateSuppName}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: "25%", height: 58, pt: 3.5, pl: 3 }}>
                                <Button onClick={SearchSupplOrcle} variant="contained"
                                    size="small" color="primary">Search</Button>
                            </Box>

                        </Box> : null
                    }


                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: 'row'
                    }}>

                        <Box
                            sx={{ width: "35%", }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>From Date</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box
                            sx={{ width: "55%", }}>
                            <TextFieldCustom
                                type="date"
                                size="sm"
                                name="fromDate"
                                value={fromDate}
                                onchange={updateamcFrm}
                            ></TextFieldCustom>
                        </Box>
                    </Box>

                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: 'row', pt: 1
                    }}>
                        <Box
                            sx={{ width: "35%", }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>To Date</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box
                            sx={{ width: "55%", }}>
                            <TextFieldCustom
                                type="date"
                                size="sm"
                                name="toDate"
                                value={toDate}
                                onchange={updateamcFrm}
                            ></TextFieldCustom>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: 'row', pt: 1
                    }}>

                        <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                            <CusCheckBox
                                variant="outlined"
                                color="danger"
                                size="md"
                                name="amcStatus"
                                label="AMC"
                                value={amcStatus}
                                onCheked={updateamcStatus}
                                checked={amcStatus}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                            <CusCheckBox
                                variant="outlined"
                                color="danger"
                                size="md"
                                name="cmcStatus"
                                label="CMC"
                                value={cmcStatus}
                                onCheked={updatecmcStatus}
                                checked={cmcStatus}
                            />
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: 'row', pt: 1
                    }}>
                        <Box sx={{ display: 'flex', width: '50%', p: 0.5, flexDirection: 'column' }} >
                            <CusCheckBox
                                variant="outlined"
                                color="danger"
                                size="md"
                                name="amcCmcStatus"
                                label="AMC/CMC Status"
                                value={amcCmcStatus}
                                onCheked={updateamcCmcStatus}
                                checked={amcCmcStatus}
                            />
                        </Box>

                    </Box>
                    <Box sx={{ display: 'flex', width: "75%", pt: 2 }}>
                        <Box >
                            <label htmlFor="file-input">
                                <CustomeToolTip title="upload">
                                    <IconButton color="primary" aria-label="upload file" component="span">
                                        <UploadFileIcon />
                                        <CustomPaperTitle heading="Maximum Size 25MB" />
                                    </IconButton>
                                </CustomeToolTip>
                            </label>
                            <Input
                                id="file-input"
                                type="file"
                                accept=".jpg, .jpeg, .png, .pdf"
                                style={{ display: 'none' }}
                                onChange={uploadFile}
                            />
                        </Box>

                        {
                            FileStatus === 1 ?
                                <Box sx={{ display: 'flex', width: "35%", height: 40, pt: 1 }}>
                                    <Button onClick={ViewAmcCmcImage} variant="contained"
                                        size="small" color="primary">View Image</Button>
                                </Box> : null
                        }

                    </Box>

                    {selectFile.length !== 0 ?

                        <Box sx={{
                            width: "100%", display: "flex", flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                        }}>
                            {
                                selectFile && selectFile.map((val, index) => {
                                    return <Box sx={{ display: "flex", flexDirection: "row", ml: 2, pt: 2 }}
                                        key={index} >
                                        <Box >{val.name}</Box>
                                        <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '18px', width: '20px', cursor: 'pointer' }}
                                            onClick={() => handleRemoveFile(index)}
                                        /></Box>

                                    </Box>
                                }
                                )}
                        </Box>
                        : null
                    }
                </Box>


                <Box sx={{ width: '70%', pl: 2 }}>
                    <AmcCmcAddedTable count={count} rowSelect={rowSelect} />
                </Box>
            </Box>

            {

                OracleListFlag === 1 ?
                    <Box sx={{
                        width: "100%", display: "flex", flexDirection: 'row',
                    }}>
                        <BillSupplerListOracle OracleList={OracleList} SuppAddMeliora={SuppAddMeliora} />


                    </Box> : null

            }
        </CardMaster >
    )
}

export default memo(AmcCmcAdding)