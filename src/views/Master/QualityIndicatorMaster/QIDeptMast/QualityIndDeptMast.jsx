import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import DepartmentTableView from './DepartmentTableView'
import { getQIDeptType } from 'src/redux/actions/QITypeSelect.action'
import QITypeSelect from 'src/views/CommonSelectCode/QITypeSelect'
import DeptSectionSelect from 'src/views/CommonSelectCode/DeptSectionSelect'
import { useNavigate } from 'react-router-dom'

const QualityIndDeptMast = () => {
  const [edit, setEdit] = useState(0)
  const [count, setCount] = useState(0)
  const [qiType, setQiType] = useState(0)
  const [deptSection, setDeptSection] = useState(0)
  const [qidepartment, setQiDepartment] = useState({
    qi_dept_no: '0',
    qi_dept_code: '',
    qi_dept_desc: '',
    qi_dept_status: false
  })
  const { qi_dept_no, qi_dept_code, qi_dept_desc, qi_dept_status } = qidepartment
  const updateDepartment = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setQiDepartment({ ...qidepartment, [e.target.name]: value })
    },
    [qidepartment]
  )
  const history = useNavigate()
  const dispatch = useDispatch()
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  useEffect(() => {
    dispatch(getQIDeptType())
  }, [dispatch])
  // qi_co_deptsec_slno, qi_dept_status, qi_list_type,

  const postdata = useMemo(() => {
    return {
      qi_dept_code: qi_dept_code,
      qi_dept_desc: qi_dept_desc,
      qi_co_deptsec_slno: deptSection,
      qi_dept_status: qi_dept_status === true ? 1 : 0,
      qi_list_type: qiType,
      create_user: id
    }
  }, [qi_dept_desc, qi_dept_code, id, qi_dept_status, deptSection, qiType])

  const patchdata = useMemo(() => {
    return {
      qi_dept_no: qi_dept_no,
      qi_dept_code: qi_dept_code,
      qi_dept_desc: qi_dept_desc,
      qi_co_deptsec_slno: deptSection,
      qi_dept_status: qi_dept_status === true ? 1 : 0,
      qi_list_type: qiType,
      edit_user: id
    }
  }, [qi_dept_no, qi_dept_desc, qi_dept_code, id, qi_dept_status, deptSection, qiType])

  const reset = () => {
    const formreset = {
      qi_dept_no: '0',
      qi_dept_code: '',
      qi_dept_desc: '',
      qi_dept_status: false
    }
    setQiDepartment(formreset)
    setDeptSection(0)
    setQiType(0)
    setCount(0)
    setEdit(0)
  }
  const submitQualityDept = useCallback(
    e => {
      e.preventDefault()
      const InsertDepartment = async postdata => {
        const result = await axioslogin.post('/qidepartment/insert', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const updateDepartment = async patchdata => {
        const result = await axioslogin.patch('/qidepartment/update', patchdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      if (edit === 0) {
        InsertDepartment(postdata)
      } else {
        updateDepartment(patchdata)
      }
    },
    [postdata, count, patchdata, edit]
  )

  const refreshWindow = useCallback(() => {
    reset()
  }, [])

  const rowSelect = useCallback(params => {
    setEdit(1)
    const data = params.api.getSelectedRows()
    const { qi_dept_no, qi_dept_desc, qi_dept_code, qi_co_deptsec_slno, status, qi_list_type } = data[0]
    const frmdata = {
      qi_dept_no: qi_dept_no,
      qi_dept_code: qi_dept_code,
      qi_dept_desc: qi_dept_desc,
      qi_dept_status: status === 'Yes' ? true : false
    }
    setQiDepartment(frmdata)
    setDeptSection(qi_co_deptsec_slno)
    setQiType(qi_list_type)
  }, [])

  return (
    <CardMaster
      title="Quality Department Mast"
      submit={submitQualityDept}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ pl: 1, display: 'flex' }}>
        <Box sx={{ flex: 1, pr: 3 }}>
          <Box sx={{ flex: 1 }}>
            <TextFieldCustom
              placeholder="Department Name"
              type="text"
              size="md"
              name="qi_dept_desc"
              value={qi_dept_desc}
              onchange={updateDepartment}
            />
          </Box>
          <Box sx={{ flex: 1, pt: 0.3 }}>
            <TextFieldCustom
              placeholder="Department Code"
              type="text"
              size="md"
              name="qi_dept_code"
              value={qi_dept_code}
              onchange={updateDepartment}
            />
          </Box>
          <Box sx={{ flex: 1, pt: 0.3 }}>
            <DeptSectionSelect sx={{ Height: 40 }} value={deptSection} setValue={setDeptSection} />
          </Box>
          <Box sx={{ flex: 1, pt: 0.3 }}>
            <QITypeSelect qiType={qiType} setQiType={setQiType} />
          </Box>
          <Box sx={{ flex: 1, pt: 0.5, pl: 0.1 }}>
            <CusCheckBox
              label="Status"
              color="primary"
              size="md"
              name="qi_dept_status"
              value={qi_dept_status}
              checked={qi_dept_status}
              onCheked={updateDepartment}
            />
          </Box>
        </Box>
        <Box sx={{ flex: 2 }}>
          <DepartmentTableView rowSelect={rowSelect} count={count} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(QualityIndDeptMast)
