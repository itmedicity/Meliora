import { Box } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
// import CRFCategoryTypeSelect from '../Components/CRFCategoryTypeSelect';
import CRFCategoryTypeSelect from '../../../../views/CentralRequestManagement/CRFRequestMaster/Components/CRFCategoryTypeSelect';
import AssetItemSelect from 'src/views/CommonSelectCode/AssetItemSelect'
import { useDispatch } from 'react-redux'
import { getAmItemType } from 'src/redux/actions/AmItemTypeList.actions'
import CardMasterJoy from 'src/views/Components/CardMasterJoy'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'

const ViewCategoryMaster = () => {
    const history = useHistory()
    const [catFlag, setcatFlag] = useState(0)
    const [UpdateFlag, setUpdateFlag] = useState(0)

    const [itemName, setItemName] = useState('')
    const dispatch = useDispatch();
    const [category, setCategory] = useState([])
    const [editRowData, setEditRowData] = useState({})



    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(getAmItemType()); // Ensure this dispatch is correct and handled
                const result = await axioslogin.post('/newCRFRegister/CommonMasterGet');
                const { success, data } = result.data;
                if (success === 1 && data.length > 0) {
                    setEditRowData(data[0]);
                    setUpdateFlag(1)
                } else {
                    setEditRowData([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const refreshWindow = useCallback(() => {
        // setCategory([])
    }, [])
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    const submitComapnyName = useCallback(async (val) => {
        const postData = {
            category: category,
            id: editRowData?.common_master_slno
        }
        if (UpdateFlag === 1) {
            const result = await axioslogin.post('/newCRFRegister/CommonMasterUpdate/update', postData);
            const { success } = result.data
            if (success === 1) {
                succesNotify("Data Updated Sucessfully")
            }
            else {
                warningNotify("Something Went Wrong")

            }
        } else {
            const result = await axioslogin.post('/newCRFRegister/CommonMaster', postData);
            const { success } = result.data
            if (success === 1) {
                succesNotify("Data Inserted Sucessfully")
            }
            else {
                warningNotify("Something Went Wrong")

            }
        }
    }, [category, UpdateFlag, editRowData])

    return (
        <CardMasterJoy
            title="Common Setting CRF"
            submit={submitComapnyName}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
                <Box sx={{ width: '50%', }}>

                    <Box sx={{
                        mt: 0.2, overflow: 'auto', border: '1px solid lightgrey',

                    }} >
                        <CRFCategoryTypeSelect category={category} setCategory={setCategory} editRowData={editRowData}
                            catFlag={catFlag} />
                    </Box>
                </Box>

            </Box>
        </CardMasterJoy>)
}

export default memo(ViewCategoryMaster)