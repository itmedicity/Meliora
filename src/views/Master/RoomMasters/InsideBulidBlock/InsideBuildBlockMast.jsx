import { Box } from '@mui/material'
import React from 'react'
import { useMemo, useCallback, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import InsideBuildBlockTable from './InsideBuildBlockTable'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const InsideBuildBlockMast = () => {
  const history = useNavigate()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [insidebuild, setInsideBuild] = useState({
    rm_insidebluidblock_slno: '',
    rm_insidebuildblock_name: '',
    rm_insidebuildblock_alias: '',
    rm_insidebuildblock_no: '',
    rm_insidebuildblock_status: false,
  })
  const {
    rm_insidebluidblock_slno,
    rm_insidebuildblock_name,
    rm_insidebuildblock_alias,
    rm_insidebuildblock_no,
    rm_insidebuildblock_status,
  } = insidebuild
  const updateInsideBuild = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setInsideBuild({ ...insidebuild, [e.target.name]: value })
    },
    [insidebuild],
  )
  const reset = () => {
    const frmdata = {
      rm_insidebluidblock_slno: '',
      rm_insidebuildblock_name: '',
      rm_insidebuildblock_alias: '',
      rm_insidebuildblock_no: '',
      rm_insidebuildblock_status: false,
    }
    setInsideBuild(frmdata)
    setCount(0)
    setValue(0)
  }
  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const postdata = useMemo(() => {
    return {
      rm_insidebuildblock_name: rm_insidebuildblock_name,
      rm_insidebuildblock_alias: rm_insidebuildblock_alias,
      rm_insidebuildblock_no: rm_insidebuildblock_no,
      rm_insidebuildblock_status: rm_insidebuildblock_status === true ? 1 : 0,
      create_user: id,
    }
  }, [
    rm_insidebuildblock_name,
    rm_insidebuildblock_alias,
    rm_insidebuildblock_no,
    rm_insidebuildblock_status,
    id,
  ])
  const patchdata = useMemo(() => {
    return {
      rm_insidebuildblock_slno: rm_insidebluidblock_slno,
      rm_insidebuildblock_name: rm_insidebuildblock_name,
      rm_insidebuildblock_alias: rm_insidebuildblock_alias,
      rm_insidebuildblock_no: rm_insidebuildblock_no,
      rm_insidebuildblock_status: rm_insidebuildblock_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [
    rm_insidebluidblock_slno,
    rm_insidebuildblock_name,
    rm_insidebuildblock_alias,
    rm_insidebuildblock_no,
    rm_insidebuildblock_status,
    id,
  ])

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const sumbitInsideBuild = useCallback(
    (e) => {
      e.preventDefault()
      const InsertInsideBuild = async (postdata) => {
        const result = await axioslogin.post('/insidebuildblock/insert', postdata)
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
      const UpdateInsideBuild = async (patchdata) => {
        const result = await axioslogin.patch('/insidebuildblock/update', patchdata)
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
        if (rm_insidebuildblock_name !== '') {
          InsertInsideBuild(postdata)
        } else {
          warningNotify('Please Enter Inside Building Block Name')
        }
      } else {
        if (rm_insidebuildblock_name !== '') {
          UpdateInsideBuild(patchdata)
        } else {
          warningNotify('Please Enter Inside Building Block Name')
        }
      }
    },
    [postdata, value, patchdata, count, rm_insidebuildblock_name],
  )
  const rowSelect = useCallback((params) => {
    setValue(1)

    const data = params.api.getSelectedRows()
    const {
      rm_insidebuildblock_slno,
      rm_insidebuildblock_name,
      rm_insidebuildblock_alias,
      rm_insidebuildblock_no,
      rm_insidebuildblock_status,
    } = data[0]

    const frmdata = {
      rm_insidebluidblock_slno: rm_insidebuildblock_slno,
      rm_insidebuildblock_name: rm_insidebuildblock_name,
      rm_insidebuildblock_alias: rm_insidebuildblock_alias,
      rm_insidebuildblock_no: rm_insidebuildblock_no,
      rm_insidebuildblock_status: rm_insidebuildblock_status === 1 ? true : false,
    }
    setInsideBuild(frmdata)
  }, [])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      rm_insidebluidblock_slno: '',
      rm_insidebuildblock_name: '',
      rm_insidebuildblock_alias: '',
      rm_insidebuildblock_no: '',
      rm_insidebuildblock_status: false,
    }
    setInsideBuild(frmdata)
    setValue(0)
  }, [setInsideBuild])
  return (
    <CardMaster
      title="Inside Building Block"
      submit={sumbitInsideBuild}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder=" Inside Building Block Name"
                type="text"
                size="sm"
                name="rm_insidebuildblock_name"
                value={rm_insidebuildblock_name}
                onchange={updateInsideBuild}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder=" Inside Building Block Alias"
                type="text"
                size="sm"
                name="rm_insidebuildblock_alias"
                value={rm_insidebuildblock_alias}
                onchange={updateInsideBuild}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder=" Inside Building Block Number"
                type="text"
                size="sm"
                name="rm_insidebuildblock_no"
                value={rm_insidebuildblock_no}
                onchange={updateInsideBuild}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ p: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="rm_insidebuildblock_status"
                value={rm_insidebuildblock_status}
                checked={rm_insidebuildblock_status}
                onCheked={updateInsideBuild}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <InsideBuildBlockTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(InsideBuildBlockMast)
