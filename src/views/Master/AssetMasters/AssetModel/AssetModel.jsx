import { Box } from '@mui/material'
import React, { memo } from 'react'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ModelTable from './ModelTable'

const AssetModel = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useHistory()
  const [model, setModel] = useState({
    model_slno: '',
    model_name: '',
    model_status: false,
  })
  const { model_slno, model_name, model_status } = model
  const UpdateModel = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setModel({ ...model, [e.target.name]: value })
    },
    [model],
  )
  const postdata = useMemo(() => {
    return {
      model_name: model_name,
      model_status: model_status === true ? 1 : 0,
    }
  }, [model_name, model_status])
  const patchdata = useMemo(() => {
    return {
      model_slno: model_slno,
      model_name: model_name,
      model_status: model_status === true ? 1 : 0,
    }
  }, [model_slno, model_name, model_status])
  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { model_slno, model_name, model_status } = data[0]
    const frmdata = {
      model_slno: model_slno,
      model_name: model_name,
      model_status: model_status === 1 ? true : false,
    }
    setModel(frmdata)
  }, [])
  const reset = () => {
    const frmdata = {
      model_slno: '',
      model_name: '',
      model_status: false,
    }
    setModel(frmdata)
    setCount(0)
    setValue(0)
  }
  const submitModel = useCallback(
    (e) => {
      e.preventDefault()

      const InsertModel = async (postdata) => {
        const result = await axioslogin.post('/model/insert', postdata)

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
      const ModelUpdate = async (patchdata) => {
        const result = await axioslogin.patch('/model/update', patchdata)
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
        InsertModel(postdata)
      } else {
        ModelUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count],
  )

  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      model_slno: '',
      model_name: '',
      model_status: false,
    }
    setModel(frmdata)
    setValue(0)
  }, [setModel])
  return (
    <CardMaster title="Model" submit={submitModel} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <Box sx={{ width: '30%', p: 1 }}>
          <Box>
            <TextFieldCustom
              placeholder="Model"
              type="text"
              size="sm"
              name="model_name"
              value={model_name}
              onchange={UpdateModel}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="model_status"
              value={model_status}
              checked={model_status}
              onCheked={UpdateModel}
            ></CusCheckBox>
          </Box>
        </Box>
        <Box sx={{ width: '70%' }}>
          <ModelTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(AssetModel)
