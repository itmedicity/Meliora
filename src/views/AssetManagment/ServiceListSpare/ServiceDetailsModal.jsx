import { Box, Button, Checkbox, Chip, CssVarsProvider, Grid, Input, Modal, Table, Textarea, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import { axioslogin } from 'src/views/Axios/Axios'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'
import SupplierDetailsAutoComplte from '../ItemDetailEnter/SupplierDetailsAutoComplte'
import PhoneIcon from '@mui/icons-material/Phone'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import { errorNotify, infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined'
import ComFileView from 'src/views/ComManagement/CmFileView/ComFileView'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import EmployeeSelectJoyAutoComp from 'src/views/CommonSelectCode/EmployeeSelectJoyAutoComp'
import imageCompression from 'browser-image-compression'
import ServiceFileAttach from './ServiceFileAttach'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { format } from 'date-fns'
import AmServiceStatus from 'src/views/CommonSelectCode/AmServiceStatus'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import TextComponent from 'src/views/Components/TextComponent'
import ServiceTicketTab from './ServiceTicketTab'
import ServiceAssetUpgrade from './ServiceAssetUpgrade'
import ServicePmTab from './ServicePmTab'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ClearSharpIcon from '@mui/icons-material/ClearSharp'
import FileViewSingle from 'src/views/Components/FileViewSingle'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import moment from 'moment'
import BreakDownDetails from './BreakDownDetails'
import DocumentsList from './DocumentsList'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useQuery } from '@tanstack/react-query'
import EmailIcon from '@mui/icons-material/Email'

const ServiceDetailsModal = ({ open, setOpen, setFlag, serviceDetails, count, setCount }) => {
  const dispatch = useDispatch()
  const [complDetails, setcomplDetails] = useState([])
  const [SupplierDetails, setSupplierDetails] = useState([])
  const [spareDetails, setSpareDetails] = useState([])
  const [fileDetails, setfileDetails] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [alldetailsService, setAlldetailsService] = useState([])
  const [sparez, setSparez] = useState(0)
  const [spareName, setSpareName] = useState('')
  const [spareData, setSpareData] = useState([])
  const [currentDateAndTime, setCurrentDateAndTime] = useState('')
  const [UploadedFiles, setUploadedFiles] = useState([])
  const [supplierSelect, setsupplierSelect] = useState(0)
  const [supplContctEmp, setsupplContctEmp] = useState(0)
  const [servicedSuppl, setServicedSuppl] = useState(0)
  const [editSupp, setEditSupp] = useState(0)

  const [flags, setFlags] = useState({
    addToStockFlag: 0,
    editFlag: 0,
    cmc_status: 0,
    amc_status: 0,
    serviceStatus: 0,
    transfrToCondmflag: 0,
    notserviceCheck: 0,
    serviceCheck: 0,
    image: 0,
    imageServiceFlag: 0,
    openDocuments: 0
  })

  const [viewStates, setViewStates] = useState({
    imageViewOpen: false,
    documetOpenCheck: false,
    serviceimageViewOpen: false
  })

  const [selectFile, setSelectFile] = useState([])
  const [imageServiceUrls, setImageServiceUrls] = useState([])
  const [servicefileDetails, setServicefileDetails] = useState([])
  const [deptServiceSlno, setDeptServiceSlno] = useState([])
  const [deptServDetailsData, setDeptServDetailsData] = useState([])
  const [deptServiceempList, setdeptServiceempList] = useState({})
  const [spareCheckEmp, setspareCheckEmp] = useState(0)

  const {
    item_name,
    category_name,
    spare_asset_no,
    spare_asset_no_only,
    item_asset_no,
    item_asset_no_only,
    asset_spare_slno,
    am_custodian_dept_slno,
    am_custodian_deptsec_slno,
    item_custodian_dept_sec,
    am_item_map_slno,
    am_spare_item_map_slno,
    item_custodian_dept,
    am_category_pm_days
  } = serviceDetails

  const formattedItemNo =
    spare_asset_no_only !== undefined ? spare_asset_no_only : item_asset_no_only !== undefined ? item_asset_no_only : 0
  const ItemPrefix = spare_asset_no !== undefined ? spare_asset_no : item_asset_no !== undefined ? item_asset_no : 0
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const [servicee, SetService] = useState({
    am_service_details_slno: '',
    dept_service_date: '',
    service_on_hold_reason: '',
    service_done_status: '',
    condm_transfr_status: '',
    condm_transfr_emp: '',
    condm_transf_remarks: '',
    add_to_store_date: '',
    add_to_store_user: '',
    service_close_status: '',
    suppl_serviced_date: '',
    suppl_serviced_remarks: '',
    create_user: '',
    edit_user: ''
  })
  const {
    am_service_details_slno,
    dept_service_date,
    service_on_hold_reason,
    condm_transf_remarks,
    suppl_serviced_date,
    suppl_serviced_remarks
  } = servicee

  useEffect(() => {
    if (!am_service_details_slno) return
    const fetchComplaintFiles = async () => {
      try {
        const result = await axioslogin.get(
          `/AmServiceFileUpload/uploadFile/getAssetServiceFile/${am_service_details_slno}`
        )
        const { success } = result.data
        if (success === 1) {
          const fileNames = result.data.data
          const fileUrls = fileNames.map(
            fileName => `${PUBLIC_NAS_FOLDER}/AssetService/${am_service_details_slno}/${fileName}`
          )
          if (fileUrls.length > 0) {
            setUploadedFiles(fileUrls)
          } else {
            setUploadedFiles([])
          }
        } else {
          setUploadedFiles([])
        }
      } catch (error) {
        warningNotify('Error in fetching files:', error)
      }
    }

    fetchComplaintFiles()
  }, [am_service_details_slno])

  const [insertId, setinsertId] = useState(am_service_details_slno)
  const [deptServiceDetails, setdeptServiceDetails] = useState({
    serviced_emp_detail_slno: '',
    serviced_emp: '',
    serviced_date: '',
    service_issues_identified: '',
    serviced_issue_remarks: '',
    serviced_create_user: '',
    serviced_edit_user: ''
  })
  const { serviced_emp_detail_slno, serviced_date, service_issues_identified, serviced_issue_remarks } =
    deptServiceDetails

  const Reset = useCallback(() => {
    const frmdata = {
      serviced_emp_detail_slno: '',
      service_issues_identified: '',
      serviced_date: '',
      serviced_issue_remarks: ''
    }
    setdeptServiceDetails(frmdata)
    setspareCheckEmp(0)
  }, [])

  const UpdateServiceDeptDetails = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setdeptServiceDetails({ ...deptServiceDetails, [e.target.name]: value })
    },
    [deptServiceDetails]
  )

  const Close = useCallback(() => {
    setOpen(false)
    setFlag(0)

    const frmdata = {
      am_service_details_slno: '',
      dept_service_date: '',
      service_on_hold_reason: '',
      service_done_status: '',
      condm_transfr_status: '',
      condm_transfr_emp: '',
      condm_transf_remarks: '',
      add_to_store_user: '',
      add_to_store_date: '',
      service_close_status: '',
      suppl_serviced_date: '',
      suppl_serviced_remarks: '',
      create_user: '',
      edit_user: ''
    }
    SetService(frmdata)
    setcomplDetails([])
    setsupplierSelect(0)
    setSupplierDetails([])
    setSpareDetails([])
    setFlags(prevFlags => ({
      ...prevFlags,
      addToStockFlag: 0,
      transfrToCondmflag: 0,
      image: 0
    }))
    setViewStates(prev => ({
      ...prev,
      imageViewOpen: false
    }))
    setfileDetails([])
    setImageUrls([])
    setSelectedImages([])
    setAlldetailsService([])
  }, [setFlag, setOpen, setFlags, setViewStates])

  const UpdateServicedtl = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      SetService({ ...servicee, [e.target.name]: value })
    },
    [servicee]
  )

  const empsecid = useSelector(state => {
    return state.LoginUserData.empsecid
  })

  useEffect(() => {
    dispatch(getDepartSecemployee(empsecid))
  }, [dispatch, empsecid])

  const SpareData = useMemo(() => {
    return {
      am_spare_item_map_slno: am_spare_item_map_slno
    }
  }, [am_spare_item_map_slno])

  const AssetData = useMemo(() => {
    return {
      item_asset_no: item_asset_no,
      item_asset_no_only: item_asset_no_only
    }
  }, [item_asset_no, item_asset_no_only])

  useEffect(() => {
    if (supplierSelect !== 0) {
      const getSelectedSupplierDetails = async () => {
        const result = await axioslogin.get(`ItBillType/getSupplierData/${supplierSelect}`)
        const { success, data } = result.data
        if (success === 1) {
          setSupplierDetails(data)
        } else {
          setSupplierDetails([])
        }
      }
      getSelectedSupplierDetails()
    } else {
      setSupplierDetails([])
    }
  }, [supplierSelect])

  useEffect(() => {
    if (am_item_map_slno !== undefined) {
      const getAllSpare = async am_item_map_slno => {
        const result = await axioslogin.get(`/complaintreg/SpareDetailsUndercomplaint/${am_item_map_slno}`)
        const { success, data } = result.data
        if (success === 1) {
          setSpareDetails(data)
        } else {
          setSpareDetails([])
        }
      }
      getAllSpare(am_item_map_slno)
    } else {
      setSpareDetails([])
    }
  }, [am_item_map_slno, count])

  useEffect(() => {
    const getcomplaintDetails = async () => {
      try {
        const result = await axioslogin.post('/assetSpareDetails/getcomplaintDetails', SpareData)
        const { success, data } = result.data
        if (success === 2 && data.length > 0) {
          setcomplDetails(data)
        } else {
          setcomplDetails([])
        }
      } catch (error) {
        errorNotify('Error in getcomplaintDetails:', error)
      }
    }

    const getAsssetcomplaintDetails = async () => {
      try {
        const result = await axioslogin.post('/assetSpareDetails/getAssetcomplaintDetails', AssetData)
        const { success, data } = result.data
        if (success === 2 && data.length > 0) {
          setcomplDetails(data)
        } else {
          setcomplDetails([])
        }
      } catch (error) {
        errorNotify('Error in getAsssetcomplaintDetails:', error)
      }
    }
    if (spare_asset_no_only !== undefined) {
      if (SpareData) {
        getcomplaintDetails()
      }
    } else {
      if (AssetData) {
        getAsssetcomplaintDetails()
      }
    }
  }, [SpareData, AssetData, spare_asset_no_only])

  const complaint_slno = complDetails?.[0]?.complaint_slno || null
  const serviceSparee = useCallback(
    async val => {
      const { am_spare_item_map_slno, asset_spare_slno, spare_asset_no, spare_asset_no_only } = val

      const patchdata = {
        delete_user: id,
        asset_spare_slno: asset_spare_slno,
        am_spare_item_map_slno: am_spare_item_map_slno
      }

      const postSpareData = {
        cm_complaint_slno: complaint_slno,
        cm_spare_asset_no: spare_asset_no,
        cm_spare_asset_no_only: spare_asset_no_only,
        cm_spare_item_map_slno: am_spare_item_map_slno,
        create_user: id
      }

      const ServiceUpdate = async patchdata => {
        const result = await axioslogin.patch('/ItemMapDetails/spareService', patchdata)
        return result.data
      }

      const SpareComplaintInsert = async postSpareData => {
        const result = await axioslogin.post('/assetSpareDetails/CmSpareComplaintService', postSpareData)
        return result.data
      }
      try {
        const updateResponse = await ServiceUpdate(patchdata)
        const { success, message } = updateResponse
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          const insertResponse = await SpareComplaintInsert(postSpareData)
          const { success: insertSuccess, message: insertMessage } = insertResponse
          if (insertSuccess === 1) {
            succesNotify(insertMessage)
          } else {
            warningNotify(insertMessage)
          }
          setCount(count + 1)
        } else {
          warningNotify(message)
          setCount(count + 1)
        }
      } catch (error) {
        warningNotify('Something went wrong!')
      }
    },
    [id, setCount, count, complaint_slno]
  )

  const handleFileChange = useCallback(
    e => {
      const newFiles = [...selectFile]
      newFiles.push(e.target.files[0])
      setSelectFile(newFiles)
    },
    [selectFile, setSelectFile]
  )

  const handleImageUpload = useCallback(async imageFile => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }

    try {
      const compressedFile = await imageCompression(imageFile, options)
      return compressedFile
    } catch (error) {
      errorNotify('Image compression failed:', error)
      return null
    }
  }, [])

  const handleRemoveFile = index => {
    setSelectFile(prevFiles => {
      const updatedFiles = [...prevFiles]
      updatedFiles.splice(index, 1)
      return updatedFiles
    })
  }

  const PostData = useMemo(() => {
    const { serviceStatus, addToStockFlag, transfrToCondmflag } = flags
    const complaint_slno = complDetails?.[0]?.complaint_slno || null
    return {
      service_item_slno: formattedItemNo,
      service_asset_spare: ItemPrefix,
      complaint_slno: complaint_slno || null,
      serviced_emp_details_slno: deptServiceSlno.length === 0 ? null : deptServiceSlno,
      service_on_hold_reason: service_on_hold_reason === '' ? null : service_on_hold_reason,
      service_hold: serviceStatus === '' ? null : serviceStatus,
      service_done_status: addToStockFlag === 1 ? 1 : 0,
      condm_transfr_status: transfrToCondmflag === 1 ? 1 : 0,
      condm_transfr_emp: transfrToCondmflag === 1 ? id : null,
      condm_transf_remarks: condm_transf_remarks !== '' ? condm_transf_remarks : null,
      add_to_store_user: addToStockFlag === 1 ? id : null,
      add_to_store_date: addToStockFlag === 1 ? currentDateAndTime : null,
      service_close_status: 0,
      suppl_serviced_date: suppl_serviced_date === '' ? null : suppl_serviced_date,
      suppl_serviced_remarks: suppl_serviced_remarks === '' ? null : suppl_serviced_remarks,
      create_user: id,
      am_asset_item_slno: am_item_map_slno || null,
      am_spare_item_slno: am_spare_item_map_slno || null,
      serviced_supplier: servicedSuppl
    }
  }, [
    formattedItemNo,
    ItemPrefix,
    service_on_hold_reason,
    flags,
    complDetails,
    suppl_serviced_date,
    suppl_serviced_remarks,
    currentDateAndTime,
    deptServiceSlno,
    condm_transf_remarks,
    id,
    am_item_map_slno,
    am_spare_item_map_slno,
    servicedSuppl
  ])
  const deptServiceValue = deptServiceSlno.length === 0 ? null : deptServiceSlno === 0 ? null : deptServiceSlno

  const PatchData = useMemo(() => {
    const { serviceStatus, addToStockFlag, transfrToCondmflag } = flags
    const complaint_slno = complDetails?.[0]?.complaint_slno || null
    return {
      am_service_details_slno: am_service_details_slno,
      service_item_slno: formattedItemNo,
      service_asset_spare: ItemPrefix,
      complaint_slno: complaint_slno,
      serviced_emp_details_slno: deptServiceValue,
      service_on_hold_reason: service_on_hold_reason === '' ? null : service_on_hold_reason,
      service_hold: serviceStatus === '' ? null : serviceStatus,
      service_done_status: addToStockFlag === 1 ? 1 : 0,
      condm_transfr_status: transfrToCondmflag === 1 ? 1 : 0,
      condm_transfr_emp: transfrToCondmflag === 1 ? id : null,
      condm_transf_remarks: condm_transf_remarks === '' ? null : condm_transf_remarks,
      add_to_store_user: addToStockFlag === 1 ? id : null,
      add_to_store_date: addToStockFlag === 1 ? currentDateAndTime : null,
      service_close_status: 0,
      suppl_serviced_date: suppl_serviced_date === '' ? null : suppl_serviced_date,
      suppl_serviced_remarks: suppl_serviced_remarks === '' ? null : suppl_serviced_remarks,
      edit_user: id,
      serviced_supplier: servicedSuppl
    }
  }, [
    am_service_details_slno,
    formattedItemNo,
    ItemPrefix,
    service_on_hold_reason,
    condm_transf_remarks,
    flags,
    suppl_serviced_date,
    suppl_serviced_remarks,
    currentDateAndTime,
    deptServiceValue,
    id,
    complDetails,
    servicedSuppl
  ])

  const PostDeptServiceDetails = useMemo(() => {
    return {
      serviced_emp: spareCheckEmp === 0 ? null : spareCheckEmp,
      serviced_date: serviced_date === '' ? null : serviced_date,
      service_issues_identified: service_issues_identified === '' ? null : service_issues_identified,
      serviced_issue_remarks: serviced_issue_remarks === '' ? null : serviced_issue_remarks,
      serviced_create_user: id
    }
  }, [spareCheckEmp, serviced_date, service_issues_identified, serviced_issue_remarks, id])

  const PatchDeptServiceDetails = useMemo(() => {
    return {
      serviced_emp_detail_slno: serviced_emp_detail_slno,
      serviced_emp: spareCheckEmp === 0 ? null : spareCheckEmp,
      serviced_date: serviced_date === '' ? null : serviced_date,
      service_issues_identified: service_issues_identified === '' ? null : service_issues_identified,
      serviced_issue_remarks: serviced_issue_remarks === '' ? null : serviced_issue_remarks,
      serviced_edit_user: id
    }
  }, [serviced_emp_detail_slno, spareCheckEmp, serviced_date, service_issues_identified, serviced_issue_remarks, id])

  useEffect(() => {
    const now = new Date()
    const formattedNow = format(now, "yyyy-MM-dd'T'HH:mm")
    setCurrentDateAndTime(formattedNow)
    if (!deptServiceDetails.serviced_date) {
      setdeptServiceDetails(prev => ({
        ...prev,
        serviced_date: formattedNow
      }))
    }
  }, [deptServiceDetails.serviced_date])

  const AddDeptServiceDetails = useCallback(
    async e => {
      e.preventDefault()
      if (!spareCheckEmp || !serviced_date || !service_issues_identified || !serviced_issue_remarks) {
        infoNotify('Please fill all mandatory fields.')
        return
      }
      const { editFlag } = flags
      if (editFlag === 1 && serviced_emp_detail_slno !== '') {
        const UpdateDeptServiceDetails = async PatchDeptServiceDetails => {
          const result = await axioslogin.patch(`/assetSpareDetails/servicedEmpDetailsUpdate`, PatchDeptServiceDetails)
          const { message, success } = result.data
          if (success === 2) {
            succesNotify(message)
            setCount(count + 1)
            setFlags(prevFlags => ({
              ...prevFlags,
              editFlag: 0
            }))
            Reset()
          }
        }
        UpdateDeptServiceDetails(PatchDeptServiceDetails)
      } else {
        const AddDetailsEmp = async () => {
          try {
            const result = await axioslogin.post(`/assetSpareDetails/servicedEmpDetailsInsert`, PostDeptServiceDetails)
            return result.data
          } catch (error) {
            return { success: 0, message: 'Failed to insert service employee details' }
          }
        }
        const UpdateServiceDetails = async newServicedEmpId => {
          let currentServicedEmpIdSlno = deptServiceSlno || []
          if (typeof currentServicedEmpIdSlno === 'string') {
            currentServicedEmpIdSlno = JSON.parse(currentServicedEmpIdSlno)
          }
          if (!Array.isArray(currentServicedEmpIdSlno)) {
            currentServicedEmpIdSlno = [currentServicedEmpIdSlno]
          }
          currentServicedEmpIdSlno.push(newServicedEmpId)

          const updatedServiceDetails = {
            ...PatchData,
            serviced_emp_details_slno: JSON.stringify(currentServicedEmpIdSlno)
          }
          try {
            const result = await axioslogin.patch(`/assetSpareDetails/serviceDetailsUpdate`, updatedServiceDetails)
            return result.data
          } catch (error) {
            return { success: 0, message: 'Failed to update service details' }
          }
        }

        const AddDetails = async insertId => {
          const PostServiceDetails = {
            ...PostData,
            serviced_emp_details_slno: insertId === 0 ? null : JSON.stringify([insertId])
          }

          try {
            const result = await axioslogin.post(`/assetSpareDetails/serviceDetailsInsert`, PostServiceDetails)
            return result.data
          } catch (error) {
            return { success: 0, message: 'Failed to insert service details' }
          }
        }

        const empInsertResult = await AddDetailsEmp()
        const { success: empSuccess, insertId: newEmpIdSlno } = empInsertResult

        if (empSuccess === 1) {
          if (am_service_details_slno !== '') {
            const serviceUpdateResult = await UpdateServiceDetails(newEmpIdSlno)
            const { success: updateSuccess, message: updateMessage } = serviceUpdateResult
            if (updateSuccess === 2) {
              succesNotify('Department Service Details Added Successfully')
              setCount(count + 1)
              setFlags(prevFlags => ({
                ...prevFlags,
                editFlag: 0
              }))
              Reset()
            } else {
              warningNotify(updateMessage)
            }
          } else {
            const serviceInsertResult = await AddDetails(newEmpIdSlno)
            const { success: serviceSuccess, message: serviceMessage } = serviceInsertResult
            if (serviceSuccess === 1) {
              succesNotify('Department Service Details Added Successfully')
              setCount(count + 1)
              setFlags(prevFlags => ({
                ...prevFlags,
                editFlag: 0
              }))
              Reset()
            } else {
              warningNotify(serviceMessage)
            }
          }
        } else {
          warningNotify('Failed to insert service employee details.')
        }
      }
    },
    [
      PostDeptServiceDetails,
      PatchDeptServiceDetails,
      PostData,
      PatchData,
      count,
      am_service_details_slno,
      serviced_emp_detail_slno,
      Reset,
      deptServiceSlno,
      flags,
      setCount,
      service_issues_identified,
      serviced_date,
      serviced_issue_remarks,
      spareCheckEmp
    ]
  )

  const searchDeptServiceData = useMemo(() => {
    return {
      serviced_emp_detail_slno: deptServiceSlno
    }
  }, [deptServiceSlno])

  useEffect(() => {
    if (deptServiceSlno.length !== 0) {
      const getDeptServDetailsData = async () => {
        const result = await axioslogin.post(`assetSpareDetails/getDeptServiceDetailsData`, searchDeptServiceData)
        const { success, data } = result.data
        if (success === 1) {
          setDeptServDetailsData(data)
        } else {
          setDeptServDetailsData([])
        }
      }
      getDeptServDetailsData()
    } else {
      setDeptServDetailsData([])
    }
  }, [deptServiceSlno, searchDeptServiceData, count])

  useEffect(() => {
    if (alldetailsService.length !== 0) {
      const getServEmployees = async () => {
        const updatedServEmployees = {}
        for (let deptServiceemp of alldetailsService) {
          const searchDeptServiceData = {
            serviced_emp_detail_slno: deptServiceemp.serviced_emp_details_slno
          }
          try {
            const result = await axioslogin.post(`assetSpareDetails/getDeptServiceDetailsData`, searchDeptServiceData)
            const { success, data } = result.data
            if (success === 1) {
              updatedServEmployees[deptServiceemp.serviced_emp_details_slno] = data
            } else {
              updatedServEmployees[deptServiceemp.serviced_emp_details_slno] = []
            }
          } catch (error) {
            updatedServEmployees[deptServiceemp.serviced_emp_details_slno] = []
            errorNotify('Error fetching employee details:', error)
          }
        }
        setdeptServiceempList(updatedServEmployees)
      }
      getServEmployees()
    }
  }, [alldetailsService])

  const rowSelect = useCallback(
    val => {
      setFlags(prevFlags => ({
        ...prevFlags,
        editFlag: 1
      }))
      const {
        serviced_emp_detail_slno,
        serviced_emp,
        serviced_date,
        service_issues_identified,
        serviced_issue_remarks
      } = val

      const frmdata = {
        serviced_emp_detail_slno: serviced_emp_detail_slno,
        serviced_date: serviced_date,
        service_issues_identified: service_issues_identified,
        serviced_issue_remarks: serviced_issue_remarks
      }

      setdeptServiceDetails(frmdata)
      setspareCheckEmp(serviced_emp === null ? '' : serviced_emp)
    },
    [setFlags]
  )

  const AddServiceDetails = useCallback(
    e => {
      e.preventDefault()
      const InsertFile = async (selectFile, insertId) => {
        try {
          const formData = new FormData()
          formData.append('id', insertId)
          for (const file of selectFile) {
            if (file.type.startsWith('image')) {
              const compressedFile = await handleImageUpload(file)
              formData.append('files', compressedFile, compressedFile.name)
            } else {
              formData.append('files', file, file.name)
            }
          }
          const uploadResult = await axioslogin.post('/AmServiceFileUpload/uploadFile/UploadAssetService', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          return uploadResult.data
        } catch (error) {
          warningNotify('An error occurred during file upload.')
        }
      }

      const AddDetails = async PostData => {
        const result = await axioslogin.post(`/assetSpareDetails/serviceDetailsInsert`, PostData)
        return result.data
      }

      const UpdateDetails = async PatchData => {
        const result = await axioslogin.patch(`/assetSpareDetails/serviceDetailsUpdate`, PatchData)
        return result.data
      }
      if (am_service_details_slno !== '') {
        UpdateDetails(PatchData).then(value => {
          const { success, message } = value
          if (success === 2) {
            if (selectFile.length !== 0) {
              InsertFile(selectFile, insertId).then(value => {
                const { success, message } = value
                if (success === 1) {
                  succesNotify('Service Details Added With File Attach Successfully')
                  setCount(count + 1)
                  Close()
                } else {
                  warningNotify(message)
                }
              })
            } else {
              succesNotify(message)
              setCount(count + 1)
              Close()
            }
          }
        })
      } else {
        AddDetails(PostData).then(value => {
          const { success, insertId, message } = value
          if (success === 1) {
            if (selectFile.length !== 0) {
              InsertFile(selectFile, insertId).then(value => {
                const { success, message } = value
                if (success === 1) {
                  succesNotify('Service Details Added With File Attach Successfully')
                  setCount(count + 1)
                  Close()
                } else {
                  warningNotify(message)
                }
              })
            } else {
              succesNotify(message)
              setCount(count + 1)
              Close()
            }
          }
        })
      }
    },
    [PatchData, PostData, insertId, selectFile, am_service_details_slno, Close, count, handleImageUpload, setCount]
  )

  const [insertedId, setInsertedId] = useState(0)
  const [supplierContact, setSupplierContact] = useState({
    supplier_service_slno: '',
    contacted_date: '',
    expected_service_vists: '',
    supplier_response: ''
  })

  const { supplier_service_slno, contacted_date, expected_service_vists, supplier_response } = supplierContact

  const UpdateSupplcontact = useCallback(e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setSupplierContact(prev => ({ ...prev, [e.target.name]: value }))
  }, [])
  const ResetSuppl = useCallback(() => {
    const frmdata = {
      supplier_service_slno: '',
      contacted_date: '',
      expected_service_vists: '',
      supplier_response: ''
    }
    setSupplierContact(frmdata)
    setsupplContctEmp(0)
    setspareCheckEmp(0)
    setEditSupp(0)
    setsupplierSelect(0)
  }, [])

  const InsertSuppContactDetails = useMemo(() => {
    return {
      service_details_slno: am_service_details_slno || insertedId,
      supplier_slno: supplierSelect,
      contact_status: 1,
      contacted_emp: supplContctEmp,
      contacted_date,
      expected_service_vists,
      supplier_response,
      create_user: id
    }
  }, [
    am_service_details_slno,
    supplierSelect,
    supplContctEmp,
    contacted_date,
    expected_service_vists,
    supplier_response,
    id,
    insertedId
  ])

  const UpdateSuppContactDetails = useMemo(() => {
    return {
      supplier_service_slno,
      service_details_slno: am_service_details_slno,
      supplier_slno: supplierSelect,
      contact_status: 1,
      contacted_emp: supplContctEmp,
      contacted_date,
      expected_service_vists,
      supplier_response,
      edit_user: id
    }
  }, [
    supplier_service_slno,
    am_service_details_slno,
    supplierSelect,
    supplContctEmp,
    contacted_date,
    expected_service_vists,
    supplier_response,
    id
  ])

  const { data: serviceSupplDetails = [] } = useQuery({
    queryKey: ['getserviceSupplDetails', am_service_details_slno, count],
    queryFn: async () => {
      const result = await axioslogin.get(`/assetSpareDetails/viewSupplierContactDetails/${am_service_details_slno}`)
      const { success, data } = result.data
      return success === 1 ? data : []
    },
    enabled: !!am_service_details_slno
  })

  const AddSupplierContactDetails = useCallback(() => {
    const AddDetails = async PostData => {
      const result = await axioslogin.post(`/assetSpareDetails/serviceDetailsInsert`, PostData)
      return result.data
    }

    const InsertSupplierContact = async data => {
      const result = await axioslogin.post(`/assetSpareDetails/InsertSupplierContactDetails`, data)
      return result.data
    }

    const UpdateSupplierContact = async data => {
      const result = await axioslogin.patch(`/assetSpareDetails/UpdateSupplierContactDetails`, data)
      return result.data
    }

    if (!am_service_details_slno) {
      AddDetails(PostData).then(value => {
        const { success, insertId } = value
        if (success === 1) {
          setInsertedId(insertId)
          const newInsertData = {
            ...InsertSuppContactDetails,
            service_details_slno: insertId
          }

          InsertSupplierContact(newInsertData).then(value => {
            const { success, message } = value
            success === 1 ? succesNotify(message) : warningNotify(message)
            setCount(count + 1)
            ResetSuppl()
          })
        }
      })
    } else {
      if (editSupp === 1) {
        UpdateSupplierContact(UpdateSuppContactDetails).then(value => {
          const { success, message } = value
          success === 2 ? succesNotify(message) : warningNotify(message)
          setCount(count + 1)
          ResetSuppl()
        })
      } else {
        InsertSupplierContact(InsertSuppContactDetails).then(value => {
          const { success, message } = value
          success === 1 ? succesNotify(message) : warningNotify(message)
          setCount(count + 1)
          ResetSuppl()
        })
      }
    }
  }, [
    am_service_details_slno,
    InsertSuppContactDetails,
    UpdateSuppContactDetails,
    PostData,
    ResetSuppl,
    count,
    editSupp,
    setCount
  ])

  const EditRow = useCallback(val => {
    setEditSupp(1)
    const {
      supplier_service_slno,
      supplier_slno,
      contacted_emp,
      contacted_date,
      expected_service_vists,
      supplier_response
    } = val
    const frmdata = {
      supplier_service_slno: supplier_service_slno,
      contacted_date: contacted_date,
      expected_service_vists: expected_service_vists,
      supplier_response: supplier_response
    }
    setSupplierContact(frmdata)
    setsupplContctEmp(contacted_emp)
    setsupplierSelect(supplier_slno)
  }, [])

  const searchData = useMemo(() => {
    return {
      service_item_slno: formattedItemNo,
      service_asset_spare: ItemPrefix
    }
  }, [formattedItemNo, ItemPrefix])

  useEffect(() => {
    const getallServiceDetails = async () => {
      try {
        const result = await axioslogin.post('/assetSpareDetails/getserviceDetails', searchData)
        const { success, data } = result.data
        if (success === 2) {
          if (data.length > 0) {
            const {
              am_service_details_slno,
              serviced_emp_details_slno,
              service_item_slno,
              service_asset_spare,
              complaint_slno,
              condm_transfr_status,
              service_close_status,
              service_done_status,
              service_on_hold_reason,
              service_hold,
              condm_transfr_emp,
              condm_transf_remarks,
              add_to_store_user,
              serviced_supplier,
              suppl_serviced_date,
              suppl_serviced_remarks,
              create_user,
              edit_user
            } = data[0]
            const frmdata = {
              am_service_details_slno: am_service_details_slno,
              dept_service_date: dept_service_date,
              service_item_slno: service_item_slno,
              service_asset_spare: service_asset_spare,
              complaint_slno: complaint_slno,
              condm_transfr_status: condm_transfr_status,
              service_close_status: service_close_status,
              service_done_status: service_done_status,
              service_on_hold_reason: service_on_hold_reason,
              condm_transfr_emp: condm_transfr_emp,
              condm_transf_remarks: condm_transf_remarks,
              add_to_store_user: add_to_store_user,
              suppl_serviced_date: suppl_serviced_date,
              suppl_serviced_remarks: suppl_serviced_remarks,
              create_user: create_user,
              edit_user: edit_user
            }
            SetService(frmdata)
            setinsertId(am_service_details_slno)
            setServicedSuppl(serviced_supplier)
            setDeptServiceSlno(serviced_emp_details_slno === null ? 0 : serviced_emp_details_slno)
            setFlags(prevFlags => ({
              ...prevFlags,
              serviceStatus: service_hold
            }))
          }
        }
      } catch (error) {
        errorNotify('Error in getallServiceDetails:', error)
      }
    }
    getallServiceDetails()
  }, [searchData, count, dept_service_date])

  useEffect(() => {
    const getServiceDetailsAll = async () => {
      const result = await axioslogin.post('/assetSpareDetails/getAllserviceDetails', searchData)
      const { success, data } = result.data
      if (success === 2) {
        if (data.length > 0) {
          setAlldetailsService(data)
        } else {
          setAlldetailsService([])
        }
      } else {
        setAlldetailsService([])
      }
    }
    getServiceDetailsAll()
  }, [searchData, count])

  const fileView = async val => {
    const { complaint_slno } = val
    setFlags(prevState => ({
      ...prevState,
      image: 1
    }))
    setfileDetails(val)
    try {
      const result = await axioslogin.get(`/complaintFileUpload/uploadFile/getComplaintFile/${complaint_slno}`)
      const { success } = result.data
      if (success === 1) {
        const data = result.data
        const fileNames = data.data
        const fileUrls = fileNames.map(fileName => {
          return `${PUBLIC_NAS_FOLDER}/ComplaintManagement/${complaint_slno}/${fileName}`
        })
        setImageUrls(fileUrls)
        if (fileUrls.length > 0) {
          setViewStates(prevState => ({
            ...prevState,
            image: 1,
            imageViewOpen: true
          }))
          setSelectedImages(val)
        } else {
          warningNotify('No Image attached')
          setViewStates(prevState => ({
            ...prevState,
            image: 0,
            imageViewOpen: false
          }))
        }
      } else {
        setViewStates(prevState => ({
          ...prevState,
          image: 0,
          imageViewOpen: false
        }))
        warningNotify('No Image Attached')
      }
    } catch (error) {
      warningNotify('Error in fetching files:', error)
    }
  }

  const fileViewAssetService = async val => {
    const { am_service_details_slno } = val
    setServicefileDetails(val)
    try {
      const result = await axioslogin.get(
        `/AmServiceFileUpload/uploadFile/getAssetServiceFile/${am_service_details_slno}`
      )
      const { success } = result.data
      if (success === 1) {
        const data = result.data
        const fileNames = data.data
        const fileUrls = fileNames.map(fileName => {
          return `${PUBLIC_NAS_FOLDER}/AssetService/${am_service_details_slno}/${fileName}`
        })
        setImageServiceUrls(fileUrls)
        if (fileUrls.length > 0) {
          setSelectedImages(val)
          setFlags(prevState => ({
            ...prevState,
            imageServiceFlag: 1
          }))
          setViewStates(prevState => ({
            ...prevState,
            serviceimageViewOpen: true
          }))
        } else {
          warningNotify('No Files attached')
        }
      } else {
        warningNotify('No Files Attached')
      }
    } catch (error) {
      warningNotify('Error in fetching files:', error)
    }
  }

  const AddTostock = useCallback(
    e => {
      e.preventDefault()
      setFlags(prevFlags => ({
        ...prevFlags,
        addToStockFlag: 1
      }))
      const updatedPatchData = {
        ...PatchData,
        service_done_status: 1,
        service_close_status: 1,
        add_to_store_user: id,
        add_to_store_date: currentDateAndTime,
        serviced_supplier: servicedSuppl
      }

      const updatedPostData = {
        ...PostData,
        service_done_status: 1,
        service_close_status: 1,
        add_to_store_user: id,
        add_to_store_date: currentDateAndTime,
        serviced_supplier: servicedSuppl
      }

      const servicespareUpdate = {
        spare_status: 0,
        asset_spare_slno: asset_spare_slno
      }

      const AddtoStockSpare = {
        spare_dept_slno: am_custodian_dept_slno,
        spare_deptsec_slno: am_custodian_deptsec_slno,
        spare_room_slno: null,
        spare_subroom_slno: null,
        spare_rack_slno: null,
        spare_service: 0,
        spare_service_hold: null,
        am_spare_item_map_slno: am_spare_item_map_slno
      }
      const AddtoStockAsset = {
        item_dept_slno: am_custodian_dept_slno,
        item_deptsec_slno: am_custodian_deptsec_slno,
        item_room_slno: null,
        item_subroom_slno: null,
        item_rack_slno: null,
        asset_item_service: 0,
        asset_item_condmnation: 0,
        asset_item_condm_user: null,
        asset_item_service_hold: null,
        am_item_map_slno: am_item_map_slno,
        am_trans_status: 0
      }

      const InsertFile = async (selectFile, insertId) => {
        try {
          const formData = new FormData()
          formData.append('id', insertId)
          for (const file of selectFile) {
            if (file.type.startsWith('image')) {
              const compressedFile = await handleImageUpload(file)
              formData.append('files', compressedFile, compressedFile.name)
            } else {
              formData.append('files', file, file.name)
            }
          }
          const uploadResult = await axioslogin.post('/AmServiceFileUpload/uploadFile/UploadAssetService', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          return uploadResult.data
        } catch (error) {
          warningNotify('An error occurred during file upload.')
        }
      }

      const AddtoStockSpareUpdate = async AddtoStockSpare => {
        const result = await axioslogin.patch('/assetSpareDetails/SpareDetailsUpdate', AddtoStockSpare)
        return result.data
      }

      const AddDetails = async PostData => {
        const result = await axioslogin.post(`/assetSpareDetails/serviceDetailsInsert`, PostData)
        return result.data
      }

      const UpdateDetails = async PatchData => {
        const result = await axioslogin.patch(`/assetSpareDetails/serviceDetailsUpdate`, PatchData)
        return result.data
      }

      const AddtoStockAssetUpdate = async AddtoStockAsset => {
        const result = await axioslogin.patch('/assetSpareDetails/AssetDetailsUpdate', AddtoStockAsset)
        return result.data
      }
      const serviceSpareUpdate = async servicespareUpdate => {
        const result = await axioslogin.patch('/assetSpareDetails/spareServiceUpdate', servicespareUpdate)
        return result.data
      }

      if (spare_asset_no_only !== undefined) {
        AddtoStockSpareUpdate(AddtoStockSpare)
          .then(value => {
            const { success } = value
            if (success === 2) {
              serviceSpareUpdate(servicespareUpdate).then(response => {
                const { success } = response
                if (success === 2) {
                  if (am_service_details_slno !== '') {
                    UpdateDetails(updatedPatchData).then(response => {
                      const { success } = response
                      if (success === 2) {
                        if (selectFile.length !== 0) {
                          InsertFile(selectFile, insertId).then(value => {
                            const { success, message } = value
                            if (success === 1) {
                              succesNotify('Item added to stock list With File Attach Successfully')
                              setCount(count + 1)
                              Close()
                            } else {
                              warningNotify(message)
                            }
                          })
                        } else {
                          succesNotify('Item added to stock list')
                          setCount(count + 1)
                          Close()
                        }
                      } else {
                        errorNotify('Failed to update service details.')
                      }
                    })
                  } else {
                    AddDetails(updatedPostData).then(response => {
                      const { success } = response
                      if (success === 1) {
                        if (selectFile.length !== 0) {
                          InsertFile(selectFile, insertId).then(value => {
                            const { success, message } = value
                            if (success === 1) {
                              succesNotify('Item added to stock list With File Attach Successfully')
                              setCount(count + 1)
                              Close()
                            } else {
                              warningNotify(message)
                            }
                          })
                        } else {
                          succesNotify('Item added to stock list')
                          setCount(count + 1)
                          Close()
                        }
                      } else {
                        errorNotify('Failed to add service details.')
                      }
                    })
                  }
                } else {
                  errorNotify('Failed to update service status.')
                }
              })
            } else {
              errorNotify('Failed to add to stock.')
            }
          })
          .catch(error => {
            errorNotify('Error during add to stock:', error)
          })
      } else if (item_asset_no_only !== undefined) {
        AddtoStockAssetUpdate(AddtoStockAsset)
          .then(value => {
            const { success } = value
            if (success === 2) {
              if (am_service_details_slno !== '') {
                UpdateDetails(updatedPatchData).then(response => {
                  const { success } = response
                  if (success === 2) {
                    if (selectFile.length !== 0) {
                      InsertFile(selectFile, insertId).then(value => {
                        const { success, message } = value
                        if (success === 1) {
                          succesNotify('Service Completed,Item transferred With File Attach Successfully')
                          setCount(count + 1)
                          Close()
                        } else {
                          warningNotify(message)
                        }
                      })
                    } else {
                      succesNotify('Service Completed')
                      setCount(count + 1)
                      Close()
                    }
                  } else {
                    errorNotify('Failed to update service details.')
                  }
                })
              } else {
                AddDetails(updatedPostData).then(response => {
                  const { success } = response
                  if (success === 1) {
                    if (selectFile.length !== 0) {
                      InsertFile(selectFile, insertId).then(value => {
                        const { success, message } = value
                        if (success === 1) {
                          succesNotify('Service Completed,Item transferred With File Attach Successfully')
                          setCount(count + 1)
                          Close()
                        } else {
                          warningNotify(message)
                        }
                      })
                    } else {
                      succesNotify('Service Completed')
                      setCount(count + 1)
                      Close()
                    }
                  } else {
                    errorNotify('Failed to add service details.')
                  }
                })
              }
            } else {
              errorNotify('Failed to update Service Details.')
            }
          })
          .catch(error => {
            errorNotify('Error during update Service Details:', error)
          })
      }
    },
    [
      PatchData,
      PostData,
      asset_spare_slno,
      item_asset_no_only,
      selectFile,
      am_service_details_slno,
      id,
      count,
      setCount,
      Close,
      am_custodian_dept_slno,
      am_custodian_deptsec_slno,
      am_item_map_slno,
      am_spare_item_map_slno,
      currentDateAndTime,
      handleImageUpload,
      insertId,
      spare_asset_no_only,
      servicedSuppl
    ]
  )

  const TransferToCondmination = useCallback(
    e => {
      e.preventDefault()
      setFlags(prevFlags => ({
        ...prevFlags,
        transfrToCondmflag: 1
      }))

      const updatedPatchData = {
        ...PatchData,
        condm_transfr_status: 1,
        service_close_status: 1,
        condm_transfr_emp: id,
        condm_transf_remarks: condm_transf_remarks
      }

      const updatedPostData = {
        ...PostData,
        condm_transfr_status: 1,
        service_close_status: 1,
        condm_transfr_emp: id,
        condm_transf_remarks: condm_transf_remarks
      }

      const CondmtransfrSpare = {
        delete_user: id,
        asset_spare_slno: asset_spare_slno,
        am_spare_item_map_slno: am_spare_item_map_slno
      }

      const CondmtransfrAsset = {
        item_dept_slno: am_custodian_dept_slno,
        item_deptsec_slno: item_custodian_dept_sec,
        item_room_slno: null,
        item_subroom_slno: null,
        item_rack_slno: null,
        asset_item_service: 2,
        am_item_map_slno: am_item_map_slno,
        asset_item_condmnation: 1,
        asset_item_condm_user: id
      }

      const servicespareUpdate = {
        spare_status: 0,
        asset_spare_slno: asset_spare_slno
      }

      const InsertFile = async (selectFile, insertId) => {
        try {
          const formData = new FormData()
          formData.append('id', insertId)
          for (const file of selectFile) {
            if (file.type.startsWith('image')) {
              const compressedFile = await handleImageUpload(file)
              formData.append('files', compressedFile, compressedFile.name)
            } else {
              formData.append('files', file, file.name)
            }
          }
          const uploadResult = await axioslogin.post('/AmServiceFileUpload/uploadFile/UploadAssetService', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          return uploadResult.data
        } catch (error) {
          warningNotify('An error occurred during file upload.')
        }
      }

      const CondmtransfrSpareUpdate = async CondmtransfrSpare => {
        const result = await axioslogin.patch('/ItemMapDetails/spareContamination', CondmtransfrSpare)
        return result.data
      }

      const AddDetails = async PostData => {
        const result = await axioslogin.post(`/assetSpareDetails/serviceDetailsInsert`, PostData)
        return result.data
      }

      const UpdateDetails = async PatchData => {
        const result = await axioslogin.patch(`/assetSpareDetails/serviceDetailsUpdate`, PatchData)
        return result.data
      }

      const CondmtransfrAssetUpdate = async CondmtransfrAsset => {
        const result = await axioslogin.patch('/assetSpareDetails/AssetDetailsUpdate', CondmtransfrAsset)
        return result.data
      }
      const serviceSpareUpdate = async servicespareUpdate => {
        const result = await axioslogin.patch('/assetSpareDetails/spareServiceUpdate', servicespareUpdate)
        return result.data
      }
      if (condm_transf_remarks !== '') {
        if (spare_asset_no_only !== undefined) {
          CondmtransfrSpareUpdate(CondmtransfrSpare)
            .then(value => {
              const { success } = value
              if (success === 1) {
                serviceSpareUpdate(servicespareUpdate).then(response => {
                  const { success } = response
                  if (success === 2) {
                    if (am_service_details_slno !== '') {
                      UpdateDetails(updatedPatchData).then(response => {
                        const { success } = response
                        if (success === 2) {
                          if (selectFile.length !== 0) {
                            InsertFile(selectFile, insertId).then(value => {
                              const { success, message } = value
                              if (success === 1) {
                                succesNotify('Item transferred to condemnation list With File Attach Successfully')
                                setCount(count + 1)
                                Close()
                              } else {
                                warningNotify(message)
                              }
                            })
                          } else {
                            succesNotify('Item transferred to condemnation list')
                            setCount(count + 1)
                            Close()
                          }
                        } else {
                          errorNotify('Failed to update service details.')
                        }
                      })
                    } else {
                      AddDetails(updatedPostData).then(response => {
                        const { success } = response
                        if (success === 1) {
                          if (selectFile.length !== 0) {
                            InsertFile(selectFile, insertId).then(value => {
                              const { success, message } = value
                              if (success === 1) {
                                succesNotify('Item transferred to condemnation list With File Attach Successfully')
                                setCount(count + 1)
                                Close()
                              } else {
                                warningNotify(message)
                              }
                            })
                          } else {
                            succesNotify('Item transferred to condemnation list')
                            setCount(count + 1)
                            Close()
                          }
                        } else {
                          errorNotify('Failed to add service details.')
                        }
                      })
                    }
                  }
                })
              } else {
                errorNotify('Failed to update contamination.')
              }
            })
            .catch(error => {
              errorNotify('Error during contamination update:', error)
            })
        } else if (item_asset_no_only !== undefined) {
          CondmtransfrAssetUpdate(CondmtransfrAsset)
            .then(value => {
              const { success } = value
              if (success === 2) {
                if (am_service_details_slno !== '') {
                  UpdateDetails(updatedPatchData).then(response => {
                    const { success } = response
                    if (success === 2) {
                      if (selectFile.length !== 0) {
                        InsertFile(selectFile, insertId).then(value => {
                          const { success, message } = value
                          if (success === 1) {
                            succesNotify('Item transferred to condemnation list  With File Attach Successfully')
                            setCount(count + 1)
                            Close()
                          } else {
                            warningNotify(message)
                          }
                        })
                      } else {
                        succesNotify('Item transferred to condemnation list')
                        setCount(count + 1)
                        Close()
                      }
                    } else {
                      errorNotify('Failed to update service details.')
                    }
                  })
                } else {
                  AddDetails(updatedPostData).then(response => {
                    const { success } = response
                    if (success === 1) {
                      if (selectFile.length !== 0) {
                        InsertFile(selectFile, insertId).then(value => {
                          const { success, message } = value
                          if (success === 1) {
                            succesNotify('Item transferred to condemnation list With File Attach Successfully')
                            setCount(count + 1)
                            Close()
                          } else {
                            warningNotify(message)
                          }
                        })
                      } else {
                        succesNotify('Item transferred to condemnation list')
                        setCount(count + 1)
                        Close()
                      }
                    } else {
                      errorNotify('Failed to add service details.')
                    }
                  })
                }
              } else {
                errorNotify('Failed to update contamination.')
              }
            })
            .catch(error => {
              errorNotify('Error during contamination update:', error)
            })
        }
      } else {
        infoNotify('Enter remarks for the condemnation transfer.')
      }
    },
    [
      PatchData,
      PostData,
      asset_spare_slno,
      item_asset_no_only,
      selectFile,
      am_service_details_slno,
      id,
      count,
      setCount,
      Close,
      am_custodian_dept_slno,
      am_item_map_slno,
      condm_transf_remarks,
      handleImageUpload,
      insertId,
      item_custodian_dept_sec,
      spare_asset_no_only,
      am_spare_item_map_slno
    ]
  )

  const AddNewSpare = useCallback(() => {
    if (sparez === 0) {
      infoNotify('Please select Spare')
    } else {
      const isAlreadyAdded = spareData.some(item => item.spare_asset_no_only === sparez)
      if (isAlreadyAdded) {
        infoNotify('Spare already added')
        setSparez(0)
      } else {
        const newdata = {
          am_item_map_slno: am_item_map_slno,
          spare_asset_no_only: sparez,
          spare_status: 1,
          name: spareName,
          create_user: id
        }
        const datass = [...spareData, newdata]
        setSpareData(datass)
        setSparez(0)
      }
    }
  }, [am_item_map_slno, spareData, sparez, spareName, id])
  const handleDelete = indexToDelete => {
    setSpareData(prevArray => {
      const updatedArray = prevArray.filter((_, index) => index !== indexToDelete)
      return updatedArray
    })
  }

  const SparepostData =
    spareData &&
    spareData.map(val => {
      return {
        am_item_map_slno: val.am_item_map_slno,
        am_spare_item_map_slno: val.spare_asset_no_only,
        spare_status: 1,
        create_user: val.create_user
      }
    })

  const [sparecount, setsparecount] = useState(0)
  const AddNewSpareUnderAsset = useCallback(() => {
    const SparedetailInsert = async SparepostData => {
      const result = await axioslogin.post(`/ItemMapDetails/SpareDetailsInsert`, SparepostData)
      const { message, success } = result.data
      if (success === 1) {
        succesNotify('New Spare Added Under Asset')
        setCount(count + 1)
        setsparecount(sparecount + 1)
        setSpareData([])
      } else if (success === 0) {
        infoNotify(message)
      } else {
        infoNotify(message)
      }
    }
    SparedetailInsert(SparepostData)
  }, [SparepostData, count, setCount, sparecount, setsparecount])

  const patchDataServiceHoldAssset = useMemo(() => {
    return {
      asset_item_service_hold: flags.serviceStatus,
      am_item_map_slno: am_item_map_slno
    }
  }, [flags.serviceStatus, am_item_map_slno])

  const patchDataServiceHoldSpare = useMemo(() => {
    return {
      spare_service_hold: flags.serviceStatus,
      am_spare_item_map_slno: am_spare_item_map_slno
    }
  }, [flags.serviceStatus, am_spare_item_map_slno])

  const ServiceStatus = useCallback(() => {
    const updateServiceHoldAsset = async patchDataServiceHoldAssset => {
      const result = await axioslogin.patch(`/assetSpareDetails/AssetServiceHoldUpdate`, patchDataServiceHoldAssset)
      return result.data
    }
    const updateServiceHoldSpare = async patchDataServiceHoldSpare => {
      const result = await axioslogin.patch(`/assetSpareDetails/SpareServiceHoldUpdate`, patchDataServiceHoldSpare)
      return result.data
    }

    const AddServiceDetils = async PostData => {
      const result = await axioslogin.post(`/assetSpareDetails/serviceDetailsInsert`, PostData)
      return result.data
    }

    const UpdateServiceDetils = async PatchData => {
      const result = await axioslogin.patch(`/assetSpareDetails/serviceDetailsUpdate`, PatchData)
      return result.data
    }

    if (am_service_details_slno !== '') {
      UpdateServiceDetils(PatchData).then(value => {
        const { success } = value
        if (success === 2) {
          if (item_asset_no_only !== undefined) {
            updateServiceHoldAsset(patchDataServiceHoldAssset).then(value => {
              const { success } = value
              if (success === 2) {
                succesNotify('Service Status Updated Successfully')
                setCount(count + 1)
              }
            })
          } else if (spare_asset_no_only !== undefined) {
            updateServiceHoldSpare(patchDataServiceHoldSpare).then(value => {
              const { success } = value
              if (success === 2) {
                succesNotify('Service Status Updated Successfully')
                setCount(count + 1)
              }
            })
          }
        }
      })
    } else {
      AddServiceDetils(PostData).then(value => {
        const { success } = value
        if (success === 1) {
          if (item_asset_no_only !== undefined) {
            updateServiceHoldAsset(patchDataServiceHoldAssset).then(value => {
              const { success } = value
              if (success === 2) {
                succesNotify('Service Status Updated Successfully')
                setCount(count + 1)
              }
            })
          } else if (spare_asset_no_only !== undefined) {
            updateServiceHoldSpare(patchDataServiceHoldSpare).then(value => {
              const { success } = value
              if (success === 2) {
                succesNotify('Service Status Updated Successfully')
                setCount(count + 1)
              }
            })
          }
        }
      })
    }
  }, [
    PatchData,
    PostData,
    patchDataServiceHoldSpare,
    patchDataServiceHoldAssset,
    am_service_details_slno,
    count,
    item_asset_no_only,
    setCount,
    spare_asset_no_only
  ])

  const buttonStyle = {
    fontSize: 16,
    color: '#523A28',
    cursor: 'pointer',
    boxShadow: 5,
    border: 'none',
    transition: 'transform 0.2s, bgcolor 0.2s',
    '&:hover': {
      bgcolor: 'white',
      color: '#523A28',
      transform: 'scale(1.1)'
    },
    '&:active': {
      transform: 'scale(0.95)'
    }
  }
  const [imageShowsingle, setImagesingle] = useState(0)
  const [imageShowSingle, setImageShowSingle] = useState(false)
  const [previewFile, setPreviewFile] = useState({ url: '', type: '' })

  const SingleView = useCallback(file => {
    const fileType = file.url
      ? file.url.endsWith('.pdf')
        ? 'pdf'
        : 'image'
      : file.type && file.type.includes('application/pdf')
        ? 'image'
        : 'pdf'

    const fileUrl = file.url || URL.createObjectURL(file)
    setPreviewFile({ url: fileUrl, type: fileType })
    setImageShowSingle(true)
    setImagesingle(1)
    const modalElement = document.querySelector('.MuiModal-root')
    if (
      modalElement &&
      modalElement.hasAttribute('aria-hidden') &&
      modalElement.getAttribute('aria-hidden') === 'true'
    ) {
      document.activeElement.blur()
    }
  }, [])

  const ViewImage = useCallback(file => {
    const fileType = file.url
      ? file.url.endsWith('.pdf')
        ? 'pdf'
        : 'image'
      : file.type.includes('application/pdf')
        ? 'pdf'
        : 'image'

    const fileUrl = file.url || URL.createObjectURL(file)
    setPreviewFile({ url: fileUrl, type: fileType })
    setImageShowSingle(true)
    setImagesingle(1)
  }, [])
  const CloseFile = useCallback(() => {
    setImagesingle(0)
    setImageShowSingle(false)
  }, [])

  const currentDateTime = moment().format('YYYY-MM-DDTHH:mm')

  return (
    <Box>
      {imageShowsingle === 1 ? (
        <Box>
          <FileViewSingle previewFile={previewFile} imageShow={imageShowSingle} CloseFile={CloseFile} />
        </Box>
      ) : null}
      <CssVarsProvider>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pl: 1,
            borderRadius: 10
          }}
        >
          <Box
            sx={{
              width: '90vw',
              height: '98vh',
              bgcolor: 'background.body',
              borderRadius: 'md',
              boxShadow: 'lg',
              display: 'flex',
              flexDirection: 'column',
              pt: 2,
              px: 2
            }}
          >
            <Box sx={{ flexShrink: 0 }}>
              <Box sx={{ flex: 1, display: 'flex', p: 1 }}>
                <Box sx={{ flex: 1, color: 'grey', fontWeight: 500, pl: 1.4, pt: 0.8 }}>Service Details</Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <CancelIcon sx={{ color: 'grey', cursor: 'pointer', height: 30, width: 30 }} onClick={Close} />
                </Box>
              </Box>
              {flags.image === 1 ? (
                <ComFileView
                  imageUrls={imageUrls}
                  imageViewOpen={viewStates.imageViewOpen}
                  selectedImages={selectedImages}
                  fileDetails={fileDetails}
                  setimage={value => setFlags(prevFlags => ({ ...prevFlags, image: value }))}
                  setimageViewOpen={value =>
                    setViewStates(prevViewStates => ({ ...prevViewStates, imageViewOpen: value }))
                  }
                />
              ) : null}

              {flags.imageServiceFlag === 1 ? (
                <ServiceFileAttach
                  imageServiceUrls={imageServiceUrls}
                  serviceimageViewOpen={viewStates.serviceimageViewOpen}
                  servicefileDetails={servicefileDetails}
                  setimageServiceFlag={value => setFlags(prevFlags => ({ ...prevFlags, imageServiceFlag: value }))}
                  setServiceimageViewOpen={value =>
                    setViewStates(prevViewStates => ({
                      ...prevViewStates,
                      serviceimageViewOpen: value
                    }))
                  }
                  item_name={item_name}
                  category_name={category_name}
                />
              ) : null}
              <Box
                sx={{
                  flex: 1,
                  bgcolor: '#FBFCFE',
                  border: 1,
                  mx: 1.5,
                  borderRadius: 5,
                  py: 0.5,
                  borderColor: '#EFEFEF'
                }}
              >
                <Typography
                  sx={{
                    pl: 2,
                    fontWeight: 600,
                    fontSize: 18
                  }}
                >
                  Item Under Service
                </Typography>
                <Box sx={{ flex: 1, display: 'flex', mt: 0.5 }}>
                  <Typography sx={{ flex: 0.4, pl: 2, pt: 0.4, fontWeight: 400, fontSize: 14 }}>Item Number</Typography>
                  <Box sx={{ flex: 3 }}>
                    <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 15 }}>
                      {ItemPrefix}/{formattedItemNo.toString().padStart(6, '0')}
                    </Chip>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', mt: 0.5 }}>
                  <Typography sx={{ flex: 0.4, pl: 2, fontWeight: 400, pt: 0.4, fontSize: 14 }}>Category</Typography>
                  <Box sx={{ flex: 3, fontWeight: 500 }}>
                    <Chip sx={{ bgcolor: '#EBEFFB' }}>{category_name}</Chip>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', my: 0.5 }}>
                  <Typography sx={{ flex: 0.4, pl: 2, fontWeight: 400, pt: 0.4, fontSize: 14 }}>Item Name</Typography>
                  <Box sx={{ flex: 3, fontWeight: 500 }}>
                    <Chip sx={{ bgcolor: '#EBEFFB' }}>{item_name}</Chip>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              <Tabs
                size="sm"
                sx={{
                  display: 'flex',
                  mx: 2,
                  bgcolor: 'white'
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
                        bgcolor: 'white'
                      },
                      [`&.${tabClasses.selected}`]: {
                        color: 'primary.plainColor',
                        bgcolor: '#EBEFFB',
                        borderBottom: 1.5,
                        '&::after': {
                          height: 20,
                          borderTopLeftRadius: 3,
                          borderTopRightRadius: 3,
                          bgcolor: 'primary.500'
                        }
                      }
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', flex: 1, mb: 0 }}>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                      <Tab value={0} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}>
                        <InfoOutlinedIcon />
                        Service Request&nbsp;&nbsp;
                      </Tab>
                      {spare_asset_no === undefined ? (
                        <Tab value={1} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}>
                          <UnarchiveOutlinedIcon />
                          Asset Upgrade&nbsp;&nbsp;
                        </Tab>
                      ) : null}
                      <Tab value={2} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}>
                        <SettingsOutlinedIcon />
                        Service Information&nbsp;&nbsp;
                      </Tab>
                      {spare_asset_no === undefined ? (
                        <Tab value={3} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}>
                          <TimelapseIcon />
                          PM Details&nbsp;&nbsp;
                        </Tab>
                      ) : null}
                      <Tab value={4} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}>
                        <LayersOutlinedIcon />
                        Breakdown Details&nbsp;&nbsp;
                      </Tab>
                      <Tab value={5} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}>
                        <TextSnippetOutlinedIcon />
                        Documents&nbsp;&nbsp;
                      </Tab>
                    </Box>
                  </Box>
                </TabList>
                <TabPanel
                  value={0}
                  sx={{
                    p: 0,
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: 'calc(90vh - 230px)'
                  }}
                >
                  <Box>
                    <ServiceTicketTab complDetails={complDetails} fileView={fileView} />
                  </Box>
                </TabPanel>
                {spare_asset_no === undefined ? (
                  <TabPanel
                    value={1}
                    sx={{
                      p: 0,
                      flexGrow: 1,
                      overflowY: 'auto',
                      maxHeight: 'calc(90vh - 230px)'
                    }}
                  >
                    <Box>
                      <ServiceAssetUpgrade
                        spareDetails={spareDetails}
                        serviceSparee={serviceSparee}
                        item_asset_no_only={item_asset_no_only}
                        item_custodian_dept={item_custodian_dept}
                        am_item_map_slno={am_item_map_slno}
                        id={id}
                        sparez={sparez}
                        setSparez={setSparez}
                        setSpareName={setSpareName}
                        count={count}
                        handleDelete={handleDelete}
                        AddNewSpare={AddNewSpare}
                        spareData={spareData}
                        AddNewSpareUnderAsset={AddNewSpareUnderAsset}
                        setCount={setCount}
                        setsparecount={setsparecount}
                        sparecount={sparecount}
                      />
                    </Box>
                  </TabPanel>
                ) : null}

                <TabPanel
                  value={2}
                  sx={{
                    p: 0,
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: 'calc(90vh - 230px)'
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      overflowY: 'auto',
                      maxHeight: '100%',
                      m: 0,
                      mt: 0.5
                    }}
                  >
                    <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2 }}>
                      <TextComponent
                        text={'DEPARTMENT SERVICE DETAILS'}
                        sx={{
                          flex: 1,
                          fontWeight: 500,
                          color: 'black',
                          fontSize: 15
                        }}
                      />
                      <Box sx={{ flex: 1, display: 'flex', mt: 1, gap: 0.8, pr: 2 }}>
                        <Box sx={{ flex: 1.3 }}>
                          <Typography sx={{ pl: 0.5, fontSize: 14, fontWeight: 600, color: 'black' }}>
                            Serviced by <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                          </Typography>
                          <EmployeeSelectJoyAutoComp employee={spareCheckEmp} setEmployee={setspareCheckEmp} />
                        </Box>
                        <Box sx={{ flex: 0.5 }}>
                          <Typography sx={{ pl: 0.5, fontSize: 14, fontWeight: 600, color: 'black' }}>
                            Serviced Date <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                          </Typography>
                          <Input
                            type="datetime-local"
                            name="serviced_date"
                            value={serviced_date}
                            onChange={UpdateServiceDeptDetails}
                            slotProps={{
                              input: {
                                max: currentDateTime
                              }
                            }}
                          />
                        </Box>
                        <Box sx={{ flex: 2.5 }}>
                          <Typography sx={{ pl: 0.5, fontSize: 14, fontWeight: 600, color: 'black' }}>
                            Issues Identified <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                          </Typography>
                          <Textarea
                            placeholder="type here..."
                            name="service_issues_identified"
                            value={service_issues_identified || ''}
                            onChange={UpdateServiceDeptDetails}
                          />
                        </Box>
                        <Box sx={{ flex: 2.5 }}>
                          <Typography sx={{ pl: 0.5, fontSize: 14, fontWeight: 600, color: 'black' }}>
                            Remarks <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                          </Typography>
                          <Textarea
                            placeholder="type here..."
                            name="serviced_issue_remarks"
                            value={serviced_issue_remarks || ''}
                            onChange={UpdateServiceDeptDetails}
                          />
                        </Box>
                        <Box sx={{ pt: 3.3 }}>
                          <AddCircleIcon
                            sx={{ height: 30, width: 30, cursor: 'pointer' }}
                            onClick={AddDeptServiceDetails}
                          />
                        </Box>
                      </Box>
                      {deptServDetailsData.length !== 0 ? (
                        <Box sx={{ borderRadius: 2, mt: 0.8, pr: 1 }}>
                          <Table stickyHeader size="sm" borderAxis="both">
                            <thead>
                              <tr>
                                <th style={{ textAlign: 'center', width: 8 }}>Edit</th>
                                <th style={{ textAlign: 'center', width: 25 }}>Attended by</th>
                                <th style={{ textAlign: 'center', width: 20 }}>Serviced Date</th>
                                <th style={{ textAlign: 'center', width: 40 }}>Issues Identified</th>
                                <th style={{ textAlign: 'center', width: 40 }}>Remarks</th>
                              </tr>
                            </thead>
                            <tbody>
                              {deptServDetailsData?.map((val, index) => {
                                return (
                                  <tr key={index}>
                                    <td style={{ textAlign: 'center' }}>
                                      <ModeEditIcon sx={{ cursor: 'pointer' }} onClick={() => rowSelect(val)} />
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{val.em_name}</td>
                                    <td style={{ textAlign: 'center' }}>
                                      {val.serviced_date
                                        ? format(new Date(val.serviced_date), 'dd MMM yyyy,  hh:mm a')
                                        : 'Invalid Date'}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{val.service_issues_identified}</td>
                                    <td style={{ textAlign: 'center' }}>{val.serviced_issue_remarks}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </Table>
                        </Box>
                      ) : null}
                    </Box>
                    <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2, mt: 0.5 }}>
                      <TextComponent
                        text={'SERVICE STATUS'}
                        sx={{
                          flex: 1,
                          fontWeight: 500,
                          color: 'black',
                          fontSize: 15
                        }}
                      />
                      <Box sx={{ flex: 1, display: 'flex', mr: 2, pt: 1 }}>
                        <Box sx={{ flex: 0.8 }}>
                          <AmServiceStatus
                            holdReason={flags.serviceStatus}
                            setHoldReason={value => setFlags(prevFlags => ({ ...prevFlags, serviceStatus: value }))}
                          />
                        </Box>
                        <Textarea
                          minRows={1}
                          placeholder="status remarks..."
                          sx={{ ml: 1, flex: 2 }}
                          name="service_on_hold_reason"
                          value={service_on_hold_reason || ''}
                          onChange={UpdateServicedtl}
                        />
                        <Box sx={{ pl: 1, pt: 0.5 }}>
                          <LibraryAddIcon
                            sx={{ height: 30, width: 30, cursor: 'pointer', color: '#636B74' }}
                            onClick={ServiceStatus}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2, mt: 0.5 }}>
                      <TextComponent
                        text={'CONTACT SUPPLIER'}
                        sx={{
                          flex: 1,
                          fontWeight: 500,
                          color: 'black',
                          fontSize: 15
                        }}
                      />
                      <Box sx={{ mt: 1, pr: 2 }}>
                        <SupplierDetailsAutoComplte value={supplierSelect} setValue={setsupplierSelect} />
                      </Box>
                      {supplierSelect !== 0 ? (
                        <>
                          {SupplierDetails?.map((val, index) => {
                            const numbers = [
                              val.it_supplier_mob_one,
                              val.it_supplier_mob_two,
                              val.it_supplier_land_one,
                              val.it_supplier_land_two,
                              val.it_supplier_escl_mob_one,
                              val.it_supplier_escl_mob_two,
                              val.it_supplier_escl_land_one,
                              val.it_supplier_escl_land_two,
                              val.it_supplier_servperson_land_one,
                              val.it_supplier_servperson_land_two,
                              val.it_supplier_servperson_mob_one,
                              val.it_supplier_servperson_mob_two,
                              val.it_supplier_saleperson_land_one,
                              val.it_supplier_saleperson_land_two,
                              val.it_supplier_saleperson_mob_one,
                              val.it_supplier_saleperson_mob_two,
                              val.it_supplier_saleperson_second_land_one,
                              val.it_supplier_saleperson_second_land_two,
                              val.it_supplier_saleperson_second_mob_one,
                              val.it_supplier_saleperson_second_mob_two
                            ]

                            const uniqueNumbers = [...new Set(numbers.filter(num => num))]
                            const allEmails = [
                              val.it_supplier_email_one,
                              val.it_supplier_email_two,
                              val.it_supplier_servperson_email_one,
                              val.it_supplier_servperson_email_two,
                              val.it_supplier_saleperson_email_one,
                              val.it_supplier_saleperson_email_two,
                              val.it_supplier_saleperson_second_email_one,
                              val.it_supplier_saleperson_second_email_two
                            ]
                            const uniqueEmails = [...new Set(allEmails.filter(email => email))]
                            return (
                              <Box key={index}>
                                <Box sx={{ flex: 1, mt: 1.5, display: 'flex' }}>
                                  <Typography sx={{ width: 100, ml: 1, fontSize: 14, fontWeight: 600 }}>
                                    Contact No.
                                  </Typography>
                                  {uniqueNumbers.map((phone, index) => (
                                    <Chip key={index} clickable>
                                      <PhoneIcon /> {phone}
                                    </Chip>
                                  ))}
                                </Box>

                                <Box sx={{ flex: 1, mt: 1.5, display: 'flex' }}>
                                  <Typography sx={{ width: 100, ml: 1, fontSize: 14, fontWeight: 600 }}>
                                    Email id
                                  </Typography>
                                  {uniqueEmails.map((email, index) => (
                                    <Chip
                                      key={index}
                                      component="a"
                                      href={`mailto:${email}`}
                                      clickable
                                      label={<u style={{ color: '#005BEA' }}>{email}</u>}
                                      sx={{ mx: 0.5 }}
                                    >
                                      <EmailIcon /> {email}
                                    </Chip>
                                  ))}
                                </Box>
                              </Box>
                            )
                          })}
                        </>
                      ) : null}

                      {editSupp === 1 || supplierSelect !== 0 ? (
                        <Box>
                          <Box sx={{ flex: 1, pt: 2, display: 'flex', gap: 1, pr: 2 }}>
                            <Box sx={{ flex: 1.5 }}>
                              <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'black', pl: 0.5 }}>
                                Supplier Contacted Employee
                                <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                              </Typography>
                              <EmployeeSelectJoyAutoComp employee={supplContctEmp} setEmployee={setsupplContctEmp} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'black', pl: 0.5 }}>
                                Contacted Date.
                                <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                              </Typography>
                              <Input
                                type="datetime-local"
                                name="contacted_date"
                                value={contacted_date || ''}
                                onChange={UpdateSupplcontact}
                                slotProps={{
                                  input: {
                                    max: currentDateTime
                                  }
                                }}
                              />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'black', pl: 0.5 }}>
                                Expected date for the service visit.
                                <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                              </Typography>
                              <Input
                                type="date"
                                name="expected_service_vists"
                                value={expected_service_vists || ''}
                                onChange={UpdateSupplcontact}
                              />
                            </Box>
                          </Box>

                          <Box sx={{ flex: 1, display: 'flex', gap: 1, mt: 1 }}>
                            <Box sx={{ flex: 2 }}>
                              <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'black', pl: 0.5 }}>
                                Response From Supplier
                                <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                              </Typography>
                              <Textarea
                                type="text"
                                placeholder="type here..."
                                name="supplier_response"
                                value={supplier_response || ''}
                                onChange={UpdateSupplcontact}
                              />
                            </Box>
                            <Box sx={{ width: 45, mr: 1 }} onClick={AddSupplierContactDetails}>
                              <CheckCircleIcon sx={{ width: 34, height: 34, mt: 2.6, cursor: 'pointer' }} />
                            </Box>
                          </Box>
                        </Box>
                      ) : null}
                      {serviceSupplDetails.length > 0 ? (
                        <Box sx={{ mr: 2, my: 1 }}>
                          <Table stickyHeader size="sm" sx={{ borderRadius: 2 }} borderAxis="both">
                            <thead>
                              <tr>
                                <th style={{ textAlign: 'center', width: 10 }}>Action</th>
                                <th style={{ textAlign: 'center', width: 40 }}>Supplier</th>
                                <th style={{ textAlign: 'center', width: 30 }}>Contacted Employee</th>
                                <th style={{ textAlign: 'center', width: 30 }}>Contacted Date</th>
                                <th style={{ textAlign: 'center', width: 20 }}>Expected Service Visit</th>
                                <th style={{ textAlign: 'center', width: 40 }}>Response</th>
                              </tr>
                            </thead>
                            <tbody>
                              {serviceSupplDetails?.map((val, index) => {
                                return (
                                  <tr key={index}>
                                    <td style={{ textAlign: 'center' }}>
                                      <ModeEditIcon sx={{ cursor: 'pointer' }} onClick={() => EditRow(val)} />
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{val.it_supplier_name}</td>
                                    <td style={{ textAlign: 'center' }}>{val.em_name}</td>
                                    <td style={{ textAlign: 'center' }}>{val.contacted_date}</td>
                                    <td style={{ textAlign: 'center' }}>{val.expected_service_vists}</td>
                                    <td style={{ textAlign: 'center' }}>{val.supplier_response}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </Table>
                        </Box>
                      ) : null}
                    </Box>
                    <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2, mt: 0.5 }}>
                      <TextComponent
                        text={'SERVICE CONDITION'}
                        sx={{
                          flex: 1,
                          fontWeight: 500,
                          color: 'black',
                          fontSize: 15
                        }}
                      />
                      <Box sx={{ display: 'flex', flex: 1, mt: 2 }}>
                        <Box sx={{ pt: 0.4 }}>
                          <Checkbox
                            size="md"
                            color="primary"
                            checked={flags.serviceCheck === 1}
                            onChange={event =>
                              setFlags(prevFlags => ({
                                ...prevFlags,
                                serviceCheck: event.target.checked ? 1 : 0
                              }))
                            }
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: '#394060',
                            pl: 1
                          }}
                        >
                          Service Done
                        </Typography>
                      </Box>
                      {flags.serviceCheck === 1 ? (
                        <Box>
                          <Box sx={{ flex: 1, display: 'flex', mt: 1.5, gap: 1 }}>
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{ color: '#32383E', fontSize: 14, fontWeight: 500, pl: 0.5 }}>
                                Service Completed Date
                                <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                              </Typography>
                              <Input
                                type="datetime-local"
                                name="suppl_serviced_date"
                                value={suppl_serviced_date}
                                onChange={UpdateServicedtl}
                                slotProps={{
                                  input: {
                                    max: currentDateTime
                                  }
                                }}
                              />
                            </Box>
                            <Box sx={{ flex: 2 }}>
                              <Typography sx={{ color: '#32383E', fontSize: 14, fontWeight: 500, pl: 0.5 }}>
                                Serviced Supplier
                                <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                              </Typography>
                              <SupplierDetailsAutoComplte value={servicedSuppl} setValue={setServicedSuppl} />
                            </Box>

                            <Box
                              sx={{
                                flex: 4,
                                mr: 1
                              }}
                            >
                              <Typography sx={{ color: '#32383E', fontSize: 14, fontWeight: 500, pl: 0.5 }}>
                                Services Performed
                              </Typography>
                              <Textarea
                                type="text"
                                placeholder="type here..."
                                name="suppl_serviced_remarks"
                                value={suppl_serviced_remarks || ''}
                                onChange={UpdateServicedtl}
                              />
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              width: 180,
                              borderRadius: 5,
                              py: 0.5,
                              bgcolor: '#1B669D',
                              boxShadow: '1px 2px 4px',
                              cursor: 'pointer',
                              color: 'white',
                              mt: 1,
                              mb: 2.5,
                              '&:hover': { bgcolor: '#7391C8', color: 'white' },
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                            onClick={AddTostock}
                          >
                            Service Completed
                          </Box>
                        </Box>
                      ) : null}
                      <Box sx={{ display: 'flex', flex: 1, mt: 1 }}>
                        <Box sx={{ pt: 0.4 }}>
                          <Checkbox
                            size="md"
                            checked={flags.notserviceCheck === 1}
                            color="danger"
                            onChange={event =>
                              setFlags(prevFlags => ({
                                ...prevFlags,
                                notserviceCheck: event.target.checked ? 1 : 0
                              }))
                            }
                          />
                        </Box>
                        <Typography sx={{ color: '#394060', fontWeight: 600, pl: 1 }}>
                          Not Serviceable / Not Repairable
                        </Typography>
                      </Box>
                      {flags.notserviceCheck === 1 ? (
                        <Box sx={{ pt: 1, pr: 1.5, mb: 3 }}>
                          <Textarea
                            type="text"
                            minRows={2}
                            placeholder="remarks..."
                            name="condm_transf_remarks"
                            value={condm_transf_remarks || ''}
                            onChange={UpdateServicedtl}
                          />
                          <Box
                            sx={{
                              width: 250,
                              borderRadius: 5,
                              py: 0.5,
                              bgcolor: '#8B0000',
                              boxShadow: '1px 2px 3px',
                              cursor: 'pointer',
                              mt: 1,
                              color: 'white',
                              '&:hover': { bgcolor: '#E44650', color: 'white' },
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                            onClick={TransferToCondmination}
                          >
                            Transfer to Condemnation List
                          </Box>
                        </Box>
                      ) : null}
                    </Box>
                    {UploadedFiles.length !== 0 ? (
                      <Box
                        sx={{
                          flex: 1,
                          border: 1,
                          borderRadius: 4,
                          my: 0.5,
                          borderColor: '#CDD7E1',
                          pl: 1,
                          mr: 0.5
                        }}
                      >
                        <TextComponent
                          text={'SERVICE ATTACHMENTS'}
                          sx={{
                            flex: 1,
                            fontWeight: 500,
                            color: 'black',
                            fontSize: 15,
                            mt: 1,
                            ml: 1
                          }}
                        />
                        <Box sx={{ flex: 1, mr: 1, my: 0.5 }}>
                          {UploadedFiles.length !== 0 && (
                            <Grid container spacing={0.5}>
                              {UploadedFiles.map((url, index) => {
                                const isPdf = url.toLowerCase().endsWith('.pdf')
                                const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url)

                                return (
                                  <Grid xs={12} sm={6} md={4} key={index}>
                                    <Box
                                      sx={{
                                        alignItems: 'center',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '4px',
                                        p: 0.5,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'nowrap',
                                        bgcolor: '#fff'
                                      }}
                                    >
                                      {isImage ? (
                                        <img
                                          src={url}
                                          alt={`Complaint file ${index}`}
                                          style={{
                                            width: '70px',
                                            height: '60px',
                                            objectFit: 'cover',
                                            borderRadius: '4px',
                                            marginRight: '8px',
                                            cursor: 'pointer'
                                          }}
                                          onClick={() => SingleView({ url })}
                                        />
                                      ) : isPdf ? (
                                        <PictureAsPdfIcon
                                          sx={{
                                            width: '60px',
                                            height: '60px',
                                            color: '#e53935',
                                            marginRight: '8px',
                                            cursor: 'pointer'
                                          }}
                                          onClick={() => SingleView({ url })}
                                        />
                                      ) : (
                                        <InsertDriveFileIcon
                                          sx={{
                                            width: '60px',
                                            height: '60px',
                                            color: '#9e9e9e',
                                            marginRight: '8px',
                                            cursor: 'pointer'
                                          }}
                                          onClick={() => SingleView({ url })}
                                        />
                                      )}
                                      <Box
                                        sx={{
                                          fontSize: 14,
                                          cursor: 'pointer',
                                          flexGrow: 1,
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap'
                                        }}
                                      >
                                        {url.split('/').pop()}
                                      </Box>
                                    </Box>
                                  </Grid>
                                )
                              })}
                            </Grid>
                          )}
                        </Box>
                      </Box>
                    ) : null}
                    <Box
                      sx={{
                        flex: 1,
                        border: 1,
                        mr: 0.5,
                        borderRadius: 4,
                        mt: 0.5,
                        mb: 2,
                        display: 'flex',
                        borderColor: '#CDD7E1'
                      }}
                    >
                      <label htmlFor="file-input">
                        <Box
                          sx={{
                            bgcolor: '#EBEFFB',
                            px: 1.5,
                            borderRadius: 1,
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#F0F4F8' },
                            textAlign: 'center',
                            height: '58px',
                            m: 0.5,
                            pt: 0.4
                          }}
                        >
                          <UploadFileRoundedIcon sx={{ color: '#1873CE' }} />
                          <Typography
                            sx={{
                              color: '#1873CE',
                              fontSize: 13,
                              px: 0.3,
                              pt: 0.1,
                              fontWeight: 600
                            }}
                          >
                            Attach File
                          </Typography>
                        </Box>
                      </label>
                      <input
                        id="file-input"
                        type="file"
                        accept=".jpg, .jpeg, .png, .pdf"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        name="file"
                        multiple
                      />
                      <Box sx={{ flex: 1 }}>
                        {selectFile.length !== 0 ? (
                          <Box
                            sx={{
                              display: 'flex',
                              flex: 1,
                              overflowY: 'auto',
                              border: 1,
                              borderColor: 'lightgrey',
                              p: 0.4,
                              my: 0.5
                            }}
                          >
                            {selectFile.length !== 0 &&
                              selectFile.map((file, index) => (
                                <Box
                                  key={index}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '4px',
                                    p: 0.5,
                                    mr: 0.5
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
                                  <ClearSharpIcon
                                    sx={{
                                      pl: 0.3,
                                      pb: 0.3,
                                      height: 20,
                                      width: 20,
                                      cursor: 'pointer',
                                      color: '#4D0011',
                                      mx: 0.5,
                                      '&:hover': { color: '#BA0F30' }
                                    }}
                                    onClick={() => handleRemoveFile(index)}
                                  />
                                </Box>
                              ))}
                          </Box>
                        ) : null}
                      </Box>
                      <Box
                        sx={{
                          bgcolor: '#1873CE ',
                          px: 1.5,
                          borderRadius: 1,
                          cursor: 'pointer',
                          '&:hover': { bgcolor: '#0857A2' },
                          textAlign: 'center',
                          height: '58px',
                          m: 0.5,
                          pt: 0.4,
                          boxShadow: '1px 1px 3px'
                        }}
                        onClick={AddServiceDetails}
                      >
                        <UploadFileRoundedIcon sx={{ color: '#EBEFFB' }} />
                        <Typography sx={{ color: '#EBEFFB', fontSize: 13, px: 0.3, pt: 0.1, fontWeight: 600 }}>
                          Upload
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>
                {spare_asset_no === undefined ? (
                  <TabPanel
                    value={3}
                    sx={{
                      p: 0,
                      flexGrow: 1,
                      overflowY: 'auto',
                      maxHeight: 'calc(90vh - 230px)'
                    }}
                  >
                    <Box
                      sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        maxHeight: '100%',
                        m: 0,
                        mt: 0.5
                      }}
                    >
                      <ServicePmTab
                        am_item_map_slno={am_item_map_slno}
                        item_asset_no={item_asset_no}
                        am_spare_item_map_slno={am_spare_item_map_slno}
                        item_asset_no_only={item_asset_no_only}
                        am_category_pm_days={am_category_pm_days}
                      />
                    </Box>
                  </TabPanel>
                ) : null}
                <TabPanel
                  value={4}
                  sx={{
                    p: 0,
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: 'calc(90vh - 230px)'
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      overflowY: 'auto',
                      maxHeight: '100%',
                      m: 0
                    }}
                  >
                    <BreakDownDetails
                      alldetailsService={alldetailsService}
                      fileView={fileView}
                      deptServiceempList={deptServiceempList}
                      fileViewAssetService={fileViewAssetService}
                    />
                  </Box>
                </TabPanel>
                <TabPanel
                  value={5}
                  sx={{
                    p: 0,
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: 'calc(90vh - 230px)'
                  }}
                >
                  <Box>
                    <DocumentsList
                      serviceDetails={serviceDetails}
                      setFlags={setFlags}
                      setViewStates={setViewStates}
                      flags={flags}
                      viewStates={viewStates}
                    />
                  </Box>
                </TabPanel>
              </Tabs>
            </Box>
            <Box sx={{ pb: 1, mr: 2, mt: 'auto', flexShrink: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                <Button variant="plain" sx={buttonStyle} onClick={Close}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(ServiceDetailsModal)
