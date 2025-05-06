import { Box, CssVarsProvider, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import DataCollectDepSecSelect from 'src/views/CentralRequestManagement/ComonComponent/DataCollectionComp/DataCollectDepSecSelect'
import DataCollectDepSecSelectTmc from 'src/views/CentralRequestManagement/ComonComponent/DataCollectionComp/DataCollectDepSecSelectTmc'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import CardMaster from 'src/views/Components/CardMaster'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import DeptSectionSelect from 'src/views/CommonSelectCode/DeptSectionSelect'
import DeptSectionSelectkmc from 'src/views/CommonSelectCode/DeptSectionSelectkmc'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'

const DepartmentMaping = () => {
    const [crfdept, setCrfDept] = useState(0)
    const [crfdeptKmc, setCrfDeptKmc] = useState(0)
    const history = useHistory()

    const refreshWindow = useCallback(() => {
        // setCategory([])
    }, [])
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])


    // submit data
    const submit = useCallback(async (val) => {
        const postData = {
            dept: crfdept,
            crfdeptKmc: crfdeptKmc,
        }
        const result = await axioslogin.post('/newCRFRegister/DepartmentMapping', postData);
        const { success } = result.data
        if (success === 1) {
            succesNotify("Data Inserted Sucessfully")
            // setCount(1)
        }
        else {
            warningNotify("Something Went Wrong")
        }
    }, [crfdept, crfdeptKmc])
    return (

        <CssVarsProvider>
            <CardMaster
                title="Department Mapping KMC"
                submit={submit}
                close={backtoSetting}
                refresh={refreshWindow}
            >
                <Box sx={{}}>
                    <CustomPaperTitle heading="TMC Department" />
                </Box>
                <Box sx={{ px: 1, pt: 0.2, flex: 1.5, width: "50%", mt: 1 }}>
                    <DeptSectionSelect setValue={setCrfDept} value={crfdept} />
                </Box>
                <Box sx={{ mt: 1 }}>
                    <CustomPaperTitle heading="KMC Department" />
                </Box>
                <Box sx={{ px: 1, pt: 0.2, flex: 1.5, width: "50%", mt: 1 }}>
                    <DeptSectionSelectkmc setValue={setCrfDeptKmc} value={crfdeptKmc} />
                </Box>
            </CardMaster>
        </CssVarsProvider >
    )
}

export default memo(DepartmentMaping) 