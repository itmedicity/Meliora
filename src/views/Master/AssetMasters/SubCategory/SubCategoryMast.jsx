import React, { useCallback, useState } from 'react'
import SubCategoryTable from './SubCategoryTable'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useMemo } from 'react'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { memo } from 'react'

const SubCategoryMast = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [subcategory, setSubCategory] = useState({
    subcategory_slno: '',
    subcategory_name: '',
    subcategory_status: false,
  })
  const { subcategory_slno, subcategory_name, subcategory_status } = subcategory
  const updateSubCategory = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setSubCategory({ ...subcategory, [e.target.name]: value })
    },
    [subcategory],
  )
  const reset = () => {
    const frmdata = {
      subcategory_slno: '',
      subcategory_name: '',
      subcategory_status: false,
    }
    setSubCategory(frmdata)
    setCount(0)
    setValue(0)
  }
  const postdata = useMemo(() => {
    return {
      subcategory_name: subcategory_name,
      subcategory_status: subcategory_status === true ? 1 : 0,
    }
  }, [subcategory_name, subcategory_status])

  const patchdata = useMemo(() => {
    return {
      subcategory_slno: subcategory_slno,
      subcategory_name: subcategory_name,
      subcategory_status: subcategory_status === true ? 1 : 0,
    }
  }, [subcategory_slno, subcategory_name, subcategory_status])
  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()

    const { subcategory_slno, subcategory_name, subcategory_status } = data[0]
    const frmdata = {
      subcategory_slno: subcategory_slno,
      subcategory_name: subcategory_name,
      subcategory_status: subcategory_status === 1 ? true : false,
    }
    setSubCategory(frmdata)
  }, [])
  const submitSubCategory = useCallback(
    (e) => {
      e.preventDefault()

      const InsertSubCategory = async (postdata) => {
        const result = await axioslogin.post('/subcategory/insert', postdata)

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
      const SubCategoryUpdate = async (patchdata) => {
        const result = await axioslogin.patch('/subcategory/update', patchdata)
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
        InsertSubCategory(postdata)
      } else {
        SubCategoryUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count],
  )
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      subcategory_slno: '',
      subcategory_name: '',
      subcategory_status: false,
    }
    setSubCategory(frmdata)
    setValue(0)
  }, [setSubCategory])
  return (
    <CardMaster
      title="Subcategory Master"
      submit={submitSubCategory}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Subcategory"
                type="text"
                size="sm"
                name="subcategory_name"
                value={subcategory_name}
                onchange={updateSubCategory}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="subcategory_status"
                value={subcategory_status}
                checked={subcategory_status}
                onCheked={updateSubCategory}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <SubCategoryTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}
export default memo(SubCategoryMast)
