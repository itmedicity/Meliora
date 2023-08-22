import { Box } from '@mui/material'
import React, { useCallback, memo } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import AssetCategorySelect from 'src/views/CommonSelectCode/AssetCategorySelect'
import AssetGroupSlect from 'src/views/CommonSelectCode/AssetGroupSlect'
import AssetManagementTypeSelect from 'src/views/CommonSelectCode/AssetManagementTypeSelect'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import ItemNameCreationTable from './ItemNameCreationTable'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import AssetItemSelect from 'src/views/CommonSelectCode/AssetItemSelect'
import AssetSubcategorySelect from 'src/views/CommonSelectCode/AssetSubcategorySelect'
import AssetSubGroupSelect from 'src/views/CommonSelectCode/AssetSubGroupSelect'
import AssetManufactureSelect from 'src/views/CommonSelectCode/AssetManufactureSelect'

const ItemNameCreation = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [assettype, setAssetType] = useState(0)
  const [itemtype, setItemtype] = useState(0)
  const [category, setCategory] = useState(0)
  const [subcategory, setSubcategory] = useState(0)
  const [group, setGroup] = useState(0)
  const [subgroup, setSubGroup] = useState(0)
  const [manufacture, setManufacture] = useState(0)

  const [item, setItem] = useState({
    item_creation_slno: '',
    item_name: '',
    item_creation_status: false,
  })
  const { item_creation_slno, item_name, item_creation_status } = item
  const updateItemCreation = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setItem({ ...item, [e.target.name]: value })
    },
    [item],
  )
  const postdata = useMemo(() => {
    return {
      item_asset_type_slno: assettype,
      item_type_slno: itemtype,
      item_category_slno: category,
      item_subcategory_slno: subcategory,
      item_group_slno: group,
      item_subgroup_slno: subgroup,
      item_manufactures_slno: manufacture,
      item_name: item_name,
      item_creation_status: item_creation_status === true ? 1 : 0,
    }
  }, [
    assettype,
    itemtype,
    category,
    subcategory,
    group,
    subgroup,
    manufacture,
    item_name,
    item_creation_status,
  ])
  const patchdata = useMemo(() => {
    return {
      item_creation_slno: item_creation_slno,
      item_asset_type_slno: assettype,
      item_type_slno: itemtype,
      item_category_slno: category,
      item_subcategory_slno: subcategory,
      item_group_slno: group,
      item_subgroup_slno: subgroup,
      item_manufactures_slno: manufacture,
      item_name: item_name,
      item_creation_status: item_creation_status === true ? 1 : 0,
    }
  }, [
    item_creation_slno,
    assettype,
    itemtype,
    category,
    subcategory,
    group,
    subgroup,
    manufacture,
    item_name,
    item_creation_status,
  ])

  const reset = () => {
    const frmdata = {
      item_creation_slno: '',
      item_name: '',
      item_creation_status: false,
    }
    setItem(frmdata)
    setCount(0)
    setValue(0)
    setItemtype(0)
    setAssetType(0)
    setItemtype(0)
    setCategory(0)
    setSubcategory(0)
    setGroup(0)
    setSubGroup(0)
    setManufacture(0)
  }
  const sumbitItemCreation = useCallback(
    (e) => {
      e.preventDefault()
      const InsertItem = async (postdata) => {
        const result = await axioslogin.post('/itemNameCreation/insert', postdata)
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
      const UpdateAssetType = async (patchdata) => {
        const result = await axioslogin.patch('/itemNameCreation/update', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)

          reset()
          setCount(count + 1)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      if (value === 0) {
        InsertItem(postdata)
      } else {
        UpdateAssetType(patchdata)
      }
    },
    [postdata, value, count, patchdata],
  )
  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const {
      item_creation_slno,
      item_asset_type_slno,
      item_type_slno,
      item_category_slno,
      item_subcategory_slno,
      item_group_slno,
      item_subgroup_slno,
      item_manufactures_slno,
      item_name,
      item_creation_status,
    } = data[0]
    const frmdata = {
      item_creation_slno: item_creation_slno,
      item_name: item_name,
      item_creation_status: item_creation_status === 1 ? true : false,
    }
    setItem(frmdata)
    setAssetType(item_asset_type_slno)
    setItemtype(item_type_slno)
    setCategory(item_category_slno)
    setSubcategory(item_subcategory_slno)
    setGroup(item_group_slno)
    setSubGroup(item_subgroup_slno)
    setManufacture(item_manufactures_slno)
  }, [])
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      item_creation_slno: '',
      item_name: '',
      item_creation_status: false,
    }
    setItem(frmdata)
    reset()
    setValue(0)
  }, [setItem])
  return (
    <CardMaster
      title="Item Name Creation"
      submit={sumbitItemCreation}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box sx={{ pt: 1.5 }}>
              <AssetManagementTypeSelect value={assettype} setValue={setAssetType} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <AssetItemSelect value={itemtype} setValue={setItemtype} />
            </Box>

            <Box sx={{ pt: 1.5 }}>
              <AssetCategorySelect value={category} setValue={setCategory} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <AssetSubcategorySelect
                value={subcategory}
                setValue={setSubcategory}
                category={category}
              />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <AssetGroupSlect value={group} setValue={setGroup} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <AssetSubGroupSelect value={subgroup} setValue={setSubGroup} group={group} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <AssetManufactureSelect value={manufacture} setValue={setManufacture} />
            </Box>

            <Box sx={{ pt: 1.2 }}>
              <TextFieldCustom
                placeholder="Item Name"
                type="text"
                size="sm"
                name="item_name"
                value={item_name}
                onchange={updateItemCreation}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 3 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="item_creation_status"
                value={item_creation_status}
                checked={item_creation_status}
                onCheked={updateItemCreation}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <ItemNameCreationTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(ItemNameCreation)
