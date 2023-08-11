import { Box } from '@mui/material'
import React from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import BuildingMastTable from './BuildingMastTable'
import { useState } from 'react'
import { useCallback } from 'react'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useMemo } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const BuildingMast = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [building, setBuilding] = useState({
    rm_building_slno: '',
    rm_building_name: '',
    rm_building_alias: '',
    rm_building_no: '',
    rm_building_status: false,
  })
  const {
    rm_building_slno,
    rm_building_name,
    rm_building_alias,
    rm_building_no,
    rm_building_status,
  } = building
  const updateBuilding = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setBuilding({ ...building, [e.target.name]: value })
    },
    [building],
  )
  const reset = () => {
    const frmdata = {
      rm_building_slno: '',
      rm_building_name: '',
      rm_building_alias: '',
      rm_building_no: '',
      rm_building_status: false,
    }
    setBuilding(frmdata)
    setCount(0)
    setValue(0)
  }
  const postdata = useMemo(() => {
    return {
      rm_building_name: rm_building_name,
      rm_building_alias: rm_building_alias,
      rm_building_no: rm_building_no,
      rm_building_status: rm_building_status === true ? 1 : 0,
    }
  }, [rm_building_name, rm_building_alias, rm_building_no, rm_building_status])
  const patchdata = useMemo(() => {
    return {
      rm_building_slno: rm_building_slno,
      rm_building_name: rm_building_name,
      rm_building_alias: rm_building_alias,
      rm_building_no: rm_building_no,
      rm_building_status: rm_building_status === true ? 1 : 0,
    }
  }, [rm_building_slno, rm_building_name, rm_building_alias, rm_building_no, rm_building_status])

  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  const sumbitBuilding = useCallback(
    (e) => {
      e.preventDefault()
      const InsertBuilding = async (postdata) => {
        const result = await axioslogin.post('/building/insert', postdata)
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
      const UpdateBuilding = async (patchdata) => {
        const result = await axioslogin.patch('/building/update', patchdata)
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
        InsertBuilding(postdata)
      } else {
        UpdateBuilding(patchdata)
      }
    },
    [postdata, value, patchdata, count],
  )
  const rowSelect = useCallback((params) => {
    setValue(1)

    const data = params.api.getSelectedRows()
    const {
      rm_building_slno,
      rm_building_name,
      rm_building_alias,
      rm_building_no,
      rm_building_status,
    } = data[0]

    const frmdata = {
      rm_building_slno: rm_building_slno,
      rm_building_name: rm_building_name,
      rm_building_alias: rm_building_alias,
      rm_building_no: rm_building_no,
      rm_building_status: rm_building_status === 1 ? true : false,
    }
    setBuilding(frmdata)
  }, [])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      rm_building_slno: '',
      rm_building_name: '',
      rm_building_alias: '',
      rm_building_no: '',
      rm_building_status: false,
    }
    setBuilding(frmdata)
    setValue(0)
  }, [setBuilding])
  return (
    <CardMaster
      title="Building Master"
      submit={sumbitBuilding}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Building Name"
                type="text"
                size="sm"
                name="rm_building_name"
                value={rm_building_name}
                onchange={updateBuilding}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Building Alias"
                type="text"
                size="sm"
                name="rm_building_alias"
                value={rm_building_alias}
                onchange={updateBuilding}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Building Number"
                type="text"
                size="sm"
                name="rm_building_no"
                value={rm_building_no}
                onchange={updateBuilding}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ p: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="rm_building_status"
                value={rm_building_status}
                checked={rm_building_status}
                onCheked={updateBuilding}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <BuildingMastTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default BuildingMast
