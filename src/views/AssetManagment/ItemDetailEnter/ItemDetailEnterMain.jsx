import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { axioslogin } from 'src/views/Axios/Axios'
import GRNDeailtsComp from './GRNDeailtsComp'
import BillDetailsComp from './BillDetailsComp'
import DEviceDetailsComp from './DEviceDetailsComp'
import OwnerShipDetailsComp from './OwnerShipDetailsComp'
import WarrentyGrauntyComp from './WarrentyGrauntyComp'
import AMCPMComp from './AMCPMComp'
import LeaseDetails from './LeaseDetails'

const ItemDetailEnterMain = ({ detailArry, setDetailflag }) => {

    const { am_item_map_slno } = detailArry
    const [exist, setExist] = useState(0)
    const [grndetailarry, setGrnDetailArry] = useState({})
    const [wargar, setWarGar] = useState(0)
    const [warGararry, setwarGarArry] = useState({})
    const [amcPm, setAmcPm] = useState(0)
    const [amcPmarry, setAmcPmArry] = useState({})
    useEffect(() => {
        const checkinsertOrNotDetail = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                setExist(1)
                setGrnDetailArry(data[0])
            }
            else {
                setExist(0)
                setGrnDetailArry([])
            }
        }

        const checkinsertOrNotWarGar = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                setWarGar(1)
                setwarGarArry(data[0])
            }
            else {
                setWarGar(0)
                setwarGarArry([])
            }
        }

        const checkinsertOrNotAMCPM = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/AmcPmInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                setAmcPm(1)
                setAmcPmArry(data[0])
            }
            else {
                setAmcPm(0)
                setAmcPmArry([])
            }
        }

        checkinsertOrNotDetail(am_item_map_slno)
        checkinsertOrNotWarGar(am_item_map_slno)
        checkinsertOrNotAMCPM(am_item_map_slno)
    }, [am_item_map_slno])


    const BackToPage = useCallback(() => {
        setDetailflag(0)
    }, [setDetailflag])

    return (
        <Box sx={{
            display: 'flex', flexGrow: 1, width: '100%', height: window.innerHeight - 85,
        }}>
            <CardMasterClose
                title="Item Details Add"
                close={BackToPage}
            >
                <Paper sx={{ width: '100%', overflow: 'auto', height: 775 }}>
                    <Box sx={{
                        display: 'flex', flexDirection: 'column',
                    }} >
                        {/* GRN Detail */}
                        <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                            GRN Details</Typography>
                        <GRNDeailtsComp detailArry={detailArry}
                            grndetailarry={grndetailarry} exist={exist} setExist={setExist} />
                        {/* Bill Details */}
                        <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                            Bill Details</Typography>
                        <BillDetailsComp detailArry={detailArry}
                            grndetailarry={grndetailarry} exist={exist} setExist={setExist} />

                        {/* Device Details */}
                        <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                            Device Details</Typography>
                        <DEviceDetailsComp detailArry={detailArry}
                            grndetailarry={grndetailarry} exist={exist} setExist={setExist} />

                        {/*  OwnerShip Details */}
                        <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                            OwnerShip Details</Typography>
                        <OwnerShipDetailsComp detailArry={detailArry}
                            grndetailarry={grndetailarry} exist={exist} setExist={setExist} />

                        {/*  Lease Details */}
                        <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                            Lease Details</Typography>
                        <LeaseDetails detailArry={detailArry}
                            grndetailarry={grndetailarry} exist={exist} setExist={setExist} />
                        {/*  Warrenty/ Grarunty Details */}
                        <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                            Warrenty/Grarunty  Details</Typography>
                        <WarrentyGrauntyComp detailArry={detailArry} warGararry={warGararry}
                            wargar={wargar} setWarGar={setWarGar} />

                        {/*  AMC/PM Details */}
                        <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                            AMC/PM  Details</Typography>

                        <AMCPMComp detailArry={detailArry} amcPmarry={amcPmarry}
                            amcPm={amcPm} setAmcPm={setAmcPm} />
                    </Box>
                </Paper>
            </CardMasterClose>

        </Box>

    )
}

export default memo(ItemDetailEnterMain)