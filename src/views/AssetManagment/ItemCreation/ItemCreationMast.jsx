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

    } else {
      warningNotify("Please Select Any Options")
    }
  }, [postdata, category, subcategory, group, subgroup, model, submodel, manufacture, modelNumber])

  const [flag, setFlag] = useState(0)

  const [selectData, setSelectData] = useState([])
  const [dataAdd, setDataAdd] = useState(0)

  const [department, setDepartment] = useState(0)
  const [deptsec, setDeptSec] = useState(0)
  const [deptName, setDeptName] = useState('')
  const [deptSecName, setDeptSecName] = useState('')
  const [custodiandept, setCustodianDept] = useState(0)
  const [custdeptName, setcustdeptname] = useState('')
  const [rackno, setrackNo] = useState(0)
  const [rackname, setrackName] = useState('')
  const [roomNo, setRoomNo] = useState(0)
  const [roonName, setRoomName] = useState('')
  const [count, setCount] = useState('')

  const reset = useCallback(() => {
    setDepartment(0)
    setDeptSec(0)
    setDeptName('')
    setDeptSecName('')
    setCustodianDept(0)
    setcustdeptname('')
    setrackNo(0)
    setrackName('')
    setRoomNo(0)
    setRoomName('')
    setCount('')
  }, [])


  useEffect(() => {
    setFlag(0)
    setDataAdd(0)
  }, [category, subcategory, group, subgroup, model, submodel, manufacture, modelNumber])

  const rowSelect = useCallback((val) => {
    reset()
    setSelectData([])
    setSelectData(val);
    setDataAdd(dataAdd + 1)

  }, [dataAdd, setDataAdd, reset])

  const backtoSetting = useCallback(() => {
    history.push('/Home')
  }, [history])

  return (
    <Box sx={{
      display: 'flex',
      flexGrow: 1,
      width: '100%',
      height: window.innerHeight - 85,
      bgcolor: 'green'
    }}>
      <CardMasterClose
        title="Item Creation"
        close={backtoSetting}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          m: -1,
        }} >
          <Box sx={{
            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            borderBottom: 1, borderWidth: 0.1, borderColor: 'black',
          }} >
            <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
              <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Category</Typography>
              <Box>
                <AmCategorySelWOName
                  category={category}
                  setCategory={setCategory}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
              <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Sub Category</Typography>
              <Box sx={{ width: '100%' }}>
                <AmSubCategryWOName
                  subcategory={subcategory}
                  setSubcategory={setSubcategory}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
              <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Group</Typography>
              <Box sx={{ width: '100%' }}>
                <AmGroupSelWOName
                  group={group}
                  setGroup={setGroup}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
              <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Sub Group</Typography>
              <Box sx={{ width: '100%' }}>
                <AmSubGroupWOName
                  subgroup={subgroup}
                  setSubGroup={setSubGroup}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
              <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Model</Typography>
              <Box sx={{ width: '100%' }}>
                <AmModelSelWOName
                  model={model}
                  setModel={setModel}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
              <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Sub Model</Typography>
              <Box sx={{ width: '100%' }}>
                <AmSubModelWOName
                  submodel={submodel}
                  setSubmodel={setSubmodel}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
              <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Manufacture</Typography>
              <Box sx={{ width: '100%' }}>
                <AmManufacWOName
                  manufacture={manufacture}
                  setManufacture={setManufacture}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', width: '22%', p: 0.5, flexDirection: 'column' }} >
              <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Model No</Typography>
              <Box sx={{ width: '100%' }}>
                <AmModelNumberSelect
                  modelNumber={modelNumber}
                  setModelNumber={setModelNumber}
                />
              </Box>
            </Box>

            <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
              <CusIconButton size="sm" variant="outlined" clickable="true" onClick={search} >
                <SearchOutlinedIcon fontSize='small' />
              </CusIconButton>
            </Box>
          </Box>

          {/* 3rd row */}
          {flag === 1 ? <ItemCreateMapping itemList={itemList} rowSelect={rowSelect} /> : null}

          {/* 4th row */}
          {
            dataAdd !== 0 ?
              <ItemAddingComp selectData={selectData}
                department={department}
                setDepartment={setDepartment}
                deptsec={deptsec}
                setDeptSec={setDeptSec}
                deptName={deptName}
                setDeptName={setDeptName}
                deptSecName={deptSecName}
                setDeptSecName={setDeptSecName}
                custodiandept={custodiandept}
                setCustodianDept={setCustodianDept}
                custdeptName={custdeptName}
                setcustdeptname={setcustdeptname}
                rackno={rackno}
                setrackNo={setrackNo}
                rackname={rackname}
                setrackName={setrackName}
                roomNo={roomNo}
                setRoomNo={setRoomNo}
                roonName={roonName}
                setRoomName={setRoomName}
                count={count}
                setCount={setCount}
              />
              : null
          }

        </Box >
      </CardMasterClose >
    </Box >
  )
}

export default memo(ItemCreationMast)