import React, { memo, useMemo ,useCallback,useState} from 'react'
import CategoryTable from './CategoryTable'
import CardMaster from 'src/views/Components/CardMaster'
import { Box,Input,IconButton } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import imageCompression from 'browser-image-compression';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { CssVarsProvider, Typography } from '@mui/joy'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import { useSelector } from 'react-redux'

const CategoryMaster = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [selectFile, setSelectFile] = useState(null)
    // Get login user emp_id
    const id = useSelector((state) => {
      return state.LoginUserData.empid
     })
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
    setSelectFile(null)
  }
  const postdata = useMemo(() => {
    return {
      category_name: category_name,
      category_status: category_status === true ? 1 : 0,
      create_user: id
    }
  }, [category_name, category_status,id])
  const patchdata = useMemo(() => {
    return {
      category_slno: category_slno,
      category_name: category_name,
      category_status: category_status === true ? 1 : 0,
      edit_user: id
    }
  }, [category_slno, category_name, category_status,id])
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
  const uploadFile = async (event) => {
    const file = event.target.files[0];
    setSelectFile(file);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920
    }
    const compressedFile = await imageCompression(file, options);
    setSelectFile(compressedFile);
  };
  const submitCategory = useCallback(
    (e) => {
      e.preventDefault()

      const InsertCategory = async (postdata) => {
        const result = await axioslogin.post('/amcategory/insert', postdata)
        return result.data       
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
      const FileInsert = async (fileData) => {
        const result = await axioslogin.post('/fileupload/uploadFile/Category', fileData)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        }
        else {
          infoNotify(message)
        }
      }
      if (value === 0) {
        if ( category_name !== '') {
          InsertCategory(postdata).then((val) => {
            const { message, success, insertid } = val
            if (success === 1) {
              
              if (selectFile !== null) {
                //File upload Api and post data
              const formData = new FormData()
              formData.append('id', insertid)
              formData.append('file', selectFile, selectFile.name)
                FileInsert(formData)
              }
              else {
                succesNotify(message)
                setCount(count + 1)
                reset()
              }
            }
            else if (success === 0) {
              infoNotify(message)
            } else {
              infoNotify(message)
            }
          }) 
        }
        else {
          infoNotify("Please Enter Category") 
        }
     
      }  else {
        CategoryUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count,selectFile,category_name],
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
    setSelectFile(null)
  }, [setCategory, setSelectFile])
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CssVarsProvider>
              <Typography  >Upload file</Typography>
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
                 <Box sx={{ pt:2,fontWeight:2}}>
            {selectFile && <p > {selectFile.name}</p>}
            </Box>
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
