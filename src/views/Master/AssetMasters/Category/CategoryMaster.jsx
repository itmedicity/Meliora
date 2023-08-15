import React, { memo, useMemo } from 'react'
import CategoryTable from './CategoryTable'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useState } from 'react'
import { useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const CategoryMaster = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [category, setCategory] = useState({
    category_slno: '',
    category_name: '',
    category_status: false,
  })
  const { category_slno, category_name, category_status } = category
  const updateCategory = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setCategory({ ...category, [e.target.name]: value })
    },
    [category],
  )

  const reset = () => {
    const frmdata = {
      category_slno: '',
      category_name: '',
      category_status: false,
    }
    setCategory(frmdata)
    setCount(0)
    setValue(0)
  }
  const postdata = useMemo(() => {
    return {
      category_name: category_name,
      category_status: category_status === true ? 1 : 0,
    }
  }, [category_name, category_status])

  const patchdata = useMemo(() => {
    return {
      category_slno: category_slno,
      category_name: category_name,
      category_status: category_status === true ? 1 : 0,
    }
  }, [category_slno, category_name, category_status])

  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { category_slno, category_name, category_status } = data[0]
    const frmdata = {
      category_slno: category_slno,
      category_name: category_name,
      category_status: category_status === 1 ? true : false,
    }
    setCategory(frmdata)
  }, [])

  const submitCategory = useCallback(
    (e) => {
      e.preventDefault()

      const InsertCategory = async (postdata) => {
        const result = await axioslogin.post('/amcategory/insert', postdata)

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

      const CategoryUpdate = async (patchdata) => {
        const result = await axioslogin.patch('/amcategory/update', patchdata)
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
        InsertCategory(postdata)
      } else {
        CategoryUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count],
  )
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      category_slno: '',
      category_name: '',
      category_status: false,
    }
    setCategory(frmdata)
    setValue(0)
  }, [setCategory])
  return (
    <CardMaster
      title="Category Master"
      submit={submitCategory}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Category"
                type="text"
                size="sm"
                name="category_name"
                value={category_name}
                onchange={updateCategory}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="category_status"
                value={category_status}
                checked={category_status}
                onCheked={updateCategory}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <CategoryTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(CategoryMaster)
