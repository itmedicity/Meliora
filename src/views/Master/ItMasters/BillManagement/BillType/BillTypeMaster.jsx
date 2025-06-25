import { Box } from '@mui/material'
import React, { memo, useMemo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import BillTypeTable from './BillTypeTable'
import { useNavigate } from 'react-router-dom'

const BillTypeMaster = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()
  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const [billType, setBillType] = useState({
    it_bill_type_slno: '',
    it_bill_type_name: '',
    it_bill_type_status: false,
  })
  const { it_bill_type_slno, it_bill_type_name, it_bill_type_status } = billType
  const UpdateBillType = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setBillType({ ...billType, [e.target.name]: value })
    },
    [billType],
  )
  const postdata = useMemo(() => {
    return {
      it_bill_type_name: it_bill_type_name,
      it_bill_type_status: it_bill_type_status === true ? 1 : 0,
      create_user: id,
    }
  }, [it_bill_type_name, it_bill_type_status, id])
  const patchdata = useMemo(() => {
    return {
      it_bill_type_slno: it_bill_type_slno,
      it_bill_type_name: it_bill_type_name,
      it_bill_type_status: it_bill_type_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [it_bill_type_slno, it_bill_type_name, it_bill_type_status, id])
  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { it_bill_type_slno, it_bill_type_name, it_bill_type_status } = data[0]
    const frmdata = {
      it_bill_type_slno: it_bill_type_slno,
      it_bill_type_name: it_bill_type_name,
      it_bill_type_status: it_bill_type_status === 1 ? true : false,
    }
    setBillType(frmdata)
  }, [])
  const reset = () => {
    const frmdata = {
      it_bill_type_slno: '',
      it_bill_type_name: '',
      it_bill_type_status: false,
    }
    setBillType(frmdata)
    setCount(0)
    setValue(0)
  }
  const submitBillType = useCallback(
    (e) => {
      e.preventDefault()

      const InsertBilltype = async (postdata) => {
        const result = await axioslogin.post('/billType/insert', postdata)

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
      const billtypeUpdate = async (patchdata) => {
        const result = await axioslogin.patch('/billType/update', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }

      if (value === 0) {
        if (it_bill_type_name !== '') {
          InsertBilltype(postdata)
        } else {
          infoNotify('Please Enter Communication Device Type')
        }
      } else {
        billtypeUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, it_bill_type_name],
  )

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      it_bill_type_slno: '',
      it_bill_type_name: '',
      it_bill_type_status: false,
    }
    setBillType(frmdata)
    setValue(0)
  }, [setBillType])
  return (
    <CardMaster
      title="Bill Type"
      submit={submitBillType}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <Box sx={{ width: '30%', p: 1 }}>
          <Box>
            <TextFieldCustom
              placeholder="Bill Type"
              type="text"
              size="sm"
              name="it_bill_type_name"
              value={it_bill_type_name}
              onchange={UpdateBillType}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="it_bill_type_status"
              value={it_bill_type_status}
              checked={it_bill_type_status}
              onCheked={UpdateBillType}
            ></CusCheckBox>
          </Box>
        </Box>
        <Box sx={{ width: '70%' }}>
          <BillTypeTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(BillTypeMaster)
