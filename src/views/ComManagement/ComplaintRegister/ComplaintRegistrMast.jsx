import { Paper } from '@mui/material'
import React, { useCallback, useEffect, useState, useMemo, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { getComplainttype } from 'src/redux/actions/ComplaintType.action'
import CustomTextarea from 'src/views/Components/CustomTextarea'
import { getHicpolicy } from 'src/redux/actions/HicPolicy.action'
import ComplaintRegTable from './ComplaintRegTable'
import { setLoginProfileData } from 'src/redux/actions/LoginProfile.action'
import ComplaintCheckBox from './ComplaintCheckBox'
import { Avatar, Box, Button, CssVarsProvider, Grid, Input, Tooltip, Typography } from '@mui/joy'
import { memo } from 'react'
import { getCompliantRegTable } from 'src/redux/actions/ComplaintRegTable.action'
import ComDeptCheckBox from './ComDeptCheckBox'
import { getComplaintSlno } from 'src/views/Constant/Constant'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import CmRoomNameTypeList from 'src/views/CommonSelectCode/CmRoomNameTypeList'
import { getRoomsNameNdTypeList } from 'src/redux/actions/CmRoomNameNdTypeList.action'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import SquareIcon from '@mui/icons-material/Square'
import CommentIcon from '@mui/icons-material/Comment'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt'
import imageCompression from 'browser-image-compression'
import CmAssetList from '../CmComponent/CmAssetList'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCustodianDetails } from 'src/api/AssetApis'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ClearSharpIcon from '@mui/icons-material/ClearSharp'
import FileViewSingle from 'src/views/Components/FileViewSingle'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import PersonSharpIcon from '@mui/icons-material/PersonSharp'
import CardMastComplaint from 'src/views/Components/CardMastComplaint'
import Switch from '@mui/joy/Switch'

const ComplaintRegistrMast = ({ verficationPending, count, setCount }) => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const [crical, setCritical] = useState(false)
  const [priority, setpriority] = useState(0)
  const [edit, setEdit] = useState(0)
  const [desc, setdesc] = useState('')
  const [priorreason, setPriorreason] = useState('')
  const [cotype, setcotype] = useState(false)
  const [codept, setcodept] = useState(null)
  const [depsec, setDepsec] = useState(0)
  const [roomName, setRoomName] = useState(null)
  const [open, setOpen] = useState(false)
  const [complaint_slno, setComplaint] = useState(0)
  const [cm_am_assetmap_slno, setcm_am_assetmap_slno] = useState('')
  const [item_slno, setItem_slno] = useState(0)
  const [assetStatus, setAssetStatus] = useState(0)
  const [selectedAsset, setSelectedAsset] = useState('')
  const [search, setSearch] = useState(0)
  const [select, setSelect] = useState(1)
  const [assetArray, setAssetArray] = useState([])
  const [deletedFiles, setDeletedFiles] = useState([])
  const [newlyAddedAssets, setNewlyAddedAssets] = useState([])
  const [selectFile, setSelectFile] = useState([])
  const [assetData, setassetData] = useState(0)
  const [asset_dept, setasset_dept] = useState('')
  const [custodianDept, setcustodianDept] = useState(0)
  const [previewFile, setPreviewFile] = useState({ url: '', type: '' })
  const [imageShow, setImageShow] = useState(false)
  const [imageShowFlag, setImageShowFlag] = useState(0)
  const [locationDetails, setlocationDetails] = useState('')
  const queryClient = useQueryClient()

  useEffect(() => {
    getComplaintSlno().then(val => {
      setComplaint(val)
    })
  }, [count])

  // const logOut_time = useSelector(state => {
  //   return state.LoginUserData.logOut
  // })

  // useEffect(() => {
  //   const now = new Date()
  //   if (now.getTime() < new Date(logOut_time).getTime()) {
  //     history('/Home/ComplaintRegister')
  //   } else {
  //     history('/')
  //   }
  // }, [codept, history, logOut_time])

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const secName = useSelector(state => {
    return state.LoginUserData.empdeptsec
  })

  const empsecid = useSelector(state => {
    return state.LoginUserData.empsecid
  })

  useEffect(() => {
    dispatch(getRoomsNameNdTypeList(empsecid))
  }, [dispatch, empsecid])

  useEffect(() => {
    dispatch(getHicpolicy())
    dispatch(getComplaintDept())
    if (codept !== null) {
      dispatch(getComplainttype(codept))
    }
    dispatch(setLoginProfileData(id))
  }, [dispatch, id, codept])

  // getting redux data state
  const state = useSelector(state => {
    return {
      complaintdeptdata: state.getComplaintDept.complaintdeptList || 0,
      // requesttypedata: state.getRequesttype.requesttypeList || 0,
      complainttype: state.getComplainttype.complainttypeList || 0,
      hicpolicy: state.getHicpolicy.hicpolicyList || 0
    }
  })
  //destructuring redux data
  const { complaintdeptdata, complainttype } = state

  //function for complaint description state updation
  const complintdesc = useCallback(e => {
    setdesc(e.target.value)
  }, [])
  const updatePriorreason = useCallback(e => {
    setPriorreason(e.target.value)
  }, [])

  const LocationDetailz = useCallback(e => {
    setlocationDetails(e.target.value)
  }, [])

  /*** Priority seting Check box */
  //fn for critical state updation
  const getCritical = useCallback(e => {
    if (e.target.checked === true) {
      setCritical(true)
      setpriority(1)
    } else {
      setCritical(false)
      setpriority(0)
    }
  }, [])

  const [checkHic, setChechHic] = useState(false)
  const getHicCheck = useCallback(e => {
    if (e.target.checked === true) {
      setChechHic(true)
    } else {
      setChechHic(false)
    }
  }, [])

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
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  }, [])

  const handleRemoveFile = index => {
    setSelectFile(prevFiles => {
      const updatedFiles = [...prevFiles]
      updatedFiles.splice(index, 1) // Remove the file at the specified index
      return updatedFiles
    })
  }

  //insert data
  const postdata = useMemo(() => {
    return {
      complaint_slno: complaint_slno,
      complaint_desc: desc,
      complaint_dept_secslno: empsecid,
      complaint_request_slno: 1,
      complaint_deptslno: codept,
      complaint_typeslno: cotype,
      priority_check: priority,
      complaint_hicslno: checkHic === true ? 1 : 0,
      compalint_status: 0,
      cm_location: empsecid,
      create_user: id,
      priority_reason: priority === 1 ? priorreason : null,
      locationName: secName,
      priority: priority === 1 ? 'Priority Ticket' : 'Normal Ticket',
      rm_room_slno: roomName === '' ? null : roomName,
      cm_asset_status: assetArray.length !== 0 ? 1 : 0,
      cm_complaint_location: locationDetails === '' ? null : locationDetails
    }
  }, [
    desc,
    empsecid,
    cotype,
    priorreason,
    priority,
    codept,
    id,
    secName,
    complaint_slno,
    roomName,
    checkHic,
    assetArray,
    locationDetails
  ])

  //Data set for edit
  const rowSelect = useCallback(val => {
    setEdit(1)
    setSelect(1)
    setSearch(0)
    const {
      complaint_typeslno,
      complaint_hicslno,
      cm_location,
      priority_reason,
      complaint_deptslno,
      complaint_slno,
      complaint_desc,
      priority_check,
      rm_room_slno,
      compl_dept,
      cm_complaint_location
    } = val
    setDepsec(cm_location)
    setComplaint(complaint_slno)
    setcotype(complaint_typeslno)
    setChechHic(complaint_hicslno === 1 ? true : false)
    setpriority(priority_check)
    setcodept(complaint_deptslno)
    setdesc(complaint_desc)
    setPriorreason(priority_reason)
    setCritical(priority_check === 1 ? true : false)
    setRoomName(rm_room_slno)
    setcustodianDept(compl_dept)
    setlocationDetails(cm_complaint_location)
  }, [])
  const patchdata = useMemo(() => {
    return {
      complaint_desc: desc,
      complaint_dept_secslno: empsecid,
      complaint_request_slno: 1,
      complaint_deptslno: codept,
      complaint_typeslno: cotype,
      priority_check: priority,
      complaint_hicslno: checkHic === true ? 1 : 0,
      compalint_status: 0,
      cm_location: depsec,
      edit_user: id,
      priority_reason: priority === 1 ? priorreason : null,
      complaint_slno: complaint_slno,
      rm_room_slno: roomName === 0 ? null : roomName,
      cm_asset_status: assetArray.length !== 0 ? 1 : 0,
      cm_complaint_location: locationDetails === null ? '' : locationDetails
    }
  }, [
    desc,
    empsecid,
    depsec,
    codept,
    cotype,
    priority,
    priorreason,
    complaint_slno,
    id,
    roomName,
    checkHic,
    assetArray,
    locationDetails
  ])

  useEffect(() => {
    if (edit === 1) {
      const getAssetinComplaint = async complaint_slno => {
        const result = await axioslogin.get(`/complaintreg/getAssetinComplaint/${complaint_slno}`)
        const { success, data } = result.data
        if (success === 2) {
          setAssetArray(data)
        } else {
          setAssetArray([])
        }
      }
      getAssetinComplaint(complaint_slno)
    } else {
    }
  }, [complaint_slno, edit])

  /*** usecallback function for form submitting */
  const updateAssetz =
    newlyAddedAssets &&
    newlyAddedAssets.map(val => {
      return {
        cm_complait_slno: complaint_slno,
        cm_am_assetmap_slno: val.item_asset_no_only,
        cm_asset_dept: val.item_asset_no,
        am_item_map_slno: val.am_item_map_slno,
        asset_status: 1,
        create_user: id
      }
    })

  const assetinactive =
    deletedFiles &&
    deletedFiles.map(val => {
      return {
        comasset_mapping_slno: val.comasset_mapping_slno,
        asset_status: 0,
        edit_user: id
      }
    })

  const reset = useCallback(() => {
    setComplaint(0)
    setcotype(false)
    setChechHic(false)
    setpriority(0)
    setcodept(null)
    setCritical(false)
    setdesc('')
    setDepsec(0)
    setPriorreason('')
    setCount(0)
    setEdit(0)
    setOpen(false)
    setItem_slno(0)
    setSearch(0)
    setSelect(0)
    setcm_am_assetmap_slno('')
    setSelectedAsset('')
    setRoomName(null)
    setAssetArray([])
    setNewlyAddedAssets([])
    setDeletedFiles([])
    setSelectFile([])
    setlocationDetails('')
  }, [setCount])

  const submitComplaint = useCallback(
    async e => {
      e.preventDefault()
      if (codept === null) {
        infoNotify('Please Select Complaint Department')
        return
      }
      if (cotype === false) {
        infoNotify('Please Select Complaint Type')
        return
      }
      if ((cm_am_assetmap_slno !== '' && assetStatus === 0) || (selectedAsset !== '' && assetStatus === 0)) {
        infoNotify(
          <>
            Please click on &apos; <AddCircleIcon /> &apos; to add Asset details
          </>
        )
        return
      }
      if (priority === 1 && (priorreason === '' || priorreason === null)) {
        infoNotify(<>Please Add Priority Reason</>)
        return
      }

      if (!roomName && !locationDetails) {
        infoNotify('Please Select Location or Mark Location Details')
        return
      }
      if (verficationPending.length > 2) {
        infoNotify('Please verify all resolved tickets before registering new ticket.')
        return
      }
      setOpen(true)
      const InsertFun = async postdata => {
        const result = await axioslogin.post('/complaintreg', postdata)
        return result.data
      }
      const InsertAsset = async inserAsset => {
        const result = await axioslogin.post('/complaintreg/insertAssetArray', inserAsset)
        return result.data
      }

      const updateAsset = async updateAssetz => {
        const result = await axioslogin.post('/complaintreg/insertAssetArray', updateAssetz)
        return result.data
      }

      const updateFun = async patchdata => {
        const result = await axioslogin.patch('/complaintreg', patchdata)
        return result.data
      }

      const inactiveAsset = async assetinactive => {
        const result = await axioslogin.patch('/complaintreg/assetinactive', assetinactive)
        return result.data
      }

      const deleteInsertedData = async insertId => {
        const result = await axioslogin.delete(`/complaintreg/deleteTicket/${insertId}`)
        return result.data
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
          const uploadResult = await axioslogin.post('/complaintFileUpload/uploadFile/Complaint', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          return uploadResult.data
        } catch (error) {
          warningNotify('An error occurred during file upload.')
        }
      }

      try {
        if (edit === 1) {
          const updateResponse = await updateFun(patchdata)
          const { message, success } = updateResponse
          if (success === 2) {
            if (newlyAddedAssets.length !== 0) {
              if (deletedFiles.length !== 0) {
                const inactiveResponse = await inactiveAsset(assetinactive)
                const { success } = inactiveResponse
                if (success === 1) {
                  const assetUpdateResponse = await updateAsset(updateAssetz)
                  if (assetUpdateResponse.success === 1) {
                    if (selectFile.length !== 0) {
                      const fileUploadResponse = await InsertFile(selectFile, complaint_slno)
                      if (fileUploadResponse.success === 1) {
                        succesNotify('Complaint Updated Successfully')
                        setCount(count + 1)
                        queryClient.invalidateQueries('GetAllPendingComplaints')

                        setOpen(false)
                        reset()
                      } else {
                        warningNotify(fileUploadResponse.message)
                      }
                    } else {
                      succesNotify('Complaint Updated Successfully')
                      setCount(count + 1)
                      queryClient.invalidateQueries('GetAllPendingComplaints')

                      setOpen(false)
                      reset()
                    }
                  } else {
                    infoNotify('Unable to add asset details')
                  }
                }
              } else {
                const assetUpdateResponse = await updateAsset(updateAssetz)
                if (assetUpdateResponse.success === 1) {
                  if (selectFile.length !== 0) {
                    const fileUploadResponse = await InsertFile(selectFile, complaint_slno)
                    if (fileUploadResponse.success === 1) {
                      succesNotify('Complaint Updated Successfully')
                      setCount(count + 1)
                      queryClient.invalidateQueries('GetAllPendingComplaints')

                      setOpen(false)
                      reset()
                    } else {
                      warningNotify(fileUploadResponse.message)
                    }
                  } else {
                    succesNotify('Complaint Updated Successfully')
                    setCount(count + 1)
                    queryClient.invalidateQueries('GetAllPendingComplaints')

                    setOpen(false)
                    reset()
                  }
                } else {
                  infoNotify('Unable to add asset details')
                }
              }
            } else {
              if (deletedFiles.length !== 0) {
                const inactiveResponse = await inactiveAsset(assetinactive)
                const { success } = inactiveResponse
                if (success === 1) {
                  if (selectFile.length !== 0) {
                    const fileUploadResponse = await InsertFile(selectFile, complaint_slno)
                    if (fileUploadResponse.success === 1) {
                      succesNotify('Complaint Updated Successfully')
                      setCount(count + 1)
                      queryClient.invalidateQueries('GetAllPendingComplaints')

                      setOpen(false)
                      reset()
                    } else {
                      warningNotify(fileUploadResponse.message)
                    }
                  } else {
                    succesNotify('Complaint Updated Successfully')
                    setCount(count + 1)
                    queryClient.invalidateQueries('GetAllPendingComplaints')

                    setOpen(false)
                    reset()
                  }
                } else {
                  infoNotify('Unable to delete asset details')
                }
              } else {
                if (selectFile.length !== 0) {
                  const fileUploadResponse = await InsertFile(selectFile, complaint_slno)
                  if (fileUploadResponse.success === 1) {
                    succesNotify('Complaint Updated Successfully')
                    setCount(count + 1)
                    queryClient.invalidateQueries('GetAllPendingComplaints')

                    setOpen(false)
                    reset()
                  } else {
                    warningNotify(fileUploadResponse.message)
                  }
                } else {
                  succesNotify('Complaint Updated Successfully')
                  setCount(count + 1)
                  queryClient.invalidateQueries('GetAllPendingComplaints')

                  setOpen(false)
                  reset()
                }
              }
            }
          } else {
            infoNotify(message)
            setOpen(false)
          }
        } else {
          const insertResponse = await InsertFun(postdata)
          const { message, success, insertId } = insertResponse
          if (success === 1) {
            try {
              if (assetArray.length !== 0) {
                const inserAsset = assetArray.map(val => ({
                  cm_complait_slno: insertId,
                  cm_am_assetmap_slno: val.item_asset_no_only,
                  cm_asset_dept: val.item_asset_no,
                  am_item_map_slno: val.am_item_map_slno,
                  asset_status: 1,
                  create_user: id
                }))
                const assetInsertResponse = await InsertAsset(inserAsset)
                if (assetInsertResponse.success !== 1) {
                  throw new Error('Asset insertion failed')
                }
              }
              if (selectFile.length !== 0) {
                const fileUploadResponse = await InsertFile(selectFile, insertId)
                if (fileUploadResponse.success !== 1) {
                  infoNotify(fileUploadResponse.message || 'File upload failed')
                  throw new Error('File upload failed')
                }
              }
              succesNotify('Complaint Registered Successfully')
              setCount(count + 1)
              queryClient.invalidateQueries('GetAllPendingComplaints')
              setOpen(false)
              reset()
            } catch (error) {
              await deleteInsertedData(insertId)
              warningNotify(error.message || 'An error occurred during asset or file insertion.')
              setOpen(false)
            }
          } else {
            infoNotify(message)
            setOpen(false)
          }
        }
      } catch (error) {
        infoNotify('An error occurred during complaint submission.')
        setOpen(false)
      }
    },
    [
      postdata,
      edit,
      assetArray,
      patchdata,
      assetinactive,
      count,
      cm_am_assetmap_slno,
      assetStatus,
      updateAssetz,
      handleImageUpload,
      complaint_slno,
      cotype,
      selectFile,
      codept,
      deletedFiles.length,
      newlyAddedAssets.length,
      reset,
      selectedAsset,
      id,
      roomName,
      locationDetails,
      priority,
      priorreason,
      setCount,
      verficationPending.length,
      queryClient
    ]
  )

  const refreshWindow = useCallback(() => {
    setComplaint(0)
    setcotype(false)
    setChechHic(false)
    setpriority(0)
    setCritical(false)
    setdesc('')
    setDepsec(0)
    setcodept(null)
    setPriorreason('')
    setCount(0)
    setEdit(0)
    setOpen(false)
    setItem_slno(0)
    setcm_am_assetmap_slno('')
    setSelectedAsset('')
    setSearch(0)
    setSelect(0)
    setRoomName(null)
    setAssetArray([])
    setNewlyAddedAssets([])
    setDeletedFiles([])
    setSelectFile([])
    setlocationDetails('')
  }, [setCount])

  useEffect(() => {
    if (empsecid !== 0) {
      dispatch(getCompliantRegTable(empsecid))
    }
  }, [count, empsecid, dispatch])

  const UpdateAssetNo = useCallback(e => {
    setcm_am_assetmap_slno(e.target.value.toLocaleUpperCase())
    setAssetStatus(0)
  }, [])

  const [custFirstName, setcustFirstName] = useState('')
  const [custSecName, setcustSecName] = useState('')

  const { data: custodianDetailsData, isSuccess } = useQuery({
    queryKey: ['getCustodianDetailz', custodianDept],
    enabled: custodianDept !== 0,
    queryFn: () => getCustodianDetails(custodianDept)
  })

  const custodianDetails = useMemo(() => custodianDetailsData, [custodianDetailsData])

  useEffect(() => {
    if (isSuccess && custodianDetails?.length > 0) {
      const { am_custdn_asset_no_first, am_custdn_asset_no_second } = custodianDetails[0]
      setcustFirstName(am_custdn_asset_no_first)
      setcustSecName(am_custdn_asset_no_second)
    }
  }, [isSuccess, custodianDetails])

  const searchAssetNo = useCallback(
    () => {
      if (cm_am_assetmap_slno === '') {
        infoNotify('Please Enter Asset Number')
      } else {
        const starts = custFirstName + '/' + custSecName
        const asset_number = parseInt(cm_am_assetmap_slno)
        const postdata = {
          item_asset_no: starts,
          item_asset_no_only: asset_number
        }

        const getAssetdata = async postdata => {
          const result = await axioslogin.post('/PasswordManagementMain/getAssetNo', postdata)
          const { data, success } = result.data
          if (data.length !== 0) {
            if (success === 1) {
              const { item_deptsec_slno } = data[0]
              if (item_deptsec_slno === empsecid) {
                setassetData(0)
                const { item_name, sec_name, am_item_map_slno, item_asset_no, item_asset_no_only } = data[0]
                const assetExists = assetArray.some(asset => asset.item_asset_no_only === item_asset_no_only)
                if (assetExists) {
                  infoNotify('You already added this asset in complaint')
                } else {
                  const newAsset = {
                    item_name,
                    sec_name,
                    am_item_map_slno,
                    item_asset_no_only,
                    item_asset_no
                  }
                  setAssetArray(prevArray => [...prevArray, newAsset])
                  if (edit === 1) {
                    setNewlyAddedAssets(prevAssets => [...prevAssets, newAsset])
                  }
                  setcm_am_assetmap_slno('')
                }
              } else {
                infoNotify("Can't find Searched Asset Under Department Section")
              }
            }
            return result.data
          } else {
            warningNotify('Asset number not found')
          }
        }
        getAssetdata(postdata)
        setAssetStatus(1)
      }
    },
    [cm_am_assetmap_slno, assetArray, custFirstName, custSecName, empsecid, edit]
  )

  const searchAssetNoinMenu = useCallback(
    () => {
      if (item_slno === 0) {
        infoNotify('Please select Asset')
      } else {
        const asset_number = parseInt(item_slno)
        const postdata = {
          item_asset_no: asset_dept,
          item_asset_no_only: asset_number
        }
        const getAssetdata = async postdata => {
          const result = await axioslogin.post('/PasswordManagementMain/getAssetNo', postdata)
          const { data, success } = result.data
          if (data.length !== 0) {
            if (success === 1) {
              setassetData(0)
              const { item_name, sec_name, am_item_map_slno, item_asset_no_only, item_asset_no } = data[0]
              // Check if the asset already exists in the array
              const assetExists = assetArray.some(asset => asset.item_asset_no_only === item_asset_no_only)
              if (assetExists) {
                infoNotify('You already added this asset in complaint')
              } else {
                const newAsset = {
                  item_name,
                  sec_name,
                  am_item_map_slno,
                  item_asset_no_only,
                  item_asset_no
                }
                setAssetArray(prevArray => [...prevArray, newAsset])
                // Condition to add to newly added assets only if edit is 1
                if (edit === 1) {
                  setNewlyAddedAssets(prevAssets => [...prevAssets, newAsset])
                }
                setSelectedAsset(0)
              }
            }
            return result.data
          } else {
            warningNotify('Select Asset Under Complaint Department')
          }
        }
        getAssetdata(postdata)
        setAssetStatus(1)
      }
    },
    [item_slno, assetArray, asset_dept, edit]
  )

  const ClearAssetSelection = () => {
    setItem_slno(0)
    setcm_am_assetmap_slno('')
  }

  const [isSelect, setIsSelect] = useState(true)
  const handleToggle = () => {
    setIsSelect(prev => {
      const newValue = !prev
      if (newValue) {
        setSelect(1)
        setSearch(0)
        setcm_am_assetmap_slno('')
      } else {
        setSearch(1)
        setSelect(0)
        setSelectedAsset('')
      }
      return newValue
    })
  }

  const handleDelete = indexToDelete => {
    setAssetArray(prevArray => {
      const itemToDelete = prevArray[indexToDelete]
      const updatedArray = prevArray.filter((_, index) => index !== indexToDelete)
      if (edit === 1) {
        setDeletedFiles(prevDeletedFiles => [...prevDeletedFiles, itemToDelete])
      }
      return updatedArray
    })
  }

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
    setImageShow(true)
    setImageShowFlag(1)
  }, [])

  const CloseFile = useCallback(() => {
    setImageShowFlag(0)
    setImageShow(false)
  }, [])
  return (
    <Fragment>
      {imageShowFlag === 1 ? (
        <Box>
          <FileViewSingle previewFile={previewFile} imageShow={imageShow} CloseFile={CloseFile} />
        </Box>
      ) : null}

      <CardMastComplaint
        title="Ticket Registration"
        submit={submitComplaint}
        refresh={refreshWindow}
        contentStyle={{
          p: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <CustomBackDrop open={open} text="Please Wait" />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', flex: 1, width: '80%', p: 0.5, flexDirection: 'column' }}>
            <Paper variant="outlined" sx={{ p: 0.5, }} >
              <Box>
                <CssVarsProvider>
                  <Typography sx={{ color: '#9FA6AD', fontWeight: 800, fontSize: 13, pl: 0.3, pb: 0.5 }}>
                    COMPLAINT DEPARTMENT
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box sx={{ display: 'flex', flex: 1, p: 1 }}>
                {complaintdeptdata &&
                  complaintdeptdata.map(val => {
                    return (
                      <Grid key={val.complaint_dept_slno} sx={{ width: '100%' }}>
                        <ComDeptCheckBox
                          label={val.complaint_dept_name}
                          name={val.complaint_dept_name}
                          value={val.complaint_dept_slno}
                          onChange={setcodept}
                          checkedValue={codept}
                          cm_am_assetmap_slno={cm_am_assetmap_slno}
                          setcm_am_assetmap_slno={setcm_am_assetmap_slno}
                          setSelectedAsset={setSelectedAsset}
                          setItem_slno={setItem_slno}
                          setcustodianDept={setcustodianDept}
                          cust={val.department_slno}
                        />
                      </Grid>
                    )
                  })}
              </Box>
            </Paper>
            {codept !== null ? (
              <Paper variant="outlined" sx={{ p: 0.5 }} >
                <Box>
                  <CssVarsProvider>
                    <Typography sx={{ color: '#9FA6AD', fontWeight: 800, fontSize: 13, pl: 0.3, pb: 0.5 }}>
                      COMPLAINT TYPE
                    </Typography>
                  </CssVarsProvider>
                </Box>
                <Box sx={{ display: 'flex', flex: 1, p: 1 }}>
                  <Grid container spacing={{ xs: 1, md: 1 }} columns={{}} sx={{ width: '100%' }}>
                    {complainttype &&
                      complainttype.map(val => {
                        return (
                          <Grid
                            item
                            xs={2}
                            sm={4}
                            md={4}
                            lg={3}
                            xl={3}
                            key={val.complaint_type_slno}
                            sx={{ width: '100%' }}
                          >
                            <ComplaintCheckBox
                              label={val.complaint_type_name}
                              name={val.complaint_type_name}
                              value={val.complaint_type_slno}
                              onChange={setcotype}
                              checkedValue={cotype}
                              setcm_am_assetmap_slno={setcm_am_assetmap_slno}
                              setSelectedAsset={setSelectedAsset}
                              setItem_slno={setItem_slno}
                              setcustodianDept={setcustodianDept}
                              cust={val.department_slno}
                            />
                          </Grid>
                        )
                      })}
                  </Grid>
                </Box>
              </Paper>
            ) : null}
            <Paper variant="outlined" >
              <Typography sx={{ color: '#9FA6AD', fontWeight: 800, fontSize: 12, pl: 0.8, py: 0.5 }}>
                COMPLAINT LOCATION
              </Typography>
              <Box sx={{ px: 0.5, pb: 0.5, display: 'flex' }}>
                <Box sx={{ flex: 0.4, px: 0.5, pt: 0.8 }}>
                  <CssVarsProvider>
                    <Input sx={{ borderRadius: 0 }} disabled value={secName} name="secName"></Input>
                  </CssVarsProvider>
                </Box>
                <Box sx={{ flex: 0.6, px: 0.5, pt: 0.7 }}>
                  <CmRoomNameTypeList roomName={roomName} setRoomName={setRoomName} />
                </Box>
                <Box sx={{ flex: 0.6, px: 0.5, pt: 0.7 }}>
                  <Input
                    sx={{ borderRadius: 0 }}
                    name="locationDetails"
                    placeholder="Type location details here..."
                    type="text"
                    value={locationDetails}
                    onChange={LocationDetailz}
                    autoComplete="off"
                  />
                </Box>
                <Box
                  sx={{
                    flex: 0.2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pt: 0.8
                  }}
                >
                  <CssVarsProvider>
                    <Tooltip
                      title="Infection Control Risk Assessment (ICRA) Recommended"
                      size="md"
                      variant="outlined"
                      placement="top"
                    >
                      <Grid xs={2} sm={4} md={4} lg={2} xl={3}>
                        <CusCheckBox
                          color="danger"
                          size="lg"
                          name="Hic"
                          label="(ICRA) "
                          value={checkHic}
                          onCheked={getHicCheck}
                          checked={checkHic}
                        />
                      </Grid>
                    </Tooltip>
                  </CssVarsProvider>
                </Box>
              </Box>
            </Paper>
            <Box>
              <Paper variant="outlined" sx={{ flex: 1 }}>
                <Box sx={{ flex: 1, flexGrow: 1, p: 0.8 }}>
                  <Box sx={{ flex: 0.8, pr: 0.5 }}>
                    <Typography sx={{ color: '#9FA6AD', fontWeight: 800, fontSize: 12, pl: 0.3, pb: 0.5 }}>
                      ASSET DETAILS
                    </Typography>
                    <Box sx={{ display: 'flex', ml: 0.5 }}>
                      {codept !== null ? (
                        <>
                          <Switch
                            checked={isSelect}
                            color="neutral"
                            onChange={handleToggle}
                            slotProps={{
                              track: {
                                children: (
                                  <>
                                    {isSelect ? (
                                      <Typography sx={{ ml: '15px', mr: '10px', fontSize: 13 }}>Select</Typography>
                                    ) : (
                                      <Typography sx={{ ml: '30px', mr: '10px', fontSize: 13 }}>Search</Typography>
                                    )}
                                  </>
                                )
                              }
                            }}
                            sx={{
                              '--Switch-thumbSize': '21px',
                              '--Switch-trackWidth': '90px',
                              '--Switch-trackHeight': '25px'
                            }}
                          />

                          {select === 1 ? (
                            <Box sx={{ flex: 1, display: 'flex', ml: 1 }}>
                              <CssVarsProvider>
                                <Box sx={{ flex: 1 }}>
                                  <CmAssetList
                                    assetz={assetData}
                                    setAssetz={setassetData}
                                    complaint_dept_secslno={empsecid}
                                    setSelectedAsset={setSelectedAsset}
                                    setItem_slno={setItem_slno}
                                    setasset_dept={setasset_dept}
                                    codept={codept}
                                  />
                                </Box>
                                <Box sx={{ ml: 1, mr: 3 }}>
                                  <Tooltip title={'Add More Asset'}>
                                    <Avatar size="sm" sx={{ bgcolor: '#E4D4C8' }}>
                                      <AddCircleIcon
                                        sx={{
                                          p: 0.1,
                                          color: '#523A28',
                                          cursor: 'pointer',
                                          '&:hover': { color: '#34323E' },
                                          height: 30,
                                          width: 30
                                        }}
                                        onClick={searchAssetNoinMenu}
                                      />
                                    </Avatar>
                                  </Tooltip>
                                </Box>
                              </CssVarsProvider>
                            </Box>
                          ) : null}

                          {search === 1 ? (
                            <Box sx={{ flex: 1, display: 'flex', ml: 1 }}>
                              <CssVarsProvider>
                                <Box sx={{ flex: 1 }}>
                                  <Input
                                    placeholder=" Asset Number"
                                    sx={{
                                      borderRadius: 0,
                                      minHeight: 15
                                    }}
                                    type="number"
                                    autoComplete="off"
                                    startDecorator={
                                      <Button variant="soft" color="neutral">
                                        {`${custFirstName}/ ${custSecName}`}
                                      </Button>
                                    }
                                    endDecorator={
                                      <>
                                        {cm_am_assetmap_slno !== '' ? (
                                          <Box
                                            sx={{
                                              cursor: 'pointer',
                                              fontSize: 13,
                                              fontStyle: 'italic',
                                              mr: 0.3
                                            }}
                                            onClick={ClearAssetSelection}
                                          >
                                            (Clear)
                                          </Box>
                                        ) : (
                                          <></>
                                        )}
                                      </>
                                    }
                                    name="cm_am_assetmap_slno"
                                    value={cm_am_assetmap_slno || ''}
                                    onChange={UpdateAssetNo}
                                  />
                                </Box>
                                <Box sx={{ ml: 1, mr: 3 }}>
                                  <Tooltip title={'Add More Asset'}>
                                    <Avatar size="sm" sx={{ bgcolor: '#E4D4C8' }}>
                                      <AddCircleIcon
                                        sx={{
                                          p: 0.1,
                                          color: '#523A28',
                                          cursor: 'pointer',
                                          '&:hover': { color: '#34323E' },
                                          height: 30,
                                          width: 30
                                        }}
                                        onClick={searchAssetNo}
                                      />
                                    </Avatar>
                                  </Tooltip>
                                </Box>
                              </CssVarsProvider>
                            </Box>
                          ) : null}
                        </>
                      ) : null}
                    </Box>
                  </Box>
                  {assetArray.length !== 0 ? (
                    <Box sx={{ flex: 1, mx: 1.5, mt: 1.5, display: 'flex', bgcolor: '#F2ECE5' }}>
                      <Box sx={{ flex: 1, textAlign: 'center' }}>#</Box>
                      <Box sx={{ flex: 3 }}>Asset Number</Box>
                      <Box sx={{ flex: 10 }}>Asset Name</Box>

                      <Box sx={{ flex: 1, textAlign: 'center' }}>Action</Box>
                    </Box>
                  ) : null}

                  {assetArray?.map((val, index) => {
                    const formattedSlno = val.item_asset_no_only.toString().padStart(6, '0')
                    return (
                      <Box
                        key={index}
                        sx={{
                          flex: 1,
                          mx: 1.5,
                          display: 'flex',
                          borderBottom: 1,
                          borderColor: 'lightgrey',
                          pt: 0.8
                        }}
                      >
                        <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13 }}>{index + 1}</Box>
                        <Box sx={{ flex: 3, fontSize: 13 }}>
                          {val.item_asset_no}/{formattedSlno}
                        </Box>
                        <Box sx={{ flex: 10, fontSize: 13 }}>{val.item_name}</Box>
                        <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13 }}>
                          <DeleteIcon
                            sx={{ color: 'darkred', cursor: 'pointer' }}
                            onClick={() => handleDelete(index)}
                          />
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              </Paper>
            </Box>
            <Paper variant="outlined" >
              <Box sx={{ px: 0.5, pt: 0.5, display: 'flex', flex: 1 }}>
                <Box sx={{ width: '80%' }}>
                  <CustomTextarea
                    placeholder="Complaint descrition"
                    required
                    type="text"
                    minRows={2}
                    maxRows={10}
                    size="sm"
                    style={{
                      width: '100%'
                      // height: "100%",
                    }}
                    value={desc}
                    onchange={complintdesc}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: 1,
                    flex: 1
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      pt: 2
                    }}
                  >
                    <Grid xs={2} sm={4} md={4} lg={2} xl={3}>
                      <CusCheckBox
                        // variant="outlined"
                        color="danger"
                        size="lg"
                        name="Hic"
                        label="Priority"
                        value={crical}
                        onCheked={getCritical}
                        checked={crical}
                      />
                    </Grid>
                  </Box>

                  {crical === true ? (
                    <Box sx={{ width: '100%' }}>
                      <CustomTextarea
                        style={{ width: '100%' }}
                        minRows={2}
                        maxRows={3}
                        required
                        type="text"
                        placeholder="Remarks"
                        name="priorreason"
                        value={priorreason}
                        onchange={updatePriorreason}
                      />
                    </Box>
                  ) : null}
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  border: 1,
                  mx: 0.5,
                  mb: 0.5,
                  borderRadius: 1,
                  display: 'flex',
                  borderColor: 'lightgrey'
                }}
              >
                <Box sx={{ margin: 'auto' }}>
                  <label htmlFor="file-input">
                    <Box
                      sx={{
                        bgcolor: '#ECEFF7',
                        '&:hover': { bgcolor: '#E1E8F0' },
                        border: 1,
                        borderColor: '#E1E8F0',
                        m: 0.5,
                        px: 1.5,
                        cursor: 'pointer',
                        height: 48,
                        textAlign: 'center'
                      }}
                    >
                      <UploadFileRoundedIcon sx={{ color: '#0B6BCB' }} />
                      <Typography sx={{ color: '#0B6BCB', fontSize: 13, px: 0.5, pt: 0.2 }}>Attach File</Typography>
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
                </Box>
                <Box sx={{ display: 'flex', flex: 1, mx: 0.5, overflow: 'auto' }}>
                  {selectFile.length !== 0 &&
                    selectFile.map((file, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          my: 1,
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
              </Box>
            </Paper>
          </Box>
        </Box>
      </CardMastComplaint>
      <Box
        elevation={0}
        sx={{
          p: 1,
          pt: 0
        }}
      >
        <ComplaintRegTable
          rowSelect={rowSelect}
          sec={empsecid}
          count={count}
          setCount={setCount}
          verficationPending={verficationPending}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center'
        }}
      >
        <SquareIcon sx={{ color: '#B7CFDC' }} />
        <Typography sx={{ pl: 0.5, pr: 2, fontSize: 13 }}>Priority Critical</Typography>
        <PersonSharpIcon sx={{ color: '#09B009' }} />
        <Typography sx={{ pl: 0.5, pr: 2, fontSize: 13 }}>Asssinged by Employee</Typography>
        <CommentIcon sx={{ color: '#2B82BF' }} />
        <Typography sx={{ pl: 0.5, pr: 2, fontSize: 13 }}>Message Sent</Typography>
        <MarkUnreadChatAltIcon sx={{ color: '#BF4A32' }} />
        <Typography sx={{ pl: 0.5, pr: 2, fontSize: 13 }}>New Message</Typography>
        <SquareIcon sx={{ color: '#FFF387' }} />
        <Typography sx={{ pl: 0.5, pr: 2, fontSize: 13 }}>Need Emergency Verification</Typography>
      </Box>
    </Fragment>
  )
}
export default memo(ComplaintRegistrMast)
