import React, { useCallback, useMemo, useState, memo } from 'react'
import SubGroupTable from './SubGroupTable'
import CardMaster from 'src/views/Components/CardMaster'
import { Box, IconButton, Input } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import AssetGroupSelectWithoutName from 'src/views/CommonSelectCode/AssetGroupSelectWithoutName'
import imageCompression from 'browser-image-compression'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { CssVarsProvider, Typography } from '@mui/joy'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const SubGroupMast = () => {
  const history = useNavigate()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [group, setGroup] = useState(0)
  const [selectFile, setSelectFile] = useState(null)
  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const [subGroup, setsubGroup] = useState({
    subgroup_slno: '',
    sub_group_name: '',
    sub_group_status: false,
  })
  const { subgroup_slno, sub_group_name, sub_group_status } = subGroup
  const updateSubGroup = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setsubGroup({ ...subGroup, [e.target.name]: value })
    },
    [subGroup],
  )
  const reset = () => {
    const frmdata = {
      subgroup_slno: '',
      sub_group_name: '',
      sub_group_status: false,
    }
    setsubGroup(frmdata)
    setCount(0)
    setValue(0)
    setGroup(0)
    setSelectFile(null)
  }
  const postdata = useMemo(() => {
    return {
      sub_group_name: sub_group_name,
      group_slno: group,
      sub_group_status: sub_group_status === true ? 1 : 0,
      create_user: id,
    }
  }, [sub_group_name, sub_group_status, group, id])
  const patchdata = useMemo(() => {
    return {
      subgroup_slno: subgroup_slno,
      group_slno: group,
      sub_group_name: sub_group_name,
      sub_group_status: sub_group_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [subgroup_slno, sub_group_name, group, sub_group_status, id])
  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { subgroup_slno, sub_group_name, sub_group_status, group_slno } = data[0]
    const frmdata = {
      subgroup_slno: subgroup_slno,
      sub_group_name: sub_group_name,
      group_slno: group_slno,
      sub_group_status: sub_group_status === 1 ? true : false,
    }
    setsubGroup(frmdata)
    setGroup(group_slno)
  }, [])
  const uploadFile = async (event) => {
    const file = event.target.files[0]
    setSelectFile(file)
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    }
    const compressedFile = await imageCompression(file, options)
    setSelectFile(compressedFile)
  }
  const submitGroup = useCallback(
    (e) => {
      e.preventDefault()
      const InsertGroup = async (postdata) => {
        const result = await axioslogin.post('/subgroup/insert', postdata)
        return result.data
      }
      const SubGroupUpdate = async (patchdata) => {
        const result = await axioslogin.patch('/subgroup/update', patchdata)
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
        const result = await axioslogin.post('/fileupload/uploadFile/SubGroup', fileData)
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
        if (sub_group_name !== '' && group !== 0) {
          InsertGroup(postdata).then((val) => {
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
          infoNotify('Please Enter Subgroup Name and Select Group')
        }
      } else {
        SubGroupUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, selectFile, sub_group_name, group],
  )
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      subgroup_slno: '',
      sub_group_name: '',
      sub_group_status: false,
    }
    setsubGroup(frmdata)
    setValue(0)
    setSelectFile(null)
    reset()
  }, [setsubGroup, setSelectFile])
  return (
    <CardMaster
      title="Subgroup Master"
      submit={submitGroup}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Subgroup name"
                type="text"
                size="sm"
                name="sub_group_name"
                value={sub_group_name}
                onchange={updateSubGroup}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <AssetGroupSelectWithoutName value={group} setValue={setGroup} />
            </Box>
            <Box sx={{ pt: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="sub_group_status"
                value={sub_group_status}
                checked={sub_group_status}
                onCheked={updateSubGroup}
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
              <Box sx={{ pt: 2, fontWeight: 2 }}>{selectFile && <p>{selectFile.name}</p>}</Box>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <SubGroupTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}
export default memo(SubGroupMast)
