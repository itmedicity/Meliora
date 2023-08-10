import React, { useCallback, useState } from 'react'
import ManufactureTable from './ManufactureTable'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const ManufactureMast = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [manufacture, setManufacture] = useState({
    manufacture_slno: '',
    manufacture_name: '',
    manufacture_status: false,
  })
  const { manufacture_slno, manufacture_name, manufacture_status } = manufacture
  const updateManufacture = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setManufacture({ ...manufacture, [e.target.name]: value })
    },
    [manufacture],
  )
  const postdata = useMemo(() => {
    return {
      manufacture_name: manufacture_name,
      manufacture_status: manufacture_status === true ? 1 : 0,
    }
  }, [manufacture_name, manufacture_status])

  const patchdata = useMemo(() => {
    return {
      manufacture_slno: manufacture_slno,
      manufacture_name: manufacture_name,
      manufacture_status: manufacture_status === true ? 1 : 0,
    }
  }, [manufacture_slno, manufacture_name, manufacture_status])

  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { manufacture_slno, manufacture_name, manufacture_status } = data[0]
    const frmdata = {
      manufacture_slno: manufacture_slno,
      manufacture_name: manufacture_name,
      manufacture_status: manufacture_status === 1 ? true : false,
    }
    setManufacture(frmdata)
  }, [])
  const reset = () => {
    const frmdata = {
      manufacture_slno: '',
      manufacture_name: '',
      manufacture_status: false,
    }
    setManufacture(frmdata)
    setCount(0)
    setValue(0)
  }
  const submitManufacture = useCallback(
    (e) => {
      e.preventDefault()

      const InsertManufacture = async (postdata) => {
        const result = await axioslogin.post('/manufacture/insert', postdata)

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
      const ManufactureUpdate = async (patchdata) => {
        const result = await axioslogin.patch('/manufacture/update', patchdata)
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
        InsertManufacture(postdata)
      } else {
        ManufactureUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count],
  )
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      manufacture_slno: '',
      manufacture_name: '',
      manufacture_status: false,
    }
    setManufacture(frmdata)
    setValue(0)
  }, [setManufacture])
  return (
    <CardMaster
      title="Manufacture Master"
      submit={submitManufacture}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Manufactures"
                type="text"
                size="sm"
                name="manufacture_name"
                value={manufacture_name}
                onchange={updateManufacture}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="manufacture_status"
                value={manufacture_status}
                checked={manufacture_status}
                onCheked={updateManufacture}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <ManufactureTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}
export default ManufactureMast
