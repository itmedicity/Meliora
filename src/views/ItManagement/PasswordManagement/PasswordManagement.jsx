import React, { useEffect, useState, useCallback, useMemo, memo } from 'react'
import { Box, CssVarsProvider, Textarea, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getPasswordCredential } from 'src/redux/actions/ItPasswordCredential.action'
import ItPasswordCredentialType from 'src/views/CommonSelectCode/ItPasswordCredentialType'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import SearchIcon from '@mui/icons-material/Search'
import Tooltip from '@mui/material/Tooltip'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import PswdDetailMastTable from './PswdDetailMastTable'
import PswdSoftWareTable from './PswdSoftWareTable'
import TableViewSharpIcon from '@mui/icons-material/TableViewSharp'
import PswdModal from './PswdModal'
import { useNavigate } from 'react-router-dom'

const PasswordManagement = () => {
  const dispatch = useDispatch()
  const [credential, setCredential] = useState(0)
  const [credentialName, setCredentialName] = useState('')
  const [softwareCheckBox, setsoftwareCheckBox] = useState(false)
  const [deviceCheckBox, setdeviceCheckBox] = useState(false)
  const [flag, setflag] = useState(0)
  const history = useNavigate()
  const [count, setCount] = useState(0)
  const [swTableCount, setSwTableCount] = useState(0)
  const [value, setValue] = useState(0)
  const [swEdit, setSwEdit] = useState(0)
  const [addflag, setaddflag] = useState(0)
  const [tableEdit, setTableEdit] = useState(0)
  const [pswd_mast_asset_no, setPswd_mast_asset_no] = useState('')
  const [addModalOpen, setaddModalOpen] = useState(false)
  const [AddModalFlag, setAddModalFlag] = useState(0)
  const [arry, setArry] = useState([])
  const [addNewInUpdate, setaddNewInUpdate] = useState([])
  const [searchData, setSearchData] = useState(0)

  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  useEffect(() => {
    dispatch(getPasswordCredential())
  }, [dispatch])
  const deviceCheckBoxdetails = useCallback((e) => {
    if (e.target.checked === true) {
      setdeviceCheckBox(true)
      setsoftwareCheckBox(false)
      setflag(1)
    } else {
      setdeviceCheckBox(false)
      setsoftwareCheckBox(false)
      setflag(0)
    }
  }, [])
  const softwareCheckBoxdetails = useCallback((e) => {
    if (e.target.checked === true) {
      setdeviceCheckBox(false)
      setsoftwareCheckBox(true)
      setflag(2)
    } else {
      setdeviceCheckBox(false)
      setsoftwareCheckBox(false)
      setflag(0)
    }
  }, [])
  const [PasswordManagement, setPasswordManagement] = useState({
    pswd_detail_slno: '',
    description: '',
    user_name: '',
    password: '',
    port: '',
    remarks: '',
  })
  const [PasswordMast, setPasswordMast] = useState({
    pswd_mast_slno: '',
    pswd_mast_categry_no: '',
    pswd_mast_categry_name: '',
    pswd_mast_group_no: '',
    pswd_mast_group_name: '',
    pswd_mast_item_no: '',
    pswd_mast_item_name: '',
    pswd_mast_location: '',
    pswd_mast_location_name: '',
    pswd_mast_description: '',
  })

  const [tabledata, setTabledata] = useState([])
  useEffect(() => {
    const getMasterTable = async () => {
      const result = await axioslogin.get('PasswordManagementMain/masterView')
      const { success, data } = result.data

      if (success === 2) {
        const arr = data?.map((val) => {
          const obj = {
            pswd_mast_slno: val.pswd_mast_slno,
            pswd_mast_asset_no: val.pswd_mast_asset_no,
            pswd_mast_categry_name: val.category_name,
            pswd_mast_group_name: val.group_name,
            pswd_mast_item_name: val.item_name,
            pswd_mast_categry_no: val.category_slno,
            pswd_mast_group_no: val.group_slno,
            pswd_mast_item_no: val.item_creation_slno,
            pswd_mast_location: val.sec_id,
            pswd_mast_location_name: val.sec_name,
            pswd_mast_description: val.pswd_mast_description,
            psw_detail_username: val.psw_detail_username,
            psw_detail_password: val.psw_detail_password,
          }
          return obj
        })

        setTabledata(arr)
        setSearchData(arr)
      } else {
        warningNotify('error occured')
      }
    }
    getMasterTable()
  }, [count, setCount])

  const addModal = useCallback(() => {
    if (tabledata.length !== 0) {
      setAddModalFlag(1)
      setaddModalOpen(true)
      const resetfrmdata = {
        description: '',
        user_name: '',
        password: '',
        port: '',
        remarks: '',
      }
      setPasswordManagement(resetfrmdata)
      setCredential(0)
      setCredentialName('')
      const resetMast = {
        pswd_mast_slno: '',
        pswd_mast_categry_no: '',
        pswd_mast_categry_name: '',
        pswd_mast_group_no: '',
        pswd_mast_group_name: '',
        pswd_mast_item_no: '',
        pswd_mast_item_name: '',
        pswd_mast_location: '',
        pswd_mast_location_name: '',
        pswd_mast_description: '',
      }
      setPasswordMast(resetMast)
      setPswd_mast_asset_no('')
    } else {
      warningNotify('No Data')
    }
    setaddflag(0)
  }, [tabledata])

  const handleClose = useCallback(() => {
    setAddModalFlag(0)
    setaddModalOpen(false)
  }, [setAddModalFlag, setaddModalOpen])

  const { pswd_detail_slno, description, user_name, password, port, remarks } = PasswordManagement
  const pswManagementUpdate = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setPasswordManagement({ ...PasswordManagement, [e.target.name]: value })
    },
    [PasswordManagement],
  )

  const rowSelect = useCallback(
    (data) => {
      setValue(1)
      const {
        pswd_mast_slno,
        pswd_mast_asset_no,
        pswd_mast_categry_no,
        pswd_mast_group_no,
        pswd_mast_item_no,
        pswd_mast_categry_name,
        pswd_mast_group_name,
        pswd_mast_item_name,
        pswd_mast_location_name,
        pswd_mast_description,
      } = data
      const formdata = {
        pswd_mast_slno: pswd_mast_slno === null ? '' : pswd_mast_slno,
        pswd_mast_categry_no: pswd_mast_categry_no === null ? '' : pswd_mast_categry_no,
        pswd_mast_categry_name: pswd_mast_categry_name === null ? '' : pswd_mast_categry_name,
        pswd_mast_group_no: pswd_mast_group_no === null ? '' : pswd_mast_group_no,
        pswd_mast_group_name: pswd_mast_group_name === null ? '' : pswd_mast_group_name,
        pswd_mast_item_no: pswd_mast_item_no === null ? '' : pswd_mast_item_no,
        pswd_mast_item_name: pswd_mast_item_name === null ? '' : pswd_mast_item_name,
        pswd_mast_location_name: pswd_mast_location_name === null ? '' : pswd_mast_location_name,
        pswd_mast_description: pswd_mast_description === null ? '' : pswd_mast_description,
      }
      setPswd_mast_asset_no(pswd_mast_asset_no)
      setPasswordMast(formdata)
      const getdetailtable = async (pswd_mast_slno) => {
        const result = await axioslogin.get(
          `/PasswordManagementMain/viewDetailByid/${pswd_mast_slno}`,
        )
        const { success, data } = result.data
        if (data.length !== 0) {
          if (success === 2) {
            const setDetailData =
              data &&
              data.map((val) => {
                return {
                  pswd_detail_slno: val.pswd_detail_slno,
                  credentialName: val.credential_name,
                  credential: val.psw_detail_credintial,
                  description: val.pswd_detail_description,
                  user_name: val.psw_detail_username,
                  password: val.psw_detail_password,
                  port: val.psw_detail_port,
                  remarks: val.psw_detail_remarks,
                }
              })
            setArry(setDetailData)
            setaddNewInUpdate(setDetailData)
          }
          setaddflag(1)
        }
      }
      if (pswd_mast_slno !== 0) {
        getdetailtable(pswd_mast_slno)
      }
      handleClose(1)
    },
    [setPasswordMast, handleClose],
  )

  const selectForEdit = useCallback(
    (val) => {
      const {
        pswd_detail_slno,
        credential,
        credentialName,
        description,
        user_name,
        password,
        port,
        remarks,
      } = val
      const setDetailData = {
        pswd_detail_slno: pswd_detail_slno,
        description: description,
        user_name: user_name,
        password: password,
        port: port,
        remarks: remarks,
      }
      setCredential(credential)
      setCredentialName(credentialName)
      setPasswordManagement(setDetailData)
      setTableEdit(1)
    },
    [setPasswordManagement],
  )
  const {
    pswd_mast_location_name,
    pswd_mast_slno,
    pswd_mast_categry_no,
    pswd_mast_categry_name,
    pswd_mast_group_name,
    pswd_mast_item_name,
    pswd_mast_group_no,
    pswd_mast_item_no,
    pswd_mast_location,
    pswd_mast_description,
  } = PasswordMast
  const pswMastUpdate = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setPasswordMast({ ...PasswordMast, [e.target.name]: value })
    },
    [PasswordMast],
  )
  const UpdateAssetNo = useCallback((e) => {
    setPswd_mast_asset_no(e.target.value.toLocaleUpperCase())
  }, [])
  const searchAssetNo = useCallback(
    (e) => {
      if (pswd_mast_asset_no === '') {
        infoNotify('Please Enter Asset Number')
      } else {
        const parts = pswd_mast_asset_no.split('/')
        const assetno = parts[parts.length - 1]
        const Custodian = parts[parts.length - 2]
        const firstname = parts[parts.length - 3]
        const starts = firstname + '/' + Custodian
        const asset_number = parseInt(assetno)
        const postdata = {
          item_asset_no: starts,
          item_asset_no_only: asset_number,
        }
        const getAssetdata = async (postdata) => {
          const result = await axioslogin.post('/PasswordManagementMain/getAssetNo', postdata)
          const { data, success } = result.data
          if (data.length !== 0) {
            if (success === 1) {
              const {
                category_name,
                group_name,
                item_name,
                item_category_slno,
                item_creation_slno,
                item_group_slno,
                item_deptsec_slno,
                sec_name,
              } = data[0]
              const formdata = {
                pswd_mast_categry_name: category_name === null ? '' : category_name,
                pswd_mast_group_name: group_name === null ? '' : group_name,
                pswd_mast_item_name: item_name === null ? '' : item_name,
                pswd_mast_categry_no: item_category_slno === null ? '' : item_category_slno,
                pswd_mast_group_no: item_group_slno === null ? '' : item_group_slno,
                pswd_mast_item_no: item_creation_slno === null ? '' : item_creation_slno,
                pswd_mast_location: item_deptsec_slno === null ? '' : item_deptsec_slno,
                pswd_mast_location_name: sec_name === null ? '' : sec_name,
              }
              setPswd_mast_asset_no(pswd_mast_asset_no)
              setPasswordMast(formdata)
            }
            return result.data
          } else {
            warningNotify('Asset number not found')
          }
        }
        getAssetdata(postdata)
      }
    },
    [pswd_mast_asset_no, setPasswordMast],
  )

  const addData = useCallback(() => {
    const frmdata = {
      pswd_detail_slno: pswd_detail_slno,
      credential: credential,
      credentialName: credentialName,
      description: description,
      user_name: user_name,
      password: password,
      port: port,
      remarks: remarks,
    }
    if (pswd_mast_item_no !== '') {
      if (user_name !== '' && password !== '' && credentialName !== '') {
        if (tableEdit === 0) {
          const newarry = [...arry, frmdata]
          setArry(newarry)
          const resetfrmdata = {
            description: '',
            user_name: '',
            password: '',
            port: '',
            remarks: '',
          }
          setPasswordManagement(resetfrmdata)
          setCredential(0)
          setCredentialName('')
        } else {
          const newdata = arry?.map((val) => {
            return val.pswd_detail_slno === pswd_detail_slno ? frmdata : val
          })
          setArry(newdata)
          const resetfrmdata = {
            description: '',
            user_name: '',
            password: '',
            port: '',
            remarks: '',
          }
          setPasswordManagement(resetfrmdata)
          setCredential(0)
          setCredentialName('')
        }
        setaddflag(1)
      } else {
        infoNotify('Please fill the Mandatory Feilds')
      }
    } else {
      infoNotify('Please enter asset number')
      const resetfrmdata = {
        description: '',
        user_name: '',
        password: '',
        port: '',
        remarks: '',
      }
      setPasswordManagement(resetfrmdata)
      setCredential(0)
      setCredentialName('')
    }
  }, [
    arry,
    pswd_mast_item_no,
    credentialName,
    tableEdit,
    credential,
    description,
    pswd_detail_slno,
    user_name,
    password,
    port,
    remarks,
  ])
  const reset = useCallback(() => {
    const resetMast = {
      pswd_mast_slno: '',
      pswd_mast_categry_no: '',
      pswd_mast_categry_name: '',
      pswd_mast_group_no: '',
      pswd_mast_group_name: '',
      pswd_mast_item_no: '',
      pswd_mast_item_name: '',
      pswd_mast_location: '',
      pswd_mast_location_name: '',
      pswd_mast_description: '',
    }
    setPasswordMast(resetMast)
    setPswd_mast_asset_no('')
    setCount(0)
    setArry([])
    setTableEdit(0)
    setaddflag(0)
  }, [setPasswordMast, setPswd_mast_asset_no, setCount, setArry, setTableEdit])
  const insertdata = useMemo(() => {
    return {
      pswd_mast_asset_no: pswd_mast_asset_no === 0 ? null : pswd_mast_asset_no,
      pswd_mast_categry_no: pswd_mast_categry_no === 0 ? null : pswd_mast_categry_no,
      pswd_mast_group_no: pswd_mast_group_no === '' ? null : pswd_mast_group_no,
      pswd_mast_item_no: pswd_mast_item_no === 0 ? null : pswd_mast_item_no,
      pswd_mast_location: pswd_mast_location === 0 ? null : pswd_mast_location,
      pswd_mast_description: pswd_mast_description === '' ? null : pswd_mast_description,
      create_user: id,
    }
  }, [
    pswd_mast_categry_no,
    pswd_mast_group_no,
    pswd_mast_item_no,
    pswd_mast_asset_no,
    pswd_mast_location,
    pswd_mast_description,
    id,
  ])
  const patchdataMast = useMemo(() => {
    return {
      pswd_mast_slno: pswd_mast_slno,
      pswd_mast_description: pswd_mast_description,
      edit_user: id,
    }
  }, [pswd_mast_slno, pswd_mast_description, id])
  const [SoftwarePswd, setSoftwarePswd] = useState({
    paswd_soft_slno: '',
    paswd_soft_webname: '',
    paswd_soft_linkname: '',
    paswd_soft_username: '',
    paswd_soft_password: '',
    paswd_soft_remarks: '',
  })
  const {
    paswd_soft_slno,
    paswd_soft_webname,
    paswd_soft_linkname,
    paswd_soft_username,
    paswd_soft_password,
    paswd_soft_remarks,
  } = SoftwarePswd
  const updateSoftware = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setSoftwarePswd({ ...SoftwarePswd, [e.target.name]: value })
    },
    [SoftwarePswd],
  )
  const postSoftwarePswd = useMemo(() => {
    return {
      paswd_soft_webname: paswd_soft_webname,
      paswd_soft_linkname: paswd_soft_linkname,
      paswd_soft_username: paswd_soft_username,
      paswd_soft_password: paswd_soft_password,
      paswd_soft_remarks: paswd_soft_remarks,
      create_user: id,
    }
  }, [
    paswd_soft_webname,
    paswd_soft_linkname,
    paswd_soft_username,
    paswd_soft_password,
    paswd_soft_remarks,
    id,
  ])
  const patchForSoftware = useMemo(() => {
    return {
      paswd_soft_slno: paswd_soft_slno,
      paswd_soft_webname: paswd_soft_webname,
      paswd_soft_linkname: paswd_soft_linkname,
      paswd_soft_username: paswd_soft_username,
      paswd_soft_password: paswd_soft_password,
      paswd_soft_remarks: paswd_soft_remarks,
      edit_user: id,
    }
  }, [
    paswd_soft_slno,
    paswd_soft_webname,
    paswd_soft_linkname,
    paswd_soft_username,
    paswd_soft_password,
    paswd_soft_remarks,
    id,
  ])

  const rowSelectForSw = useCallback(
    (data) => {
      setSwEdit(1)
      const {
        paswd_soft_slno,
        paswd_soft_webname,
        paswd_soft_linkname,
        paswd_soft_username,
        paswd_soft_password,
        paswd_soft_remarks,
      } = data
      const formdata = {
        paswd_soft_slno: paswd_soft_slno,
        paswd_soft_webname: paswd_soft_webname,
        paswd_soft_linkname: paswd_soft_linkname,
        paswd_soft_username: paswd_soft_username,
        paswd_soft_password: paswd_soft_password,
        paswd_soft_remarks: paswd_soft_remarks,
      }
      setSoftwarePswd(formdata)
    },
    [setSoftwarePswd],
  )

  const resetSoftware = useCallback(() => {
    const frmdata = {
      paswd_soft_slno: '',
      paswd_soft_webname: '',
      paswd_soft_linkname: '',
      paswd_soft_username: '',
      paswd_soft_password: '',
      paswd_soft_remarks: '',
    }
    setSoftwarePswd(frmdata)
    setSwTableCount(0)
    setSwEdit(0)
  }, [setSoftwarePswd, setSwEdit])

  const submitPasswordData = useCallback(
    (e) => {
      e.preventDefault()
      if (flag === 1) {
        const InsertPasswordMast = async (insertdata) => {
          const result = await axioslogin.post('/PasswordManagementMain/insertMast', insertdata)

          return result.data
        }
        const InsertDetailMast = async (postForDetail) => {
          const result = await axioslogin.post(
            '/PasswordManagementMain/insertDetail',
            postForDetail,
          )
          const { message, success } = result.data
          if (success === 1) {
            setCount(count + 1)
            reset()
          } else {
            infoNotify(message)
          }
        }
        const UpdatePasswordMast = async (patchdataMast) => {
          const result = await axioslogin.patch('/PasswordManagementMain/updateMast', patchdataMast)
          return result.data
        }
        const UpdatePasswordDetail = async (patchdataDetail) => {
          const result = await axioslogin.patch(
            '/PasswordManagementMain/updateDetail',
            patchdataDetail,
          )
          const { message, success } = result.data
          if (success === 2) {
            setCount(count + 1)
            reset()
          } else {
            infoNotify(message)
          }
        }
        if (value === 0) {
          if (pswd_mast_categry_name !== '') {
            InsertPasswordMast(insertdata).then((value) => {
              const { message, success, insertId } = value
              succesNotify(message)
              if (success === 1) {
                const postForDetail =
                  arry &&
                  arry.map((val) => {
                    return {
                      pswd_detail_mast_slno: insertId,
                      psw_detail_credintial: val.credential,
                      pswd_detail_description: val.description,
                      psw_detail_username: val.user_name,
                      psw_detail_password: val.password,
                      psw_detail_port: val.port,
                      psw_detail_remarks: val.remarks,
                      create_user: id,
                    }
                  })
                InsertDetailMast(postForDetail)
                setCount(count + 1)
                reset()
              } else {
                warningNotify(message)
              }
            })
          }
        } else if (value === 1) {
          UpdatePasswordMast(patchdataMast).then((value) => {
            const { message, success } = value
            succesNotify(message)
            if (success === 2) {
              const patchdataDetail =
                arry &&
                arry.map((val) => {
                  return {
                    pswd_detail_slno: val.pswd_detail_slno,
                    pswd_detail_mast_slno: pswd_mast_slno,
                    psw_detail_credintial: val.credential,
                    pswd_detail_description: val.description,
                    psw_detail_username: val.user_name,
                    psw_detail_password: val.password,
                    psw_detail_port: val.port,
                    psw_detail_remarks: val.remarks,
                    edit_user: id,
                  }
                })
              const InsertInUpdate = async (newinsert) => {
                const result = await axioslogin.post(
                  '/PasswordManagementMain/insertDetail',
                  newinsert,
                )
                return result.data
              }
              const passwordnot = patchdataDetail?.filter((val) => {
                return !addNewInUpdate.find(
                  (value) => value.pswd_detail_slno === val.pswd_detail_slno,
                )
              })
              if (passwordnot.length !== 0) {
                const newinsert = passwordnot?.map((val) => {
                  return {
                    pswd_detail_mast_slno: pswd_mast_slno,
                    psw_detail_credintial: val.psw_detail_credintial,
                    pswd_detail_description: val.pswd_detail_description,
                    psw_detail_username: val.psw_detail_username,
                    psw_detail_password: val.psw_detail_password,
                    psw_detail_port: val.psw_detail_port,
                    psw_detail_remarks: val.psw_detail_remarks,
                    create_user: id,
                  }
                })
                InsertInUpdate(newinsert)
                UpdatePasswordDetail(patchdataDetail)
              } else {
                UpdatePasswordDetail(patchdataDetail)
              }
              setCount(count + 1)
              reset()
            }
          })
        }
      } else {
        const InsertSoftwarePswd = async (postSoftwarePswd) => {
          const result = await axioslogin.post(
            '/PasswordManagementMain/insertSoftware',
            postSoftwarePswd,
          )
          const { message, success } = result.data
          if (success === 1) {
            succesNotify(message)
            setSwTableCount(swTableCount + 1)
            resetSoftware()
          } else if (success === 0) {
            infoNotify(message)
          } else {
            infoNotify(message)
          }
        }
        const softwarePswdUpdate = async (patchForSoftware) => {
          const result = await axioslogin.patch(
            '/PasswordManagementMain/updateSw',
            patchForSoftware,
          )
          const { message, success } = result.data
          if (success === 2) {
            succesNotify(message)
            setSwTableCount(swTableCount + 1)
            resetSoftware()
          } else if (success === 0) {
            infoNotify(message)
          } else {
            infoNotify(message)
          }
        }
        if (swEdit === 0) {
          if (
            paswd_soft_webname !== '' &&
            paswd_soft_username !== '' &&
            paswd_soft_password !== ''
          ) {
            InsertSoftwarePswd(postSoftwarePswd)
          } else {
            infoNotify('Please fill the Mandatory Feilds')
          }
        } else {
          softwarePswdUpdate(patchForSoftware)
        }
      }
    },
    [
      insertdata,
      reset,
      value,
      count,
      swTableCount,
      patchForSoftware,
      pswd_mast_categry_name,
      patchdataMast,
      postSoftwarePswd,
      flag,
      paswd_soft_username,
      addNewInUpdate,
      pswd_mast_slno,
      paswd_soft_password,
      paswd_soft_webname,
      resetSoftware,
      swEdit,
      arry,
      id,
    ],
  )
  const backtoDash = useCallback(() => {
    history('/Home/DashboardBackup')
  }, [history])
  const refreshWindow = useCallback(() => {
    reset()
    resetSoftware()
  }, [reset, resetSoftware])
  return (
    <Box>
      <CardMaster
        close={backtoDash}
        submit={submitPasswordData}
        refresh={refreshWindow}
        title={'Password Management'}
      >
        <Box sx={{ display: 'flex', width: '25vw', height: 40, margin: 'auto', mt: 2 }}>
          <Paper sx={{ flex: 1, textAlign: 'center', mr: 2, pt: 1 }}>
            <CusCheckBox
              label="Device"
              color="primary"
              size="md"
              name="deviceCheckBox"
              value={deviceCheckBox}
              checked={deviceCheckBox}
              onCheked={deviceCheckBoxdetails}
            ></CusCheckBox>
          </Paper>
          <Paper sx={{ flex: 1, textAlign: 'center', pt: 1 }}>
            <CusCheckBox
              label="Software"
              color="primary"
              size="md"
              name="softwareCheckBox"
              value={softwareCheckBox}
              checked={softwareCheckBox}
              onCheked={softwareCheckBoxdetails}
            ></CusCheckBox>
          </Paper>
        </Box>
        <Box>
          {AddModalFlag === 1 ? (
            <PswdModal
              open={addModalOpen}
              handleClose={handleClose}
              rowSelect={rowSelect}
              tabledata={tabledata}
              searchData={searchData}
              setTabledata={setTabledata}
              count={count}
              setCount={setCount}
            />
          ) : null}
        </Box>
        {flag === 1 ? (
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', width: '70vw', margin: 'auto' }}>
              <Box
                sx={{
                  width: '50vw',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Paper sx={{ height: 75, pt: 0.2, pl: 2, width: '33vw' }}>
                  <Box sx={{ pl: 0.5, color: '#055C9D' }}>
                    <Typography>
                      Asset number
                      <Typography sx={{ color: '#A30000' }}>*</Typography>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flex: 1 }}>
                      <TextFieldCustom
                        type="text"
                        size="sm"
                        placeholder="search"
                        name="pswd_mast_asset_no"
                        value={pswd_mast_asset_no}
                        onchange={UpdateAssetNo}
                      ></TextFieldCustom>
                    </Box>
                    <Box sx={{ pl: 1, pt: 0.5 }}>
                      <Tooltip title="search" placement="top">
                        <SearchIcon
                          sx={{ cursor: 'pointer', color: '#055C9D', fontSize: 26 }}
                          onClick={searchAssetNo}
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                </Paper>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', ml: 4 }}>
                <Box sx={{ width: 80, borderRadius: 4, border: 0.5, borderColor: '#055C9D' }}>
                  <Box sx={{ textAlign: 'center', pt: 1, color: '#055C9D' }}>
                    <Typography sx={{ fontSize: 15 }}> view</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <TableViewSharpIcon
                      sx={{
                        color: '#145DA0',
                        cursor: 'pointer',
                        size: 'lg',
                        width: 30,
                        height: 30,
                      }}
                      onClick={addModal}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                margin: 'auto',
                width: '47vw',
              }}
            >
              <Box sx={{ pt: 1, display: 'flex', margin: 'auto' }}>
                <Box sx={{ textAlign: 'right', pr: 1, pt: 0.5, flex: 0.3 }}>
                  <Typography>Category</Typography>
                </Box>
                <Box sx={{ flex: 0.5 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    name="pswd_mast_categry_name"
                    value={pswd_mast_categry_name}
                    onchange={pswMastUpdate}
                    disabled
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ pt: 0.5, display: 'flex', margin: 'auto' }}>
                <Box sx={{ textAlign: 'right', pr: 1, pt: 0.5, flex: 0.3 }}>
                  <Typography>Group</Typography>
                </Box>
                <Box sx={{ flex: 0.5 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    name="pswd_mast_group_name"
                    value={pswd_mast_group_name}
                    onchange={pswMastUpdate}
                    disabled
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ pt: 0.5, display: 'flex', margin: 'auto' }}>
                <Box sx={{ textAlign: 'right', pr: 1, pt: 0.5, flex: 0.3 }}>
                  <Typography>Device Name</Typography>
                </Box>
                <Box sx={{ flex: 0.5 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    name="pswd_mast_item_name"
                    value={pswd_mast_item_name}
                    onchange={pswMastUpdate}
                    disabled
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ pt: 0.5, display: 'flex', margin: 'auto' }}>
                <Box sx={{ textAlign: 'right', pr: 1, pt: 0.5, flex: 0.3 }}>
                  <Typography>Location</Typography>
                </Box>
                <Box sx={{ flex: 0.5 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    name="pswd_mast_location_name"
                    value={pswd_mast_location_name}
                    onchange={pswMastUpdate}
                    disabled
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ pt: 0.5, display: 'flex', margin: 'auto' }}>
                <Box sx={{ textAlign: 'right', pr: 1, pt: 0.5, flex: 0.3 }}>
                  <Typography>Device Description</Typography>
                </Box>
                <Box sx={{ flex: 0.5 }}>
                  <CssVarsProvider>
                    <Textarea
                      type="text"
                      size="sm"
                      placeholder="type here..."
                      variant="outlined"
                      minRows={2}
                      maxRows={4}
                      name="pswd_mast_description"
                      value={pswd_mast_description}
                      onChange={(e) => pswMastUpdate(e)}
                    ></Textarea>
                  </CssVarsProvider>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flex: 1, margin: 'auto', pt: 4, overflowX: 'auto' }}>
              <Box>
                <Box sx={{ pl: 0.5, color: '#003B73' }}>
                  <Typography>
                    Credential type
                    <Typography sx={{ color: '#A30000' }}>*</Typography>
                  </Typography>
                </Box>
                <Box sx={{ flex: 0.5, pr: 0.5 }}>
                  <ItPasswordCredentialType
                    credential={credential}
                    setCredential={setCredential}
                    setName={setCredentialName}
                    credentialName={credentialName}
                  />
                </Box>
              </Box>
              <Box sx={{ flex: 0.5, pr: 0.5 }}>
                <Box>
                  <Box sx={{ pl: 0.5, color: '#003B73' }}>
                    <Typography>Description</Typography>
                  </Box>
                  <CssVarsProvider>
                    <Textarea
                      type="text"
                      size="sm"
                      placeholder="type here..."
                      variant="outlined"
                      minRows={1}
                      maxRows={2}
                      name="description"
                      value={description}
                      onChange={(e) => pswManagementUpdate(e)}
                    ></Textarea>
                  </CssVarsProvider>
                </Box>
              </Box>
              <Box sx={{ flex: 0.5, pr: 0.5 }}>
                <Box>
                  <Box sx={{ pl: 0.5, color: '#003B73' }}>
                    <Typography>
                      User name
                      <Typography sx={{ color: '#A30000' }}>*</Typography>
                    </Typography>
                  </Box>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    placeholder="user name"
                    name="user_name"
                    value={user_name}
                    onchange={pswManagementUpdate}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ flex: 0.5, pr: 0.5 }}>
                <Box>
                  <Box sx={{ pl: 0.5, color: '#003B73' }}>
                    <Typography>
                      Password
                      <Typography sx={{ color: '#A30000' }}>*</Typography>
                    </Typography>
                  </Box>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    placeholder="password"
                    name="password"
                    value={password}
                    onchange={pswManagementUpdate}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ flex: 0.5, pr: 0.5 }}>
                <Box>
                  <Box sx={{ pl: 0.5, color: '#003B73' }}>
                    <Typography>Port</Typography>
                  </Box>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    placeholder="port"
                    name="port"
                    value={port}
                    onchange={pswManagementUpdate}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ flex: 0.5 }}>
                <Box>
                  <Box sx={{ pl: 0.5, color: '#003B73' }}>
                    <Typography>Remarks</Typography>
                  </Box>
                  <CssVarsProvider>
                    <Textarea
                      type="text"
                      size="sm"
                      placeholder="type here..."
                      variant="outlined"
                      minRows={1}
                      maxRows={2}
                      name="remarks"
                      value={remarks}
                      onChange={(e) => pswManagementUpdate(e)}
                    ></Textarea>
                  </CssVarsProvider>
                </Box>
              </Box>
              <Box sx={{ pl: 0.5, pt: 3.5 }}>
                <Tooltip title="add" placement="top">
                  <AddCircleOutlineIcon
                    onClick={addData}
                    sx={{ cursor: 'pointer', color: '#055C9D', fontSize: 26 }}
                  />
                </Tooltip>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              {addflag === 1 ? (
                <PswdDetailMastTable selectForEdit={selectForEdit} arry={arry} setArry={setArry} />
              ) : null}
            </Box>
          </Box>
        ) : flag === 2 ? (
          <Box>
            <Box sx={{ margin: 'auto', pt: 4, width: '47vw' }}>
              <Box sx={{ pt: 1, display: 'flex', margin: 'auto' }}>
                <Box sx={{ textAlign: 'right', pr: 1, pt: 0.5, flex: 0.3 }}>
                  <Typography>
                    Web Name
                    <Typography sx={{ color: '#A30000' }}>*</Typography>
                  </Typography>
                </Box>
                <Box sx={{ flex: 0.5 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    placeholder="web name"
                    name="paswd_soft_webname"
                    value={paswd_soft_webname}
                    onchange={updateSoftware}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ pt: 0.5, display: 'flex', margin: 'auto' }}>
                <Box sx={{ textAlign: 'right', pr: 1, pt: 0.5, flex: 0.3 }}>
                  <Typography>URL</Typography>
                </Box>
                <Box sx={{ flex: 0.5 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    placeholder="URLs"
                    name="paswd_soft_linkname"
                    value={paswd_soft_linkname}
                    onchange={updateSoftware}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ pt: 0.5, display: 'flex', margin: 'auto' }}>
                <Box sx={{ textAlign: 'right', pr: 1, pt: 0.5, flex: 0.3 }}>
                  <Typography>
                    User Name
                    <Typography sx={{ color: '#A30000' }}>*</Typography>
                  </Typography>
                </Box>
                <Box sx={{ flex: 0.5 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    placeholder=" user name"
                    name="paswd_soft_username"
                    value={paswd_soft_username}
                    onchange={updateSoftware}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ pt: 0.5, display: 'flex', margin: 'auto' }}>
                <Box sx={{ textAlign: 'right', pr: 1, pt: 0.5, flex: 0.3 }}>
                  <Typography>
                    Password
                    <Typography sx={{ color: '#A30000' }}>*</Typography>
                  </Typography>
                </Box>
                <Box sx={{ flex: 0.5 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    placeholder="password"
                    name="paswd_soft_password"
                    value={paswd_soft_password}
                    onchange={updateSoftware}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ pt: 0.5, display: 'flex', margin: 'auto' }}>
                <Box sx={{ textAlign: 'right', pr: 1, pt: 0.5, flex: 0.3 }}>
                  <Typography>Credential Remarks</Typography>
                </Box>
                <Box sx={{ flex: 0.5 }}>
                  <CssVarsProvider>
                    <Textarea
                      type="text"
                      size="sm"
                      placeholder="type here..."
                      variant="outlined"
                      minRows={2}
                      maxRows={4}
                      name="paswd_soft_remarks"
                      value={paswd_soft_remarks}
                      onChange={(e) => updateSoftware(e)}
                    ></Textarea>
                  </CssVarsProvider>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : null}
      </CardMaster>
      {flag === 2 ? (
        <Box sx={{ backgroundColor: 'white', p: 1 }}>
          <PswdSoftWareTable swTableCount={swTableCount} rowSelectForSw={rowSelectForSw} />
        </Box>
      ) : null}
    </Box>
  )
}
export default memo(PasswordManagement)
