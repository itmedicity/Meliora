import { Box } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import QIListTypeTable from './QIListTypeTable'
import { useNavigate } from 'react-router-dom'

const QIListType = () => {
  const [edit, setEdit] = useState(0)
  const [count, setCount] = useState(0)
  const [qidepartment, setQiDepartment] = useState({
    qi_list_type: '0',
    qi_list_type_name: '',
    qi_type_status: false,
  })
  const { qi_list_type, qi_list_type_name, qi_type_status } = qidepartment
  const updateDepartment = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setQiDepartment({ ...qidepartment, [e.target.name]: value })
    },
    [qidepartment],
  )

  const history = useNavigate()
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const id = useSelector((state) => {
    return state?.LoginUserData.empid
  })
  const reset = () => {
    const formreset = {
      qi_list_type: '0',
      qi_list_type_name: '',
      qi_type_status: false,
    }
    setQiDepartment(formreset)
    setCount(0)
    setEdit(0)
  }
  const postdata = useMemo(() => {
    return {
      qi_list_type_name: qi_list_type_name,
      qi_type_status: qi_type_status === true ? 1 : 0,
      create_user: id,
    }
  }, [qi_list_type_name, id, qi_type_status])

  const patchdata = useMemo(() => {
    return {
      qi_list_type: qi_list_type,
      qi_list_type_name: qi_list_type_name,
      qi_type_status: qi_type_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [qi_list_type, qi_list_type_name, id, qi_type_status])
  const submitQualityDept = useCallback(
    (e) => {
      e.preventDefault()
      const InsertDepartment = async (postdata) => {
        const result = await axioslogin.post('/qiTypeList/insert', postdata)
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
      const updateDepartment = async (patchdata) => {
        const result = await axioslogin.patch('/qiTypeList/update', patchdata)
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
    [postdata, count, patchdata, edit],
  )

  const refreshWindow = useCallback(() => {
    reset()
  }, [])

  const rowSelect = useCallback((params) => {
    setEdit(1)
    const data = params.api.getSelectedRows()
    const { qi_list_type, qi_list_type_name, status } = data[0]
    const frmdata = {
      qi_list_type: qi_list_type,
      qi_list_type_name: qi_list_type_name,
      qi_type_status: status === 'Yes' ? true : false,
    }
    setQiDepartment(frmdata)
  }, [])
  return (
    <CardMaster
      title="Quality Department Type"
      submit={submitQualityDept}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ pl: 1, display: 'flex' }}>
        <Box sx={{ flex: 1, pr: 3 }}>
          <Box>
            <TextFieldCustom
              placeholder="QI Type"
              type="text"
              size="md"
              name="qi_list_type_name"
              value={qi_list_type_name}
              onchange={updateDepartment}
            />
          </Box>
          <Box sx={{ flex: 1, pt: 0.5, pl: 0.1 }}>
            <CusCheckBox
              label="Status"
              color="primary"
              size="md"
              name="qi_type_status"
              value={qi_type_status}
              checked={qi_type_status}
              onCheked={updateDepartment}
            />
          </Box>
        </Box>
        <Box sx={{ flex: 2 }}>
          <QIListTypeTable rowSelect={rowSelect} count={count} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(QIListType)
