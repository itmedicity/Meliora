import { Box, Tooltip, Typography, IconButton, Input, Button } from '@mui/material'
import React, { useCallback, memo, useEffect, useState, useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import AssetCategorySelect from 'src/views/CommonSelectCode/AssetCategorySelect'
import AssetGroupSlect from 'src/views/CommonSelectCode/AssetGroupSlect'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import ItemNameCreationTable from './ItemNameCreationTable'
import AssetItemSelect from 'src/views/CommonSelectCode/AssetItemSelect'
import AssetSubcategorySelect from 'src/views/CommonSelectCode/AssetSubcategorySelect'
import AssetSubGroupSelect from 'src/views/CommonSelectCode/AssetSubGroupSelect'
import AssetManufactureSelect from 'src/views/CommonSelectCode/AssetManufactureSelect'
import AssetUOMSelect from 'src/views/CommonSelectCode/AssetUOMSelect'
import AssetModelSelect from 'src/views/CommonSelectCode/AssetModelSelect'
// import AmSubmodelSelect from 'src/views/CommonSelectCode/AmSubmodelSelect'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import imageCompression from 'browser-image-compression'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import AmAssetTypeSelect from 'src/views/CommonSelectCode/AmAssetTypeSelect'
import AssetTypeAddModel from './ModelForAssetItemAdd/AssetTypeAddModel'
import { getAmItemType } from 'src/redux/actions/AmItemTypeList.actions'
import { getAmAssetType } from 'src/redux/actions/AmAssetTypeList.actions'
import { useDispatch } from 'react-redux'
import { getCategory } from 'src/redux/actions/AmCategoryList.action'
import { getGroup } from 'src/redux/actions/AmGroupList.action'
import { getUOM } from 'src/redux/actions/AmUOMList.action'
import { getAmManufacture } from 'src/redux/actions/AmManufactureList.actions'
import { getAmModel } from 'src/redux/actions/AmModelList.action'
import ItemTypeAddModel from './ModelForAssetItemAdd/ItemTypeAddModel'
import UomAddmodal from './ModelForAssetItemAdd/UomAddmodal'
import Manufacture from './ModelForAssetItemAdd/Manufacture'
import CategoryModal from './ModelForAssetItemAdd/CategoryModal'
import SubcategoryModal from './ModelForAssetItemAdd/SubcategoryModal'
import GroupModal from './ModelForAssetItemAdd/GroupModal'
import ModelModal from './ModelForAssetItemAdd/ModelModal'
import SubGroupModal from './ModelForAssetItemAdd/SubGroupModal'
// import SubModelModal from './ModelForAssetItemAdd/SubModelModal'
import { CssVarsProvider } from '@mui/joy'
import Textarea from '@mui/joy/Textarea'
import ModelForItemExistOrNot from './ModelForItemExistOrNot'
import { useNavigate } from 'react-router-dom'

const ItemNameCreation = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const [selectFile, setSelectFile] = useState(null)
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
  const [modelNo, setModelNo] = useState('')
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
  const [baseStatus, setbaseStatus] = useState(true)
  const [assetNameDis, setAssetNameDis] = useState(assetName)
  const [itemNameDis, setItemNameDis] = useState(itemName)
  const [categoryDis, setCategoryDis] = useState(categoryName)
  const [subcatDis, setSubcatDis] = useState(subcatName)
  const [groupDis, setGroupDis] = useState(groupName)
  const [subgroupDis, setSubGroupDis] = useState(subgroupName)
  const [modelDis, setModelDis] = useState(modelName)
  const [submodelDis, setSubModelDis] = useState(submodelName)
  const [uomDis, setUOMdis] = useState(uomName)
  const [baseDis, setBasedis] = useState('')
  const [manufactureDis, setManufactureDis] = useState(manufactureName)
  const [modelNoDis, setModelNoDis] = useState(modelNo)
  const [asset, setasset] = useState(true)
  const [spare, setSpare] = useState(false)
  const [checkExist, setCheckexist] = useState(0)
  const [checkExistOpen, setCheckExsitOpen] = useState(false)
  const [assetOrSpare, setAssetOrSpare] = useState(1)
  const [item, setItem] = useState({
    item_creation_slno: '',
    item_name: '',
    item_specific_one: '',
    item_specific_two: '',
    item_creation_status: true
  })
  const { item_creation_slno, item_specific_one, item_specific_two, item_creation_status } = item
  const [item_base_name, setitem_base_name] = useState('')

  const updateAsset = useCallback(e => {
    if (e.target.checked === true) {
      setasset(true)
      setSpare(false)
      setAssetOrSpare(1)
    } else if (e.target.checked === false) {
      setasset(false)
      setSpare(false)
      setAssetOrSpare(0)
    }
  }, [])
  const updateSpare = useCallback(e => {
    if (e.target.checked === true) {
      setSpare(true)
      setasset(false)
      setAssetOrSpare(2)
    } else if (e.target.checked === false) {
      setasset(false)
      setSpare(false)
      setAssetOrSpare(0)
    }
  }, [])

  const updateAssetTypeStatus = useCallback(
    e => {
      if (e.target.checked === true) {
        setAssetTypeStatus(true)
        setAssetNameDis(assetName)
      } else if (e.target.checked === false) {
        setAssetTypeStatus(false)
        setAssetNameDis('')
      }
    },
    [assetName]
  )

  const updateItemStatus = useCallback(
    e => {
      if (e.target.checked === true) {
        setItemTypeSatus(true)
        setItemNameDis(itemName)
      } else if (e.target.checked === false) {
        setItemTypeSatus(false)
        setItemNameDis('')
      }
    },
    [itemName]
  )
  const updateCategoryStatus = useCallback(
    e => {
      if (e.target.checked === true) {
        setCategorySatus(true)
        setCategoryDis(categoryName)
      } else if (e.target.checked === false) {
        setCategorySatus(false)
        setCategoryDis('')
      }
    },
    [categoryName]
  )
  const updateSubcatStatus = useCallback(
    e => {
      if (e.target.checked === true) {
        setSubcatSatus(true)
        setSubcatDis(subcatName)
      } else if (e.target.checked === false) {
        setSubcatSatus(false)
        setSubcatDis('')
      }
    },
    [subcatName]
  )
  const updateGroupStatus = useCallback(
    e => {
      if (e.target.checked === true) {
        setGroupStatus(true)
        setGroupDis(groupName)
      } else if (e.target.checked === false) {
        setGroupStatus(false)
        setGroupDis('')
      }
    },
    [groupName]
  )
  const updateSubGroupStatus = useCallback(
    e => {
      if (e.target.checked === true) {
        setSubGroupStatus(true)
        setSubGroupDis(subgroupName)
      } else if (e.target.checked === false) {
        setSubGroupStatus(false)
        setSubGroupDis('')
      }
    },
    [subgroupName]
  )
  const updateModelStatus = useCallback(
    e => {
      if (e.target.checked === true) {
        setModelStatus(true)
        setModelDis(modelName)
      } else if (e.target.checked === false) {
        setModelStatus(false)
        setModelDis('')
      }
    },
    [modelName]
  )
  // const updateSubModelStatus = useCallback((e) => {
  //   if (e.target.checked === true) {
  //     setSubModelstatus(true)
  //     setSubModelDis(submodelName)
  //   } else if (e.target.checked === false) {
  //     setSubModelstatus(false)
  //     setSubModelDis('')
  //   }
  // }, [submodelName])
  const updateUOMsatus = useCallback(
    e => {
      if (e.target.checked === true) {
        setUOMstatus(true)
        setUOMdis(uomName)
      } else if (e.target.checked === false) {
        setUOMstatus(false)
        setUOMdis('')
      }
    },
    [uomName]
  )

  const updateManufactureStatus = useCallback(
    e => {
      if (e.target.checked === true) {
        setManufactureStatus(true)
        setManufactureDis(manufactureName)
      } else if (e.target.checked === false) {
        setManufactureStatus(false)
        setManufactureDis('')
      }
    },
    [manufactureName]
  )
  const updateModelNoStatus = useCallback(
    e => {
      if (e.target.checked === true) {
        setModelNoStatus(true)
        setModelNoDis(modelNo)
      } else if (e.target.checked === false) {
        setModelNoStatus(false)
        setModelNoDis('')
      }
    },
    [modelNo]
  )

  const updateModelNo = useCallback(e => {
    setModelNo(e.target.value.toLocaleUpperCase())
    setModelNoDis(e.target.value.toLocaleUpperCase())
  }, [])

  // const updateBasesatus = useCallback((e) => {
  //   if (e.target.checked === true) {
  //     setbaseStatus(true)
  //     setBasedis(item_base_name)
  //   } else if (e.target.checked === false) {
  //     setbaseStatus(false)
  //     setBasedis('')
  //   }
  // }, [item_base_name])

  // const updateBaseName = useCallback((e) => {
  //   setitem_base_name(e.target.value.toLocaleUpperCase())
  //   setBasedis(e.target.value.toLocaleUpperCase())
  // }, [])

  const updateItemCreation = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setItem({ ...item, [e.target.name]: value })
    },
    [item]
  )

  const [order, setOrder] = useState({
    asset_order: '',
    item_oder: '',
    category_order: '',
    subCat_order: '',
    group_order: '',
    subGrup_order: '',
    manufct_order: '',
    model_order: '',
    modelNo_order: '',
    uom_order: ''
  })

  const {
    asset_order,
    item_oder,
    category_order,
    subCat_order,
    group_order,
    subGrup_order,
    manufct_order,
    model_order,
    modelNo_order,
    uom_order
  } = order

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
  }, [
    assettype,
    itemtype,
    category,
    subcategory,
    group,
    subgroup,
    model,
    submodel,
    uom,
    manufacture,
    modelNo,
    assetName,
    itemName,
    categoryName,
    subcatName,
    groupName,
    subgroupName,
    modelName,
    submodelName,
    uomName,
    manufactureName
  ])

  const [itemNamee, setItemNamee] = useState('')

  useEffect(() => {
    // if(subCat_order===)
    let arrayys = [
      { order: asset_order, status: assetTypeStatus, name: assetNameDis },
      { order: item_oder, status: itemTypeStatus, name: itemNameDis },
      { order: category_order, status: categoryStatus, name: categoryDis },
      { order: subCat_order, status: subcatStatus, name: subcatDis },
      { order: group_order, status: groupStatus, name: groupDis },
      { order: subGrup_order, status: subgroupStatus, name: subgroupDis },
      { order: manufct_order, status: manufactureStatus, name: manufactureDis },
      { order: model_order, status: modelStatus, name: modelDis },
      // { order: asset_order, status: submodelStatus, name: submodelDis },
      { order: modelNo_order, status: modelNoStatus, name: modelNoDis },
      { order: uom_order, status: uomStatus, name: uomDis }
      // { order: asset_order, status: baseStatus, name: baseDis }
    ]
    //Remove Unchecked feilds
    let filterName = arrayys?.filter(e => e.name !== null && e.status === true)
    //Sort By given Order
    let sortArry = filterName.sort((a, b) => a.order - b.order)
    //Joining
    let stringName = sortArry?.map(e => e.name).join(' ')
    setItemNamee(stringName)
  }, [
    assetTypeStatus,
    assetNameDis,
    itemTypeStatus,
    itemNameDis,
    categoryStatus,
    categoryDis,
    subcatStatus,
    subcatDis,
    groupStatus,
    groupDis,
    subgroupStatus,
    subgroupDis,
    manufactureStatus,
    manufactureDis,
    modelStatus,
    modelDis,
    submodelStatus,
    submodelDis,
    modelNoStatus,
    modelNoDis,
    uomStatus,
    uomDis,
    baseStatus,
    baseDis,
    asset_order,
    item_oder,
    category_order,
    subCat_order,
    group_order,
    subGrup_order,
    manufct_order,
    model_order,
    modelNo_order,
    uom_order
  ])

  const postdata = useMemo(() => {
    return {
      item_asset_type_slno: assettype === 0 ? null : assettype,
      item_type_slno: itemtype === 0 ? null : itemtype,
      item_category_slno: category === 0 ? null : category,
      item_subcategory_slno: subcategory === 0 ? null : subcategory,
      item_group_slno: group === 0 ? null : group,
      item_uom_slno: uom === 0 ? null : uom,
      item_model_slno: model === 0 ? null : model,
      item_submodel_slno: submodel === 0 ? null : submodel,
      item_subgroup_slno: subgroup === 0 ? null : subgroup,
      item_manufactures_slno: manufacture === 0 ? null : manufacture,
      item_name: itemNamee,
      item_base_name: item_base_name,
      item_model_num: modelNo !== '' ? modelNo.toLocaleUpperCase() : null,
      item_specific_one: item_specific_one,
      item_specific_two: item_specific_two,
      item_creation_status: item_creation_status === true ? 1 : 0,
      asset_spare: asset === true ? 1 : spare === true ? 2 : 0
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
    asset,
    spare
  ])

  const patchdata = useMemo(() => {
    return {
      item_creation_slno: item_creation_slno,
      item_asset_type_slno: assettype === 0 ? null : assettype,
      item_type_slno: itemtype === 0 ? null : itemtype,
      item_category_slno: category === 0 ? null : category,
      item_subcategory_slno: subcategory === 0 ? null : subcategory,
      item_group_slno: group === 0 ? null : group,
      item_uom_slno: uom === 0 ? null : uom,
      item_model_slno: model === 0 ? null : model,
      item_submodel_slno: submodel === 0 ? null : submodel,
      item_subgroup_slno: subgroup === 0 ? null : subgroup,
      item_manufactures_slno: manufacture === 0 ? null : manufacture,
      item_name: itemNamee,
      item_base_name: item_base_name,
      item_model_num: modelNo !== '' ? modelNo.toLocaleUpperCase() : null,
      item_specific_one: item_specific_one,
      item_specific_two: item_specific_two,
      item_creation_status: item_creation_status === true ? 1 : 0,
      asset_spare: asset === true ? 1 : spare === true ? 2 : 0
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
    asset,
    spare
  ])

  const reset = useCallback(() => {
    const frmdata = {
      item_creation_slno: '',
      item_name: '',
      item_specific_one: '',
      item_specific_two: '',
      item_creation_status: false
    }

    setSelectFile(null)
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
    dispatch(getAmAssetType())
    dispatch(getAmItemType())
    dispatch(getCategory())
    dispatch(getGroup())
    dispatch(getUOM())
    dispatch(getAmManufacture())
    dispatch(getAmModel())
    setasset(true)
    setSpare(false)
    setCheckexist(0)
    setCheckExsitOpen(false)
    setitem_base_name('')
    setBasedis('')
    setbaseStatus(true)
    const orderReset = {
      asset_order: '',
      item_oder: '',
      category_order: '',
      subCat_order: '',
      group_order: '',
      subGrup_order: '',
      manufct_order: '',
      model_order: '',
      modelNo_order: '',
      uom_order: ''
    }
    setOrder(orderReset)
  }, [
    setItem,
    setCount,
    setValue,
    setItemtype,
    setAssetType,
    setCategory,
    setSubcategory,
    setGroup,
    setSubGroup,
    setManufacture,
    setUOM,
    setModel,
    setSubmodel,
    setModelNo,
    setItemNamee,
    setAssetName,
    setItemName,
    setCategoryName,
    setSubcatName,
    setGroupName,
    setSubgroupName,
    setModelName,
    setSubmodelName,
    setUomName,
    setManufactureName,
    setAssetTypeStatus,
    setItemTypeSatus,
    setCategorySatus,
    setSubcatSatus,
    setGroupStatus,
    setSubGroupStatus,
    setModelStatus,
    setSubModelstatus,
    setUOMstatus,
    setManufactureStatus,
    setModelNoStatus,
    setAssetNameDis,
    setItemNameDis,
    setCategoryDis,
    setSubcatDis,
    setGroupDis,
    setSubGroupDis,
    setModelDis,
    setSubModelDis,
    setUOMdis,
    setManufactureDis,
    setModelNoDis,
    assetName,
    itemName,
    categoryName,
    subcatName,
    groupName,
    setCheckexist,
    setCheckExsitOpen,
    subgroupName,
    modelName,
    submodelName,
    uomName,
    manufactureName,
    modelNo,
    dispatch,
    setasset,
    setSpare
  ])

  const uploadFile = async event => {
    const file = event.target.files[0]
    setSelectFile(file)
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920
    }
    const compressedFile = await imageCompression(file, options)
    setSelectFile(compressedFile)
  }

  const sumbitItemCreation = useCallback(
    e => {
      e.preventDefault()
      const InsertItem = async postdata => {
        const result = await axioslogin.post('/itemNameCreation/insert', postdata)
        reset()
        return result.data
      }

      const UpdateItem = async patchdata => {
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
      const FileInsert = async fileData => {
        const result = await axioslogin.post('/fileupload/uploadFile/Item', fileData)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else {
          infoNotify(message)
        }
      }

      if (value === 0) {
        if (assetName !== '' && itemName !== '') {
          InsertItem(postdata).then(val => {
            const { message, success, insertid } = val
            if (success === 1) {
              if (selectFile !== null) {
                //File upload Api and post data
                const formData = new FormData()
                formData.append('id', insertid)
                formData.append('file', selectFile, selectFile.name)
                FileInsert(formData)
              } else {
                succesNotify(message)
                setCount(count + 1)
                reset()
              }
            } else if (success === 0) {
              infoNotify(message)
            } else {
              infoNotify(message)
            }
          })
        } else {
          infoNotify('please fill fields')
        }
      } else UpdateItem(patchdata)
      reset()
    },
    [postdata, value, count, patchdata, reset, selectFile, assetName, itemName]
  )

  const rowSelect = useCallback(
    params => {
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
        asset_spare
      } = data[0]

      const frmdata = {
        item_creation_slno: item_creation_slno,
        item_specific_one: item_specific_one,
        item_specific_two: item_specific_two,
        item_creation_status: item_creation_status === 1 ? true : false
      }

      setItem(frmdata)
      setAssetType(item_asset_type_slno)
      setItemtype(item_type_slno)
      setCategory(item_category_slno === null ? 0 : item_category_slno)
      setSubcategory(item_subcategory_slno === null ? 0 : item_subcategory_slno)
      setGroup(item_group_slno === null ? 0 : item_group_slno)
      setSubGroup(item_subgroup_slno === null ? 0 : item_subgroup_slno)
      setManufacture(item_manufactures_slno === null ? 0 : item_manufactures_slno)
      setUOM(item_uom_slno === null ? 0 : item_uom_slno)
      setModel(item_model_slno === null ? 0 : item_model_slno)
      setSubmodel(item_submodel_slno === null ? 0 : item_submodel_slno)
      setItemNamee(item_name)
      setModelNo(item_model_num !== null ? item_model_num : '')
      setasset(asset_spare === 1 ? true : false)
      setSpare(asset_spare === 2 ? true : false)
      setitem_base_name(item_base_name)
    },
    [setAssetType, setItemtype, setCategory]
  )

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  const refreshWindow = useCallback(() => {
    reset()
  }, [reset])

  const [AssetTypeOpen, setAssetTypeOpen] = useState(false)
  const [AssetTypeFlag, setAssetTypeFlag] = useState(0)
  const [ItemTypeOpen, setItemTypeOpen] = useState(false)
  const [ItemTypeFlag, setItemTypeFlag] = useState(0)
  const [UOMopen, setUOMopen] = useState(false)
  const [UOMflag, setUOMflag] = useState(0)
  const [ManufactureOpen, setManufactureOpen] = useState(false)
  const [ManufactureFlag, setManufactureFlag] = useState(0)
  const [CategoryOpen, setCategoryOpen] = useState(false)
  const [CategoryFlag, setCategoryFlag] = useState(0)
  const [SubCategoryOpen, setSubCategoryOpen] = useState(false)
  const [SubCategoryFlag, setSubCategoryFlag] = useState(0)
  const [GroupOpen, setGroupOpen] = useState(false)
  const [GroupFlag, setGroupFlag] = useState(0)
  const [ModelOpen, setModelOpen] = useState(false)
  const [ModelFlag, setModelFlag] = useState(0)
  const [SubGroupOpen, setSubGroupOpen] = useState(false)
  const [SubGroupFlag, setSubGroupFlag] = useState(0)
  // const [SubModelOpen, setSubModelOpen] = useState(false)
  // const [SubModelFlag, setSubModelFlag] = useState(0)

  const modelAsset = () => {
    setAssetTypeFlag(1)
    setAssetTypeOpen(true)
  }
  const modelItem = () => {
    setItemTypeFlag(1)
    setItemTypeOpen(true)
  }
  const modelUOM = () => {
    setUOMflag(1)
    setUOMopen(true)
  }
  const modelManufacture = () => {
    setManufactureFlag(1)
    setManufactureOpen(true)
  }
  const modelCategory = () => {
    setCategoryFlag(1)
    setCategoryOpen(true)
  }
  const modelSubCategory = () => {
    setSubCategoryFlag(1)
    setSubCategoryOpen(true)
  }
  const modelGroup = () => {
    setGroupFlag(1)
    setGroupOpen(true)
  }
  const modelModal = () => {
    setModelFlag(1)
    setModelOpen(true)
  }
  const SubgroupModal = () => {
    setSubGroupFlag(1)
    setSubGroupOpen(true)
  }
  // const SubModeell = () => {
  //   setSubModelFlag(1)
  //   setSubModelOpen(true)
  // }

  const handleClose = useCallback(() => {
    setAssetTypeFlag(0)
    setAssetTypeOpen(false)
    setItemTypeOpen(false)
    setItemTypeFlag(1)
    setUOMopen(false)
    setUOMflag(1)
    setManufactureOpen(false)
    setManufactureFlag(1)
    setCategoryOpen(false)
    setCategoryFlag(1)
    setSubCategoryOpen(false)
    setSubCategoryFlag(1)
    setGroupOpen(false)
    setGroupFlag(1)
    setModelOpen(false)
    setModelFlag(1)
    setSubGroupOpen(false)
    setSubGroupFlag(1)
    setCheckExsitOpen(false)
    setCheckexist(1)
  }, [])

  useEffect(() => {
    dispatch(getAmAssetType())
    dispatch(getAmItemType())
    dispatch(getCategory())
    dispatch(getGroup())
    dispatch(getUOM())
    dispatch(getAmManufacture())
    dispatch(getAmModel())
  }, [dispatch])

  const checkExistOtNot = useCallback(() => {
    setCheckexist(1)
    setCheckExsitOpen(true)
  }, [])

  const updateOrder = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      if (/[0-9]/.test(value) === true) {
        if (value > 0 && value <= 10) {
          const newValue = parseInt(value)
          if (
            asset_order !== newValue &&
            item_oder !== newValue &&
            category_order !== newValue &&
            subCat_order !== newValue &&
            group_order !== newValue &&
            subGrup_order !== newValue &&
            manufct_order !== newValue &&
            model_order !== newValue &&
            modelNo_order !== newValue &&
            uom_order !== newValue
          ) {
            setOrder({ ...order, [e.target.name]: newValue })
          } else {
            warningNotify('Do Not enter same values')
          }
        } else {
          warningNotify('Enter number In Between 1 and 10')
        }
      } else {
        warningNotify('Please Enter number')
      }
    },
    [
      order,
      asset_order,
      item_oder,
      category_order,
      subCat_order,
      group_order,
      subGrup_order,
      manufct_order,
      model_order,
      modelNo_order,
      uom_order
    ]
  )

  return (
    <Box>
      <CardMaster title="Asset Name Creation" submit={sumbitItemCreation} close={backtoSetting} refresh={refreshWindow}>
        {checkExist === 1 ? (
          <ModelForItemExistOrNot assetOrSpare={assetOrSpare} open={checkExistOpen} handleClose={handleClose} />
        ) : null}
        {AssetTypeFlag === 1 ? <AssetTypeAddModel open={AssetTypeOpen} handleClose={handleClose} /> : null}
        {ItemTypeFlag === 1 ? <ItemTypeAddModel open={ItemTypeOpen} handleClose={handleClose} /> : null}
        {UOMflag === 1 ? <UomAddmodal open={UOMopen} handleClose={handleClose} /> : null}
        {ManufactureFlag === 1 ? <Manufacture open={ManufactureOpen} handleClose={handleClose} /> : null}
        {CategoryFlag === 1 ? <CategoryModal open={CategoryOpen} handleClose={handleClose} /> : null}
        {SubCategoryFlag === 1 ? <SubcategoryModal open={SubCategoryOpen} handleClose={handleClose} /> : null}
        {GroupFlag === 1 ? <GroupModal open={GroupOpen} handleClose={handleClose} /> : null}
        {ModelFlag === 1 ? <ModelModal open={ModelOpen} handleClose={handleClose} /> : null}
        {SubGroupFlag === 1 ? <SubGroupModal open={SubGroupOpen} handleClose={handleClose} /> : null}
        {/* {SubModelFlag === 1 ? <SubModelModal open={SubModelOpen} handleClose={handleClose} /> : null} */}

        <Box
          sx={{
            width: { sm: '100%', md: '80%', lg: '80%', xl: '50%', xxl: '50%' },
            display: 'flex',
            pt: 2.5,
            margin: 'auto ',
            pl: 13,
            flexDirection: 'column'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 0 }}>
            <Box sx={{ pl: 10, width: '20%' }}>
              <CusCheckBox
                label="Asset"
                color="primary"
                size="md"
                name="asset"
                value={asset}
                checked={asset}
                onCheked={updateAsset}
              ></CusCheckBox>
            </Box>
            <Box sx={{ pl: 10, width: '20%' }}>
              <CusCheckBox
                label="Spare"
                color="primary"
                size="md"
                name="spare"
                value={spare}
                checked={spare}
                onCheked={updateSpare}
              ></CusCheckBox>
            </Box>
            <Box sx={{ pl: 10, width: '50%', pb: 1 }}>
              <Button onClick={checkExistOtNot} variant="contained" size="small" color="primary">
                Search
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box
              sx={{
                pl: 0.8,
                width: { sm: '12%', md: '12%', lg: '10%' },
                height: '1%',
                pt: 0.1,
                textAlign: 'center'
              }}
            >
              <TextFieldCustom
                type="text"
                size="sm"
                name="asset_order"
                value={asset_order}
                onchange={updateOrder}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pl: 0.8, pt: 0.8 }}>
              <CusCheckBox
                color="primary"
                size="md"
                name="assetTypeStatus"
                value={assetTypeStatus}
                checked={assetTypeStatus}
                onCheked={updateAssetTypeStatus}
              ></CusCheckBox>
            </Box>
            <Box sx={{ width: '20%', pl: 1, pt: 0.6 }}>
              <Typography>Asset type</Typography>
            </Box>
            <Box sx={{ width: '55%', pt: 0.5 }}>
              <AmAssetTypeSelect
                assettype={assettype}
                setAssetType={setAssetType}
                setName={setAssetName}
                assetName={assetName}
              />
            </Box>
            <Box sx={{ width: '5%', pl: 1, pt: 0.5, cursor: 'pointer' }}>
              <Tooltip title="Add" placement="top">
                <AddCircleOutlineIcon onClick={() => modelAsset()} />
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box sx={{ pl: 0.8, width: { sm: '12%', md: '12%', lg: '10%' }, pt: 0.1 }}>
              <TextFieldCustom
                type="text"
                size="sm"
                name="item_oder"
                value={item_oder}
                onchange={updateOrder}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pl: 0.8, pt: 0.8 }}>
              <CusCheckBox
                color="primary"
                size="md"
                name="itemTypeStatus"
                value={itemTypeStatus}
                checked={itemTypeStatus}
                onCheked={updateItemStatus}
              ></CusCheckBox>
            </Box>
            <Box sx={{ width: '20%', pl: 1, pt: 0.6 }}>
              <Typography>Item Type</Typography>
            </Box>
            <Box sx={{ width: '55%', pt: 0.5 }}>
              <AssetItemSelect
                itemtype={itemtype}
                setItemtype={setItemtype}
                setName={setItemName}
                itemName={itemName}
              />
            </Box>
            <Box sx={{ width: '5%', pl: 1, pt: 0.5, cursor: 'pointer' }}>
              <Tooltip title="Add " placement="top">
                <AddCircleOutlineIcon onClick={() => modelItem()} />
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box sx={{ pl: 0.8, width: { sm: '12%', md: '12%', lg: '10%' }, pt: 0.1 }}>
              <TextFieldCustom
                type="text"
                size="sm"
                name="category_order"
                value={category_order}
                onchange={updateOrder}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pl: 0.8, pt: 0.8 }}>
              <CusCheckBox
                color="primary"
                size="md"
                name="categoryStatus"
                value={categoryStatus}
                checked={categoryStatus}
                onCheked={updateCategoryStatus}
              ></CusCheckBox>
            </Box>
            <Box sx={{ width: '20%', pl: 1, pt: 0.6 }}>
              <Typography>Category</Typography>
            </Box>
            <Box sx={{ width: '55%', pt: 0.5 }}>
              <AssetCategorySelect
                category={category}
                setCategory={setCategory}
                setName={setCategoryName}
                categoryName={categoryName}
              />
            </Box>
            <Box sx={{ width: '5%', pl: 1, pt: 0.5, cursor: 'pointer' }}>
              <Tooltip title="Add " placement="top">
                <AddCircleOutlineIcon onClick={() => modelCategory()} />
              </Tooltip>
            </Box>
          </Box>
          {/* <Box sx={{ width: '5%', pt: 1.3, }}>
            <Tooltip title="View " placement="top">
              <RemoveRedEyeOutlinedIcon />
            </Tooltip>
          </Box> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box sx={{ pl: 0.8, width: { sm: '12%', md: '12%', lg: '10%' }, pt: 0.1 }}>
              <TextFieldCustom
                type="text"
                size="sm"
                name="subCat_order"
                value={subCat_order}
                onchange={updateOrder}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pl: 0.8, pt: 0.8 }}>
              <CusCheckBox
                color="primary"
                size="md"
                name="subcatStatus"
                value={subcatStatus}
                checked={subcatStatus}
                onCheked={updateSubcatStatus}
              ></CusCheckBox>
            </Box>
            <Box sx={{ width: '20%', pl: 1, pt: 0.6 }}>
              <Typography>Subcategory</Typography>
            </Box>
            <Box sx={{ width: '55%', pt: 0.5 }}>
              <AssetSubcategorySelect
                category={category}
                subcategory={subcategory}
                setSubcategory={setSubcategory}
                setName={setSubcatName}
              />
            </Box>
            <Box sx={{ width: '5%', pl: 1, pt: 0.5, cursor: 'pointer' }}>
              <Tooltip title="Add " placement="top">
                <AddCircleOutlineIcon onClick={() => modelSubCategory()} />
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box sx={{ pl: 0.8, width: { sm: '12%', md: '12%', lg: '10%' }, pt: 0.1 }}>
              <TextFieldCustom
                type="text"
                size="sm"
                name="group_order"
                value={group_order}
                onchange={updateOrder}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pl: 0.8, pt: 0.8 }}>
              <CusCheckBox
                color="primary"
                size="md"
                name="groupStatus"
                value={groupStatus}
                checked={groupStatus}
                onCheked={updateGroupStatus}
              ></CusCheckBox>
            </Box>
            <Box sx={{ width: '20%', pl: 1, pt: 0.6 }}>
              <Typography>Group</Typography>
            </Box>
            <Box sx={{ width: '55%', pt: 0.5 }}>
              <AssetGroupSlect group={group} setGroup={setGroup} groupName={groupName} setName={setGroupName} />
            </Box>
            <Box sx={{ width: '5%', pl: 1, pt: 0.5, cursor: 'pointer' }}>
              <Tooltip title="Add  " placement="top">
                <AddCircleOutlineIcon onClick={() => modelGroup()} />
              </Tooltip>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box sx={{ pl: 0.8, width: { sm: '12%', md: '12%', lg: '10%' }, pt: 0.1 }}>
              <TextFieldCustom
                type="text"
                size="sm"
                name="subGrup_order"
                value={subGrup_order}
                onchange={updateOrder}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pl: 0.8, pt: 0.8 }}>
              <CusCheckBox
                color="primary"
                size="md"
                name="subgroupStatus"
                value={subgroupStatus}
                checked={subgroupStatus}
                onCheked={updateSubGroupStatus}
              ></CusCheckBox>
            </Box>
            <Box sx={{ width: '20%', pl: 1, pt: 0.6 }}>
              <Typography>Subgroup</Typography>
            </Box>
            <Box sx={{ width: '55%', pt: 0.5 }}>
              <AssetSubGroupSelect
                setSubGroup={setSubGroup}
                group={group}
                setName={setSubgroupName}
                subgroup={subgroup}
                subgroupName={subgroupName}
              />
            </Box>
            <Box sx={{ width: '5%', pl: 1, pt: 0.5, cursor: 'pointer' }}>
              <Tooltip title="Add " placement="top">
                <AddCircleOutlineIcon onClick={() => SubgroupModal()} />
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box sx={{ pl: 0.8, width: { sm: '12%', md: '12%', lg: '10%' }, pt: 0.1 }}>
              <TextFieldCustom
                type="text"
                size="sm"
                name="manufct_order"
                value={manufct_order}
                onchange={updateOrder}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pl: 0.8, pt: 0.8 }}>
              <CusCheckBox
                color="primary"
                size="md"
                name="manufactureStatus"
                value={manufactureStatus}
                checked={manufactureStatus}
                onCheked={updateManufactureStatus}
              ></CusCheckBox>
            </Box>
            <Box sx={{ width: '20%', pl: 1, pt: 0.6 }}>
              <Typography>Manufacture</Typography>
            </Box>
            <Box sx={{ width: '55%', pt: 0.5 }}>
              <AssetManufactureSelect
                manufacture={manufacture}
                setManufacture={setManufacture}
                setName={setManufactureName}
                manufactureName={manufactureName}
              />
            </Box>
            <Box sx={{ width: '5%', pl: 1, pt: 0.5, cursor: 'pointer' }}>
              <Tooltip title="Add " placement="top">
                <AddCircleOutlineIcon onClick={() => modelManufacture()} />
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box sx={{ pl: 0.8, width: { sm: '12%', md: '12%', lg: '10%' }, pt: 0.1 }}>
              <TextFieldCustom
                type="text"
                size="sm"
                name="model_order"
                value={model_order}
                onchange={updateOrder}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pl: 0.8, pt: 0.8 }}>
              <CusCheckBox
                color="primary"
                size="md"
                name="modelStatus"
                value={modelStatus}
                checked={modelStatus}
                onCheked={updateModelStatus}
              ></CusCheckBox>
            </Box>
            <Box sx={{ width: '20%', pl: 1, pt: 0.6 }}>
              <Typography>Model</Typography>
            </Box>
            <Box sx={{ width: '55%', pt: 0.5 }}>
              <AssetModelSelect model={model} setModel={setModel} setName={setModelName} modelName={modelName} />
            </Box>
            <Box sx={{ width: '5%', pl: 1, pt: 0.5, cursor: 'pointer' }}>
              <Tooltip title="Add " placement="top">
                <AddCircleOutlineIcon onClick={() => modelModal()} />
              </Tooltip>
            </Box>
          </Box>
          {/* <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
            <Box sx={{ pl: 0.8, width: { sm: "7%", md: "7%", lg: "5%" }, pt: 0.1 }}>
              <TextFieldCustom
                type="text"
                size="sm"
                              name="asset_order"
                value={asset_order}
                onchange={updateOrder}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pl: 0.8, pt: 0.8 }}>
              <CusCheckBox
                color="primary"
                size="md"
                name="submodelStatus"
                value={submodelStatus}
                checked={submodelStatus}
                onCheked={updateSubModelStatus}
              ></CusCheckBox>
            </Box>
            <Box sx={{ width: '20%', pl: 1, pt: 0.6 }} >
              <Typography>Submodel</Typography>
            </Box>
            <Box sx={{ width: '55%', pt: 0.5 }}>
              <AmSubmodelSelect
                submodel={submodel}
                setSubmodel={setSubmodel}
                model={model}
                setName={setSubmodelName}
                submodelName={submodelName}
              />
            </Box>
            <Box sx={{ width: '5%', pl: 1, pt: 0.5 }} >
              <Tooltip title="Add " placement="top">
                <AddCircleOutlineIcon onClick={() => SubModeell()} />
              </Tooltip>
            </Box>
          </Box> */}

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box sx={{ pl: 0.8, width: { sm: '12%', md: '12%', lg: '10%' }, pt: 0.1 }}>
              <TextFieldCustom
                type="text"
                size="sm"
                name="modelNo_order"
                value={modelNo_order}
                onchange={updateOrder}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pl: 0.8, pt: 0.8 }}>
              <CusCheckBox
                color="primary"
                size="md"
                name="modelNoStatus"
                value={modelNoStatus}
                checked={modelNoStatus}
                onCheked={updateModelNoStatus}
              ></CusCheckBox>
            </Box>
            <Box sx={{ width: '20%', pl: 1, pt: 0.6 }}>
              <Typography>Model No.</Typography>
            </Box>
            <Box sx={{ width: '55%', pt: 0.5 }}>
              <TextFieldCustom
                type="text"
                size="sm"
                placeholder="Model Number"
                name="modelNo"
                value={modelNo}
                onchange={updateModelNo}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ width: '5%', pl: 1, pt: 0.5 }}></Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box sx={{ pl: 0.8, width: { sm: '12%', md: '12%', lg: '10%' }, pt: 0.1 }}>
              <TextFieldCustom
                type="text"
                size="sm"
                name="uom_order"
                value={uom_order}
                onchange={updateOrder}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pl: 0.8, pt: 0.8 }}>
              <CusCheckBox
                color="primary"
                size="md"
                name="uomStatus"
                value={uomStatus}
                checked={uomStatus}
                onCheked={updateUOMsatus}
              ></CusCheckBox>
            </Box>
            <Box sx={{ width: '20%', pl: 1, pt: 0.6 }}>
              <Typography>U.O.M</Typography>
            </Box>
            <Box sx={{ width: '55%', pt: 0.5 }}>
              <AssetUOMSelect uom={uom} setUOM={setUOM} setName={setUomName} uomName={uomName} />
            </Box>
            <Box sx={{ width: '5%', pl: 1, pt: 0.5, cursor: 'pointer' }}>
              <Tooltip title="Add " placement="top">
                <AddCircleOutlineIcon onClick={() => modelUOM()} />
              </Tooltip>
            </Box>
          </Box>
          {/* <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
            <Box sx={{ display: 'flex', width: '82%', pt: 1, margin: 'auto' }}>
              <Box sx={{ pl: 1.9, }}>
                <CusCheckBox
                  color="primary"
                  size="md"
                  name="baseStatus"
                  value={baseStatus}
                  checked={baseStatus}
                  onCheked={updateBasesatus}
                ></CusCheckBox>
              </Box>
              <Box sx={{ width: '13%', ml: 0.5 }}   >
                <Typography>Base name</Typography>
              </Box>
              <Box sx={{ width: '90%' }}>
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="item_base_name"
                  value={item_base_name}
                  onchange={updateBaseName}
                ></TextFieldCustom>
              </Box>
            </Box>
          </Box> */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '85%',
            pl: 19,
            pt: 1,
            justifyContent: 'space-evenly'
          }}
        >
          <Box sx={{ width: '12%' }}>
            <Typography>Asset Name</Typography>
          </Box>
          <Box sx={{ width: '80%', pl: 2.3 }}>
            <TextFieldCustom type="text" size="sm" name="itemNamee" value={itemNamee}></TextFieldCustom>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '85%',
            pl: 20,
            pt: 1,
            justifyContent: 'space-evenly'
          }}
        >
          <Box sx={{ width: '15%' }}>
            <Typography>Specification 1</Typography>
          </Box>
          <Box sx={{ width: '80%' }}>
            <CssVarsProvider>
              <Textarea
                type="text"
                size="sm"
                placeholder="Specification 1"
                variant="outlined"
                minRows={2}
                maxRows={4}
                name="item_specific_one"
                value={item_specific_one}
                onChange={e => updateItemCreation(e)}
              ></Textarea>
            </CssVarsProvider>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '85%',
            pl: 20,
            pt: 1,
            justifyContent: 'space-evenly'
          }}
        >
          <Box sx={{ width: '15%' }}>
            <Typography>Specification 2</Typography>
          </Box>
          <Box sx={{ width: '80%' }}>
            <CssVarsProvider>
              <Textarea
                type="text"
                size="sm"
                placeholder="Specification 2"
                variant="outlined"
                minRows={2}
                maxRows={4}
                name="item_specific_two"
                value={item_specific_two}
                onChange={e => updateItemCreation(e)}
              ></Textarea>
            </CssVarsProvider>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '70%',
            pl: 15,
            pt: 1,
            justifyContent: 'space-evenly'
          }}
        >
          <Box sx={{ width: '15%', margin: 'auto', pl: 2.3 }}>
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
          <Box sx={{ display: 'flex', width: '75%' }}>
            <Box sx={{}}>
              <label htmlFor="file-input">
                <CustomeToolTip title="upload">
                  <IconButton color="primary" aria-label="upload file" component="span">
                    <UploadFileIcon />
                  </IconButton>
                </CustomeToolTip>
              </label>
              <Input
                id="file-input"
                type="file"
                accept=".jpg, .jpeg, .png, .pdf"
                style={{ display: 'none' }}
                onChange={uploadFile}
              />
            </Box>
            <Box sx={{ pt: 2 }}>{selectFile && <p>{selectFile.name}</p>}</Box>
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
