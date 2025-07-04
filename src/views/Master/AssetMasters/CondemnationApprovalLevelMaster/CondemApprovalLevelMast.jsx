import { Box, CssVarsProvider } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CondemApprovalLevelTable from './CondemApprovalLevelTable'
import CusCheckBox from 'src/views/Components/CusCheckBox'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useNavigate } from 'react-router-dom'

const CondemApprovalLevelMast = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const [approvalLevels, setApprovalLevels] = useState({
    level_slno: '',
    level_no: '',
    level_name: '',
    level_status: false
  })
  const { level_slno, level_no, level_name, level_status } = approvalLevels

  const updateApprovalLevels = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setApprovalLevels({ ...approvalLevels, [e.target.name]: value })
    },
    [approvalLevels]
  )

  const postdata = useMemo(() => {
    return {
      level_no: level_no,
      level_name: level_name,
      level_status: level_status === true ? 1 : 0,
      create_user: id
    }
  }, [level_no, level_name, level_status, id])
  const patchdata = useMemo(() => {
    return {
      level_no: level_no,
      level_slno: level_slno,
      level_name: level_name,
      level_status: level_status === true ? 1 : 0,
      edit_user: id
    }
  }, [level_no, level_slno, level_name, level_status, id])

  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { level_slno, level_no, level_name, level_status } = data[0]
    const frmdata = {
      level_slno: level_slno,
      level_no: level_no,
      level_name: level_name,
      level_status: level_status === 1 ? true : false
    }
    setApprovalLevels(frmdata)
  }, [])

  const reset = () => {
    const frmdata = {
      level_slno: '',
      level_no: '',
      level_name: '',
      level_status: false
    }
    setApprovalLevels(frmdata)
    setCount(0)
    setValue(0)
  }

  const submitapprovalLevels = useCallback(
    e => {
      e.preventDefault()

      const InsertapprovalLevels = async postdata => {
        const result = await axioslogin.post('/condemApprovalLevel/insertLevel', postdata)

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
      const approvalLevelsUpdate = async patchdata => {
        const result = await axioslogin.patch('/condemApprovalLevel/updateLevel', patchdata)
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
        if (level_name !== '' && level_no !== '') {
          InsertapprovalLevels(postdata)
        } else {
          infoNotify('Please Enter level Number and Level Name')
        }
      } else {
        approvalLevelsUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, level_name, level_no]
  )

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      level_slno: '',
      level_no: '',
      level_name: '',
      level_status: false
    }
    setApprovalLevels(frmdata)
    setValue(0)
  }, [setApprovalLevels])

  return (
    <CardMaster
      title="Condemnation Approval Levels"
      close={backtoSetting}
      submit={submitapprovalLevels}
      refresh={refreshWindow}
    >
      <Box sx={{ flex: 1, display: 'flex' }}>
        <Box sx={{ flex: 1 }}>
          <CssVarsProvider>
            <TextFieldCustom
              style={{ width: 100 }}
              startDecorator={'Level'}
              type="text"
              size="sm"
              name="level_no"
              value={level_no}
              onchange={updateApprovalLevels}
            ></TextFieldCustom>
            <Box sx={{ mt: 0.5 }}>
              <TextFieldCustom
                placeholder="level Name"
                type="text"
                size="sm"
                name="level_name"
                value={level_name}
                onchange={updateApprovalLevels}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ mt: 1 }}>
              <CusCheckBox
                label="Level Active Status"
                color="primary"
                size="md"
                name="level_status"
                value={level_status}
                checked={level_status}
                onCheked={updateApprovalLevels}
              ></CusCheckBox>
            </Box>

            {/* <Typography>
                            List Pending Approvals After Levels Approve
                        </Typography> */}
          </CssVarsProvider>
        </Box>
        <Box sx={{ flex: 2, ml: 1 }}>
          <CondemApprovalLevelTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(CondemApprovalLevelMast)
