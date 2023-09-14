import { Box } from '@mui/system'
import React, { memo, useCallback, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import AssetTypeTable from './AssetTypeTable'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'

const AssetTypeMaster = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
     // Get login user emp_id
     const id = useSelector((state) => {
      return state.LoginUserData.empid
     })
  const [assetType, setAssetType] = useState({
    asset_type_slno: '',
    asset_type_name: '',
    asset_type_status: false,
  })
  const { asset_type_slno, asset_type_name, asset_type_status } = assetType

  const updateAssetType = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setAssetType({ ...assetType, [e.target.name]: value })
    },
    [assetType],
  )
  const reset = () => {
    const frmdata = {
      asset_type_slno: '',
      asset_type_name: '',
      asset_type_status: false,
    }
    setAssetType(frmdata)
    setCount(0)
    setValue(0)
   
  }
  const postdata = useMemo(() => {
    return {
      asset_type_name: asset_type_name,
      asset_type_status: asset_type_status === true ? 1 : 0,
      create_user: id
    }
  }, [asset_type_name, asset_type_status,id])
  const patchdata = useMemo(() => {
    return {
      asset_type_slno: asset_type_slno,
      asset_type_name: asset_type_name,
      asset_type_status: asset_type_status === true ? 1 : 0,
      edit_user: id
    }
  }, [asset_type_slno, asset_type_name, asset_type_status,id])
  const sumbitAssetType = useCallback(
    (e) => {
      e.preventDefault()
      const InsertAssetType = async (postdata) => {
        const result = await axioslogin.post('/assettypee/insert', postdata)
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
      const AssetTypeUpdate = async (patchdata) => {
        const result = await axioslogin.patch('/assettypee/update', patchdata)
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
        if (asset_type_name !== '') {
        InsertAssetType(postdata)
      } else {
        infoNotify("Please Enter Asset type") 
      }
    }else {
        AssetTypeUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count,asset_type_name],
  )
  const rowSelect = useCallback((params) => {
    setValue(1)

    const data = params.api.getSelectedRows()
    const { asset_type_slno, asset_type_name, asset_type_status } = data[0]
    const frmdata = {
      asset_type_slno: asset_type_slno,
      asset_type_name: asset_type_name,
      asset_type_status: asset_type_status === 1 ? true : false,
    }
    setAssetType(frmdata)
  }, [])
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      asset_type_slno: '',
      asset_type_name: '',
      asset_type_status: false,
    }
    setAssetType(frmdata)
    setValue(0)     
  }, [setAssetType])
  return (
    <CardMaster
      title="Asset Master"
      submit={sumbitAssetType}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box >
              <TextFieldCustom
                placeholder="Asset Type"
                type="text"
                size="sm"
                name="asset_type_name"
                value={asset_type_name}
                onchange={updateAssetType}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ p: 1.5 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="asset_type_status"
                value={asset_type_status}
                checked={asset_type_status}
                onCheked={updateAssetType}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <AssetTypeTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(AssetTypeMaster)
