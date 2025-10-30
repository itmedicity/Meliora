import React, { memo, useCallback, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ModelTable from './ModelTable'
import imageCompression from 'browser-image-compression'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Box, CssVarsProvider, IconButton, Input, Typography } from '@mui/joy'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AssetModel = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()
  const [selectFile, setSelectFile] = useState(null)
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [model, setModel] = useState({
    model_slno: '',
    model_name: '',
    model_status: false
  })
  const { model_slno, model_name, model_status } = model
  const UpdateModel = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setModel({ ...model, [e.target.name]: value })
    },
    [model]
  )
  const postdata = useMemo(() => {
    return {
      model_name: model_name,
      model_status: model_status === true ? 1 : 0,
      create_user: id
    }
  }, [model_name, model_status, id])
  const patchdata = useMemo(() => {
    return {
      model_slno: model_slno,
      model_name: model_name,
      model_status: model_status === true ? 1 : 0,
      edit_user: id
    }
  }, [model_slno, model_name, model_status, id])
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { model_slno, model_name, model_status } = data[0]
    const frmdata = {
      model_slno: model_slno,
      model_name: model_name,
      model_status: model_status === 1 ? true : false
    }
    setModel(frmdata)
  }, [])

  const uploadFile = async event => {
    const file = event.target.files[0]
    setSelectFile(file)
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920
    }
    const compressedFile = await imageCompression(file, options)
    setSelectFile(compressedFile)
  }
  const reset = () => {
    const frmdata = {
      model_slno: '',
      model_name: '',
      model_status: false
    }
    setModel(frmdata)
    setCount(0)
    setValue(0)
    setSelectFile(null)
  }

  const submitModel = useCallback(
    e => {
      e.preventDefault()
      const InsertModel = async postdata => {
        const result = await axioslogin.post('/model/insert', postdata)
        return result.data
      }
      const ModelUpdate = async patchdata => {
        const result = await axioslogin.patch('/model/update', patchdata)
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
        const result = await axioslogin.post('/fileupload/uploadFile/Model', fileData)
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
        if (model_name !== '') {
          InsertModel(postdata).then(val => {
            const { message, success, insertid } = val
            if (success === 1) {
              if (selectFile !== null) {
                //File upload Api and post data
                const formData = new FormData()
                formData.append('id', insertid)
                formData.append('file', selectFile, selectFile.name)
                FileInsert(formData)
              } else {
                succesNotify(message)
                setCount(count + 1)
                reset()
              }
            } else if (success === 0) {
              infoNotify(message)
            } else {
              infoNotify(message)
            }
          })
        } else {
          infoNotify('Please Enter Model')
        }
      } else {
        ModelUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, selectFile, model_name]
  )
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      model_slno: '',
      model_name: '',
      model_status: false
    }
    setModel(frmdata)
    setValue(0)
    setSelectFile(null)
  }, [setModel])
  return (
    <CardMaster title="Model" submit={submitModel} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <Box sx={{ width: '30%', p: 1 }}>
          <Box>
            <TextFieldCustom
              placeholder="Model"
              type="text"
              size="sm"
              name="model_name"
              value={model_name}
              onchange={UpdateModel}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="model_status"
              value={model_status}
              checked={model_status}
              onCheked={UpdateModel}
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
          <ModelTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(AssetModel)
