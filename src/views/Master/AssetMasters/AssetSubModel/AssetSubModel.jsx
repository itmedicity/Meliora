import { Box } from '@mui/material'
import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { memo } from 'react'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useMemo } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import SubModelTable from './SubModelTable'
import AssetModelSelect from 'src/views/CommonSelectCode/AssetModelSelect'

const AssetSubModel = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useHistory()
  const [model, setModel] = useState(0)
  const [submodel, setsubmodel] = useState({
    submodel_slno: '',
    submodel_name: '',
    submodel_status: false,
  })
  const { submodel_slno, submodel_name, submodel_status } = submodel
  const Updatesubmodel = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setsubmodel({ ...submodel, [e.target.name]: value })
    },
    [submodel],
  )
  const reset = () => {
    const frmdata = {
      submodel_slno: '',
      submodel_name: '',
      submodel_status: false,
    }
    setsubmodel(frmdata)
    setCount(0)
    setValue(0)
    setModel(0)
  }
  const postdata = useMemo(() => {
    return {
      submodel_name: submodel_name,
      model_slno: model,
      submodel_status: submodel_status === true ? 1 : 0,
    }
  }, [submodel_name, submodel_status, model])
  const patchdata = useMemo(() => {
    return {
      submodel_slno: submodel_slno,
      submodel_name: submodel_name,
      model_slno: model,
      submodel_status: submodel_status === true ? 1 : 0,
    }
  }, [submodel_slno, submodel_name, model, submodel_status])
  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { submodel_slno, submodel_name, submodel_status, model_slno } = data[0]
    const frmdata = {
      submodel_slno: submodel_slno,
      submodel_name: submodel_name,
      submodel_status: submodel_status === 1 ? true : false,
    }
    setsubmodel(frmdata)
    setModel(model_slno)
  }, [])
  const submitsubmodel = useCallback(
    (e) => {
      e.preventDefault()
      const Insertsubmodel = async (postdata) => {
        const result = await axioslogin.post('/submodel/insert', postdata)
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
      const submodelUpdate = async (patchdata) => {
        const result = await axioslogin.patch('/submodel/update', patchdata)
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
        Insertsubmodel(postdata)
      } else {
        submodelUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count],
  )
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      submodel_slno: '',
      submodel_name: '',
      submodel_status: false,
    }
    setsubmodel(frmdata)
    setValue(0)
  }, [setsubmodel])
  return (
    <CardMaster
      title="Submodel"
      submit={submitsubmodel}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <Box sx={{ width: '30%', p: 1 }}>
          <Box>
            <TextFieldCustom
              placeholder="Submodel"
              type="text"
              size="sm"
              name="submodel_name"
              value={submodel_name}
              onchange={Updatesubmodel}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ pt: 1.5 }}>
            <AssetModelSelect value={model} setValue={setModel} />
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="submodel_status"
              value={submodel_status}
              checked={submodel_status}
              onCheked={Updatesubmodel}
            ></CusCheckBox>
          </Box>
        </Box>
        <Box sx={{ width: '70%' }}>
          <SubModelTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(AssetSubModel)
