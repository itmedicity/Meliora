import { Box } from '@mui/material'
import React, { useCallback, memo, useState, useEffect, Fragment, useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { useHistory } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import InterDeptTransModal from './InterDeptTransModal'


const InterDeptTransfer = () => {
    const history = useHistory();
    const [tabledata, setTabledata] = useState([])
    const deptsec = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)
    const empdept = useSelector((state) => state.LoginUserData.empdept, _.isEqual)




    const [column] = useState([
        { headerName: "Sl No", field: "slno", minWidth: 80, wrapText: true },
        { headerName: "Category", field: "category_name", minWidth: 180, wrapText: true, filter: "true" },
        { headerName: "Item Name", field: "item_name", autoHeight: true, wrapText: true, minWidth: 350, filter: "true" },
        { headerName: "Asset No", field: "assetno", minWidth: 250, wrapText: true, filter: "true" },
        { headerName: "Room No", field: "rm_room_name", minWidth: 250, wrapText: true, filter: "true" },
        { headerName: "Sub Room No", field: "subroom_name", minWidth: 150, wrapText: true, filter: "true" },
        { headerName: "Serial No", field: "am_manufacture_no", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },

        {
            headerName: 'Transfer', minWidth: 120, cellRenderer: params => <Fragment>
                <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                    onClick={() => TransferLocation(params)}
                >
                    <CustomeToolTip title="Transfer Location" >
                        < ChangeCircleIcon />
                    </CustomeToolTip>
                </IconButton>
            </Fragment>
        },


    ])

    const postdatagetItem = useMemo(() => {
        return {
            item_dept_slno: empdept,
            item_deptsec_slno: deptsec
        }
    }, [deptsec, empdept])

    useEffect(() => {
        const getDepartmentAsset = async () => {
            const result = await axioslogin.post(`/assetInternalTrans/getdataForInternalTrans`, postdatagetItem);
            const { success, data } = result.data
            if (success === 1) {
                const dispalyData = data && data.map((val, index) => {
                    const obj = {
                        slno: index + 1,
                        item_creation_slno: val.item_creation_slno,
                        am_item_map_slno: val.am_item_map_slno,
                        deptname: val.deptname,
                        secname: val.secname,
                        item_name: val.item_name,
                        item_asset_no: val.item_asset_no,
                        category_name: val.category_name,
                        item_asset_no_only: val.item_asset_no_only,
                        rm_room_name: val.rm_room_name !== null ? val.rm_room_name : "Not Given",
                        subroom_name: val.subroom_name !== null ? val.subroom_name : "Not Given",
                        assetno: val.item_asset_no + '/' + val.item_asset_no_only.toString().padStart(6, '0'),
                        am_manufacture_no: val.am_manufacture_no !== null
                            || val.am_manufacture_no !== '' ? val.am_manufacture_no : "Not Given"
                    }
                    return obj
                })
                setTabledata(dispalyData)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getDepartmentAsset();

    }, [postdatagetItem])

    const [transFlag, setTransFlag] = useState(0)
    const [transFlagModal, setTransFlagModal] = useState(false)
    const [transFlagData, setTransFlagData] = useState([])

    const TransferLocation = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setTransFlagModal(true)
        setTransFlag(1)
        setTransFlagData(data)
    }, [])


    const backToSetting = useCallback(() => {
        history.push(`/Home`)
    }, [history])


    return (

        <CardCloseOnly
            title='Asset Internal Transfer'
            close={backToSetting}
        >
            {transFlag === 1 ? <InterDeptTransModal open={transFlagModal} setOpen={setTransFlagModal}
                transFlagData={transFlagData} deptsec={deptsec} /> : null}
            <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={tabledata}
                />
            </Box>
        </CardCloseOnly>
    )
}

export default memo(InterDeptTransfer)