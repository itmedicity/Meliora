import { Box, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import { axioslogin } from 'src/views/Axios/Axios'
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import ServiceDetailsModal from './ServiceDetailsModal'
import CircleIcon from '@mui/icons-material/Circle';

const SpareSErviceList = () => {
    const [serviceList, setServiceList] = useState([])
    const [flag, setFlag] = useState(1)
    const [open, setOpen] = useState(false)
    const [serviceDetails, setserviceDetails] = useState([])
    const [assetServiceListt, setassetServiceListt] = useState([])
    const [count, setCount] = useState(0)
    const combinedList = [...serviceList, ...assetServiceListt];

    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    const ServiceDetailsView = useCallback((val) => {
        setFlag(1)
        setOpen(true)
        setserviceDetails(val)
    }, [])

    useEffect(() => {
        const getServiceList = async (empsecid) => {
            const result = await axioslogin.get(`/SpareCondemService/ServiceList/${empsecid}`)
            const { success, data } = result.data
            if (success === 1) {
                setServiceList(data)
            }
            else {
                setServiceList([])
            }
        }
        getServiceList(empsecid)
    }, [empsecid, count])

    useEffect(() => {
        const getAssetServiceList = async (empsecid) => {
            const result = await axioslogin.get(`/SpareCondemService/AssetServiceList/${empsecid}`)
            const { success, data } = result.data
            if (success === 1) {
                setassetServiceListt(data)
            }
            else {
                setassetServiceListt([])
            }
        }
        getAssetServiceList(empsecid)
    }, [empsecid, count])

    const uniqueHoldReasons = [...new Map(
        [
            ...serviceList
                .map(item => ({ holdId: item.spare_service_hold, reason: item.cm_hold_reason, holdColor: item.hold_color }))
                .filter(item => item.holdId && item.reason && item.holdColor),
            ...assetServiceListt
                .map(item => ({ holdId: item.asset_item_service_hold, reason: item.cm_hold_reason, holdColor: item.hold_color }))
                .filter(item => item.holdId && item.reason && item.holdColor)
        ]
            .map(item => [item.holdId, item])
    ).values()];

    return (
        <Box sx={{
            flex: 1,
            border: 2, borderColor: '#F0F3F5',
            height: '85vh',
        }}>
            <Box sx={{ flex: 1, height: 28, bgcolor: '#F0F3F5', color: 'grey', fontWeight: 550, py: .5, pl: 2 }}>
                Service List
            </Box>
            {flag === 1 ?
                <ServiceDetailsModal open={open} setOpen={setOpen}
                    setFlag={setFlag}
                    serviceDetails={serviceDetails} setCount={setCount} count={count} />
                : null}
            {combinedList.length !== 0 ?
                <Box sx={{ flex: 1, overflow: 'auto', p: 1, }}>

                    <Box sx={{
                        height: 45, mt: .5, display: 'flex', borderBottom: 1, borderTop: 1, borderColor: 'lightgray', pt: 1,
                        bgcolor: 'white'
                    }}>
                        <Box sx={{ width: 55, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 13, }}>#</Box>
                        <Box sx={{ width: 50, color: '#444444', fontSize: 13 }}>Action</Box>
                        <Box sx={{ width: 90, fontWeight: 600, color: '#444444', fontSize: 13 }}>Asset/Spare</Box>
                        <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 13, }}>Asset/Spare No.</Box>
                        <Box sx={{ flex: 1, fontWeight: 600, color: '#444444', fontSize: 13, }}>Category</Box>
                        <Box sx={{ flex: 2, fontWeight: 600, color: '#444444', fontSize: 12, }}>Item Name</Box>
                        <Box sx={{ width: 180, fontWeight: 600, color: '#444444', fontSize: 13, pl: 1.5 }}>Transfered Employee</Box>
                    </Box>
                    <Box sx={{ width: '100%', overflow: 'auto', }}>
                        <Box sx={{ width: '100%' }}>
                            <Virtuoso
                                style={{ height: '75vh' }}
                                totalCount={combinedList.length}
                                itemContent={(index) => {
                                    const val = combinedList[index];
                                    const isServiceItem = index < serviceList.length;
                                    return (
                                        <Box
                                            key={val.slno}
                                            sx={{
                                                flex: 1,
                                                display: 'flex',
                                                mt: .3,
                                                borderBottom: .5,
                                                borderColor: 'lightgrey',
                                                minHeight: 30,
                                                maxHeight: 80,
                                                background: (val.hold_color),
                                                pt: .5,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Box sx={{ width: 55, pl: 1.7, color: '#444444', fontSize: 14 }}>
                                                {index + 1}
                                            </Box>
                                            <Box sx={{ width: 50, color: '#444444', fontSize: 14 }}>
                                                <BuildCircleIcon sx={{ color: '#4C5270', cursor: 'pointer' }} onClick={() => ServiceDetailsView(val)} />
                                            </Box>
                                            <Box sx={{ width: 90, color: '#444444', fontSize: 14 }}>
                                                {val.spare_asset_no !== undefined ? 'Spare' : 'Asset'}
                                            </Box>
                                            <Box sx={{ width: 150, color: '#444444', fontSize: 14 }}>
                                                {isServiceItem
                                                    ? `${val.spare_asset_no}/${val.spare_asset_no_only.toString().padStart(6, '0')}`
                                                    : `${val.item_asset_no}/${val.item_asset_no_only.toString().padStart(6, '0')}`}
                                            </Box>
                                            <Box sx={{ flex: 1, color: '#444444', fontSize: 14 }}>
                                                {val.category_name}
                                            </Box>
                                            <Box sx={{ flex: 2, color: '#444444', fontSize: 14, }}>
                                                {val.item_name}
                                            </Box>
                                            <Box sx={{ width: 180, color: '#444444', fontSize: 14, pl: 1.5 }}>
                                                {val.em_name}
                                            </Box>

                                        </Box>
                                    );
                                }} />
                        </Box>
                    </Box>

                </Box>
                :
                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    pt: 25,
                    fontWeight: 800,
                    fontSize: 25,
                    color: 'lightgrey',
                    height: '100%'
                }}>
                    <Typography>
                        Empty Service List
                    </Typography>
                </Box>}
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', }}>
                {
                    uniqueHoldReasons.map(({ holdId, reason, holdColor }) => (
                        <Box key={holdId} sx={{ display: 'flex', alignItems: 'center', mr: 2, my: 1 }}>
                            <CircleIcon sx={{ color: (holdColor), fontSize: 18, mr: .5, border: 1, }} />
                            <Box sx={{ fontSize: 15, color: '#444444', fontWeight: 600 }}>{reason}</Box>
                        </Box>
                    ))
                }
            </Box >

        </Box >
    )
}

export default memo(SpareSErviceList)

