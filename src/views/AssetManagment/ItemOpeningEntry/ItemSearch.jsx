import { Box } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCategory } from 'src/redux/actions/AmCategoryList.action'
import { getGroup } from 'src/redux/actions/AmGroupList.action'
import { getAmManufacture } from 'src/redux/actions/AmManufactureList.actions'
import { getAmModel } from 'src/redux/actions/AmModelList.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import AmCategorySelWOName from 'src/views/CommonSelectCode/AmCategorySelWOName'
import AmGroupSelWOName from 'src/views/CommonSelectCode/AmGroupSelWOName'
import AmManufacWOName from 'src/views/CommonSelectCode/AmManufacWOName'
import AmModelNumberSelect from 'src/views/CommonSelectCode/AmModelNumberSelect'
import AmModelSelWOName from 'src/views/CommonSelectCode/AmModelSelWOName'
import AmSubCategryWOName from 'src/views/CommonSelectCode/AmSubCategryWOName'
import AmSubGroupWOName from 'src/views/CommonSelectCode/AmSubGroupWOName'
import AmSubModelWOName from 'src/views/CommonSelectCode/AmSubModelWOName'
import TextComponent from 'src/views/Components/TextComponent'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import ItemCreateMapping from '../ItemCreation/ItemCreateMapping'
import ItemAdding from './ItemAdding'

const ItemSearch = ({ assetOrSpare, }) => {


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
    const [assetName, setAssetName] = useState('')
    const [flag, setFlag] = useState(0)
    const [selectData, setSelectData] = useState([])
    const [dataAdd, setDataAdd] = useState(0)
    const [department, setDepartment] = useState(0)
    const [deptsec, setDeptSec] = useState(0)
    const [deptName, setDeptName] = useState('')
    const [deptSecName, setDeptSecName] = useState('')
    const [custodiandept, setCustodianDept] = useState(0)
    const [custdeptName, setcustdeptname] = useState('')
    const [custodiandeptSec, setCustodianDeptSec] = useState(0)
    const [rackno, setrackNo] = useState(0)
    const [rackname, setrackName] = useState('')
    const [roomNo, setRoomNo] = useState(0)
    const [roonName, setRoomName] = useState('')
    const [subRoomNo, setSubRoomNo] = useState(0)
    const [subRoomName, setSubRoomName] = useState('')
    const [count, setCount] = useState('')
    const [itemCount, setitemCount] = useState(0)
    const [getItemcount, setgetItemcount] = useState(0)


    const reset = useCallback(() => {
        setDepartment(0)
        setDeptSec(0)
        setDeptName('')
        setDeptSecName('')
        setCustodianDept(0)
        setcustdeptname('')
        setCustodianDeptSec(0)
        setrackNo(0)
        setrackName('')
        setRoomNo(0)
        setRoomName('')
        setCount('')
        setitemCount(0)
        setgetItemcount(0)
    }, [])

    const updateAssetName = useCallback((e) => {
        setAssetName(e.target.value.toLocaleUpperCase())
    }, [])


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
            item_model_num: modelNumber !== '' ? modelNumber : null,
            asset_spare: assetOrSpare
        }
    }, [category, subcategory, group, subgroup, model, submodel, manufacture, modelNumber, assetOrSpare])

    const postByItem = useMemo(() => {
        return {
            item_name: assetName,
            asset_spare: assetOrSpare
        }
    }, [assetName, assetOrSpare])



    const search = useCallback(() => {
        const getNameSearch = async (postByItem) => {
            const result = await axioslogin.post('/itemNameCreation/getItemByName', postByItem)
            const { data, success } = result.data
            if (success === 1) {
                setItemList(data)
                setFlag(1)
            }
            else {
                infoNotify("No Asset under given condition")
                setFlag(0)
                setAssetName('')
            }
        }

        const getItemdata = async (postdata) => {
            const result = await axioslogin.post('/itemNameCreation/getItem', postdata)
            const { data, success } = result.data
            if (success === 1) {
                setItemList(data)
                setFlag(1)
            }
            else {
                setFlag(0)
                infoNotify("No Items Under Selected Condition")
                setItemList([])
            }
        }

        if (assetName) {
            getNameSearch(postByItem)
        }
        else {

            if (category !== 0 || subcategory !== 0 || group !== 0 || subgroup !== 0 || model !== 0 ||
                submodel !== 0 || manufacture !== 0 || modelNumber !== '') {
                getItemdata(postdata)

            } else {
                warningNotify("Please Select Any Options")
            }
        }


    }, [postdata, category, subcategory, group, subgroup, model, submodel, manufacture, modelNumber, postByItem, assetName])



    useEffect(() => {
        setFlag(0)
        setDataAdd(0)
    }, [category, subcategory, group, subgroup, model, submodel, manufacture, modelNumber])

    const rowSelect = useCallback((val) => {
        reset()
        setSelectData([])
        setSelectData(val);
        setDataAdd(dataAdd + 1)
        setFlag(0)

    }, [dataAdd, setDataAdd, reset, setFlag])



    return (
        <Box>
            <Box sx={{ m: 1, border: 1, p: 1, borderColor: '#D0D0D0', }}>
                <Box sx={{ flex: 1, display: 'flex', gap: 1 }}>
                    <Box sx={{ flex: 1 }}>
                        <TextComponent
                            text={"Category"}
                            sx={{ color: 'black', fontWeight: 500, pl: .5 }}>
                        </TextComponent>
                        <AmCategorySelWOName
                            category={category}
                            setCategory={setCategory}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <TextComponent
                            text={"Subcategory"}
                            sx={{ color: 'black', fontWeight: 500, pl: .5 }}>
                        </TextComponent>
                        <AmSubCategryWOName
                            subcategory={subcategory}
                            setSubcategory={setSubcategory}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <TextComponent
                            text={"Group"}
                            sx={{ color: 'black', fontWeight: 500, pl: .5 }}>
                        </TextComponent>
                        <AmGroupSelWOName
                            group={group}
                            setGroup={setGroup}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <TextComponent
                            text={"Subgroup"}
                            sx={{ color: 'black', fontWeight: 500, pl: .5 }}>
                        </TextComponent>
                        <AmSubGroupWOName
                            subgroup={subgroup}
                            setSubGroup={setSubGroup}
                        />
                    </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', gap: 1, mt: 1 }}>
                    <Box sx={{ flex: 1 }}>
                        <TextComponent
                            text={"Model"}
                            sx={{ color: 'black', fontWeight: 500, pl: .5 }}>
                        </TextComponent>
                        <AmModelSelWOName
                            model={model}
                            setModel={setModel}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <TextComponent
                            text={"Submodel"}
                            sx={{ color: 'black', fontWeight: 500, pl: .5 }}>
                        </TextComponent>
                        <AmSubModelWOName
                            submodel={submodel}
                            setSubmodel={setSubmodel}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <TextComponent
                            text={"Manufacture"}
                            sx={{ color: 'black', fontWeight: 500, pl: .5 }}>
                        </TextComponent>
                        <AmManufacWOName
                            manufacture={manufacture}
                            setManufacture={setManufacture}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <TextComponent
                            text={"Model No."}
                            sx={{ color: 'black', fontWeight: 500, pl: .5 }}>
                        </TextComponent>
                        <AmModelNumberSelect
                            modelNumber={modelNumber}
                            setModelNumber={setModelNumber}
                        />
                    </Box>
                </Box>
                <Box sx={{ flex: 1, mt: 1 }}>
                    <TextComponent
                        text={"Item Name"}
                        sx={{ color: 'black', fontWeight: 500, px: .5, }}>
                    </TextComponent>
                    <Box sx={{ flex: 1 }}>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="assetName"
                            value={assetName}
                            onchange={updateAssetName}
                        ></TextFieldCustom>
                    </Box>

                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', pt: 1 }}>
                    <Box
                        onClick={search}
                        sx={{
                            width: 150,
                            border: 1,
                            py: .1,
                            borderColor: '#5a5f63',
                            textAlign: 'center',
                            borderRadius: 1,
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 0.5,
                            bgcolor: '#8A9299',
                            fontSize: 16,
                            fontWeight: 500,
                            boxShadow: '2px 4px 6px rgba(0,0,0,0.4)',
                            '&:active': {
                                transform: 'scale(0.98)',
                                boxShadow: '1px 2px 3px rgba(0,0,0,0.3)',
                            }
                        }}
                    >
                        Search
                    </Box>
                </Box>
                {flag === 1 ? <ItemCreateMapping itemList={itemList} rowSelect={rowSelect} /> : null}
            </Box>

            {
                dataAdd !== 0 ?
                    <Box sx={{ m: 1, border: 1, p: 1, borderColor: '#D0D0D0', }}>
                        <ItemAdding selectData={selectData}
                            department={department} setDepartment={setDepartment}
                            deptsec={deptsec} setDeptSec={setDeptSec}
                            deptName={deptName} setDeptName={setDeptName}
                            deptSecName={deptSecName} setDeptSecName={setDeptSecName}
                            custodiandept={custodiandept} setCustodianDept={setCustodianDept}
                            custdeptName={custdeptName} setcustdeptname={setcustdeptname}
                            rackno={rackno} setrackNo={setrackNo}
                            rackname={rackname} setrackName={setrackName}
                            roomNo={roomNo} setRoomNo={setRoomNo}
                            roonName={roonName} setRoomName={setRoomName}
                            count={count} setCount={setCount}
                            custodiandeptSec={custodiandeptSec} setCustodianDeptSec={setCustodianDeptSec}
                            subRoomNo={subRoomNo} setSubRoomNo={setSubRoomNo}
                            subRoomName={subRoomName} setSubRoomName={setSubRoomName}
                            itemCount={itemCount} setitemCount={setitemCount}
                            getItemcount={getItemcount} setgetItemcount={setgetItemcount}



                        />
                    </Box>

                    : null
            }

        </Box >
    )
}

export default memo(ItemSearch)