import React, { useEffect, useState, useCallback, useMemo, memo } from 'react'
import { Box, Button, CssVarsProvider, Input, Textarea, Typography } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { getPasswordCredential } from 'src/redux/actions/ItPasswordCredential.action'
import ItPasswordCredentialType from 'src/views/CommonSelectCode/ItPasswordCredentialType'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import PswdDetailMastTable from './PswdDetailMastTable'
import PswdSoftWareTable from './PswdSoftWareTable'
import { useNavigate } from 'react-router-dom'
import IpMaskInput from './IpMaskInput'
import PatternIcon from '@mui/icons-material/Pattern';
import { taskColor } from 'src/color/Color'
import CusIconButton from 'src/views/Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import TextComponent from 'src/views/Components/TextComponent'
import CardSave from './CardSave'
import PswdMasterTable from './PswdMasterTable'

const PasswordManagement = () => {
  const dispatch = useDispatch()
  const [credential, setCredential] = useState(0)
  const [credentialName, setCredentialName] = useState('')
  const [softwareCheckBox, setsoftwareCheckBox] = useState(false)
  const [deviceCheckBox, setdeviceCheckBox] = useState(true)
  const [flag, setflag] = useState(1)
  const history = useNavigate()
  const [count, setCount] = useState(0)
  const [swTableCount, setSwTableCount] = useState(0)
  const [value, setValue] = useState(0)
  const [swEdit, setSwEdit] = useState(0)
  const [addflag, setaddflag] = useState(0)
  const [tableEdit, setTableEdit] = useState(0)
  const [pswd_mast_asset_no, setPswd_mast_asset_no] = useState('')
  const [arry, setArry] = useState([])
  const [addNewInUpdate, setaddNewInUpdate] = useState([])


  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  useEffect(() => {
    dispatch(getPasswordCredential())
  }, [dispatch])
  const deviceCheckBoxdetails = useCallback(e => {
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
  const softwareCheckBoxdetails = useCallback(e => {
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
    ipAddress: ''
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
    pswd_mast_description: ''
  })

  const [tabledata, setTabledata] = useState([])

  useEffect(() => {
    const getMasterTable = async () => {
      const result = await axioslogin.get('PasswordManagementMain/masterView')
      const { success, data } = result.data

      if (success === 2) {

        setTabledata(data)

      } else {
        warningNotify('error occured')
      }
    }
    getMasterTable()
  }, [count, setCount])

  const { pswd_detail_slno, description, user_name, password, port, remarks, ipAddress } = PasswordManagement
  const pswManagementUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setPasswordManagement({ ...PasswordManagement, [e.target.name]: value })
    },
    [PasswordManagement]
  )

  const rowSelect = useCallback(
    data => {
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
        pswd_mast_description
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
        pswd_mast_description: pswd_mast_description === null ? '' : pswd_mast_description
      }
      setPswd_mast_asset_no(pswd_mast_asset_no)
      setPasswordMast(formdata)

      const getdetailtable = async pswd_mast_slno => {
        const result = await axioslogin.get(`/PasswordManagementMain/viewDetailByid/${pswd_mast_slno}`)
        const { success, data } = result.data


        if (data.length !== 0) {
          if (success === 2) {
            const setDetailData =
              data &&
              data.map(val => {
                return {
                  pswd_detail_slno: val.pswd_detail_slno,
                  credentialName: val.credential_name,
                  credential: val.psw_detail_credintial,
                  description: val.pswd_detail_description,
                  user_name: val.psw_detail_username,
                  password: val.psw_detail_password,
                  port: val.psw_detail_port,
                  remarks: val.psw_detail_remarks,
                  ipAddress: val.psw_detail_ip_num
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
      // handleClose(1)
    },
    [setPasswordMast]
  )

  const selectForEdit = useCallback(val => {

    const { pswd_detail_slno, credential, credentialName, description, user_name, password, port, remarks, ipAddress } = val
    const setDetailData = {
      pswd_detail_slno: pswd_detail_slno,
      description: description,
      user_name: user_name,
      password: password,
      port: port,
      remarks: remarks,
      ipAddress: ipAddress
    }
    setCredential(credential)
    setCredentialName(credentialName)
    setPasswordManagement(setDetailData)
    setTableEdit(1)
  },
    [setPasswordManagement]
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
    pswd_mast_description
  } = PasswordMast
  const pswMastUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setPasswordMast({ ...PasswordMast, [e.target.name]: value })
    },
    [PasswordMast]
  )
  const UpdateAssetNo = useCallback(e => {
    setPswd_mast_asset_no(e.target.value.toLocaleUpperCase())
  }, [])
  const searchAssetNo = useCallback(
    () => {
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
          item_asset_no_only: asset_number
        }
        const getAssetdata = async postdata => {
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
                sec_name
              } = data[0]
              const formdata = {
                pswd_mast_categry_name: category_name === null ? '' : category_name,
                pswd_mast_group_name: group_name === null ? '' : group_name,
                pswd_mast_item_name: item_name === null ? '' : item_name,
                pswd_mast_categry_no: item_category_slno === null ? '' : item_category_slno,
                pswd_mast_group_no: item_group_slno === null ? '' : item_group_slno,
                pswd_mast_item_no: item_creation_slno === null ? '' : item_creation_slno,
                pswd_mast_location: item_deptsec_slno === null ? '' : item_deptsec_slno,
                pswd_mast_location_name: sec_name === null ? '' : sec_name
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
    [pswd_mast_asset_no, setPasswordMast]
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
      ipAddress: ipAddress
    }
    if (pswd_mast_item_no !== '') {
      if ((user_name !== '' && password !== '') || ipAddress !== '') {
        if (tableEdit === 0) {
          const newarry = [...arry, frmdata]
          setArry(newarry)
          const resetfrmdata = {
            description: '',
            user_name: '',
            password: '',
            port: '',
            remarks: '',
            ipAddress: ''
          }
          setPasswordManagement(resetfrmdata)
          setCredential(0)
          setCredentialName('')
        } else {
          const newdata = arry?.map(val => {
            return val.pswd_detail_slno === pswd_detail_slno ? frmdata : val
          })
          setArry(newdata)
          const resetfrmdata = {
            description: '',
            user_name: '',
            password: '',
            port: '',
            remarks: '',
            ipAddress: ''
          }
          setPasswordManagement(resetfrmdata)
          setCredential(0)
          setCredentialName('')
        }
        setaddflag(1)
      } else {
        infoNotify('Please fill the feilds User name  and Password or Ip address')
      }
    } else {
      infoNotify('Please enter asset number')
      const resetfrmdata = {
        description: '',
        user_name: '',
        password: '',
        port: '',
        remarks: '',
        ipAddress: ''
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
    ipAddress
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
      pswd_mast_description: ''
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
      create_user: id
    }
  }, [
    pswd_mast_categry_no,
    pswd_mast_group_no,
    pswd_mast_item_no,
    pswd_mast_asset_no,
    pswd_mast_location,
    pswd_mast_description,
    id
  ])
  const patchdataMast = useMemo(() => {
    return {
      pswd_mast_slno: pswd_mast_slno,
      pswd_mast_description: pswd_mast_description,
      edit_user: id
    }
  }, [pswd_mast_slno, pswd_mast_description, id])
  const [SoftwarePswd, setSoftwarePswd] = useState({
    paswd_soft_slno: '',
    paswd_soft_webname: '',
    paswd_soft_linkname: '',
    paswd_soft_username: '',
    paswd_soft_password: '',
    paswd_soft_remarks: ''
  })
  const {
    paswd_soft_slno,
    paswd_soft_webname,
    paswd_soft_linkname,
    paswd_soft_username,
    paswd_soft_password,
    paswd_soft_remarks
  } = SoftwarePswd
  const updateSoftware = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setSoftwarePswd({ ...SoftwarePswd, [e.target.name]: value })
    },
    [SoftwarePswd]
  )
  const postSoftwarePswd = useMemo(() => {
    return {
      paswd_soft_webname: paswd_soft_webname,
      paswd_soft_linkname: paswd_soft_linkname,
      paswd_soft_username: paswd_soft_username,
      paswd_soft_password: paswd_soft_password,
      paswd_soft_remarks: paswd_soft_remarks,
      create_user: id
    }
  }, [paswd_soft_webname, paswd_soft_linkname, paswd_soft_username, paswd_soft_password, paswd_soft_remarks, id])
  const patchForSoftware = useMemo(() => {
    return {
      paswd_soft_slno: paswd_soft_slno,
      paswd_soft_webname: paswd_soft_webname,
      paswd_soft_linkname: paswd_soft_linkname,
      paswd_soft_username: paswd_soft_username,
      paswd_soft_password: paswd_soft_password,
      paswd_soft_remarks: paswd_soft_remarks,
      edit_user: id
    }
  }, [
    paswd_soft_slno,
    paswd_soft_webname,
    paswd_soft_linkname,
    paswd_soft_username,
    paswd_soft_password,
    paswd_soft_remarks,
    id
  ])

  const rowSelectForSw = useCallback(
    data => {
      setSwEdit(1)
      const {
        paswd_soft_slno,
        paswd_soft_webname,
        paswd_soft_linkname,
        paswd_soft_username,
        paswd_soft_password,
        paswd_soft_remarks
      } = data
      const formdata = {
        paswd_soft_slno: paswd_soft_slno,
        paswd_soft_webname: paswd_soft_webname,
        paswd_soft_linkname: paswd_soft_linkname,
        paswd_soft_username: paswd_soft_username,
        paswd_soft_password: paswd_soft_password,
        paswd_soft_remarks: paswd_soft_remarks
      }
      setSoftwarePswd(formdata)
    },
    [setSoftwarePswd]
  )

  const resetSoftware = useCallback(() => {
    const frmdata = {
      paswd_soft_slno: '',
      paswd_soft_webname: '',
      paswd_soft_linkname: '',
      paswd_soft_username: '',
      paswd_soft_password: '',
      paswd_soft_remarks: ''
    }
    setSoftwarePswd(frmdata)
    setSwTableCount(0)
    setSwEdit(0)
  }, [setSoftwarePswd, setSwEdit])

  const submitPasswordData = useCallback(
    e => {
      e.preventDefault()
      if (flag === 1) {
        const InsertPasswordMast = async insertdata => {
          const result = await axioslogin.post('/PasswordManagementMain/insertMast', insertdata)
          return result.data
        }
        const InsertDetailMast = async postForDetail => {
          const result = await axioslogin.post('/PasswordManagementMain/insertDetail', postForDetail)
          const { message, success } = result.data
          if (success === 1) {
            setCount(count + 1)
            reset()
          } else {
            infoNotify(message)
          }
        }
        const UpdatePasswordMast = async patchdataMast => {
          const result = await axioslogin.patch('/PasswordManagementMain/updateMast', patchdataMast)
          return result.data
        }
        const UpdatePasswordDetail = async patchdataDetail => {
          const result = await axioslogin.patch('/PasswordManagementMain/updateDetail', patchdataDetail)
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
            InsertPasswordMast(insertdata).then(value => {
              const { message, success, insertId } = value
              succesNotify(message)
              if (success === 1) {
                const postForDetail =
                  arry &&
                  arry.map(val => {
                    return {
                      pswd_detail_mast_slno: insertId,
                      psw_detail_credintial: val.credential,
                      pswd_detail_description: val.description,
                      psw_detail_username: val.user_name,
                      psw_detail_password: val.password,
                      psw_detail_port: val.port,
                      psw_detail_remarks: val.remarks,
                      psw_detail_ip_num: val.ipAddress,
                      create_user: id
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
          UpdatePasswordMast(patchdataMast).then(value => {
            const { message, success } = value
            succesNotify(message)
            if (success === 2) {


              const patchdataDetail =
                arry &&
                arry.map(val => {
                  return {
                    pswd_detail_slno: val.pswd_detail_slno,
                    pswd_detail_mast_slno: pswd_mast_slno,
                    psw_detail_credintial: val.credential,
                    pswd_detail_description: val.description,
                    psw_detail_username: val.user_name,
                    psw_detail_password: val.password,
                    psw_detail_port: val.port,
                    psw_detail_remarks: val.remarks,
                    psw_detail_ip_num: val.ipAddress,
                    edit_user: id
                  }
                })

              const InsertInUpdate = async newinsert => {
                const result = await axioslogin.post('/PasswordManagementMain/insertDetail', newinsert)
                return result.data
              }
              const passwordnot = patchdataDetail?.filter(val => {
                return !addNewInUpdate.find(value => value.pswd_detail_slno === val.pswd_detail_slno)
              })
              if (passwordnot.length !== 0) {
                const newinsert = passwordnot?.map(val => {
                  return {
                    pswd_detail_mast_slno: pswd_mast_slno,
                    psw_detail_credintial: val.psw_detail_credintial,
                    pswd_detail_description: val.pswd_detail_description,
                    psw_detail_username: val.psw_detail_username,
                    psw_detail_password: val.psw_detail_password,
                    psw_detail_port: val.psw_detail_port,
                    psw_detail_remarks: val.psw_detail_remarks,
                    psw_detail_ip_num: val.psw_detail_ip_num,
                    create_user: id
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
        const InsertSoftwarePswd = async postSoftwarePswd => {
          const result = await axioslogin.post('/PasswordManagementMain/insertSoftware', postSoftwarePswd)
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
        const softwarePswdUpdate = async patchForSoftware => {
          const result = await axioslogin.patch('/PasswordManagementMain/updateSw', patchForSoftware)
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
          if (paswd_soft_webname !== '' && paswd_soft_username !== '' && paswd_soft_password !== '') {
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
      id
    ]
  )
  const backtoDash = useCallback(() => {
    history('/Home/AllDeviceCredentialList')
  }, [history])

  const refreshWindow = useCallback(() => {
    reset()
    resetSoftware()
  }, [reset, resetSoftware])
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden" }}>

      <Box sx={{
        height: '100%',
        borderRadius: 1,
        boxShadow: 2,
        flexGrow: 1,
        border: 1,
        borderColor: '#C5C5C5',
      }}
      >
        <Box sx={{ display: 'flex', borderBottom: 0.1, borderColor: '#C5C5C5', p: .5 }}>
          <Box sx={{ flex: 1, display: 'flex', p: .5 }}>
            <PatternIcon fontSize="medium" sx={{ color: taskColor.darkPurple }} />
            <Box sx={{ color: taskColor.darkPurple }}>Device Credentials</Box>
          </Box>
          <CusIconButton size="sm" variant="outlined" color="primary">
            <CloseIcon fontSize='small' onClick={backtoDash} />
          </CusIconButton>

        </Box>
        <Box sx={{ p: 1 }}>
          <Box sx={{ flex: 1, display: 'flex', gap: 3, p: 2 }}>
            <CusCheckBox
              label="Device"
              color="primary"
              size="md"
              name="deviceCheckBox"
              value={deviceCheckBox}
              checked={deviceCheckBox}
              onCheked={deviceCheckBoxdetails}
            ></CusCheckBox>
            <CusCheckBox
              label="Software"
              color="primary"
              size="md"
              name="softwareCheckBox"
              value={softwareCheckBox}
              checked={softwareCheckBox}
              onCheked={softwareCheckBoxdetails}
            ></CusCheckBox>
          </Box>

          {flag === 1 ? (
            <>
              <Box sx={{ flex: 1, display: 'flex' }}>
                <Box
                  sx={{
                    gap: 1
                  }}
                >
                  <Box sx={{ width: 400, }}>
                    <Input
                      placeholder='Search Asset No. eg:- TMC/IT/000001'
                      endDecorator={
                        <Button variant="soft" color="neutral" >
                          < SearchIcon onClick={searchAssetNo} />
                        </Button>
                      }
                      name="pswd_mast_asset_no"
                      value={pswd_mast_asset_no}
                      onChange={UpdateAssetNo}
                    />
                  </Box>
                  <Box sx={{ width: 400, mt: .5 }}>
                    <Input
                      startDecorator={
                        "Category"
                      }
                      name="pswd_mast_categry_name"
                      value={pswd_mast_categry_name}
                      onchange={pswMastUpdate}
                      disabled
                    />
                  </Box>
                  <Box sx={{ width: 400, mt: .5 }}>
                    <Input
                      startDecorator={
                        "Group"
                      }
                      name="pswd_mast_group_name"
                      value={pswd_mast_group_name}
                      onchange={pswMastUpdate}
                      disabled
                    />
                  </Box>
                  <Box sx={{ width: 400, mt: .5 }}>
                    <Input
                      startDecorator={
                        "Device Name"
                      }
                      name="pswd_mast_item_name"
                      value={pswd_mast_item_name}
                      onchange={pswMastUpdate}
                      disabled
                    />
                  </Box>
                  <Box sx={{ width: 400, mt: .5 }}>
                    <Input
                      startDecorator={
                        "Location"
                      }
                      name="pswd_mast_location_name"
                      value={pswd_mast_location_name}
                      onchange={pswMastUpdate}
                      disabled
                    />

                  </Box>
                  <Box sx={{ width: 400, mt: .5 }}>
                    <Textarea
                      type="text"
                      size="sm"
                      variant="outlined"
                      minRows={1}
                      maxRows={5}
                      startDecorator={
                        "Describtion"
                      }

                      name="pswd_mast_description"
                      value={pswd_mast_description}
                      onChange={e => pswMastUpdate(e)}

                    />

                  </Box>

                </Box>


                <Box sx={{ gap: 1, width: 500, pl: 3 }}>

                  <Box sx={{ flex: 1, display: 'flex', }}>
                    <TextComponent
                      sx={{
                        width: 150,
                        pl: .5,

                      }}
                      text={"Credential Type"}
                    />
                    <Box sx={{ flex: 1, }}>
                      <ItPasswordCredentialType
                        credential={credential}
                        setCredential={setCredential}
                        setName={setCredentialName}
                        credentialName={credentialName}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                    <TextComponent
                      sx={{
                        width: 150,
                        pl: .5
                      }}
                      text={"Describtion"}
                    />
                    <Box sx={{ flex: 1, }}>
                      <Textarea
                        type="text"
                        size="sm"
                        placeholder="type here..."
                        variant="outlined"
                        minRows={1}
                        maxRows={5}
                        name="description"
                        value={description}
                        onChange={e => pswManagementUpdate(e)}
                      ></Textarea>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                    <TextComponent
                      sx={{
                        width: 150,
                        pl: .5
                      }}
                      text={"User Name"}
                    />
                    <Box sx={{ flex: 1, }}>
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

                  <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                    <TextComponent
                      sx={{
                        width: 150,
                        pl: .5
                      }}
                      text={"Password"}
                    />
                    <Box sx={{ flex: 1, }}>
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

                  <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                    <TextComponent
                      sx={{
                        width: 150,
                        pl: .5
                      }}
                      text={"Port"}
                    />
                    <Box sx={{ flex: 1, }}>
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
                  <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                    <TextComponent
                      sx={{
                        width: 150,
                        pl: .5
                      }}
                      text={"IP Number"}
                    />
                    <Box sx={{ flex: 1, }}>
                      <IpMaskInput
                        value={PasswordManagement.ipAddress}
                        onChange={(val) =>
                          setPasswordManagement({ ...PasswordManagement, ipAddress: val })
                        }
                      />
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                    <TextComponent
                      sx={{
                        width: 150,
                        pl: .5
                      }}
                      text={"Remarks"}
                    />
                    <Box sx={{ flex: 1, }}>
                      <Textarea
                        type="text"
                        size="sm"
                        placeholder="type here..."
                        variant="outlined"
                        minRows={1}
                        maxRows={5}
                        name="remarks"
                        value={remarks}
                        onChange={e => pswManagementUpdate(e)}
                      ></Textarea>
                    </Box>
                  </Box>

                  <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                    <Box
                      sx={{
                        width: 150,
                        pl: .5
                      }}>

                    </Box>
                    <Box sx={{ flex: 1, }}>
                      <Button size="md" variant="outlined" color="primary" onClick={addData}>
                        Add
                      </Button>
                    </Box>
                  </Box>



                </Box>

              </Box>
              <Box sx={{ mt: 2 }}>
                {addflag === 1 ? (

                  <Box>
                    <PswdDetailMastTable selectForEdit={selectForEdit} arry={arry} setArry={setArry} />
                  </Box>
                ) : null}
              </Box>
              <CardSave close={backtoDash} submit={submitPasswordData} refresh={refreshWindow} />
              <PswdMasterTable
                rowSelect={rowSelect}
                tabledata={tabledata}
                setTabledata={setTabledata}
                count={count}
                setCount={setCount}

              />
            </>
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
                        onChange={e => updateSoftware(e)}
                      ></Textarea>
                    </CssVarsProvider>
                  </Box>
                </Box>
              </Box>


              <Box sx={{ backgroundColor: 'white', p: 1 }}>
                <PswdSoftWareTable swTableCount={swTableCount} rowSelectForSw={rowSelectForSw} />
              </Box>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  )
}
export default memo(PasswordManagement)
