import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { axioslogin } from 'src/views/Axios/Axios'
import GRNDeailtsComp from './GRNDeailtsComp'
import DEviceDetailsComp from './DEviceDetailsComp'
import OwnerShipDetailsComp from './OwnerShipDetailsComp'
import WarrentyGrauntyComp from './WarrentyGrauntyComp'
import SpecDetailsComp from './SpecDetailsComp'
import BillDetailsAdding from './BillDetailsAdding'
import AMCCMCDetailAdding from './AMCCMCDetailAdding'
import LeaseDetailsAdd from './LeaseDetailsAdd'

const ItemDetailEnterMain = ({ detailArry, setDetailflag, assetSpare, setRender, render }) => {
    const { am_item_map_slno, am_spare_item_map_slno } = detailArry
    const [exist, setExist] = useState(0)
    const [grndetailarry, setGrnDetailArry] = useState({})
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
        const checkinsertOrNotDetailSpare = async (am_spare_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNotSpare/${am_spare_item_map_slno}`);
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
        if (assetSpare === 1) {
            checkinsertOrNotDetail(am_item_map_slno)
            checkinsertOrNotAMCPM(am_item_map_slno)
        }
        else {
            checkinsertOrNotDetailSpare(am_spare_item_map_slno)
        }
    }, [am_item_map_slno, assetSpare, am_spare_item_map_slno, setAmcPmArry, setGrnDetailArry,])


    const BackToPage = useCallback(() => {
        setDetailflag(0)
    }, [setDetailflag])

    return (
        <CardMasterClose
            title="Asset Details Add"
            close={BackToPage}
        >
            <Paper sx={{ display: 'flex', flex: 1, width: '100%' }}>
                <Box sx={{
                    display: 'flex', flex: 1, flexDirection: 'column',
                }} >
                    {/* GRN Detail */}
                    <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                        GRN Details</Typography>
                    <GRNDeailtsComp detailArry={detailArry} assetSpare={assetSpare}
                        grndetailarry={grndetailarry} exist={exist} setExist={setExist} />
                    {/* Bill Details */}
                    <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                        Bill Details</Typography>
                    <BillDetailsAdding detailArry={detailArry} assetSpare={assetSpare}
                        grndetailarry={grndetailarry} />
                    {/* Device Details */}
                    <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                        Device Details</Typography>
                    <DEviceDetailsComp detailArry={detailArry} assetSpare={assetSpare}
                        grndetailarry={grndetailarry} exist={exist} setExist={setExist} />
                    {/*  OwnerShip Details */}
                    <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                        OwnerShip Details</Typography>
                    <OwnerShipDetailsComp detailArry={detailArry} assetSpare={assetSpare}
                        grndetailarry={grndetailarry} exist={exist} setExist={setExist} />
                    {
                        assetSpare === 1 ?
                            <Box>
                                <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                                    Lease Details</Typography>
                                <LeaseDetailsAdd grndetailarry={grndetailarry} />
                            </Box> : null
                    }
                    <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                        Warranty/Guarantee Details</Typography>
                    <WarrentyGrauntyComp detailArry={detailArry}
                        assetSpare={assetSpare} />
                    {
                        assetSpare === 1 ?
                            <Box>
                                <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                                    AMC/PM  Details</Typography>
                                <AMCCMCDetailAdding detailArry={detailArry} amcPmarry={amcPmarry} assetSpare={assetSpare}
                                    amcPm={amcPm} setAmcPm={setAmcPm} setRender={setRender} render={render} />
                            </Box>
                            : null
                    }
                    <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                        Specification  Details</Typography>
                    <SpecDetailsComp detailArry={detailArry} assetSpare={assetSpare} />
                </Box>
            </Paper>
        </CardMasterClose>
    )
}

export default memo(ItemDetailEnterMain)