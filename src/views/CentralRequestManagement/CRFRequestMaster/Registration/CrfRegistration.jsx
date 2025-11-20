import { Box, CssVarsProvider, IconButton, Option, Select, Table, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CustomCloseIconCmp from '../../ComonComponent/Components/CustomCloseIconCmp'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAuthorisedDeptsec, getDefaultCompany, getInchHodAuthorization } from 'src/api/CommonApiCRF'
import _ from 'underscore'
import { useSelector } from 'react-redux'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import CustomInputDateCmp from '../../ComonComponent/Components/CustomInputDateCmp'
import { Paper } from '@mui/material'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import AssetUOMSelect from 'src/views/CommonSelectCode/AssetUOMSelect'
import { axioslogin } from 'src/views/Axios/Axios'
import { format } from 'date-fns'
import ClearIcon from '@mui/icons-material/Clear'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { editicon } from 'src/color/Color'
import moment from 'moment'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CrmEmergencySelect from 'src/views/CommonSelectCode/CrmEmergencySelect'
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import imageCompression from 'browser-image-compression'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import ModalButtomCmp from '../../ComonComponent/Components/ModalButtomCmp'
import CRFCategoryTypeSelect from '../Components/CRFCategoryTypeSelect'

const ReqImageDisModal = React.lazy(() => import('../../ComonComponent/ImageUploadCmp/ReqImageDisModal'))

const CrfRegistration = ({
  editRowData,
  setEditRowData,
  edit,
  setEdit,
  detailDataDis,
  setDetailDataDis,
  imagearray,
  setImageArry
}) => {

  const history = useNavigate()
  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])
  const loginId = useSelector(state => state.LoginUserData.empid, _.isEqual)
  const empdeptsec = useSelector(state => state.LoginUserData.empsecid, _.isEqual)
  const deptsecName = useSelector(state => state.LoginUserData.empdeptsec, _.isEqual)

  const [crfRegister, setCrfRegister] = useState({
    location: '',
    item_qty: 0,
    item_desc: '',
    item_brand: '',
    item_spec: '',
    unitprice: 0,
    approx_cost: 0,
    actual_require: '',
    needed: '',
    levelOne: 0,
    levelTwo: 0,
    deptType: 0,
    emergency: false,
    remarks: '',
    reqDetalSlno: 0,
    startdate: format(new Date(), 'yyyy-MM-dd'),
    reqSlno: 0,
    imageshowFlag: 0,
    imageshow: false
  })

  const {
    location,
    item_qty,
    item_desc,
    unitprice,
    approx_cost,
    actual_require,
    needed,
    levelOne,
    levelTwo,
    deptType,
    emergency,
    remarks,
    reqDetalSlno,
    startdate,
    reqSlno,
    imageshowFlag,
    imageshow,
    item_brand,
    item_spec
  } = crfRegister
  const updateOnchangeState = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setCrfRegister({ ...crfRegister, [e.target.name]: value })
    },
    [crfRegister]
  )

  const [deptSec, setDeptSec] = useState(0)
  const [uom, setUOM] = useState(0)
  const [uomName, setUomName] = useState('')
  const [previewFile, setPreviewFile] = useState({ url: '', type: '' })
  const [authorizeDeptSec, setAuthorizDeptSec] = useState([])

  const [selectFile, setSelectFile] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [emerType, setEmerType] = useState(0)
  const [category, setCategory] = useState([])
  const [catFlag, setcatFlag] = useState(0)
  const [loading, setLoading] = useState(false)
  const [count, setcount] = useState(0)

  const {
    data: authDept,
    isLoading: isAuthDeptSecLoading,
    error: authDeptSecError
  } = useQuery({
    queryKey: ['getAuthDept', loginId],
    queryFn: () => getAuthorisedDeptsec(loginId),
    enabled: loginId !== null,
    staleTime: Infinity
  })
  const authDeptSec = useMemo(() => authDept, [authDept])
  useEffect(() => {
    if (authDeptSec && authDeptSec.length > 0) {
      setAuthorizDeptSec(authDeptSec)
    } else {
      setDeptSec(empdeptsec)
    }
  }, [authDeptSec, empdeptsec])

  const {
    data: authLevel,
    // isLoading: isAuthLoading,
    error: authError
  } = useQuery({
    queryKey: ['getAuthorization', deptSec],
    queryFn: () => getInchHodAuthorization(deptSec),
    enabled: deptSec !== null,
    staleTime: Infinity
  })
  const authData = useMemo(() => authLevel, [authLevel])

  // for default company master

  const {
    data: companyData,
    isLoading: isCompLoading,
    error: compError
  } = useQuery({
    queryKey: 'getdefaultCompany',
    queryFn: () => getDefaultCompany(),
    staleTime: Infinity
  })
  const company = useMemo(() => companyData, [companyData])

  useEffect(() => {
    if (authData && authData.length > 0) {
      const { level_one, level_two, dept_type } = authData[0]
      setCrfRegister(prev => ({
        ...prev,
        levelOne: level_one,
        levelTwo: level_two,
        deptType: dept_type
      }))
      setcount(0)
    } else {
      setCrfRegister(prev => ({
        ...prev,
        levelOne: 0,
        levelTwo: 0,
        deptType: 0
      }))
    }
  }, [authData, count])

  const updateEmergency = e => {
    if (e.target.checked === true) {
      setCrfRegister(prev => ({
        ...prev,
        emergency: true
      }))
    } else {
      setCrfRegister(prev => ({
        ...prev,
        emergency: false,
        remarks: ''
      }))
      setEmerType(0)
    }
  }
  const onchangeQty = useCallback(
    e => {
      setCrfRegister(prev => ({
        ...prev,
        item_qty: e.target.value,
        approx_cost: unitprice !== '' || unitprice !== 0 ? unitprice * e.target.value : 0
      }))
    },
    [unitprice]
  )

  const updateUnitPrice = useCallback(
    e => {
      if (item_qty !== 0) {
        setCrfRegister(prev => ({
          ...prev,
          unitprice: e.target.value,
          approx_cost: item_qty !== '' ? item_qty * e.target.value : 0
        }))
      } else {
        warningNotify('Provide the quantity before specifying the unit price')
      }
    },
    [item_qty]
  )
  const clearData = useCallback(() => {
    setCrfRegister(prev => ({
      ...prev,
      item_desc: '',
      item_brand: '',
      item_spec: '',
      item_qty: 0,
      unitprice: 0,
      approx_cost: 0
    }))
    setUOM(0)
    setEditIndex(null)
  }, [])
  const AddItem = useCallback(
    e => {
      e.preventDefault()
      if (item_desc !== '' && item_qty > 0 && unitprice >= 0) {
        const newdata = {
          item_desc: item_desc,
          item_brand: item_brand,
          item_qty: parseInt(item_qty),
          item_unit: uom,
          uomName: uomName,
          item_spec: item_spec,
          item_unitprice: unitprice,
          approx_cost: parseInt(approx_cost),
          req_detl_slno: reqDetalSlno
        }
        const isDuplicate = detailDataDis?.some((val, index) => val.item_desc === item_desc && index !== editIndex)
        if (isDuplicate) {
          warningNotify('Item Details Already Exists!')
          return
        }
        if (editIndex !== null) {
          const updatedData = detailDataDis.map((val, index) => (index === editIndex ? newdata : val))
          const datas = updatedData?.map((val, index) => {
            const obj = {
              item_slno: index + 1,
              item_brand: val.item_brand,
              item_desc: val.item_desc,
              item_qty: val.item_qty,
              item_spec: val.item_spec,
              item_unit: val.item_unit,
              item_unitprice: val.item_unitprice,
              uomName: val.uomName,
              approx_cost: val.approx_cost,
              req_detl_slno: val.req_detl_slno
            }
            return obj
          })
          setDetailDataDis(datas)
          setEditIndex(null)
        } else {
          const newArray = [...detailDataDis, newdata]
          const datas = newArray?.map((val, index) => {
            const obj = {
              item_slno: index + 1,
              item_brand: val.item_brand,
              item_desc: val.item_desc,
              item_qty: val.item_qty,
              item_spec: val.item_spec,
              item_unit: val.item_unit,
              item_unitprice: val.item_unitprice,
              uomName: val.uomName,
              approx_cost: val.approx_cost,
              req_detl_slno: val.req_detl_slno
            }
            return obj
          })
          setDetailDataDis(datas)
        }
        setCrfRegister(prev => ({
          ...prev,
          item_desc: '',
          item_brand: '',
          item_spec: '',
          item_qty: 0,
          unitprice: 0,
          approx_cost: 0,
          reqDetalSlno: 0
        }))
        setUOM(0)
      } else {
        warningNotify('Item Description and Quantity are mandatory and Quantity and unit price are not negative')
      }
    },
    [
      item_desc,
      item_brand,
      item_qty,
      uom,
      uomName,
      item_spec,
      unitprice,
      approx_cost,
      editIndex,
      reqDetalSlno,
      detailDataDis,
      setDetailDataDis
    ]
  )

  const editSelect = useCallback((val, index) => {
    const { req_detl_slno, item_desc, item_brand, item_unit, item_qty, item_spec, approx_cost, item_unitprice } = val

    setCrfRegister(prev => ({
      ...prev,
      item_desc: item_desc,
      item_brand: item_brand,
      item_spec: item_spec,
      item_qty: item_qty,
      unitprice: item_unitprice,
      approx_cost: approx_cost,
      reqDetalSlno: req_detl_slno
    }))
    setUOM(item_unit)
    setEditIndex(index)
  }, [])

  const deleteSelect = useCallback(
    val => {
      if (detailDataDis.length !== 0) {
        if (edit === 1) {
          const { req_detl_slno } = val
          const deleteData = {
            // item_slno: Math.ceil(Math.random() * 1000),
            item_slno: 0,
            delete_user: loginId,
            req_slno: reqSlno,
            req_detl_slno: req_detl_slno
          }
          const deleteItemDetails = async deleteData => {
            const result = await axioslogin.patch('/newCRFRegister/deleteItemList', deleteData)
            return result.data
          }
          deleteItemDetails(deleteData).then(val => {
            const { success } = val
            if (success === 1) {
              succesNotify('Selected Item Deleted')
            }
          })
          const array = detailDataDis?.filter(value => value.item_slno !== val.item_slno)
          setDetailDataDis(array)
        } else {
          const array = detailDataDis?.filter(value => value.item_slno !== val.item_slno)
          setDetailDataDis(array)
        }
      }
    },
    [detailDataDis, edit, reqSlno, loginId, setDetailDataDis]
  )

  // const uploadFile = useCallback(async (e) => {
  //     if (e.target.files[0].type === "application/pdf" ||
  //         e.target.files[0].type === "image/png" ||
  //         e.target.files[0].type === "image/jpeg" ||
  //         e.target.files[0].type === "image/jpg"
  //     ) {
  //         if ((e.target.files[0].size) > 26214400) {
  //             warningNotify("The file size exceeds the limit")
  //         } else {
  //             const newFiles = [...selectFile]
  //             newFiles.push(e.target.files[0])
  //             setSelectFile(newFiles)
  //         }
  //     } else {
  //         warningNotify("Only .png, .jpeg, and .pdf File format allowed!")
  //     }

  // }, [selectFile, setSelectFile])

  const uploadFile = useCallback(
    e => {
      const files = Array.from(e.target.files)
      setSelectFile(prevFiles => {
        const duplicateFiles = []
        const validFiles = files?.filter(file => {
          if (
            file.type === 'application/pdf' ||
            file.type === 'image/png' ||
            file.type === 'image/jpeg' ||
            file.type === 'image/jpg'
          ) {
            if (file.size > 26214400) {
              warningNotify(`The file "${file.name}" exceeds the 25MB size limit`)
              return false
            }
            const isDuplicate = prevFiles.some(prevFile => prevFile.name === file.name && prevFile.size === file.size)
            // const duplicates = prevFiles?.filter(
            //     (prevFile) => prevFile.name === file.name && prevFile.size === file.size
            // );
            // if (duplicates.length > 0) {
            //     duplicateFiles.push(file.name);
            //     return false;
            // }

            if (isDuplicate) {
              duplicateFiles.push(file.name)
              return false
            }
            return true
          } else {
            warningNotify(`The file "${file.name}" is not a supported format! Only .png, .jpeg, and .pdf are allowed.`)
            return false
          }
        })
        if (duplicateFiles.length > 0) {
          warningNotify(`The following files are duplicates and were not added: ${duplicateFiles.join(', ')}`)
        }
        return [...prevFiles, ...validFiles]
      })
    },
    [setSelectFile]
  )

  const handleRemoveFile = index => {
    setSelectFile(prevFiles => {
      const updatedFiles = [...prevFiles]
      updatedFiles.splice(index, 1)
      return updatedFiles
    })
  }

  const reset = useCallback(() => {
    const formData = {
      location: '',
      item_qty: 0,
      item_desc: '',
      item_brand: '',
      item_spec: '',
      unitprice: 0,
      approx_cost: 0,
      actual_require: '',
      needed: '',
      emergency: false,
      remarks: '',
      startdate: format(new Date(), 'yyyy-MM-dd'),
      reqSlno: 0,
      imageshowFlag: 0,
      imageshow: false
    }
    setCrfRegister(formData)
    setCategory([])
    setEdit(0)
    setSelectFile([])
    setImageArry([])
    setDetailDataDis([])
    setEmerType(0)
    setcatFlag(1)
    setEditRowData({})
  }, [setEdit, setImageArry, setDetailDataDis, setEditRowData])
  const refreshWindow = useCallback(() => {
    setCategory([])
    reset()
  }, [reset])
  const handleImageUpload = useCallback(async imageFile => {
    const options = {
      maxSizeMB: 25,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  }, [])
  const submitRequest = useCallback(
    async e => {
      const saveData = async () => {
        if (deptSec === null || deptSec === 0 || deptSec === undefined) {
          infoNotify('Select Department Section')
          setDeptSec(0)
          return
        }
        e.preventDefault()
        setLoading(true)
        if (item_desc !== '' && item_qty !== 0 && item_qty !== '') {
          infoNotify(
            <>
              Click on &apos;
              <AddCircleSharpIcon sx={{ color: '#0074B7', height: 28, width: 28, cursor: 'pointer' }} />
              &apos; Button to Add Item Details
            </>
          )
          setLoading(false)
        } else if (detailDataDis.length === 0) {
          infoNotify('Add Any Item Description Details')
          setLoading(false)
          return
        } else if (category.length === 0) {
          infoNotify('Select Any Category')
          setLoading(false)
          return
        } else if (emergency && emerType === 0 && remarks === '') {
          infoNotify("If it's an emergency, specify the type and provide remarks")
          return
        } else {
          const items = detailDataDis.map(val => ({
            item_slno: val.item_slno,
            item_desc: val.item_desc,
            approve_item_desc: val.item_desc,
            item_brand: val.item_brand,
            approve_item_brand: val.item_brand,
            item_unit: val.item_unit === 0 ? 9 : val.item_unit,
            approve_item_unit: val.item_unit === 0 ? 9 : val.item_unit,
            item_qnty: val.item_qty,
            item_qnty_approved: val.item_qty,
            item_specification: val.item_spec,
            approve_item_specification: val.item_spec,
            item_unit_price: val.item_unitprice,
            approve_item_unit_price: val.item_unitprice,
            aprox_cost: val.approx_cost,
            approve_aprox_cost: val.approx_cost,
            item_status: 1,
            item_status_approved: 1,
            approve_item_status: 1,
            create_user: loginId,
            edit_user: loginId,
            req_detl_slno: val.req_detl_slno
          }))

          const postData = {
            request_deptsec_slno: deptSec,
            actual_requirement: actual_require || null,
            needed: needed || null,
            category: category || null,
            location: location || null,
            expected_date: format(new Date(startdate), 'yyyy-MM-dd 23:59:59'),
            emergency_flag: emergency ? 1 : 0,
            emer_slno: emerType || null,
            emergeny_remarks: remarks || null,
            user_deptsec: empdeptsec,
            create_user: loginId,
            incharge_req: levelOne === 1 ? 1 : 0,
            hod_req: levelTwo === 1 ? 1 : 0,
            dms_req: deptType === 1 ? 1 : 0,
            ms_approve_req: deptType === 1 ? 1 : 0,
            manag_operation_req: 1,
            senior_manage_req: 1,
            gm_approve_req: 1,
            ed_approve_req: 1,
            md_approve_req: 1,
            managing_director_req: 1,
            items,
            company_slno: company?.company_slno
          }
          const patchData = {
            ...postData,
            edit_user: loginId,
            req_slno: reqSlno
          }
          const ReqMasterInsert = async postData => {
            const result = await axioslogin.post('/newCRFRegister/InsertRegMast', postData)
            return result.data
          }
          const ReqMasterUpdate = async patchData => {
            const result = await axioslogin.patch('/newCRFRegister/UpdateReqMaster', patchData)
            return result.data
          }
          const FileInsert = async (selectFile, insertid) => {
            try {
              const formData = new FormData()
              formData.append('id', insertid)
              for (const file of selectFile) {
                if (file.type.startsWith('image')) {
                  const compressedFile = await handleImageUpload(file)
                  formData.append('files', compressedFile, compressedFile.name)
                } else {
                  formData.append('files', file, file.name)
                }
              }
              const result = await axioslogin.post('/newCRFRegisterImages/InsertRegisterImage', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              return result.data
            } catch (error) {
              // console.log(error, "while file uploading");
              setLoading(false)
              warningNotify('An error occurred during file upload.', error)
            }
          }
          const handleRequest = async () => {
            try {
              const action = edit === 0 ? ReqMasterInsert : ReqMasterUpdate
              const requestData = edit === 0 ? postData : patchData
              const { success, message, insertid } = await action(requestData)

              if (success === 1) {
                if (selectFile.length > 0) {
                  const fileInsertResponse = await FileInsert(selectFile, edit === 0 ? insertid : reqSlno)
                  if (fileInsertResponse.success !== 1) {
                    warningNotify('Error occurred while uploading files.')
                  }
                }
                succesNotify(message)
                setcount(1)
                reset()
              } else {
                warningNotify(message)
              }
            } catch (error) {
              warningNotify('An unexpected error occurred.', error)
            } finally {
              setLoading(false)
            }
          }
          handleRequest()
        }
      }
      const getAckPending = async empdeptsec => {
        try {
          const result = await axioslogin.get(`/newCRFRegister/ackPending/${empdeptsec}`)
          const { success, data } = result.data
          if (success === 1) {
            const uniqueReqSlno = [...new Set(data?.map(item => item.req_slno))]

            const filteredData = uniqueReqSlno
              .map(reqSlno => {
                const items = data.filter(item => item.req_slno === reqSlno)
                return items.every(item => item.store_receive === 1) ? items : null
              })
              .filter(group => group !== null)
              .flat()

            const reqSlno = filteredData?.map(val => val.req_slno).filter(Boolean)
            if (reqSlno && reqSlno.length > 1) {
              const newReqSlno = reqSlno.join(', ')
              infoNotify(
                `Before registering a new request, you must complete the user acknowledgment for the following CRFs: ${newReqSlno}`
              )
            } else if (reqSlno && reqSlno.length === 1) {
              infoNotify(
                `Before registering a new request, you must complete the user acknowledgment for the following CRF: ${reqSlno[0]}`
              )
            }
            if (filteredData.length === 0) {
              await saveData()
            }
          } else if (success === 2) {
            await saveData()
          }
        } catch (error) {
          warningNotify('Failed to fetch receive status', error)
        }
      }
      getAckPending(empdeptsec)
    },
    [
      detailDataDis,
      deptSec,
      actual_require,
      needed,
      category,
      location,
      startdate,
      emergency,
      remarks,
      empdeptsec,
      loginId,
      emerType,
      levelOne,
      levelTwo,
      deptType,
      selectFile,
      edit,
      reqSlno,
      company,
      handleImageUpload,
      reset,
      item_desc,
      item_qty
    ]
  )

  useEffect(() => {
    if (editRowData && Object.keys(editRowData).length !== 0) {
      setEdit(1)
      const {
        req_slno,
        actual_requirement,
        location,
        needed,
        request_deptsec_slno,
        expected_date,
        emergency_flag,
        emer_slno,
        emergeny_remarks
      } = editRowData
      setCrfRegister(prev => ({
        ...prev,
        location: location,
        actual_require: actual_requirement === null ? '' : actual_requirement,
        needed: needed === null ? '' : needed,
        emergency: emergency_flag === 1 ? true : false,
        remarks: emergeny_remarks,
        reqDetalSlno: 0,
        startdate: format(new Date(expected_date), 'yyyy-MM-dd'),
        reqSlno: req_slno,
        imageshowFlag: 0,
        imageshow: false,
        item_qty: 0,
        item_desc: '',
        item_brand: '',
        item_spec: '',
        unitprice: 0,
        approx_cost: 0
      }))
      setDeptSec(request_deptsec_slno)
      setEmerType(emer_slno)
      setUOM(0)
      setUomName('')
    }
  }, [editRowData, setEdit])
  const ViewImage = useCallback(file => {
    const fileType = file.imageName
      ? file.imageName.endsWith('.pdf')
        ? 'pdf'
        : 'image'
      : file.type.includes('application/pdf')
        ? 'pdf'
        : 'image'

    const fileUrl = file.url || URL.createObjectURL(file)
    setPreviewFile({ url: fileUrl, type: fileType, blobfile: file?.blob })
    setCrfRegister(prev => ({
      ...prev,
      imageshow: true,
      imageshowFlag: 1
    }))
  }, [])

  const handleClose = useCallback(() => {
    setCrfRegister(prev => ({
      ...prev,
      imageshow: false,
      imageshowFlag: 0
    }))
  }, [])

  if (isAuthDeptSecLoading || isCompLoading) return <p>Loading...</p>
  if (authError || authDeptSecError || compError) return <p>Error occurred.</p>

  return (
    <Fragment>
      {imageshowFlag === 1 ? (
        <ReqImageDisModal open={imageshow} handleClose={handleClose} previewFile={previewFile} />
      ) : null}
      <Paper variant="outlined" square sx={{ height: window.innerHeight - 140, bgcolor: 'white' }}>
        <Box sx={{ display: 'flex', m: 0.5 }}>
          {edit === 1 ? (
            <Typography sx={{ fontWeight: 'bold', color: '#145DA0', fontSize: 14, flex: 1, pl: 1 }}>
              CRF/TMC/{reqSlno}
            </Typography>
          ) : null}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, mx: 0.5, flex: 1 }}>
            <CssVarsProvider>
              <CustomCloseIconCmp handleChange={backtoSetting} />
            </CssVarsProvider>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, pl: 0.5 }}>
            <CustomPaperTitle heading="Department Section" />
            {authorizeDeptSec && authorizeDeptSec.length !== 0 ? (
              <Box sx={{ pt: 0.2, pl: 0.5 }}>
                <CssVarsProvider>
                  <Select
                    defaultValue="0"
                    sx={{ fontSize: 13, width: '100%', height: 38, bgcolor: 'white' }}
                    slotProps={{
                      listbox: { placement: 'bottom-start' }
                    }}
                    placeholder="Select Department Section"
                    value={deptSec}
                    onChange={(e, newValue) => setDeptSec(newValue)}
                  >
                    {authorizeDeptSec?.map(val => (
                      <Option key={val.dept_section} value={val.dept_section} label={val.auth_deptsec}>
                        {val.auth_deptsec}
                      </Option>
                    ))}
                  </Select>
                </CssVarsProvider>
              </Box>
            ) : (
              <Box sx={{ pl: 0.5, pt: 0.2 }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 38,
                    border: '1px solid lightgrey',
                    borderRadius: 7,
                    p: 0.9,
                    textAlign: 'left',
                    fontSize: 13
                    // bgcolor: '#FBFCFE'
                  }}
                >
                  {deptsecName}
                </Box>
              </Box>
            )}
          </Box>
          <Box sx={{ flex: 2, pl: 0.3 }}>
            <CustomPaperTitle heading="Category" />
            <Box
              sx={{
                mt: 0.2,
                height: 38,
                overflow: 'auto',
                border: '1px solid lightgrey',
                borderRadius: 7
              }}
            >
              <CRFCategoryTypeSelect
                category={category}
                setCategory={setCategory}
                editRowData={editRowData}
                catFlag={catFlag}
              />
            </Box>
          </Box>
          <Box sx={{ flex: 1, pl: 0.3, pr: 1 }}>
            <CustomPaperTitle heading="Location" />
            <Box sx={{ pt: 0.1 }}>
              <CustomInputDateCmp
                className={{ width: '100%', height: 38, bgcolor: 'white' }}
                size={'sm'}
                autoComplete={'off'}
                type="text"
                name={'location'}
                value={location}
                handleChange={updateOnchangeState}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ bgcolor: 'white' }}>
          <Typography sx={{ p: 1, color: 'grey', pl: 1.5, fontSize: 15 }}>
            Estimate/Approximate/Requirement Details
          </Typography>
          <Paper variant="outlined" square sx={{ mx: 0.5, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', pt: 0.3 }}>
              <Box sx={{ flex: 2, pl: 0.5 }}>
                <Box sx={{}}>
                  <CustomPaperTitle heading="Item Description" mandtry={1} />
                </Box>
                <Box sx={{}}>
                  <CustomInputDateCmp
                    className={{ width: '100%', height: 35, bgcolor: 'white' }}
                    size={'sm'}
                    type="text"
                    autoComplete={'off'}
                    name={'item_desc'}
                    value={item_desc}
                    handleChange={updateOnchangeState}
                  />
                </Box>
              </Box>
              <Box sx={{ flex: 1.5, pl: 0.3 }}>
                <Box sx={{}}>
                  <CustomPaperTitle heading="Item Brand" />
                </Box>
                <Box sx={{ pt: 0.3 }}>
                  <CustomInputDateCmp
                    className={{ width: '100%', height: 35, bgcolor: 'white' }}
                    size={'sm'}
                    autoComplete={'off'}
                    type="text"
                    name={'item_brand'}
                    value={item_brand}
                    handleChange={updateOnchangeState}
                  />
                </Box>
              </Box>
              <Box sx={{ flex: 0.5, pl: 0.3 }}>
                <Box sx={{}}>
                  <CustomPaperTitle heading="Quantity" mandtry={1} />
                </Box>
                <Box sx={{}}>
                  <CustomInputDateCmp
                    className={{ width: '100%', height: 35, bgcolor: 'white' }}
                    size={'sm'}
                    type="number"
                    autoComplete={'off'}
                    name={'item_qty'}
                    value={item_qty}
                    handleChange={onchangeQty}
                  />
                </Box>
              </Box>
              <Box sx={{ flex: 0.5, pr: 0.5, pl: 0.3 }}>
                <Box sx={{}}>
                  <CustomPaperTitle heading="Unit" />
                </Box>
                <Box sx={{ pt: 0.2 }}>
                  <AssetUOMSelect uom={uom} setUOM={setUOM} setName={setUomName} uomName={uomName} />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', pt: 0.3, pb: 0.5 }}>
              <Box sx={{ flex: 2, pl: 0.5 }}>
                <Box sx={{}}>
                  <CustomPaperTitle heading="Specification" />
                </Box>
                <Box sx={{ pt: 0.3 }}>
                  <CustomInputDateCmp
                    className={{ width: '100%', height: 35, bgcolor: 'white' }}
                    size={'sm'}
                    type="text"
                    autoComplete={'off'}
                    name={'item_spec'}
                    value={item_spec}
                    handleChange={updateOnchangeState}
                  />
                </Box>
              </Box>
              <Box sx={{ flex: 0.7, pl: 0.3 }}>
                <Box sx={{}}>
                  <CustomPaperTitle heading="Unit Price" />
                </Box>
                <Box sx={{ pt: 0.3 }}>
                  <CustomInputDateCmp
                    className={{ width: '100%', height: 35, bgcolor: 'white' }}
                    size={'sm'}
                    type="number"
                    autoComplete={'off'}
                    name={'unitprice'}
                    value={unitprice}
                    handleChange={updateUnitPrice}
                  />
                </Box>
              </Box>
              <Box sx={{ flex: 0.5, pl: 0.3 }}>
                <Box sx={{}}>
                  <CustomPaperTitle heading="Approx.Cost" />
                </Box>
                <Box sx={{ pt: 0.3 }}>
                  <CustomInputDateCmp
                    className={{ width: '100%', height: 35, bgcolor: 'white' }}
                    size={'sm'}
                    type="number"
                    name={'approx_cost'}
                    value={approx_cost}
                    disabled={true}
                  />
                </Box>
              </Box>
              <Box sx={{ flex: 0.2, display: 'flex' }}>
                <Box sx={{ pt: 3.3, pl: 1, bgcolor: 'white' }}>
                  <Tooltip title="Add Item" placement="bottom" sx={{ color: '#0074B7', bgcolor: '#e3f2fd' }}>
                    <AddCircleSharpIcon
                      sx={{ color: '#0074B7', height: 28, width: 28, cursor: 'pointer' }}
                      onClick={AddItem}
                    />
                  </Tooltip>
                </Box>
                <Box sx={{ pt: 3.3, pl: 0.5 }}>
                  <Tooltip title="Clear All" placement="bottom" sx={{ bgcolor: '#ffebee', color: '#d50000' }}>
                    <ClearIcon
                      sx={{
                        height: 25,
                        width: 25,
                        color: '#ef9a9a',
                        cursor: 'pointer',
                        ':hover': {
                          color: '#e57373'
                        }
                      }}
                      onClick={clearData}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Paper>
          {detailDataDis.length !== 0 ? (
            <Box
              variant="outlined"
              sx={{
                maxHeight: '50vh',
                overflow: 'auto',
                '&::-webkit-scrollbar': { height: 8 },
                px: 0.5,
                pt: 0.3
              }}
            >
              <CssVarsProvider>
                <Table aria-label="table with sticky header" borderAxis="both" padding={'none'} stickyHeader size="sm">
                  <thead style={{ alignItems: 'center' }}>
                    <tr style={{ height: 0.5 }}>
                      <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center' }}>
                        &nbsp; Sl.No
                      </th>
                      <th size="sm" style={{ width: 150, fontSize: 14 }}>
                        &nbsp;Description
                      </th>
                      <th size="sm" style={{ width: 100, fontSize: 14 }}>
                        &nbsp;Brand
                      </th>
                      <th size="sm" style={{ width: 80, fontSize: 14, textAlign: 'center' }}>
                        &nbsp;Quantity
                      </th>
                      <th size="sm" style={{ width: 80, fontSize: 14, textAlign: 'center' }}>
                        &nbsp;Unit{' '}
                      </th>
                      <th size="sm" style={{ width: 220, fontSize: 14 }}>
                        &nbsp;Specification
                      </th>
                      <th size="sm" style={{ width: 85, fontSize: 14, textAlign: 'center' }}>
                        &nbsp;Unit Price
                      </th>
                      <th size="sm" style={{ width: 95, fontSize: 14, textAlign: 'center' }}>
                        &nbsp;Approx.Cost
                      </th>
                      <th size="sm" style={{ width: 30 }}></th>
                      <th size="sm" style={{ width: 30 }}></th>
                    </tr>
                  </thead>
                  <tbody size="small">
                    {detailDataDis?.map((val, index) => (
                      <tr key={index} size="small" style={{ maxHeight: 2, cursor: 'pointer' }}>
                        <td size="sm" style={{ fontSize: 12, textAlign: 'center' }}>
                          {index + 1}
                        </td>
                        <td size="sm" style={{ fontSize: 13 }}>
                          &nbsp;{val.item_desc}
                        </td>
                        <td size="sm" style={{ fontSize: 13 }}>
                          &nbsp;{val.item_brand}
                        </td>
                        <td size="sm" style={{ fontSize: 12, textAlign: 'center' }}>
                          &nbsp;{val.item_qty}
                        </td>
                        <td size="sm" style={{ fontSize: 12, textAlign: 'center' }}>
                          &nbsp;{val.uomName}
                        </td>
                        <td size="sm" style={{ fontSize: 13, overflow: "auto" }}>
                          &nbsp;{val.item_spec}
                        </td>
                        <td size="sm" style={{ fontSize: 12, textAlign: 'center' }}>
                          &nbsp;{val.item_unitprice}
                        </td>
                        <td size="sm" style={{ fontSize: 12, textAlign: 'center' }}>
                          &nbsp;{val.approx_cost}
                        </td>
                        <td size="sm" style={{ fontSize: 12 }}>
                          <EditIcon
                            sx={{
                              color: editicon,
                              ':hover': {
                                color: '#1565c0'
                              }
                            }}
                            onClick={() => editSelect(val, index)}
                          />
                        </td>
                        <td size="sm" style={{ textAlign: 'center', height: 5 }}>
                          <DeleteIcon
                            sx={{
                              color: '#DC4731',
                              ':hover': {
                                color: '#B95C50'
                              }
                            }}
                            onClick={() => deleteSelect(val, index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CssVarsProvider>
            </Box>
          ) : null}
          <Paper variant="outlined" square sx={{ p: 0.5, m: 0.5, display: 'flex', flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, pr: 0.5 }}>
              <Box sx={{ pt: 0.6 }}>
                <CustomPaperTitle heading="Purpose" />
              </Box>
              <Box sx={{ pt: 0.5 }}>
                <Textarea
                  required
                  type="text"
                  size="sm"
                  sx={{ bgcolor: 'white' }}
                  minRows={3}
                  maxRows={3}
                  style={{ width: '100%' }}
                  placeholder="type here ..."
                  name="actual_require"
                  value={actual_require}
                  onChange={updateOnchangeState}
                />
              </Box>
            </Box>
            <Box sx={{ flex: 1, pr: 0.5 }}>
              <Box sx={{ pt: 0.6 }}>
                <CustomPaperTitle heading="Justification for the need" />
              </Box>
              <Box sx={{ pt: 0.5 }}>
                <Textarea
                  required
                  type="text"
                  size="sm"
                  sx={{ bgcolor: 'white' }}
                  minRows={3}
                  maxRows={3}
                  style={{ width: '100%' }}
                  placeholder="type here ..."
                  name="needed"
                  value={needed}
                  onChange={updateOnchangeState}
                />
              </Box>
            </Box>
          </Paper>
          <Paper variant="outlined" square sx={{ p: 0.5, m: 0.5, display: 'flex', flexWrap: 'wrap' }}>
            <Box sx={{ flex: 0.5 }}>
              <Box sx={{}}>
                <CustomPaperTitle heading="Expected Date" />
              </Box>
              <Box sx={{ p: 0.5 }}>
                <CustomInputDateCmp
                  className={{ width: '100%', height: 35, bgcolor: 'white' }}
                  size={'sm'}
                  type="date"
                  name={'startdate'}
                  value={startdate}
                  slotProps={{
                    input: { min: moment(new Date()).format('YYYY-MM-DD') }
                  }}
                  handleChange={updateOnchangeState}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flex: 2, flexWrap: 'wrap' }}>
              <Box sx={{ p: 0.5, pt: 4 }}>
                <CusCheckBox
                  variant="outlined"
                  color="danger"
                  size="md"
                  name="emergency"
                  label="Emergency"
                  value={emergency}
                  onCheked={updateEmergency}
                  checked={emergency}
                />
              </Box>
              {emergency === true ? (
                <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap' }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{}}>
                      <CustomPaperTitle heading="Emergency Type" />
                    </Box>
                    <Box sx={{ p: 0.4 }}>
                      <CrmEmergencySelect value={emerType} setValue={setEmerType} />
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1.5 }}>
                    <Box sx={{}}>
                      <CustomPaperTitle heading="Remarks" />
                    </Box>
                    <Box sx={{ pt: 0.5 }}>
                      <Textarea
                        type="text"
                        size="sm"
                        sx={{ bgcolor: 'white', height: 36 }}
                        minRows={1}
                        maxRows={1}
                        style={{ width: '100%' }}
                        placeholder="type here ..."
                        name="remarks"
                        value={remarks || ''}
                        onChange={updateOnchangeState}
                      />
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Paper>
          <Paper variant="outlined" square sx={{ p: 0.5, m: 0.5, display: 'flex', flexWrap: 'wrap' }}>
            <Box sx={{ p: 0.5 }}>
              <label htmlFor="file-input">
                <Tooltip title="Upload File" placement="bottom" sx={{ bgcolor: '#e8eaf6', color: '#283593' }}>
                  <IconButton
                    aria-label="upload file"
                    variant="soft"
                    component="span"
                    sx={{
                      bgcolor: 'white',
                      '&:hover': {
                        bgcolor: 'white'
                      }
                    }}
                  >
                    <CloudUploadTwoToneIcon
                      fontSize="small"
                      sx={{
                        width: 35,
                        height: 25,
                        color: '#3949ab',
                        '&:hover': {
                          color: '#5c6bc0'
                        }
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: '#3949ab',
                        '&:hover': {
                          color: '#5c6bc0'
                        }
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
                style={{ display: 'none' }}
                onChange={uploadFile}
              />
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.2, width: '100%' }}>
              {imagearray.length > 0 &&
                imagearray?.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      m: 0.3,
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      p: 0.5
                    }}
                  >
                    {file.imageName.endsWith('.png') ||
                      file.imageName.endsWith('.jpg') ||
                      file.imageName.endsWith('.jpeg') ? (
                      <img
                        src={file.url}
                        alt={file.imageName}
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          marginRight: '8px',
                          cursor: 'pointer'
                        }}
                        onClick={() => ViewImage(file)}
                      />
                    ) : file.imageName.endsWith('.pdf') ? (
                      <PictureAsPdfIcon
                        sx={{
                          width: '40px',
                          height: '40px',
                          color: '#e53935',
                          marginRight: '8px',
                          cursor: 'pointer'
                        }}
                        onClick={() => ViewImage(file)}
                      />
                    ) : (
                      <InsertDriveFileIcon
                        sx={{
                          width: '40px',
                          height: '40px',
                          color: '#9e9e9e',
                          marginRight: '8px',
                          cursor: 'pointer'
                        }}
                        onClick={() => ViewImage(file)}
                      />
                    )}
                    <Box sx={{ fontSize: 14, cursor: 'pointer', flexGrow: 1 }}>{file.imageName}</Box>
                    {/* <ClearIcon
                                            sx={{
                                                height: "16px",
                                                width: "16px",
                                                cursor: "pointer",
                                                color: "red",
                                                marginLeft: "8px",
                                            }}
                                            onClick={() => handleRemoveSavedFile(index)}
                                        /> */}
                  </Box>
                ))}
              {selectFile.length !== 0 &&
                selectFile.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      m: 0.3,
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      p: 0.5
                    }}
                  >
                    {file.type.includes('image') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          marginRight: '8px',
                          cursor: 'pointer'
                        }}
                        // onClick={() => ViewImage(URL.createObjectURL(file))}
                        onClick={() => ViewImage(file)}
                      />
                    ) : file.type === 'application/pdf' ? (
                      <PictureAsPdfIcon
                        sx={{
                          width: '40px',
                          height: '40px',
                          color: '#e53935',
                          marginRight: '8px',
                          cursor: 'pointer'
                        }}
                        onClick={() => ViewImage(file)}
                      />
                    ) : (
                      <InsertDriveFileIcon
                        sx={{
                          width: '40px',
                          height: '40px',
                          color: '#9e9e9e',
                          marginRight: '8px',
                          cursor: 'pointer'
                        }}
                        onClick={() => ViewImage(file)}
                      />
                    )}
                    <Box sx={{ fontSize: 14, cursor: 'pointer', flexGrow: 1 }}>{file.name}</Box>
                    <ClearIcon
                      sx={{
                        height: '16px',
                        width: '16px',
                        cursor: 'pointer',
                        color: 'red',
                        marginLeft: '8px'
                      }}
                      onClick={() => handleRemoveFile(index)}
                    />
                  </Box>
                ))}
            </Box>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ py: 0.5, pr: 0.5 }}>
              <ModalButtomCmp loading={loading} handleChange={submitRequest}>
                {' '}
                {loading ? 'Processing' : 'Save'}
              </ModalButtomCmp>
            </Box>
            <Box sx={{ py: 0.5, pr: 2 }}>
              <ModalButtomCmp handleChange={refreshWindow}> Clear</ModalButtomCmp>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  )
}

export default memo(CrfRegistration)
