import { Box, CssVarsProvider, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import SearchIcon from '@mui/icons-material/Search'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import ProcedureTable from './ProcedureTable'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import ProcedureTableSave from './ProcedureTableSave'
import EquipmentMastTable from './EquipmentMastTable'
import QiDeptEquipmentSelect from 'src/views/CommonSelectCode/QiDeptEquipmentSelect'
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action'
import { useNavigate } from 'react-router-dom'

const EquipmentMast = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const [qidept, setQidept] = useState(0)
  const [ProcedureNames, setProcedureNames] = useState([])
  const [proSearch, setproSearch] = useState('')
  const [proFlag, setproFlag] = useState(0)
  // final list of procedures
  const [ProcedureArray, setProcedureArray] = useState([])
  const [edit, setEdit] = useState(0)
  const [count, setCount] = useState(0)
  const [equipmentData, setEquipmentData] = useState({
    equip_no: '0',
    equip_name: '',
    assetno: '',
    equip_status: false
  })
  const { equip_no, equip_name, assetno, equip_status } = equipmentData
  const UpdateEquipmentDetails = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setEquipmentData({ ...equipmentData, [e.target.name]: value })
    },
    [equipmentData]
  )
  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  useEffect(() => {
    dispatch(getQltyDept(id))
  }, [dispatch, id])
  const OnChangeProc = useCallback(e => {
    setproSearch(e.target.value)
    setproFlag(0)
  }, [])

  const SearchProc = useCallback(() => {
    const postdata = {
      PDC_DESC: proSearch.toUpperCase()
    }
    const GetElliderData = async postdata => {
      const result = await axiosellider.post('/procedureList/procedure', postdata)
      return result.data
    }
    GetElliderData(postdata).then(value => {
      const { success, data, message } = value
      if (success === 1) {
        setproFlag(1)
        setProcedureNames(data)
      } else if (success === 2) {
        setproFlag(0)
        infoNotify(message)
      }
    })
  }, [proSearch])
  const reset = useCallback(() => {
    const formreset = {
      equip_no: '0',
      equip_name: '',
      assetno: '',
      equip_status: false
    }
    setEquipmentData(formreset)
    setQidept(0)
    setProcedureNames([])
    setproSearch('')
    setproFlag(0)
    setProcedureArray([])
  }, [])
  const postdata = useMemo(() => {
    return {
      equip_name: equip_name,
      procedure_names: ProcedureArray,
      asset_no: assetno,
      equip_status: equip_status === true ? 1 : 0,
      create_user: id,
      qi_dept_no: qidept
    }
  }, [equip_name, ProcedureArray, assetno, equip_status, id, qidept])
  const patchdata = useMemo(() => {
    return {
      equip_name: equip_name,
      procedure_names: ProcedureArray,
      asset_no: assetno,
      equip_status: equip_status === true ? 1 : 0,
      edit_user: id,
      qi_dept_no: qidept,
      equip_no: equip_no
    }
  }, [equip_name, ProcedureArray, assetno, equip_status, id, equip_no, qidept])
  const SaveDetails = useCallback(
    e => {
      e.preventDefault()
      const InsertEquipmentDetails = async postdata => {
        const result = await axioslogin.post('/equipMast/insert', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else {
          infoNotify(message)
        }
      }
      const updateEquipmentDetails = async patchdata => {
        const result = await axioslogin.patch('/equipMast/update', patchdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else {
          infoNotify(message)
        }
      }
      if (edit === 0) {
        InsertEquipmentDetails(postdata)
      } else {
        updateEquipmentDetails(patchdata)
      }
    },
    [postdata, reset, count, edit, patchdata]
  )
  const refreshWindow = useCallback(() => {
    reset()
  }, [reset])
  const rowSelect = useCallback(params => {
    setEdit(1)
    const data = params.api.getSelectedRows()
    const { equip_no, equip_name, asset_no, status, qi_dept_no } = data[0]
    setQidept(qi_dept_no)
    const frmdata = {
      equip_no: equip_no,
      equip_name: equip_name,
      assetno: asset_no,
      equip_status: status === 'Yes' ? true : false
    }
    setEquipmentData(frmdata)
    const newData = data?.map(val => {
      return {
        procedure_names: val.procedure_names
      }
    })
    const proc = JSON?.parse(newData[0]?.procedure_names)
    setProcedureArray(proc)
  }, [])

  return (
    <CardMaster title="Equipment Master" submit={SaveDetails} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ display: 'flex', height: window.innerHeight - 240 }}>
        <Box sx={{ flex: 1.2, pr: 1 }}>
          <Box sx={{ flex: 1 }}>
            <QiDeptEquipmentSelect qidept={qidept} setQidept={setQidept} />
          </Box>
          <Box sx={{ flex: 1, pt: 0.3 }}>
            <TextFieldCustom
              placeholder="Equipment Name"
              type="text"
              size="md"
              name="equip_name"
              value={equip_name}
              onchange={UpdateEquipmentDetails}
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: 1.5, pt: 0.3 }}>
              <TextFieldCustom
                placeholder="Procedure Name"
                type="text"
                size="md"
                name="proSearch"
                value={proSearch}
                onchange={OnChangeProc}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 0.1, pt: 0.7, pr: 0.5 }}>
              <CssVarsProvider>
                <Tooltip title="Search" placement="right">
                  <SearchIcon
                    sx={{ color: '#555830', cursor: 'pointer', height: 30, width: 30 }}
                    fontSize="large"
                    onClick={SearchProc}
                  />
                </Tooltip>
              </CssVarsProvider>
            </Box>
          </Box>
          {proFlag === 1 ? (
            <>
              <Box sx={{ flex: 1, py: 0.3 }}>
                <ProcedureTable
                  ProcedureNames={ProcedureNames}
                  ProcedureArray={ProcedureArray}
                  setProcedureArray={setProcedureArray}
                />
              </Box>
            </>
          ) : null}
          {ProcedureArray.length > 0 ? (
            <Box sx={{ py: 0.5 }}>
              <ProcedureTableSave ProcedureArray={ProcedureArray} setProcedureArray={setProcedureArray} />
            </Box>
          ) : null}

          <Box sx={{ flex: 1, pt: 0.3 }}>
            <TextFieldCustom
              placeholder="Asset No."
              type="text"
              size="md"
              name="assetno"
              value={assetno}
              onchange={UpdateEquipmentDetails}
            />
          </Box>
          <Box sx={{ flex: 1, pt: 0.5, pl: 0.1 }}>
            <CusCheckBox
              label="Status"
              color="primary"
              size="md"
              name="equip_status"
              value={equip_status}
              checked={equip_status}
              onCheked={UpdateEquipmentDetails}
            />
          </Box>
        </Box>
        <Box sx={{ flex: 2 }}>
          <EquipmentMastTable rowSelect={rowSelect} count={count} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(EquipmentMast)
