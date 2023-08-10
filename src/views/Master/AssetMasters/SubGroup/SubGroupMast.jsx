import React, { useCallback, useMemo, useState } from 'react'
import SubGroupTable from './SubGroupTable'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const SubGroupMast = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
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
  }
  const postdata = useMemo(() => {
    return {
      sub_group_name: sub_group_name,
      sub_group_status: sub_group_status === true ? 1 : 0,
    }
  }, [sub_group_name, sub_group_status])
  const patchdata = useMemo(() => {
    return {
      subgroup_slno: subgroup_slno,
      sub_group_name: sub_group_name,
      sub_group_status: sub_group_status === true ? 1 : 0,
    }
  }, [subgroup_slno, sub_group_name, sub_group_status])

  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { subgroup_slno, sub_group_name, sub_group_status } = data[0]
    const frmdata = {
      subgroup_slno: subgroup_slno,
      sub_group_name: sub_group_name,
      sub_group_status: sub_group_status === 1 ? true : false,
    }
    setsubGroup(frmdata)
  }, [])
  const submitGroup = useCallback(
    (e) => {
      e.preventDefault()
      const InsertGroup = async (postdata) => {
        const result = await axioslogin.post('/subgroup/insert', postdata)

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
      if (value === 0) {
        InsertGroup(postdata)
      } else {
        SubGroupUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count],
  )
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      subgroup_slno: '',
      sub_group_name: '',
      sub_group_status: false,
    }
    setsubGroup(frmdata)
    setValue(0)
  }, [setsubGroup])
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
          </Box>
          <Box sx={{ width: '70%' }}>
            <SubGroupTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}
export default SubGroupMast
