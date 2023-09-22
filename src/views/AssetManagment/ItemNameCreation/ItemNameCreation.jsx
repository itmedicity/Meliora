import { Box,  Tooltip, Typography ,IconButton, Input} from '@mui/material'
import React, { useCallback, memo, useEffect ,useState,useMemo} from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import AssetCategorySelect from 'src/views/CommonSelectCode/AssetCategorySelect'
import AssetGroupSlect from 'src/views/CommonSelectCode/AssetGroupSlect'
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
import imageCompression from 'browser-image-compression';
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
import SubModelModal from './ModelForAssetItemAdd/SubModelModal'

const ItemNameCreation = () => {
  const dispatch = useDispatch();
  const history = useHistory()
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
    setModelNo(e.target.value.toLocaleUpperCase())
    setModelNoDis(e.target.value.toLocaleUpperCase())
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
    itemName, categoryName, subcatName, groupName, subgroupName, modelName, submodelName, uomName, manufactureName])

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
  }, [assetNameDis, itemNameDis, categoryDis, subcatDis, groupDis, subgroupDis, modelDis, submodelDis, uomDis, manufactureDis, modelNoDis])

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
      item_model_num: modelNo !== null ? modelNo.toLocaleUpperCase():null,
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

    dispatch(getAmAssetType())
    dispatch(getAmItemType())

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
    
  }, [setItem, setCount, setValue, setItemtype, setAssetType, setCategory, setSubcategory, setGroup, setSubGroup, setManufacture, setUOM,
    setModel, setSubmodel, setModelNo, setItemNamee, setAssetName, setItemName, setCategoryName, setSubcatName, setGroupName,
    setSubgroupName, setModelName, setSubmodelName, setUomName, setManufactureName, setAssetTypeStatus, setItemTypeSatus, setCategorySatus,
    setSubcatSatus, setGroupStatus, setSubGroupStatus, setModelStatus, setSubModelstatus, setUOMstatus, setManufactureStatus,
    setModelNoStatus, setAssetNameDis, setItemNameDis, setCategoryDis, setSubcatDis, setGroupDis, setSubGroupDis, setModelDis, setSubModelDis,
    setUOMdis, setManufactureDis, setModelNoDis, assetName, itemName, categoryName, subcatName, groupName, subgroupName, modelName, submodelName,
    uomName, manufactureName, modelNo,dispatch])

       const uploadFile = async (event) => {
      const file = event.target.files[0];    
      setSelectFile(file);
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920
      }
      const compressedFile = await imageCompression(file, options);
      setSelectFile(compressedFile);
  };
  
  const sumbitItemCreation = useCallback(
    (e) => {
      e.preventDefault()
      const InsertItem = async (postdata) => {
        const result = await axioslogin.post('/itemNameCreation/insert', postdata)  
        reset()
        return result.data  
      
             }    

      const UpdateItem = async (patchdata) => {
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
      const FileInsert = async (fileData) => {
        const result = await axioslogin.post('/fileupload/uploadFile/Item', fileData)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        }
        else {
          infoNotify(message)
        }
      }

      if (value === 0) {
        if (assetName !== '' && itemName!=='') {

          InsertItem(postdata).then((val) => {
            const { message, success, insertid } = val
            if (success === 1) {
              
              if (selectFile !== null) {
                //File upload Api and post data
                const formData = new FormData()
                formData.append('id', insertid)
                formData.append('file', selectFile, selectFile.name)
                FileInsert(formData)
              }
              else {
                succesNotify(message)
                setCount(count + 1)
                reset()
              }
            }
            else if (success === 0) {
              infoNotify(message)
            } else {
              infoNotify(message)
            }
          })
        }
        else {
          infoNotify("please fill fields") 
      
        }
      }
      else UpdateItem(patchdata)
      reset()
    },

    [postdata, value, count, patchdata, reset, selectFile,assetName,itemName],
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
    reset()
  }, [ reset])

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
  const [SubModelOpen, setSubModelOpen] = useState(false)
  const [SubModelFlag, setSubModelFlag] = useState(0)



  const modelAsset = () => {
    setAssetTypeFlag(1)
    setAssetTypeOpen(true)
  }
  const modelItem = () => {
    setItemTypeFlag(1)
    setItemTypeOpen(true)
  }
  const modelUOM= () => {
    setUOMflag(1)
    setUOMopen(true)
  }
  const modelManufacture= () => {
    setManufactureFlag(1)
    setManufactureOpen(true)
  }
  const modelCategory= () => {
    setCategoryFlag(1)
    setCategoryOpen(true)
  }
  const modelSubCategory= () => {
    setSubCategoryFlag(1)
    setSubCategoryOpen(true)
  }
  const modelGroup= () => {
    setGroupFlag(1)
    setGroupOpen(true)
  }
  const modelModal= () => {
    setModelFlag(1)
    setModelOpen(true)
  }
  const SubgroupModal= () => {
    setSubGroupFlag(1)
    setSubGroupOpen(true)
  }
  const SubModeell= () => {
    setSubModelFlag(1)
    setSubModelOpen(true)
  }

  const handleClose = useCallback(() => {
    setAssetTypeFlag(0)
    setAssetTypeOpen(false)
    setItemTypeOpen(0)
    setItemTypeFlag(false)
    setUOMflag(0)
    setUOMopen(false)
    setManufactureFlag(0)
    setManufactureOpen(false)
    setCategoryFlag(0)
    setCategoryOpen(false)
    setSubCategoryFlag(0)
    setSubCategoryOpen(false)
    setGroupFlag(0)
    setGroupOpen(false)
    setModelFlag(0)
    setModelOpen(false)
    setSubGroupFlag(0)
    setSubGroupOpen(false)
    setSubModelFlag(0)
    setSubModelOpen(false)
  }, [setAssetTypeOpen, setAssetTypeFlag, setItemTypeOpen, setItemTypeFlag, setUOMflag, setUOMopen, setManufactureFlag, setManufactureOpen,
    setCategoryFlag, setCategoryOpen, setSubCategoryFlag, setSubCategoryOpen, setGroupFlag, setGroupOpen, setModelFlag, setModelOpen,
    setSubGroupFlag,setSubGroupOpen,setSubModelFlag,setSubModelOpen
  ]) 

  useEffect(() => {
    dispatch(getAmAssetType())
    dispatch(getAmItemType())
    dispatch(getCategory())
    dispatch(getGroup())
    dispatch(getUOM())
    dispatch(getAmManufacture())
    dispatch(getAmModel())

  },[dispatch])
  return (
    <Box>
      <CardMaster
        title="Item Name Creation"
        submit={sumbitItemCreation}
        close={backtoSetting}
        refresh={refreshWindow}
      >
        {AssetTypeFlag === 1 ? <AssetTypeAddModel open={AssetTypeOpen} handleClose={handleClose} /> : null}
        {ItemTypeFlag === 1 ? <ItemTypeAddModel open={ItemTypeOpen} handleClose={handleClose} /> : null}
        {UOMflag === 1 ? <UomAddmodal open={UOMopen} handleClose={handleClose} /> : null}
        {ManufactureFlag === 1 ? <Manufacture open={ManufactureOpen} handleClose={handleClose} /> : null}
        {CategoryFlag === 1 ? <CategoryModal open={CategoryOpen} handleClose={handleClose} /> : null}
        {SubCategoryFlag === 1 ? <SubcategoryModal open={SubCategoryOpen} handleClose={handleClose} /> : null}
        {GroupFlag === 1 ? <GroupModal open={GroupOpen} handleClose={handleClose} /> : null}
        {ModelFlag === 1 ? <ModelModal open={ModelOpen} handleClose={handleClose} /> : null}
        {SubGroupFlag === 1 ? <SubGroupModal open={SubGroupOpen} handleClose={handleClose} /> : null}
        {SubModelFlag === 1 ? <SubModelModal open={SubModelOpen} handleClose={handleClose} /> : null}
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
            <AmAssetTypeSelect
               assettype={assettype}
              setAssetType={setAssetType}
              setName={setAssetName}
            />
          </Box>
          <Box
            sx={{
              width: '5%',
              pl: 1,
            }}
          >
          
            <Tooltip title="Add " placement="top">
              <AddCircleOutlineIcon onClick={() => modelAsset()} />
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
            <AssetItemSelect
               itemtype={itemtype}
              setItemtype={setItemtype}
              setName={setItemName} />
          </Box>
          <Box
            sx={{
              width: '5%',
              pl: 1,
              pt: 1.3,
            }}
          >
            <Tooltip title="Add " placement="top">
              <AddCircleOutlineIcon onClick={() => modelItem()}/>
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
              category={category}
              setCategory={setCategory}
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
              <AddCircleOutlineIcon onClick={() => modelCategory()} />
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
              subcategory={subcategory}
              setSubcategory={setSubcategory}
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
              <AddCircleOutlineIcon onClick={() => modelSubCategory()} />
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
            <AssetGroupSlect
              group={group}
              setGroup={setGroup}
              setName={setGroupName} />
          </Box>
          <Box
            sx={{
              width: '5%',
              pl: 1,
              pt: 1.3,
            }}
          >
            <Tooltip title="Add  " placement="top">
              <AddCircleOutlineIcon onClick={() => modelGroup()} />
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
              setSubGroup={setSubGroup}
              group={group}
              setName={setSubgroupName}
              subgroup={subgroup}
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
              <AddCircleOutlineIcon onClick={() => SubgroupModal()}  />
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
            <AssetModelSelect
               model={model}
              setModel={setModel}
              setName={setModelName} />
          </Box>
          <Box
            sx={{
              width: '5%',
              pl: 1,
              pt: 1,
            }}
          >
            <Tooltip title="Add " placement="top">
              <AddCircleOutlineIcon onClick={() => modelModal()} />
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
              submodel={submodel}
              setSubmodel={setSubmodel}
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
              <AddCircleOutlineIcon onClick={() => SubModeell()}  />
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
            <AssetUOMSelect
          uom={uom}
              setUOM={setUOM}
              setName={setUomName} />
          </Box>
          <Box
            sx={{
              width: '5%',
              pl: 1,
              pt: 1,
            }}
          >
            <Tooltip title="Add " placement="top">
              <AddCircleOutlineIcon onClick={() => modelUOM()}/>
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
              manufacture={manufacture}
              setManufacture={setManufacture}
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
              <AddCircleOutlineIcon onClick={() => modelManufacture()} />
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
        <Box sx={{
          display: 'flex',
          width: '75%',
          ml:34
       
        }}>
        <Box
          sx={{
            display: 'flex',
            width: '88%',
            pt: 1,
            margin: 'auto',
           
          }}
        >
          <Box
            sx={{
              width: '13%',
             ml:4,
             
            }}
          >
            <Typography>Item creation</Typography>
          </Box>
          <Box
            sx={{
              width: '83%',
              
            }}
          >
            <TextFieldCustom
              type="text"
              size="sm"
              name="itemNamee"
              value={itemNamee}
            ></TextFieldCustom>
          </Box>
          </Box>
          <Box sx={{
            display: 'flex',
            width:'200px',

       
          }}>
            <Box sx={{pt:1}}>
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
            <Box sx={{pt:2}}>
              {selectFile && <p>{selectFile.name}</p>}
              </Box>
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
