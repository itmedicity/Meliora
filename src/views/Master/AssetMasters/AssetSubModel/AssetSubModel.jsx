import { Box, IconButton, Input, Typography } from '@mui/material'
import { React, useCallback, useState, memo, useMemo } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import SubModelTable from './SubModelTable'
import imageCompression from 'browser-image-compression'
import { CssVarsProvider } from '@mui/joy'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import AssetModelSelWithoutName from 'src/views/CommonSelectCode/AssetModelSelWithoutName'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AssetSubModel = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()
  const [selectFile, setSelectFile] = useState(null)
  const [model, setModel] = useState(0)
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [submodel, setsubmodel] = useState({
    submodel_slno: '',
    submodel_name: '',
    submodel_status: false
  })
  const { submodel_slno, submodel_name, submodel_status } = submodel
  const Updatesubmodel = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setsubmodel({ ...submodel, [e.target.name]: value })
    },
    [submodel]
  )
  const reset = () => {
    const frmdata = {
      submodel_slno: '',
      submodel_name: '',
      submodel_status: false
    }
    setsubmodel(frmdata)
    setCount(0)
    setValue(0)
    setModel(0)
    setSelectFile(null)
  }
  const postdata = useMemo(() => {
    return {
      submodel_name: submodel_name,
      model_slno: model,
      submodel_status: submodel_status === true ? 1 : 0,
      create_user: id
    }
  }, [submodel_name, submodel_status, model, id])
  const patchdata = useMemo(() => {
    return {
      submodel_slno: submodel_slno,
      submodel_name: submodel_name,
      model_slno: model,
      submodel_status: submodel_status === true ? 1 : 0,
      edit_user: id
    }
  }, [submodel_slno, submodel_name, model, submodel_status, id])
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { submodel_slno, submodel_name, submodel_status, model_slno } = data[0]
    const frmdata = {
      submodel_slno: submodel_slno,
      submodel_name: submodel_name,
      submodel_status: submodel_status === 1 ? true : false
    }
    setsubmodel(frmdata)
    setModel(model_slno)
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
  const submitSubmodel = useCallback(
    e => {
      e.preventDefault()
      const InsertSubmodel = async postdata => {
        const result = await axioslogin.post('/submodel/insert', postdata)
        return result.data
      }
      const SubmodelUpdate = async patchdata => {
        const result = await axioslogin.patch('/submodel/update', patchdata)
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
        const result = await axioslogin.post('/fileupload/uploadFile/SubModel', fileData)
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
        if (submodel_name !== '' && model !== 0) {
          InsertSubmodel(postdata).then(val => {
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
          infoNotify('Please Enter Submodel Name and Select Model')
        }
      } else {
        SubmodelUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, selectFile, submodel_name, model]
  )
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      submodel_slno: '',
      submodel_name: '',
      submodel_status: false
    }
    setsubmodel(frmdata)
    setValue(0)
    setModel(0)
    setSelectFile(null)
  }, [setsubmodel, setModel, setSelectFile])
  return (
    <CardMaster title="Submodel" submit={submitSubmodel} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <Box sx={{ width: '30%', p: 1 }}>
          <Box>
            <TextFieldCustom
              placeholder="Submodel"
              type="text"
              size="sm"
              name="submodel_name"
              value={submodel_name}
              onchange={Updatesubmodel}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ pt: 1.5 }}>
            <AssetModelSelWithoutName value={model} setValue={setModel} />
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="submodel_status"
              value={submodel_status}
              checked={submodel_status}
              onCheked={Updatesubmodel}
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
          <SubModelTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(AssetSubModel)
