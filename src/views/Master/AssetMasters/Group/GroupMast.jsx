import React, { memo, useCallback, useMemo, useState } from 'react'
import GroupTable from './GroupTable'
import CardMaster from 'src/views/Components/CardMaster'
import { Box, IconButton, Input } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import imageCompression from 'browser-image-compression'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { CssVarsProvider, Typography } from '@mui/joy'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const GroupMast = () => {
  const history = useNavigate()
  const [selectFile, setSelectFile] = useState(null)
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [group, setGroup] = useState({
    group_slno: '',
    group_name: '',
    group_status: false,
  })
  const { group_slno, group_name, group_status } = group
  const updateGroup = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setGroup({ ...group, [e.target.name]: value })
    },
    [group]
  )
  const reset = () => {
    const frmdata = {
      group_slno: '',
      group_name: '',
      group_status: false,
    }
    setGroup(frmdata)
    setCount(0)
    setValue(0)
    setSelectFile(null)
  }
  const postdata = useMemo(() => {
    return {
      group_name: group_name,
      group_status: group_status === true ? 1 : 0,
      create_user: id,
    }
  }, [group_name, group_status, id])
  const patchdata = useMemo(() => {
    return {
      group_slno: group_slno,
      group_name: group_name,
      group_status: group_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [group_slno, group_name, group_status, id])

  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { group_slno, group_name, group_status } = data[0]
    const frmdata = {
      group_slno: group_slno,
      group_name: group_name,
      group_status: group_status === 1 ? true : false,
    }
    setGroup(frmdata)
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
  const submitGroup = useCallback(
    e => {
      e.preventDefault()
      const InsertGroup = async postdata => {
        const result = await axioslogin.post('/amgroup/insert', postdata)
        return result.data
      }
      const GroupUpdate = async patchdata => {
        const result = await axioslogin.patch('/amgroup/update', patchdata)
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
        const result = await axioslogin.post('/fileupload/uploadFile/Group', fileData)
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
        if (group_name !== '') {
          InsertGroup(postdata).then(val => {
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
          infoNotify('Please Enter Group')
        }
      } else {
        GroupUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, selectFile, group_name]
  )
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      group_slno: '',
      group_name: '',
      group_status: false,
    }
    setGroup(frmdata)
    setValue(0)
    setSelectFile(null)
  }, [setGroup, setSelectFile])
  return (
    <CardMaster
      title="Group Master"
      submit={submitGroup}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Group"
                type="text"
                size="sm"
                name="group_name"
                value={group_name}
                onchange={updateGroup}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="group_status"
                value={group_status}
                checked={group_status}
                onCheked={updateGroup}
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
            <GroupTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(GroupMast)
