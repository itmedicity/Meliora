import { Box } from '@mui/system'
import React, { useCallback, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import ItemTypeTable from './ItemTypeTable'
import { useMemo } from 'react'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const ItemTypeMast = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [itemType, setItemType] = useState({
    item_type_slno: '',
    item_type_name: '',
    item_type_status: false,
  })
  const { item_type_slno, item_type_name, item_type_status } = itemType
  const updateItemType = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setItemType({ ...itemType, [e.target.name]: value })
    },
    [itemType],
  )

  const reset = () => {
    const frmdata = {
      item_type_slno: '',
      item_type_name: '',
      item_type_status: false,
    }
    setItemType(frmdata)
    setCount(0)
    setValue(0)
  }

  const postdata = useMemo(() => {
    return {
      item_type_name: item_type_name,
      item_type_status: item_type_status === true ? 1 : 0,
    }
  }, [item_type_name, item_type_status])

  const patchdata = useMemo(() => {
    return {
      item_type_slno: item_type_slno,
      item_type_name: item_type_name,
      item_type_status: item_type_status === true ? 1 : 0,
    }
  }, [item_type_slno, item_type_name, item_type_status])

  const sumbitItemType = useCallback(
    (e) => {
      e.preventDefault()
      const InsertItemType = async (postdata) => {
        const result = await axioslogin.post('/itemtype/insert', postdata)
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
      const ItemTypeUpdate = async (patchdata) => {
        const result = await axioslogin.patch('/itemtype/update', patchdata)
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
        InsertItemType(postdata)
      } else {
        ItemTypeUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count],
  )
  const rowSelect = useCallback((params) => {
    setValue(1)

    const data = params.api.getSelectedRows()
    const { item_type_slno, item_type_name, item_type_status } = data[0]
    const frmdata = {
      item_type_slno: item_type_slno,
      item_type_name: item_type_name,
      item_type_status: item_type_status === 1 ? true : false,
    }
    setItemType(frmdata)
  }, [])

  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])

  const refreshWindow = useCallback(() => {
    const frmdata = {
      item_type_slno: '',
      item_type_name: '',
      item_type_status: false,
    }
    setItemType(frmdata)
    setValue(0)
  }, [setItemType])
  return (
    <CardMaster
      title="Item Type Master"
      submit={sumbitItemType}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box sx>
              <TextFieldCustom
                placeholder="Item Type"
                type="text"
                size="sm"
                name="item_type_name"
                value={item_type_name}
                onchange={updateItemType}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ p: 1.5 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="item_type_status"
                value={item_type_status}
                checked={item_type_status}
                onCheked={updateItemType}
              ></CusCheckBox>
            </Box>
          </Box>

          <Box sx={{ width: '70%' }}>
            <ItemTypeTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}
export default ItemTypeMast
