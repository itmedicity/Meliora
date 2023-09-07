import { Box,  Tooltip, Typography } from '@mui/material'
import React, { useCallback, memo, useEffect } from 'react'
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'

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
  const [modelNo,setModelNo]=useState('')
  const [assetName, setAssetName] = useState('')
  const [itemName, setItemName] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [subcatName, setSubcatName] = useState('')
  const [groupName, setGroupName] = useState('')
  const [subgroupName, setSubgroupName] = useState('')
  const [modelName, setModelName] = useState('')
  const [submodelName, setSubmodelName] = useState('')
  const [uomName, setUomName] = useState('')
  const [manufactureName, setManufactureName] = useState('')
  const [assetTypeStatus, setAssetTypeStatus] = useState(true)
  const [itemTypeStatus, setItemTypeSatus] = useState(true)
  const [categoryStatus, setCategorySatus] = useState(true)
  const [subcatStatus, setSubcatSatus] = useState(true)
  const [groupStatus, setGroupStatus] = useState(true)
  const [subgroupStatus, setSubGroupStatus] = useState(true)
  const [modelStatus, setModelStatus] = useState(true)
  const [submodelStatus, setSubModelstatus] = useState(true)
  const [uomStatus, setUOMstatus] = useState(true)
  const [manufactureStatus, setManufactureStatus] = useState(true)
  const [modelNoStatus, setModelNoStatus] = useState(true)
  const [assetNameDis, setAssetNameDis] = useState(assetName)
  const [itemNameDis, setItemNameDis] = useState(itemName)
  const [categoryDis, setCategoryDis] = useState(categoryName)
  const [subcatDis, setSubcatDis] = useState(subcatName)
  const [groupDis, setGroupDis] = useState(groupName)
  const [subgroupDis, setSubGroupDis] = useState(subgroupName)
  const [modelDis, setModelDis] = useState(modelName)
  const [submodelDis, setSubModelDis] = useState(submodelName)
  const [uomDis, setUOMdis] = useState(uomName)
  const [manufactureDis, setManufactureDis] = useState(manufactureName)
  const [modelNoDis, setModelNoDis] = useState(modelNo)

  const updateAssetTypeStatus = (e) => {
    if (e.target.checked === true) {
      setAssetTypeStatus(true)
      setAssetNameDis(assetName)
    } else if (e.target.checked === false) {
      setAssetTypeStatus(false)
      setAssetNameDis('')
    }
  }
  const updateItemStatus = (e) => {
    if (e.target.checked === true) {
      setItemTypeSatus(true)
      setItemNameDis(itemName)
    } else if (e.target.checked === false) {
      setItemTypeSatus(false)
      setItemNameDis('')
    }
  }
  const updateCategoryStatus = (e) => {
    if (e.target.checked === true) {
      setCategorySatus(true)
      setCategoryDis(categoryName)
    } else if (e.target.checked === false) {
      setCategorySatus(false)
      setCategoryDis('')
    }
  }
  const updateSubcatStatus = (e) => {
    if (e.target.checked === true) {
      setSubcatSatus(true)
      setSubcatDis(subcatName)
    } else if (e.target.checked === false) {
      setSubcatSatus(false)
      setSubcatDis('')
    }
  }
  const updateGroupStatus = (e) => {
    if (e.target.checked === true) {
      setGroupStatus(true)
      setGroupDis(groupName)
    } else if (e.target.checked === false) {
      setGroupStatus(false)
      setGroupDis('')
    }
  }
  const updateSubGroupStatus = (e) => {
    if (e.target.checked === true) {
      setSubGroupStatus(true)
      setSubGroupDis(subgroupName)
    } else if (e.target.checked === false) {
      setSubGroupStatus(false)
      setSubGroupDis('')
    }
  }
  const updateModelStatus = (e) => {
    if (e.target.checked === true) {
      setModelStatus(true)
      setModelDis(modelName)
    } else if (e.target.checked === false) {
      setModelStatus(false)
      setModelDis('')
    }
  }
  const updateSubModelStatus = (e) => {
    if (e.target.checked === true) {
      setSubModelstatus(true)
      setSubModelDis(submodelName)
    } else if (e.target.checked === false) {
      setSubModelstatus(false)
      setSubModelDis('')
    }
  }
  const updateUOMsatus = (e) => {
    if (e.target.checked === true) {
      setUOMstatus(true)
      setUOMdis(uomName)
    } else if (e.target.checked === false) {
      setUOMstatus(false)
      setUOMdis('')
    }
  }
  const updateManufactureStatus = (e) => {
    if (e.target.checked === true) {
      setManufactureStatus(true)
      setManufactureDis(manufactureName)
    } else if (e.target.checked === false) {
      setManufactureStatus(false)
      setManufactureDis('')
    }
  }
  const updateModelNoStatus = (e) => {
    if (e.target.checked === true) {
      setModelNoStatus(true)
      setModelNoDis(modelNo)
    } else if (e.target.checked === false) {
      setModelNoStatus(false)
      setModelNoDis('')
    }
  }
  
     const updateModelNo = (e) => {
     setModelNo(e.target.value )
     setModelNoDis(e.target.value)
      }
    const [item, setItem] = useState({
    item_creation_slno: '',
    item_name: '',
    item_base_name: '',    
    item_specific_one: '',
    item_specific_two: '',
    item_creation_status: false,    
  })
  const {
    item_creation_slno,
    item_base_name,
    item_specific_one,
    item_specific_two,
    item_creation_status,      
     } = item

  const updateItemCreation = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setItem({ ...item, [e.target.name]: value })
    },
    [item],
  )

  useEffect(() => {
    if (assettype !== 0) {
      setAssetNameDis(assetName)
    }   
    if (itemtype !== 0) {
      setItemNameDis(itemName)
    }
    if (category !== 0) {
      setCategoryDis(categoryName)
    }
    if (subcategory !== 0) {
      setSubcatDis(subcatName)
    }
    if (group !== 0) {
      setGroupDis(groupName)
    }
    if (subgroup !== 0) {
      setSubGroupDis(subgroupName)
    }
    if (model !== 0) {
      setModelDis(modelName)
    }
    if (submodel !== 0) {
      setSubModelDis(submodelName)
    }
    if (uom !== 0) {
      setUOMdis(uomName)
    }
    if (manufacture !== 0) {
      setManufactureDis(manufactureName)
    }  
      setModelNoDis(modelNo)
  
  }, [assettype, itemtype, category, subcategory, group, subgroup, model, submodel, uom, manufacture, modelNo, assetName,
    itemName,categoryName,subcatName,groupName,subgroupName,modelName,submodelName,uomName,manufactureName])

  const [itemNamee, setItemNamee] = useState('')
  useEffect(() => {
    const name =
      assetNameDis +
      ' ' +
      itemNameDis +
      ' ' +
      categoryDis +
      ' ' +
      subcatDis +
      ' ' +
      groupDis +
      ' ' +
      subgroupDis +
      ' ' +
      modelDis +
      ' ' +
      submodelDis +
      ' ' +
      uomDis +
      ' ' +
      manufactureDis +
      
      ' ' +
      modelNoDis
    setItemNamee(name)
  }, [assetNameDis, itemNameDis,categoryDis,subcatDis,groupDis,subgroupDis,modelDis,submodelDis,uomDis,manufactureDis,modelNoDis])

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
      item_name: itemNamee,
      item_base_name: item_base_name,
      item_model_num: modelNo,
      item_specific_one: item_specific_one,
      item_specific_two: item_specific_two,
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
    itemNamee,
    item_base_name,
    modelNo,
    item_specific_one,
    item_specific_two,
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
      item_name: itemNamee,
      item_base_name: item_base_name,
      item_model_num: modelNo,
      item_specific_one: item_specific_one,
      item_specific_two: item_specific_two,
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
    itemNamee,
    item_base_name,
    modelNo,
    item_specific_one,
    item_specific_two,    
    item_creation_status,
  ])

  const reset = useCallback(() => {
    const frmdata = {
      item_creation_slno: '',
      item_name: '',
      item_base_name: '',     
      item_specific_one: '',
      item_specific_two: '',     
      item_creation_status: false,
    }
    setItem(frmdata)
    setCount(0)
    setValue(0)
    setItemtype(0)
    setAssetType(0)  
    setCategory(0)
    setSubcategory(0)
    setGroup(0)
    setSubGroup(0)
    setManufacture(0)
    setUOM(0)
    setModel(0)
    setSubmodel(0)
    setModelNo('')
    setItemNamee('')
    setAssetName('')
    setItemName('')
    setCategoryName('')
    setSubcatName('')
    setGroupName('')
    setSubgroupName('')
    setModelName('')
    setSubmodelName('')
    setUomName('')
    setManufactureName('')
    setAssetTypeStatus(true)
    setItemTypeSatus(true)
    setCategorySatus(true)
    setSubcatSatus(true)
    setGroupStatus(true)
    setSubGroupStatus(true)
    setModelStatus(true)
    setSubModelstatus(true)
    setUOMstatus(true)
    setManufactureStatus(true)
    setModelNoStatus(true)
    setAssetNameDis(assetName)
    setItemNameDis(itemName)
    setCategoryDis(categoryName)
    setSubcatDis(subcatName)
    setGroupDis(groupName)
    setSubGroupDis(subgroupName)
    setModelDis(modelName)
    setSubModelDis(submodelName)
    setUOMdis(uomName)
    setManufactureDis(manufactureName)
    setModelNoDis(modelNo)
  },[setItem, setCount, setValue, setItemtype, setAssetType, setCategory, setSubcategory, setGroup, setSubGroup, setManufacture, setUOM,
    setModel, setSubmodel, setModelNo, setItemNamee, setAssetName, setItemName, setCategoryName, setSubcatName, setGroupName,
    setSubgroupName, setModelName, setSubmodelName, setUomName, setManufactureName, setAssetTypeStatus, setItemTypeSatus, setCategorySatus,
    setSubcatSatus, setGroupStatus, setSubGroupStatus, setModelStatus, setSubModelstatus, setUOMstatus, setManufactureStatus,
    setModelNoStatus, setAssetNameDis, setItemNameDis, setCategoryDis, setSubcatDis, setGroupDis, setSubGroupDis, setModelDis, setSubModelDis,
    setUOMdis, setManufactureDis, setModelNoDis, assetName, itemName, categoryName, subcatName, groupName, subgroupName, modelName, submodelName,
    uomName, manufactureName,modelNo])
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
    [postdata, value, count, patchdata,reset],
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
      item_creation_status,
    } = data[0]
    const frmdata = {
      item_creation_slno: item_creation_slno,    
      item_base_name: item_base_name,     
      item_specific_one: item_specific_one,
      item_specific_two: item_specific_two,
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
    setItemNamee(item_name)
    setModelNo(item_model_num)    
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
      item_creation_status: false,
    }
    setItem(frmdata)
    reset()
    setValue(0)
  }, [setItem,reset])
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
            display: 'flex',
            pt: 2.5,
            margin: 'auto ',
          }}
        >
          <Box
            sx={{
              pl: 0.8,
            }}
          >
            <CusCheckBox
              color="primary"
              size="md"
              name="assetTypeStatus"
              value={assetTypeStatus}
              checked={assetTypeStatus}
              onCheked={updateAssetTypeStatus}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '14%',

              pl: 1,
            }}
          >
            <Typography>Asset type</Typography>
          </Box>
          <Box
            sx={{
              width: '55%',
            }}
          >
            <AssetManagementTypeSelect
              value={assettype}
              setValue={setAssetType}
              setName={setAssetName}
            />
          </Box>
          <Box
            sx={{
              width: '5%',
              pl: 1,
            }}
          >
            {' '}
            <Tooltip title="Add " placement="top">
              <AddCircleOutlineIcon />
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              pl: 0.8,
              pt: 1.3,
            }}
          >
            <CusCheckBox              
              color="primary"
              size="md"
              name="itemTypeStatus"
              value={itemTypeStatus}
              checked={itemTypeStatus}
              onCheked={updateItemStatus}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '14%',
              pl: 1,
              pt: 1.3,
            }}
          >
            <Typography>Item Type</Typography>
          </Box>
          <Box
            sx={{
              width: '55%',
              pt: 1.3,
            }}
          >
            <AssetItemSelect value={itemtype} setValue={setItemtype} setName={setItemName} />
          </Box>
          <Box
            sx={{
              width: '5%',
              pl: 1,
              pt: 1.3,
            }}
          >
            <Tooltip title="Add " placement="top">
              <AddCircleOutlineIcon />
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              pl: 0.8,
              pt: 1.3,
            }}
          >
            <CusCheckBox
              color="primary"
              size="md"
              name="categoryStatus"
              value={categoryStatus}
              checked={categoryStatus}
              onCheked={updateCategoryStatus}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '14%',             
              pl: 1,
              pt: 1.3,
            }}
          >
            <Typography>Category</Typography>
          </Box>
          <Box
            sx={{             
              width: '55%',
              pt: 1.3,
            }}
          >
            <AssetCategorySelect
              value={category}
              setValue={setCategory}
              setName={setCategoryName}
            />
          </Box>
          <Box
            sx={{
              width: '5%',              
              pl: 1,
              pt: 1.3,
            }}
          >
            <Tooltip title="Add " placement="top">
              <AddCircleOutlineIcon />
            </Tooltip>
          </Box>
          <Box
            sx={{
              width: '5%',
              pt: 1.3,            
            }}
          >
            <Tooltip title="View " placement="top">
              <RemoveRedEyeOutlinedIcon />
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',            
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              pl: 0.8,
              pt: 1.3,
            }}
          >
            <CusCheckBox
              color="primary"
              size="md"
              name="subcatStatus"
              value={subcatStatus}
              checked={subcatStatus}
              onCheked={updateSubcatStatus}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '14%',            
              pl: 1,
              pt: 1.3,
            }}
          >
            <Typography>Subcategory</Typography>
          </Box>
          <Box
            sx={{             
              width: '55%',
              pt: 1.3,
            }}
          >
            <AssetSubcategorySelect
              value={subcategory}
              setValue={setSubcategory}
              category={category}
              setName={setSubcatName}
            />
          </Box>
          <Box
            sx={{
              width: '5%',              
              pl: 1,
              pt: 1.3,
            }}
          >
            <Tooltip title="Add " placement="top">
              <AddCircleOutlineIcon />
            </Tooltip>
          </Box>
          <Box
            sx={{
              width: '5%',             
              pt: 1.3,
            }}
          >
            <Tooltip title="View " placement="top">
              <RemoveRedEyeOutlinedIcon />
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',           
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{             
              pl: 0.8,
              pt: 1.3,
            }}
          >
            <CusCheckBox              
              color="primary"
              size="md"
              name="groupStatus"
              value={groupStatus}
              checked={groupStatus}
              onCheked={updateGroupStatus}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '14%',
              pl: 1,
              pt: 1.3,
            }}
          >
            <Typography>Group</Typography>
          </Box>
          <Box
            sx={{
              width: '55%',
              pt: 1.3,
            }}
          >
            <AssetGroupSlect value={group} setValue={setGroup} setName={setGroupName} />
          </Box>
          <Box
            sx={{
              width: '5%',              
              pl: 1,
              pt: 1.3,
            }}
          >
            <Tooltip title="Add  " placement="top">
              <AddCircleOutlineIcon />
            </Tooltip>
          </Box>
          <Box
            sx={{
              width: '5%',             
              pt: 1.3,
            }}
          >
            <Tooltip title="View " placement="top">
              <RemoveRedEyeOutlinedIcon />
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',           
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{            
              pl: 0.8,
              pt: 1.3,
            }}
          >
            <CusCheckBox             
              color="primary"
              size="md"
              name="subgroupStatus"
              value={subgroupStatus}
              checked={subgroupStatus}
              onCheked={updateSubGroupStatus}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '14%',             
              pl: 1,
              pt: 1.3,
            }}
          >
            <Typography>Subgroup</Typography>
          </Box>
          <Box
            sx={{             
              width: '55%',
              pt: 1.3,
            }}
          >
            <AssetSubGroupSelect
              value={subgroup}
              setValue={setSubGroup}
              group={group}
              setName={setSubgroupName}
            />
          </Box>
          <Box
            sx={{
              width: '5%',             
              pl: 1,
              pt: 1,
            }}
          >
            <Tooltip title="Add " placement="top">
              <AddCircleOutlineIcon />
            </Tooltip>
          </Box>
          <Box
            sx={{
              width: '5%',             
              pt: 1,
            }}
          >
            <Tooltip title="View " placement="top">
              <RemoveRedEyeOutlinedIcon />
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',          
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{           
              pl: 0.8,
              pt: 1.3,
            }}
          >
            <CusCheckBox            
              color="primary"
              size="md"
              name="modelStatus"
              value={modelStatus}
              checked={modelStatus}
              onCheked={updateModelStatus}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '14%',             
              pl: 1,
              pt: 1.3,
            }}
          >
            <Typography>Model</Typography>
          </Box>
          <Box
            sx={{             
              width: '55%',
              pt: 1.3,
            }}
          >
            <AssetModelSelect value={model} setValue={setModel} setName={setModelName} />
          </Box>
          <Box
            sx={{
              width: '5%',             
              pl: 1,
              pt: 1,
            }}
          >
            <Tooltip title="Add " placement="top">
              <AddCircleOutlineIcon />
            </Tooltip>
          </Box>
          <Box
            sx={{
              width: '5%',             
              pt: 1,
            }}
          >
            <Tooltip title="View " placement="top">
              <RemoveRedEyeOutlinedIcon />
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',          
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{           
              pl: 0.8,
              pt: 1.3,
            }}
          >
            <CusCheckBox            
              color="primary"
              size="md"
              name="submodelStatus"
              value={submodelStatus}
              checked={submodelStatus}
              onCheked={updateSubModelStatus}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '14%',             
              pl: 1,
              pt: 1.3,
            }}
          >
            <Typography>Submodel</Typography>
          </Box>
          <Box
            sx={{             
              width: '55%',
              pt: 1.3,
            }}
          >
            <AmSubmodelSelect
              value={submodel}
              setValue={setSubmodel}
              model={model}
              setName={setSubmodelName}
            />
          </Box>
          <Box
            sx={{
              width: '5%',             
              pl: 1,
              pt: 1,
            }}
          >
            <Tooltip title="Add " placement="top">
              <AddCircleOutlineIcon />
            </Tooltip>
          </Box>
          <Box
            sx={{
              width: '5%',             
              pt: 1,
            }}
          >
            <Tooltip title="View " placement="top">
              <RemoveRedEyeOutlinedIcon />
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',           
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{              
              pl: 0.8,
              pt: 1.3,
            }}
          >
            <CusCheckBox           
              color="primary"
              size="md"
              name="uomStatus"
              value={uomStatus}
              checked={uomStatus}
              onCheked={updateUOMsatus}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '14%',             
              pl: 1,
              pt: 1.3,
            }}
          >
            <Typography>U.O.M</Typography>
          </Box>
          <Box
            sx={{             
              width: '55%',
              pt: 1.3,
            }}
          >
            <AssetUOMSelect value={uom} setValue={setUOM} setName={setUomName} />
          </Box>
          <Box
            sx={{
              width: '5%',             
              pl: 1,
              pt: 1,
            }}
          >
            <Tooltip title="Add " placement="top">
              <AddCircleOutlineIcon />
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',          
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Box
            sx={{             
              pl: 0.8,
              pt: 1.3,
            }}
          >
            <CusCheckBox            
              color="primary"
              size="md"
              name="manufactureStatus"
              value={manufactureStatus}
              checked={manufactureStatus}
              onCheked={updateManufactureStatus}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '14%',              
              pl: 1,
              pt: 1.3,
            }}
          >
            <Typography>Manufacture</Typography>
          </Box>
          <Box
            sx={{             
              width: '55%',
              pt: 1.3,
            }}
          >
            <AssetManufactureSelect
              value={manufacture}
              setValue={setManufacture}
              setName={setManufactureName}
            />
          </Box>
          <Box
            sx={{
              width: '5%',             
              pl: 1,
              pt: 1,
            }}
          >
            <Tooltip title="Add " placement="top">
              <AddCircleOutlineIcon />
            </Tooltip>
          </Box>
        </Box>

        <Box
          sx={{
            width: '65%',           
            display: 'flex',
            margin: 'auto',
            pt: 3,
          }}
        >
          <Box>
            <CusCheckBox              
              color="primary"
              size="md"
              name="modelNoStatus"
              value={modelNoStatus}
              checked={modelNoStatus}
              onCheked={updateModelNoStatus}
            ></CusCheckBox>
          </Box>
          <Box
            sx={{
              width: '13%',            
              pl: 1,
              display: 'flex',             
            }}
          >
            <Typography>Model No.</Typography>
          </Box>
          <Box
            sx={{           
              width: '35%',             
            }}
          >
            <TextFieldCustom
              type="text"
              size="sm"
              name="modelNo"
              value={modelNo}
              onchange={updateModelNo}
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
            pt: 1,
            margin: 'auto',           
          }}
        >
          <Box
            sx={{
              width: '14.8%',
              textAlign: 'left',
              pl: 3,             
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
            pt: 1,
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              width: '15.5%',
              pl: 3,
            }}
          >
            <Typography>Item creation</Typography>
          </Box>
          <Box
            sx={{
              width: '85%',
            }}
          >
            <TextFieldCustom
              type="text"
              size="sm"
              name="itemNamee"
              value={itemNamee}             
            ></TextFieldCustom>
          </Box>
          <Box
            sx={{
              width: '5%',
              pl: 1,
            }}
          >
            <Tooltip title="UPLOAD FILE " placement="top">
              <FileUploadOutlinedIcon />
            </Tooltip>
          </Box>
        </Box>

        <Box
          sx={{            
            width: '65%',
            margin: 'auto',
          }}
        >
          <CusCheckBox
            label="Status"
            color="primary"
            size="md"
            name="item_creation_status"
            value={item_creation_status}
            checked={item_creation_status}
            onCheked={updateItemCreation}
          ></CusCheckBox>
        </Box>
      </CardMaster>
      <Box sx={{ width: '100%' }}>
        <ItemNameCreationTable count={count} rowSelect={rowSelect} />
      </Box>
    </Box>
  )
}
export default memo(ItemNameCreation)
