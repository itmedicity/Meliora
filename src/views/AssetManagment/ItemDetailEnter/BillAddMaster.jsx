import React, { useCallback, useState, memo, useMemo } from 'react'
import Button from '@mui/material/Button';
import { Box, IconButton, Input } from '@mui/material'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { CssVarsProvider, Typography } from '@mui/joy'
import { useSelector, useDispatch } from 'react-redux'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle';
import UploadFileIcon from '@mui/icons-material/UploadFile'
import imageCompression from 'browser-image-compression';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CardMaster from 'src/views/Components/CardMaster';
import ImageDisplayModal from 'src/views/CentralRequestManagement/ComonComponent/ImageUploadCmp/ImageDisplayModal';
import BillAddMastTable from './BillAddMastTable';
import SupplierSelectMaster from './SupplierSelectMaster';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CusIconButton from '../../Components/CusIconButton';
import BillSupplerListOracle from './BillSupplerListOracle';
import { getSupplierList } from 'src/redux/actions/AmSupplierListSelect';


const BillAddMaster = ({ setBillFlg }) => {
    const [selectFile, setSelectFile] = useState([])
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [imageshow, setImageShow] = useState(false)
    const [value, setValue] = useState(0)
    const [count, setCount] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const dispatch = useDispatch();
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [billMast, setBillMast] = useState({
        am_bill_no: '',
        am_bill_date: '',
        am_bill_image: '',
        am_bill_mastslno: ''
    })

    //Destructuring

    const { am_bill_no, am_bill_date, am_bill_image, am_bill_mastslno } = billMast
    const updateBillMAst = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setBillMast({ ...billMast, [e.target.name]: value })
    }, [billMast])

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
            am_bill_no: am_bill_no,
            am_bill_date: am_bill_date,
            am_bill_supplier: supplier,
            create_user: id
        }
    }, [am_bill_no, am_bill_date, supplier, id])

    const patch = useMemo(() => {
        return {
            am_bill_no: am_bill_no,
            am_bill_date: am_bill_date,
            am_bill_supplier: supplier,
            edit_user: id,
            am_bill_mastslno: am_bill_mastslno
        }
    }, [am_bill_no, am_bill_date, supplier, id, am_bill_mastslno])


    const reset = useCallback(() => {
        setSelectFile([])
        setImageShowFlag(0)
        setImageArry([])
        setValue(0)
        setCount(0)
        setImageShow(false)
        const frmdata = {
            am_bill_no: '',
            am_bill_date: '',
            am_bill_image: ''
        }
        setBillMast(frmdata)
        setBillFlg(0)
    }, [setBillFlg])
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
                const result = await axioslogin.post('/AssetFileUpload/asset/BillMasterImage', formData, {
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
            const result = await axioslogin.post('/ItemMapDetails/BillMasterInsert', postdata)
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
                        }
                        else {
                            warningNotify(message)
                        }
                    })
                } else {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                }

            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        const UpdateCustodiandept = async (patch) => {
            const result = await axioslogin.patch('/ItemMapDetails/BillMasterUpdate', patch)
            const { message, success } = result.data
            if (success === 2) {
                if (selectFile.length !== 0) {
                    FileInsert(selectFile, am_bill_mastslno).then((val) => {
                        const { success, message } = val
                        if (success === 1) {
                            succesNotify(message)
                            setCount(count + 1)
                            setSelectFile([])
                            reset()

                        }
                        else {
                            warningNotify(message)
                            setCount(count + 1)
                            setSelectFile([])
                            reset()
                        }
                    })
                } else {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()

                }
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }

        if (am_bill_no === '') {
            warningNotify("Please Enter Bill Number")
        } else {
            if (value === 0) {
                InsertAmcCmc(postdata)
            }
            else {
                UpdateCustodiandept(patch)
            }
        }
    }, [postdata, value, selectFile, am_bill_mastslno, patch, am_bill_no, count, reset,
        handleImageUpload
    ])

    const rowSelect = useCallback((val) => {
        setValue(1)
        const { am_bill_no, am_bill_date, am_bill_supplier, am_bill_image, am_bill_mastslno } = val
        const frmdata = {
            am_bill_no: am_bill_no,
            am_bill_date: am_bill_date,
            am_bill_image: am_bill_image,
            am_bill_mastslno: am_bill_mastslno
        }
        setBillMast(frmdata)
        setSupplier(am_bill_supplier)

    }, [])

    const gotoAmcPAge = useCallback(() => {
        setBillFlg(0)
    }, [setBillFlg])

    const refreshWindow = useCallback(() => {
        reset()
    }, [reset])

    const ViewAmcCmcImage = useCallback(() => {
        const getImage = async (am_bill_mastslno) => {
            const result = await axioslogin.get(`/AssetFileUpload/BillMasterImageView/${am_bill_mastslno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Asset/BillMaster/${am_bill_mastslno}/${fileName}`;
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
        getImage(am_bill_mastslno)

    }, [am_bill_mastslno])
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
            title="Bill Adding"
            submit={submitAmcCmcAdding}
            close={gotoAmcPAge}
            refresh={refreshWindow}
        > {imageshowFlag === 1 ? <ImageDisplayModal open={imageshow} handleClose={handleClose}
            images={imagearray} /> : null}
            <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>

                <Box sx={{
                    width: "30%", display: "flex",
                    flexDirection: "column",
                }}>  <Box sx={{
                    width: "100%", pb: 1,
                    display: "flex",
                    flexDirection: 'row'
                }}>
                        <Box
                            sx={{ width: "35%", }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Bill No</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box
                            sx={{ width: "55%", }}>
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                name="am_bill_no"
                                value={am_bill_no}
                                onchange={updateBillMAst}
                            ></TextFieldCustom>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: 'row', pb: 1,
                    }}>
                        <Box
                            sx={{ width: "35%", }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Bill Date</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box
                            sx={{ width: "55%", }}>
                            <TextFieldCustom
                                type="date"
                                size="sm"
                                name="am_bill_date"
                                value={am_bill_date}
                                onchange={updateBillMAst}
                            ></TextFieldCustom>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: 'row'
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
                            am_bill_image === 1 ?
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
                    <BillAddMastTable count={count} rowSelect={rowSelect} />
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

export default memo(BillAddMaster)