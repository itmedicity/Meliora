import { Box, Button, Typography } from '@mui/material'
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
import AssetUOMSelect from 'src/views/CommonSelectCode/AssetUOMSelect'
import AssetModelSelect from 'src/views/CommonSelectCode/AssetModelSelect'
import AmSubmodelSelect from 'src/views/CommonSelectCode/AmSubmodelSelect'

const ItemNameCreation = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [assettype, setAssetType] = useState(0)
  const [itemtype, setItemtype] = useState(0)
  const [category, setCategory] = useState(0)
  const [subcategory, setSubcategory] = useState(0)
  const [group, setGroup] = useState(0)
  const [uom, setUOM] = useState(0)
  const [model, setModel] = useState(0)
  const [submodel, setSubmodel] = useState(0)
  const [subgroup, setSubGroup] = useState(0)
  const [manufacture, setManufacture] = useState(0)

  const [item, setItem] = useState({
    item_creation_slno: '',
    item_name: '',
    item_base_name: '',
    item_model_num: '',
    item_specific_one: '',
    item_specific_two: '',
    item_specific_three: '',
    item_creation_status: false,
  })
  const {
    item_creation_slno,
    item_name,
    item_base_name,
    item_model_num,
    item_specific_one,
    item_specific_two,
    item_specific_three,
    item_creation_status,
  } = item
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
      item_uom_slno: uom,
      item_model_slno: model,
      item_submodel_slno: submodel,

      item_subgroup_slno: subgroup,
      item_manufactures_slno: manufacture,
      item_name: item_name,
      item_base_name: item_base_name,
      item_model_num: item_model_num,
      item_specific_one: item_specific_one,
      item_specific_two: item_specific_two,
      item_specific_three: item_specific_three,
      item_creation_status: item_creation_status === true ? 1 : 0,
    }
  }, [
    assettype,
    itemtype,
    category,
    subcategory,
    group,
    uom,
    model,
    subgroup,
    submodel,
    manufacture,
    item_name,
    item_base_name,
    item_model_num,
    item_specific_one,
    item_specific_two,
    item_specific_three,
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
      item_uom_slno: uom,
      item_model_slno: model,
      item_submodel_slno: submodel,
      item_subgroup_slno: subgroup,
      item_manufactures_slno: manufacture,
      item_name: item_name,
      item_base_name: item_base_name,
      item_model_num: item_model_num,
      item_specific_one: item_specific_one,
      item_specific_two: item_specific_two,
      item_specific_three: item_specific_three,
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
    uom,
    model,
    submodel,
    manufacture,
    item_name,
    item_base_name,
    item_model_num,
    item_specific_one,
    item_specific_two,
    item_specific_three,
    item_creation_status,
  ])

  const reset = () => {
    const frmdata = {
      item_creation_slno: '',
      item_name: '',
      item_base_name: '',
      item_model_num: '',
      item_specific_one: '',
      item_specific_two: '',
      item_specific_three: '',
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
    setUOM(0)
    setModel(0)
    setSubmodel(0)
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
      item_model_slno,
      item_submodel_slno,
      item_uom_slno,
      item_manufactures_slno,
      item_name,
      item_base_name,
      item_model_num,
      item_specific_one,
      item_specific_two,
      item_specific_three,
      item_creation_status,
    } = data[0]
    const frmdata = {
      item_creation_slno: item_creation_slno,
      item_name: item_name,
      item_base_name: item_base_name,
      item_model_num: item_model_num,
      item_specific_one: item_specific_one,
      item_specific_two: item_specific_two,
      item_specific_three: item_specific_three,
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
    setUOM(item_uom_slno)
    setModel(item_model_slno)
    setSubmodel(item_submodel_slno)
  }, [])
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      item_creation_slno: '',
      item_name: '',
      item_base_name: '',
      item_model_num: '',
      item_specific_one: '',
      item_specific_two: '',
      item_specific_three: '',
      item_creation_status: false,
    }
    setItem(frmdata)
    reset()
    setValue(0)
  }, [setItem])
  return (
    <Box>
      <CardMaster
        title="Item Name Creation"
        submit={sumbitItemCreation}
        close={backtoSetting}
        refresh={refreshWindow}
      >
        <Box
          sx={{
            width: '50%',
            // backgroundColor: 'red',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              // backgroundColor: 'pink',
              p: 1,
            }}
          >
            <CusCheckBox
              // label="status"
              color="primary"
              size="md"
              name="item_creation_status"
              // value={item_creation_status}
              // checked={item_creation_status}
              // onCheked={updateItemCreation}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '10%',

              pt: 1,
            }}
          >
            <Typography>Asset type</Typography>
          </Box>
          <Box
            sx={{
              // backgroundColor: 'green',
              width: '55%',
              p: 1.5,
            }}
          >
            <AssetManagementTypeSelect value={assettype} setValue={setAssetType} />
          </Box>
          <Box
            sx={{
              width: '10%',
              //  backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              Add
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            // backgroundColor: 'red',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              // backgroundColor: 'pink',
              p: 1,
            }}
          >
            <CusCheckBox
              // label="status"
              color="primary"
              size="md"
              name="item_creation_status"
              // value={item_creation_status}
              // checked={item_creation_status}
              // onCheked={updateItemCreation}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '10%',
              // backgroundColor: 'yellow',
              pt: 1,
            }}
          >
            <Typography>Item Type</Typography>
          </Box>
          <Box
            sx={{
              // backgroundColor: 'green',
              width: '55%',
              p: 1.5,
            }}
          >
            <AssetItemSelect value={itemtype} setValue={setItemtype} />
          </Box>
          <Box
            sx={{
              width: '10%',
              //  backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              Add
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            // backgroundColor: 'red',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              // backgroundColor: 'pink',
              p: 1,
            }}
          >
            <CusCheckBox
              // label="status"
              color="primary"
              size="md"
              name="item_creation_status"
              // value={item_creation_status}
              // checked={item_creation_status}
              // onCheked={updateItemCreation}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '10%',
              // backgroundColor: 'yellow',
              pt: 1,
            }}
          >
            <Typography>Category</Typography>
          </Box>
          <Box
            sx={{
              // backgroundColor: 'green',
              width: '55%',
              p: 1.5,
            }}
          >
            <AssetCategorySelect value={category} setValue={setCategory} />
          </Box>
          <Box
            sx={{
              width: '10%',
              //  backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              Add
            </Button>
          </Box>
          <Box
            sx={{
              width: '10%',
              // backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              View
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            // backgroundColor: 'red',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              // backgroundColor: 'pink',
              p: 1,
            }}
          >
            <CusCheckBox
              // label="status"
              color="primary"
              size="md"
              name="item_creation_status"
              // value={item_creation_status}
              // checked={item_creation_status}
              // onCheked={updateItemCreation}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '10%',
              // backgroundColor: 'yellow',
              pt: 1,
            }}
          >
            <Typography>Subcategory</Typography>
          </Box>
          <Box
            sx={{
              // backgroundColor: 'green',
              width: '55%',
              p: 1.5,
            }}
          >
            <AssetSubcategorySelect
              value={subcategory}
              setValue={setSubcategory}
              category={category}
            />
          </Box>
          <Box
            sx={{
              width: '10%',
              //  backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              Add
            </Button>
          </Box>
          <Box
            sx={{
              width: '10%',
              // backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              View
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            // backgroundColor: 'red',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              // backgroundColor: 'pink',
              p: 1,
            }}
          >
            <CusCheckBox
              // label="status"
              color="primary"
              size="md"
              name="item_creation_status"
              // value={item_creation_status}
              // checked={item_creation_status}
              // onCheked={updateItemCreation}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '10%',
              // backgroundColor: 'yellow',
              pt: 1,
            }}
          >
            <Typography>Group</Typography>
          </Box>
          <Box
            sx={{
              // backgroundColor: 'green',
              width: '55%',
              p: 1.5,
            }}
          >
            <AssetGroupSlect value={group} setValue={setGroup} />
          </Box>
          <Box
            sx={{
              width: '10%',
              //  backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              Add
            </Button>
          </Box>
          <Box
            sx={{
              width: '10%',
              // backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              View
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            // backgroundColor: 'red',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              // backgroundColor: 'pink',
              p: 1,
            }}
          >
            <CusCheckBox
              // label="status"
              color="primary"
              size="md"
              name="item_creation_status"
              // value={item_creation_status}
              // checked={item_creation_status}
              // onCheked={updateItemCreation}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '10%',
              // backgroundColor: 'yellow',
              pt: 1,
            }}
          >
            <Typography>Subgroup</Typography>
          </Box>
          <Box
            sx={{
              // backgroundColor: 'green',
              width: '55%',
              p: 1.5,
            }}
          >
            <AssetSubGroupSelect value={subgroup} setValue={setSubGroup} group={group} />
          </Box>
          <Box
            sx={{
              width: '10%',
              //  backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              Add
            </Button>
          </Box>
          <Box
            sx={{
              width: '10%',
              // backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              View
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            // backgroundColor: 'red',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              // backgroundColor: 'pink',
              p: 1,
            }}
          >
            <CusCheckBox
              // label="status"
              color="primary"
              size="md"
              name="item_creation_status"
              // value={item_creation_status}
              // checked={item_creation_status}
              // onCheked={updateItemCreation}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '10%',
              // backgroundColor: 'yellow',
              pt: 1,
            }}
          >
            <Typography>Model</Typography>
          </Box>
          <Box
            sx={{
              // backgroundColor: 'green',
              width: '55%',
              p: 1.5,
            }}
          >
            <AssetModelSelect value={model} setValue={setModel} />
          </Box>
          <Box
            sx={{
              width: '10%',
              //  backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              Add
            </Button>
          </Box>
          <Box
            sx={{
              // width: '10%',
              // backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              View
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            // backgroundColor: 'red',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              // backgroundColor: 'pink',
              p: 1,
            }}
          >
            <CusCheckBox
              // label="status"
              color="primary"
              size="md"
              name="item_creation_status"
              // value={item_creation_status}
              // checked={item_creation_status}
              // onCheked={updateItemCreation}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '10%',
              // backgroundColor: 'yellow',
              pt: 1,
            }}
          >
            <Typography>Submodel</Typography>
          </Box>
          <Box
            sx={{
              // backgroundColor: 'green',
              width: '55%',
              p: 1.5,
            }}
          >
            <AmSubmodelSelect value={submodel} setValue={setSubmodel} model={model} />
          </Box>
          <Box
            sx={{
              width: '10%',
              //  backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              Add
            </Button>
          </Box>
          <Box
            sx={{
              // width: '10%',
              // backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              View
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            // backgroundColor: 'red',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              // backgroundColor: 'pink',
              p: 1,
            }}
          >
            <CusCheckBox
              // label="status"
              color="primary"
              size="md"
              name="item_creation_status"
              // value={item_creation_status}
              // checked={item_creation_status}
              // onCheked={updateItemCreation}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '10%',
              // // backgroundColor: 'yellow',
              pt: 1,
            }}
          >
            <Typography>U.O.M</Typography>
          </Box>
          <Box
            sx={{
              // backgroundColor: 'green',
              width: '55%',
              p: 1.5,
            }}
          >
            <AssetUOMSelect value={uom} setValue={setUOM} />
          </Box>
          <Box
            sx={{
              // width: '10%',
              //  backgroundColor: 'pink',
              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              Add
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            // backgroundColor: 'red',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              // backgroundColor: 'pink',
              p: 1,
            }}
          >
            <CusCheckBox
              // label="status"
              color="primary"
              size="md"
              name="item_creation_status"
              // value={item_creation_status}
              // checked={item_creation_status}
              // onCheked={updateItemCreation}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '10%',
              // backgroundColor: 'yellow',
              pt: 1,
            }}
          >
            <Typography>Manufacture</Typography>
          </Box>
          <Box
            sx={{
              // backgroundColor: 'green',
              width: '55%',
              p: 1.5,
            }}
          >
            <AssetManufactureSelect value={manufacture} setValue={setManufacture} />
          </Box>
          <Box
            sx={{
              width: '10%',

              pt: 0.8,
            }}
          >
            <Button size="small" variant="contained">
              Add
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: '65%',
            // backgroundColor: 'blue',
            display: 'flex',
            margin: 'auto',
            pt: 3,
          }}
        >
          <Box
            sx={{
              width: '11%',
              // backgroundColor: 'yellow',
              // pr: 1,
              display: 'flex',
              // textAlign: 'right',
            }}
          >
            <Typography>Model No.</Typography>
          </Box>
          <Box
            sx={{
              // backgroundColor: 'green',
              width: '35%',
              // p: 1.5,
            }}
          >
            <TextFieldCustom
              type="text"
              size="sm"
              name="item_model_num"
              value={item_model_num}
              onchange={updateItemCreation}
            ></TextFieldCustom>
          </Box>

          <Box
            sx={{
              width: '15%',

              pl: 5,
              textAlign: 'left',
            }}
          >
            <Typography>Base name</Typography>
          </Box>
          <Box
            sx={{
              width: '35%',
            }}
          >
            <TextFieldCustom
              type="text"
              size="sm"
              name="item_base_name"
              value={item_base_name}
              onchange={updateItemCreation}
            ></TextFieldCustom>
          </Box>
        </Box>

        <Box
          sx={{
            width: '65%',
            display: 'flex',
            pt: 2,
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              width: '11%',
              textAlign: 'left',
            }}
          >
            <Typography>Specification 1</Typography>
          </Box>
          <Box
            sx={{
              width: '35%',
            }}
          >
            <TextFieldCustom
              type="text"
              size="sm"
              name="item_specific_one"
              value={item_specific_one}
              onchange={updateItemCreation}
            ></TextFieldCustom>
          </Box>
          <Box
            sx={{
              width: '15%',

              textAlign: 'left',
              pl: 5,
            }}
          >
            <Typography>Specification 2</Typography>
          </Box>

          <Box
            sx={{
              width: '35%',
            }}
          >
            <TextFieldCustom
              type="text"
              size="sm"
              name="item_specific_two"
              value={item_specific_two}
              onchange={updateItemCreation}
            ></TextFieldCustom>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '65%',
            pt: 2,
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              width: '11%',
            }}
          >
            <Typography>Item creation</Typography>
          </Box>
          <Box
            sx={{
              width: '55%',
            }}
          >
            <TextFieldCustom
              type="text"
              size="sm"
              name="item_name"
              value={item_name}
              onchange={updateItemCreation}
            ></TextFieldCustom>
          </Box>
          <Box
            sx={{
              width: '10%',
              pl: 1,
            }}
          >
            <Button size="small" variant="contained">
              View
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: '65%',
            height: '30%',
            display: 'flex',

            margin: 'auto',
          }}
        >
          <Box sx={{ pt: 1 }}>
            <Typography>Status</Typography>
          </Box>
          <Box sx={{ p: 1 }}>
            <CusCheckBox
              color="primary"
              size="md"
              name="item_creation_status"
              value={item_creation_status}
              checked={item_creation_status}
              onCheked={updateItemCreation}
            ></CusCheckBox>
          </Box>
        </Box>
      </CardMaster>
      <Box sx={{ width: '100%' }}>
        <ItemNameCreationTable count={count} rowSelect={rowSelect} />
      </Box>
    </Box>
  )
}

export default memo(ItemNameCreation)
