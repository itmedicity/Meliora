import React, { useCallback, useState, memo, useMemo } from 'react'
import SubCategoryTable from './SubCategoryTable'
import CardMaster from 'src/views/Components/CardMaster'
import { Box, IconButton, Input } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import AssetCategorySelWithoutName from 'src/views/CommonSelectCode/AssetCategorySelWithoutName'
import imageCompression from 'browser-image-compression'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { CssVarsProvider, Typography } from '@mui/joy'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const SubCategoryMast = () => {
  const history = useNavigate()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [category, setCategory] = useState(0)
  const [selectFile, setSelectFile] = useState(null)
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [subcategory, setSubCategory] = useState({
    subcategory_slno: '',
    subcategory_name: '',
    subcategory_status: false,
  })
  const { subcategory_slno, subcategory_name, subcategory_status } = subcategory
  const updateSubCategory = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setSubCategory({ ...subcategory, [e.target.name]: value })
    },
    [subcategory]
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
    setCategory(0)
    setSelectFile(null)
  }
  const postdata = useMemo(() => {
    return {
      subcategory_name: subcategory_name,
      category_slno: category,
      subcategory_status: subcategory_status === true ? 1 : 0,
      create_user: id,
    }
  }, [subcategory_name, category, subcategory_status, id])

  const patchdata = useMemo(() => {
    return {
      subcategory_slno: subcategory_slno,
      subcategory_name: subcategory_name,
      category_slno: category,
      subcategory_status: subcategory_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [subcategory_slno, subcategory_name, category, subcategory_status, id])
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { subcategory_slno, subcategory_name, category_slno, subcategory_status } = data[0]
    const frmdata = {
      subcategory_slno: subcategory_slno,
      subcategory_name: subcategory_name,
      category_slno: category_slno,
      subcategory_status: subcategory_status === 1 ? true : false,
    }
    setSubCategory(frmdata)
    setCategory(category_slno)
  }, [])
  const uploadFile = async event => {
    const file = event.target.files[0]
    setSelectFile(file)
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    }
    const compressedFile = await imageCompression(file, options)
    setSelectFile(compressedFile)
  }
  const submitSubCategory = useCallback(
    e => {
      e.preventDefault()
      const InsertSubCategory = async postdata => {
        const result = await axioslogin.post('/subcategory/insert', postdata)
        return result.data
      }
      const SubCategoryUpdate = async patchdata => {
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
      const FileInsert = async fileData => {
        const result = await axioslogin.post('/fileupload/uploadFile/SubCategory', fileData)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else {
          infoNotify(message)
        }
      }
      if (value === 0) {
        if (subcategory_name !== '' && category !== 0) {
          InsertSubCategory(postdata).then(val => {
            const { message, success, insertid } = val
            if (success === 1) {
              if (selectFile !== null) {
                //File upload Api and post data
                const formData = new FormData()
                formData.append('id', insertid)
                formData.append('file', selectFile, selectFile.name)
                FileInsert(formData)
                reset()
              } else {
                succesNotify(message)
                setCount(count + 1)
                reset()
              }
            } else if (success === 0) {
              infoNotify(message)
              reset()
            } else {
              infoNotify(message)
            }
          })
        } else {
          infoNotify('Please Enter Subcategory Name and Select Category')
        }
      } else {
        SubCategoryUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, selectFile, subcategory_name, category]
  )
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      subcategory_slno: '',
      subcategory_name: '',
      subcategory_status: false,
    }
    setSubCategory(frmdata)
    setValue(0)
    reset()
    setSelectFile(null)
  }, [setSubCategory, setSelectFile])
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
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Subcategory"
                type="text"
                size="sm"
                name="subcategory_name"
                value={subcategory_name}
                onchange={updateSubCategory}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <AssetCategorySelWithoutName value={category} setValue={setCategory} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CssVarsProvider>
                <Typography>Upload file</Typography>
              </CssVarsProvider>
              <label htmlFor="file-input">
                <CustomeToolTip title="upload">
                  <IconButton color="primary" aria-label="upload file" component="span">
                    <UploadFileIcon />
                  </IconButton>
                </CustomeToolTip>
              </label>
              <Input
                id="file-input"
                type="file"
                accept=".jpg, .jpeg, .png, .pdf"
                style={{ display: 'none' }}
                onChange={uploadFile}
              />
              <Box sx={{ pt: 2, fontWeight: 2 }}>{selectFile && <p> {selectFile.name}</p>}</Box>
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
