import React, { memo } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'


const OwnerShipDetailsComp = ({ detailArry }) => {

    const { am_custodian_name } = detailArry


    // const [custodian, setCustodian] = useState('')
    // const [secondaryCustodian, setSecondaryCustodian] = useState(0)


    // useEffect(() => {
    //     const getDeptsecbsdcustodian = async (item_custodian_dept) => {
    //         const result = await axioslogin.get(`/ItemMapDetails/getdeptsecBsedonCustdept/${item_custodian_dept}`);
    //         const { success, data } = result.data
    //         if (success === 1) {

    //             const { am_custodian_deptsec_slno, sec_name } = data[0]
    //             setCustodian(sec_name.toLocaleUpperCase())
    //         }

    //     }
    //     if (exist === 0) {
    //         if (assetSpare === 1) {
    //             getDeptsecbsdcustodian(item_custodian_dept)
    //         } else {
    //             getDeptsecbsdcustodian(spare_custodian_dept)
    //         }
    //     } else {

    //     }


    // }, [assetSpare, item_custodian_dept, spare_custodian_dept])









    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            <Box sx={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            }} >
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Primary Custodian</Typography>
                    <Box>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="am_custodian_name"
                            value={am_custodian_name}
                            disabled={true}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Secondary Custodian</Typography>
                    <Box>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="am_custodian_name"
                            value={am_custodian_name}
                            disabled={true}
                        ></TextFieldCustom>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}

export default memo(OwnerShipDetailsComp)