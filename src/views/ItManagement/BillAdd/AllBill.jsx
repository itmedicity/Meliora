import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, CssVarsProvider } from '@mui/joy'
import { Paper } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit';
import EditBillModal from './EditBillModal';

const AllBill = ({ billCount, setbillCount }) => {

    const [allBillData, setallBillData] = useState([])
    const [editModalOpen, seteditModalOpen] = useState(false)
    const [editModalFlag, seteditModalFlag] = useState(0)
    const [billData, setBillData] = useState([])

    const EditModal = useCallback((value) => {
        setBillData(value)
        seteditModalFlag(1)
        seteditModalOpen(true)
    }, [])

    useEffect(() => {
        const getAllBills = async () => {
            const result = await axioslogin.get('/ItBillAdd/allBillView');
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const arry = data?.map((val) => {
                        const obj = {
                            bill_add_slno: val.bill_add_slno,
                            bill_category: val.bill_category,
                            bill_tariff: val.bill_tariff,
                            bill_name: val.bill_name,
                            it_bill_category_name: val.it_bill_category_name,
                            it_sim_type_name: val.it_sim_type_name,
                            bill_cug_status: val.bill_cug_status,
                            bill_cug_simtype: val.bill_cug_simtype,
                        }
                        return obj
                    })
                    setallBillData(arry)
                } else {
                    setallBillData([])
                }
            }
        }
        getAllBills()
    }, [billCount])

    return (
        <Box>
            <CssVarsProvider>
                {editModalFlag === 1 ? <EditBillModal openEditModal={editModalOpen} billData={billData}
                    seteditModalFlag={seteditModalFlag} seteditModalOpen={seteditModalOpen} billCount={billCount} setbillCount={setbillCount}
                /> : null}
            </CssVarsProvider>
            <Box sx={{ flex: 1, display: 'flex', bgcolor: '#868B8E', height: 30, pt: .5 }}>
                <Box sx={{ flex: .5, fontWeight: 600, color: 'white', pl: 3 }}>#</Box>
                <Box sx={{ flex: 1.2, fontWeight: 600, color: 'white' }}>Category</Box>
                <Box sx={{ flex: 5, fontWeight: 600, color: 'white' }}>Bill Name</Box>
                <Box sx={{ flex: 1, fontWeight: 600, color: 'white' }}>Sim Type</Box>
                <Box sx={{ flex: .6, fontWeight: 600, color: 'white' }}>Tariff</Box>
            </Box>
            <Box sx={{ maxHeight: '63vh', overflow: 'auto', flex: 1 }}>
                {
                    allBillData && allBillData.map((val) => {
                        return <Paper key={val.bill_add_slno}
                            sx={{ flex: 1, minHeight: 33, maxHeight: 100, bgcolor: '#E4E5E8', borderRadius: 0, display: 'flex', mt: .5, color: 'black', }}>
                            <Box sx={{
                                flex: .5,
                                p: .5, cursor: 'pointer', mx: 1
                            }}><EditIcon sx={{ height: 20, }}
                                onClick={() => EditModal(val)}
                                />
                            </Box>
                            <Box sx={{ flex: 1.2, pt: .5 }}>
                                {val.it_bill_category_name}
                            </Box>
                            <Box sx={{ flex: 5, pt: .5 }}>
                                {val.bill_name}
                            </Box>

                            <Box sx={{ flex: 1, pt: .5, }}>
                                {val.it_sim_type_name}
                            </Box>
                            <Box sx={{ flex: .6, pt: .5, pr: .3 }}>
                                {val.bill_tariff === 0 ? 'not given' : val.bill_tariff === 1 ? 'Monthly' :
                                    val.bill_tariff === 2 ? 'Quaterly' : val.bill_tariff === 3 ? 'Yearly' : val.bill_tariff === 4 ? 'Others' :
                                        'not given'}
                            </Box>
                        </Paper>
                    })
                }
            </Box >
        </Box>
    )
}

export default memo(AllBill)