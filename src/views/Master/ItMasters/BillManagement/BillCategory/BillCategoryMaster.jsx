import { Box } from '@mui/material'
import React, { memo, useMemo, useCallback, useState, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'
import BillCategoryTable from './BillCategoryTable'
import ItBillTypeSelect from 'src/views/CommonSelectCode/ItBillTypeSelect'
import { getBillType } from 'src/redux/actions/ItBillTypeList.action'
import { useNavigate } from 'react-router-dom'

const BillCategoryMaster = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [billType, setBillType] = useState(0)
  const dispatch = useDispatch()
  const history = useNavigate()
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  useEffect(() => {
    dispatch(getBillType())
  }, [dispatch])

  const [billCategory, setBillCategory] = useState({
    it_bill_category_slno: '',
    it_bill_category_name: '',
    it_bill_category_status: false,
  })
  const { it_bill_category_slno, it_bill_category_name, it_bill_category_status } = billCategory
  const updateBillCategory = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setBillCategory({ ...billCategory, [e.target.name]: value })
    },
    [billCategory]
  )
  const postdata = useMemo(() => {
    return {
      it_bill_category_name: it_bill_category_name,
      it_bill_type_slno: billType,
      it_bill_category_status: it_bill_category_status === true ? 1 : 0,
      create_user: id,
    }
  }, [it_bill_category_name, billType, it_bill_category_status, id])

  const patchdata = useMemo(() => {
    return {
      it_bill_category_slno: it_bill_category_slno,
      it_bill_category_name: it_bill_category_name,
      it_bill_type_slno: billType,
      it_bill_category_status: it_bill_category_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [it_bill_category_slno, it_bill_category_name, billType, it_bill_category_status, id])
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const {
      it_bill_category_slno,
      it_bill_category_name,
      it_bill_category_status,
      it_bill_type_slno,
    } = data[0]
    const frmdata = {
      it_bill_category_slno: it_bill_category_slno,
      it_bill_category_name: it_bill_category_name,
      it_bill_type_slno: it_bill_type_slno,
      it_bill_category_status: it_bill_category_status === 1 ? true : false,
    }
    setBillCategory(frmdata)
    setBillType(it_bill_type_slno)
  }, [])
  const reset = useCallback(() => {
    const frmdata = {
      it_bill_category_slno: '',
      it_bill_category_name: '',
      it_bill_category_status: false,
    }
    setBillCategory(frmdata)
    setCount(0)
    setValue(0)
    setBillType(0)
  }, [])
  const submitBillCat = useCallback(
    e => {
      e.preventDefault()
      const InsertBillCategory = async postdata => {
        const result = await axioslogin.post('/billCategory/insert', postdata)
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
      const billCatUpdate = async patchdata => {
        const result = await axioslogin.patch('/billCategory/update', patchdata)
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
        if (it_bill_category_name !== '') {
          InsertBillCategory(postdata)
        } else {
          infoNotify('Please Enter Communication Device Type')
        }
      } else {
        billCatUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, it_bill_category_name, reset]
  )

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      it_bill_category_slno: '',
      it_bill_category_name: '',
      it_bill_category_status: false,
    }
    setBillCategory(frmdata)
    setValue(0)
    setBillType(0)
  }, [setBillCategory])
  return (
    <CardMaster
      title="Bill Category"
      submit={submitBillCat}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <Box sx={{ width: '30%', p: 1 }}>
          <Box>
            <TextFieldCustom
              placeholder="Bill Category"
              type="text"
              size="sm"
              name="it_bill_category_name"
              value={it_bill_category_name}
              onchange={updateBillCategory}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ mt: 0.5 }}>
            <ItBillTypeSelect billType={billType} setBillType={setBillType} />
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="it_bill_category_status"
              value={it_bill_category_status}
              checked={it_bill_category_status}
              onCheked={updateBillCategory}
            ></CusCheckBox>
          </Box>
        </Box>
        <Box sx={{ width: '70%' }}>
          <BillCategoryTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}
export default memo(BillCategoryMaster)
