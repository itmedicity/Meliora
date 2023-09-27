import React, { memo, useCallback, useEffect, useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Box, Typography, } from '@mui/material'
import AmCategorySelWOName from 'src/views/CommonSelectCode/AmCategorySelWOName'
import AmGroupSelWOName from 'src/views/CommonSelectCode/AmGroupSelWOName'
import AmModelSelWOName from 'src/views/CommonSelectCode/AmModelSelWOName'
import CusIconButton from '../../Components/CusIconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { getCategory } from 'src/redux/actions/AmCategoryList.action'
import { getGroup } from 'src/redux/actions/AmGroupList.action'
import { getAmModel } from 'src/redux/actions/AmModelList.action'
import { useDispatch } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import ItemCreateMapping from './ItemCreateMapping'
import AmSubCategryWOName from 'src/views/CommonSelectCode/AmSubCategryWOName'
import { getAmManufacture } from 'src/redux/actions/AmManufactureList.actions'
import AmSubGroupWOName from 'src/views/CommonSelectCode/AmSubGroupWOName'
import ItemAddingComp from './ItemAddingComp'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import AmSubModelWOName from 'src/views/CommonSelectCode/AmSubModelWOName'
import AmManufacWOName from 'src/views/CommonSelectCode/AmManufacWOName'
import AmModelNumberSelect from 'src/views/CommonSelectCode/AmModelNumberSelect'


const ItemCreationMast = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const [category, setCategory] = useState(0)
  const [subcategory, setSubcategory] = useState(0)
  const [group, setGroup] = useState(0)
  const [model, setModel] = useState(0)
  const [submodel, setSubmodel] = useState(0)
  const [subgroup, setSubGroup] = useState(0)
  const [manufacture, setManufacture] = useState(0)
  const [itemList, setItemList] = useState([])
  const [modelNumber, setModelNumber] = useState('')

  useEffect(() => {
    dispatch(getCategory())
    dispatch(getGroup())
    dispatch(getAmManufacture())
    dispatch(getAmModel())
  }, [dispatch])


  const postdata = useMemo(() => {
    return {
      item_category_slno: category,
      item_subcategory_slno: subcategory,
      item_group_slno: group,
      item_subgroup_slno: subgroup,
      item_model_slno: model,
      item_submodel_slno: submodel,
      item_manufactures_slno: manufacture,
      item_model_num: modelNumber !== '' ? modelNumber : null
    }

  }, [category, subcategory, group, subgroup, model, submodel, manufacture, modelNumber])

  const search = useCallback(() => {
    const getItemdata = async (postdata) => {
      const result = await axioslogin.post('/itemNameCreation/getItem', postdata)
      const { data, success } = result.data
      if (success === 1) {
        setItemList(data)
        setFlag(1)
      }
      else {
        setFlag(0)
        warningNotify("No Items Under Selected Condition")
        setItemList([])
      }
    }

    if (category !== 0 || subcategory !== 0 || group !== 0 || subgroup !== 0 || model !== 0 ||
      submodel !== 0 || manufacture !== 0 || modelNumber !== '') {
      getItemdata(postdata)

    }
    else {
      warningNotify("Please Select Any Options")
    }


  }, [postdata, category, subcategory, group, subgroup, model, submodel, manufacture, modelNumber])
  const [flag, setFlag] = useState(0)

  const [selectData, setSelectData] = useState([])
  const [dataAdd, setDataAdd] = useState(0)


  const rowSelect = useCallback((val) => {
    setSelectData(val);
    setDataAdd(dataAdd + 1)

  }, [dataAdd, setDataAdd])

  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])


  const [disArry, setDisArry] = useState([])
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      width: '100%',
      height: window.innerHeight - 85
    }}>
      <CardMasterClose
        title="Item Creation"
        close={backtoSetting}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          width: '100%'
        }} >
          <Box sx={{ display: 'flex', flex: 1, width: '100%', p: 0.5, flexDirection: 'row' }} >

            <Box sx={{ display: 'flex', flex: 1, width: '25%', p: 0.5, flexDirection: 'row' }} >
              <Box sx={{ width: '30%', pl: 1, pt: 1.3, }}>
                <Typography>Category</Typography>
              </Box>
              <Box sx={{ width: '70%', pt: 1.3, }}>
                <AmCategorySelWOName
                  category={category}
                  setCategory={setCategory}

                />
              </Box>

            </Box>
            <Box sx={{ display: 'flex', flex: 1, width: '25%', p: 0.5, flexDirection: 'row' }} >
              <Box sx={{ width: '30%', pl: 1, pt: 1.3, }}>
                <Typography>Sub Category</Typography>
              </Box>
              <Box sx={{ width: '70%', pt: 1.3, }}>
                <AmSubCategryWOName
                  subcategory={subcategory}
                  setSubcategory={setSubcategory}
                />
              </Box>

            </Box>
            <Box sx={{ display: 'flex', flex: 1, width: '25%', p: 0.5, flexDirection: 'row' }} >
              <Box sx={{ width: '30%', pl: 1, pt: 1.3, }}>
                <Typography>Group</Typography>
              </Box>
              <Box sx={{ width: '70%', pt: 1.3 }}>
                <AmGroupSelWOName
                  group={group}
                  setGroup={setGroup}
                />
              </Box>

            </Box>
            <Box sx={{ display: 'flex', flex: 1, width: '25%', p: 0.5, flexDirection: 'row', }} >
              <Box sx={{ width: '30%', pl: 1, pt: 1.3, }}>
                <Typography>Sub Group</Typography>
              </Box>
              <Box sx={{ width: '70%', pt: 1.3 }}>
                <AmSubGroupWOName
                  subgroup={subgroup}
                  setSubGroup={setSubGroup}
                />
              </Box>
            </Box>
          </Box>

          {/* 2nd row */}
          <Box sx={{ display: 'flex', flex: 1, width: '100%', p: 0.5, flexDirection: 'row' }} >
            <Box sx={{ display: 'flex', flex: 1, width: '25%', p: 0.5, flexDirection: 'row' }} >
              <Box sx={{ width: '30%', pl: 1, pt: 1.3, }}>
                <Typography>Model</Typography>
              </Box>
              <Box sx={{ width: '70%', pt: 1.3, }}>
                <AmModelSelWOName
                  model={model}
                  setModel={setModel}
                />
              </Box>

            </Box>
            <Box sx={{ display: 'flex', flex: 1, width: '25%', p: 0.5, flexDirection: 'row' }} >
              <Box sx={{ width: '30%', pl: 1, pt: 1.3, }}>
                <Typography> Sub Model</Typography>
              </Box>
              <Box sx={{ width: '70%', pt: 1.3, }}>
                <AmSubModelWOName
                  submodel={submodel}
                  setSubmodel={setSubmodel}
                />
              </Box>

            </Box>
            <Box sx={{ display: 'flex', flex: 1, width: '25%', p: 0.5, flexDirection: 'row' }} >
              <Box sx={{ width: '30%', pl: 1, pt: 1.3, }}>
                <Typography>Manufacture</Typography>
              </Box>
              <Box sx={{ width: '70%', pt: 1.3 }}>
                <AmManufacWOName
                  manufacture={manufacture}
                  setManufacture={setManufacture}
                />
              </Box>

            </Box>
            <Box sx={{ display: 'flex', flex: 1, width: '25%', p: 0.5, flexDirection: 'row', }} >
              <Box sx={{ width: '30%', pl: 1, pt: 1.3, }}>
                <Typography>Model No</Typography>
              </Box>
              <Box sx={{ width: '70%', pt: 1.3 }}>
                <AmModelNumberSelect
                  modelNumber={modelNumber}
                  setModelNumber={setModelNumber}
                />

              </Box>
              <Box sx={{ width: '10%', pl: 1, pt: 1.3, }}>
                <CusIconButton size="sm" variant="outlined" clickable="true" onClick={search} >
                  <SearchOutlinedIcon fontSize='small' />
                </CusIconButton>
              </Box>
            </Box>
          </Box>

          {/* 3rd row */}

          <Box sx={{ display: 'flex', flex: 1, width: '100%', p: 0.5, flexDirection: 'row', }} >

            {/* {flag === 1 ? <ItemCreateMapping count={count} itemName={itemName} /> : null} */}
            {flag === 1 ? <ItemCreateMapping itemList={itemList} rowSelect={rowSelect} /> : null}
          </Box>
          {/* 4th row */}

          {dataAdd !== 0 ?
            <ItemAddingComp selectData={selectData}
              setDisArry={setDisArry}
              disArry={disArry} />
            : null
          }

        </Box>
      </CardMasterClose>

    </Box>
  )
}

export default memo(ItemCreationMast)