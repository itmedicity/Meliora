import { Box } from '@mui/material'
import React, { memo ,useMemo,useCallback,useState} from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import DeviceTypeTable from './DeviceTypeTable'
import { useSelector } from 'react-redux'
const DeviceTypeMaster = () => {
    const [value, setValue] = useState(0)
    const [count, setCount] = useState(0)
    const history = useHistory()
    // Get login user emp_id
    const id = useSelector((state) => {
      return state.LoginUserData.empid
    })
    const [deviceType, setDeviceType] = useState({
      device_type_slno: '',
      device_type_name: '',
      device_type_status: false,
    })
    const { device_type_slno, device_type_name, device_type_status } = deviceType
    const updateDeviceType = useCallback(
      (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setDeviceType({ ...deviceType, [e.target.name]: value })
      },
      [deviceType],
    )
    const postdata = useMemo(() => {
      return {
        device_type_name: device_type_name,
        device_type_status: device_type_status === true ? 1 : 0,
        create_user: id
      }
    }, [device_type_name, device_type_status,id ])
    const patchdata = useMemo(() => {
      return {
        device_type_slno: device_type_slno,
        device_type_name: device_type_name,
        device_type_status: device_type_status === true ? 1 : 0,
        edit_user: id
  
      }
    }, [device_type_slno, device_type_name, device_type_status, id])
    const rowSelect = useCallback((params) => {
      setValue(1)
      const data = params.api.getSelectedRows()
      const { device_type_slno, device_type_name, device_type_status } = data[0]
      const frmdata = {
        device_type_slno: device_type_slno,
        device_type_name: device_type_name,
        device_type_status: device_type_status === 1 ? true : false,
      }
      setDeviceType(frmdata)
    }, [])
    const reset = () => {
      const frmdata = {
        device_type_slno: '',
        device_type_name: '',
        device_type_status: false,
      }
      setDeviceType(frmdata)
      setCount(0)
      setValue(0)
    }
    const submitdeviceType = useCallback(
      (e) => {
        e.preventDefault()
  
        const InsertdeviceType = async (postdata) => {
          const result = await axioslogin.post('/deviceType/insert', postdata)
  
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
        const deviceTypeUpdate = async (patchdata) => {
          const result = await axioslogin.patch('/deviceType/update', patchdata)
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
          if (device_type_name !== '') {
            InsertdeviceType(postdata)
          }
          else {
            infoNotify("Please Enter Communication Device Type")
          }
        }
        else {
          deviceTypeUpdate(patchdata)
        }
      },
      [postdata, value, patchdata, count, device_type_name],
    )
   
    const backtoSetting = useCallback(() => {
      history.push('/Home/Settings')
    }, [history])
    const refreshWindow = useCallback(() => {
      const frmdata = {
        device_type_slno: '',
        device_type_name: '',
        device_type_status: false,
      }
      setDeviceType(frmdata)
      setValue(0)
    }, [setDeviceType])
  return (
      <CardMaster
      title="Communication Device type"
    submit={submitdeviceType}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <Box sx={{ width: '30%', p: 1 }}>
          <Box>
            <TextFieldCustom
              placeholder="Communication Device Type"
              type="text"
              size="sm"
              name="device_type_name"
              value={device_type_name}
              onchange={updateDeviceType}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="device_type_status"
              value={device_type_status}
              checked={device_type_status}
              onCheked={updateDeviceType}
            ></CusCheckBox>
          </Box>
        </Box>
        <Box sx={{ width: '70%' }}>
          <DeviceTypeTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo( DeviceTypeMaster)