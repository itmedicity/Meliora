import { Box } from '@mui/material'
import React from 'react'
import { useCallback, useState, useMemo, memo } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import BuildBlockMastTable from './BuildBlockMastTable'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const BuildBlockMast = () => {
  const history = useNavigate()
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)
  const [buildBlock, setbuildBlock] = useState({
    rm_buildblock_slno: '',
    rm_buildblock_name: '',
    rm_buildblock_alias: '',
    rm_buildblock_no: '',
    rm_buildblock_status: false,
  })
  const {
    rm_buildblock_slno,
    rm_buildblock_name,
    rm_buildblock_alias,
    rm_buildblock_no,
    rm_buildblock_status,
  } = buildBlock
  const updateBuildBlock = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setbuildBlock({ ...buildBlock, [e.target.name]: value })
    },
    [buildBlock],
  )
  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const postdata = useMemo(() => {
    return {
      rm_buildblock_name: rm_buildblock_name,
      rm_buildblock_alias: rm_buildblock_alias,
      rm_buildblock_no: rm_buildblock_no,
      rm_buildblock_status: rm_buildblock_status === true ? 1 : 0,
      create_user: id,
    }
  }, [rm_buildblock_name, rm_buildblock_alias, rm_buildblock_no, rm_buildblock_status, id])
  const patchdata = useMemo(() => {
    return {
      rm_buildblock_slno: rm_buildblock_slno,
      rm_buildblock_name: rm_buildblock_name,
      rm_buildblock_alias: rm_buildblock_alias,
      rm_buildblock_no: rm_buildblock_no,
      rm_buildblock_status: rm_buildblock_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [
    rm_buildblock_slno,
    rm_buildblock_name,
    rm_buildblock_alias,
    rm_buildblock_no,
    rm_buildblock_status,
    id,
  ])
  const reset = () => {
    const frmdata = {
      rm_buildblock_slno: '',
      rm_buildblock_name: '',
      rm_buildblock_alias: '',
      rm_buildblock_no: '',
      rm_buildblock_status: false,
    }
    setbuildBlock(frmdata)
    setCount(0)
    setValue(0)
  }
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const rowSelect = useCallback((params) => {
    setValue(1)

    const data = params.api.getSelectedRows()
    const {
      rm_buildblock_slno,
      rm_buildblock_name,
      rm_buildblock_alias,
      rm_buildblock_no,
      rm_buildblock_status,
    } = data[0]
    const frmdata = {
      rm_buildblock_slno: rm_buildblock_slno,
      rm_buildblock_name: rm_buildblock_name,
      rm_buildblock_alias: rm_buildblock_alias,
      rm_buildblock_no: rm_buildblock_no,
      rm_buildblock_status: rm_buildblock_status === 1 ? true : false,
    }
    setbuildBlock(frmdata)
  }, [])
  const sumbitBuildBlock = useCallback(
    (e) => {
      e.preventDefault()
      const InsertBuildBlock = async (postdata) => {
        const result = await axioslogin.post('/buildblock/insert', postdata)
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
      const UpdateBuildBlock = async (patchdata) => {
        const result = await axioslogin.patch('/buildblock/update', patchdata)
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
        InsertBuildBlock(postdata)
      } else {
        UpdateBuildBlock(patchdata)
      }
    },
    [postdata, value, patchdata, count],
  )
  const refreshWindow = useCallback(() => {
    const frmdata = {
      rm_buildblock_slno: '',
      rm_buildblock_name: '',
      rm_buildblock_alias: '',
      rm_buildblock_no: '',
      rm_buildblock_status: false,
    }
    setbuildBlock(frmdata)
    setValue(0)
  }, [setbuildBlock])

  return (
    <CardMaster
      title="Building Block Master"
      submit={sumbitBuildBlock}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Building Block Name"
                type="text"
                size="sm"
                name="rm_buildblock_name"
                value={rm_buildblock_name}
                onchange={updateBuildBlock}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Building Block Alias"
                type="text"
                size="sm"
                name="rm_buildblock_alias"
                value={rm_buildblock_alias}
                onchange={updateBuildBlock}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Building Block Number"
                type="text"
                size="sm"
                name="rm_buildblock_no"
                value={rm_buildblock_no}
                onchange={updateBuildBlock}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ p: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="rm_buildblock_status"
                value={rm_buildblock_status}
                checked={rm_buildblock_status}
                onCheked={updateBuildBlock}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <BuildBlockMastTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(BuildBlockMast)
