import { Avatar, Box, CssVarsProvider, Divider, Grid, Typography } from '@mui/joy'
import React, { memo, useMemo } from 'react'
import hosptl from '../../../assets/images/assetservice/hosp.png'
import TextComponent from 'src/views/Components/TextComponent';
import spareimage from '../../../assets/images/assetservice/money-manag.png'
import assetimage from '../../../assets/images/assetservice/assetNW.png'
import ruppeeImage from '../../../assets/images/assetservice/rupee.png'
import { getTotalCountAssetType, getTotalCountItemType, getTotAssetCount, getTotAssetValue, getTotSpareCount, getTotSpareValue } from 'src/api/CommonApi';
import { useQuery } from 'react-query';
import EquipmentIcon from '@mui/icons-material/Construction';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChairIcon from '@mui/icons-material/Chair';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BiotechIcon from '@mui/icons-material/Biotech';
import SpaIcon from '@mui/icons-material/Spa';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import HiveIcon from '@mui/icons-material/Hive';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import WebhookIcon from '@mui/icons-material/Webhook';

const DahboardMain = () => {

    const { data: totAssetVal } = useQuery({
        queryKey: ['getTotAssetValue'],
        queryFn: () => getTotAssetValue(),
    });

    const { data: totSpareVal } = useQuery({
        queryKey: ['getTotSpareValue'],
        queryFn: () => getTotSpareValue(),
    });

    const { data: totAssetCountVal } = useQuery({
        queryKey: ['getTotAssetCount'],
        queryFn: () => getTotAssetCount(),
    });

    const { data: totspareCountVal } = useQuery({
        queryKey: ['getTotSpareCount'],
        queryFn: () => getTotSpareCount(),
    });

    const { data: itemTypeVal = [] } = useQuery({
        queryKey: ['getTotalCountItemType'],
        queryFn: () => getTotalCountItemType(),
    })
    const { data: assetTypeVal = [] } = useQuery({
        queryKey: ['getTotalCountAssetType'],
        queryFn: () => getTotalCountAssetType(),
    })

    const totAssetValue = useMemo(() => totAssetVal, [totAssetVal])
    const totSpareValue = useMemo(() => totSpareVal, [totSpareVal])
    const totAssetCount = useMemo(() => totAssetCountVal, [totAssetCountVal])
    const totspareCount = useMemo(() => totspareCountVal, [totspareCountVal])
    const itemType = useMemo(() => itemTypeVal, [itemTypeVal])
    const assetType = useMemo(() => assetTypeVal, [assetTypeVal])
    const spareCount = totspareCount?.[0]?.spare_count || 0;
    const assetTotVal = totAssetValue?.[0]?.tot_asset || 0;
    const spareTotVal = totSpareValue?.[0]?.tot_spare || 0;
    const TotalAssetValue = (assetTotVal + spareTotVal)
    const assetcount = totAssetCount?.[0]?.asset_count || 0;

    const iconMap = {
        1: < KeyboardHideIcon />,
        2: <EquipmentIcon />,
        3: <LayersOutlinedIcon />,
        4: <MenuBookIcon />,
        5: <ChairIcon />,
        6: <CheckroomIcon />,
        7: <BiotechIcon />,
        8: <WebhookIcon />
    };

    const AssetTypeIcon = {
        1: <StarHalfIcon />,
        2: <HiveIcon />,
        3: <MiscellaneousServicesIcon />
    }

    return (
        <Box sx={{
            height: '88vh',
            borderRadius: 1, boxShadow: 2, border: 1, borderColor: '#BDC6D9',
            bgcolor: 'white',
        }}>
            <CssVarsProvider>
                <Box sx={{ flex: 1, textAlign: 'center', pt: .5 }}>
                    <img src={hosptl} alt='Asset' width={80} height={55} />
                    <TextComponent
                        text="ASSET & SPARE  OVERVIEW"
                        sx={{ color: '#474B4F', fontWeight: 600, fontSize: 16, pt: 1 }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexGrow: 1, mt: 1, justifyContent: 'center' }}>
                    <Grid container spacing={1} sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                        <Grid xs={12} sm={12} md={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    border: 2,
                                    borderColor: '#b0bec5',
                                    flexGrow: 2,
                                    height: 100,
                                    borderRadius: 12,
                                    p: 2,
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    boxShadow: 2,
                                    bgcolor: '#fff',
                                    transition: '0.3s',
                                    '&:hover': {
                                        boxShadow: 4,
                                        borderColor: '#e0e0e0'
                                    }
                                }}
                            >
                                <Box sx={{ bgcolor: 'transparent' }}>
                                    <img src={ruppeeImage} alt='Asset' width={80} height={70} />
                                </Box>
                                <Box sx={{ mr: 1.5 }}>
                                    <Box sx={{ fontSize: 16, fontWeight: 700, pl: 1, color: '#455a64' }}>Total Asset Value</Box>
                                    <Box sx={{ fontSize: 24, fontWeight: 900 }}>
                                        {new Intl.NumberFormat('en-IN', {
                                            style: 'currency',
                                            currency: 'INR',
                                            currencyDisplay: 'code'
                                        })
                                            .format(TotalAssetValue)
                                            .replace('INR', '')}
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} >
                            <Box
                                sx={{
                                    display: 'flex',
                                    border: 2,
                                    borderColor: '#b0bec5',
                                    flexGrow: 1,
                                    height: 100,
                                    borderRadius: 12,
                                    p: 2,
                                    alignItems: 'center',
                                    boxShadow: 2,
                                    bgcolor: '#fff',
                                    transition: '0.3s',
                                    '&:hover': {
                                        boxShadow: 4,
                                        borderColor: '#e0e0e0'
                                    }
                                }}
                            >
                                <Box sx={{ bgcolor: 'transparent' }}>
                                    <img src={assetimage} alt='Asset' width={80} height={70} />
                                </Box>
                                <Box sx={{ mx: 1 }}>
                                    <Box sx={{ fontSize: 16, fontWeight: 700, color: '#455a64' }}>Total Asset Count</Box>
                                    <Box sx={{ fontSize: 24, fontWeight: 900 }}>{assetcount}</Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} >
                            <Box
                                sx={{
                                    display: 'flex',
                                    border: 2,
                                    borderColor: '#b0bec5',
                                    flexGrow: 1,
                                    height: 100,
                                    borderRadius: 12,
                                    p: 2,
                                    alignItems: 'center',
                                    boxShadow: 2,
                                    bgcolor: '#fff',
                                    transition: '0.3s',
                                    '&:hover': {
                                        boxShadow: 4,
                                        borderColor: '#e0e0e0'
                                    }
                                }}
                            >
                                <Box sx={{ bgcolor: 'transparent' }}>
                                    <img src={spareimage} alt='Spare' width={80} height={70} />
                                </Box>
                                <Box sx={{ mx: 1 }}>
                                    <Box sx={{ fontSize: 16, fontWeight: 700, color: '#455a64' }}>Total Spare Count</Box>
                                    <Box sx={{ fontSize: 24, fontWeight: 900 }}>{spareCount}</Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    sx={{ height: '59vh', overflow: 'auto', mt: 1.5 }}
                >
                    <Box sx={{
                        m: .5,
                        px: 1
                    }}>
                        <TextComponent
                            text="Asset type"
                            sx={{ color: '#6C7074', fontWeight: 600, fontSize: 16, pl: 1, }}
                        />
                        <Box sx={{ display: 'grid', flexGrow: 1, }}>
                            <Grid container spacing={.5} sx={{ flexWrap: { xs: 'wrap', md: 'wrap', lg: 'wrap' } }}>
                                {assetType?.map((val) => (
                                    <Grid xs={12} sm={12} md={6} lg={3} xl={3} key={val.asset_type_slno}>

                                        <Box sx={{
                                            display: 'flex',
                                            border: 1,
                                            borderColor: '#e0e0e0',
                                            flex: 1,
                                            flexDirection: 'column',
                                            height: 100,
                                            borderRadius: 12,
                                            p: 0.5,
                                            alignItems: 'center',
                                            boxShadow: 2,
                                            background: 'linear-gradient(90deg, #6A6E72, #8A8E92, #B0B3B6)',
                                            transition: '0.3s',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                                                borderColor: '#b0bec5'
                                            },
                                            overflow: 'hidden'
                                        }}>
                                            <Box
                                                sx={{ display: 'flex', width: `calc(100% - 5px)`, height: 65, justifyContent: 'space-between' }}
                                            >
                                                <Box sx={{ width: `calc(100% - 5px)`, flexDirection: 'column', display: 'flex', pl: 1, justifyContent: 'space-evenly', transition: 'all 0.5s ease' }}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.875rem',
                                                            lineHeight: 1.5,
                                                            textTransform: 'capitalize',
                                                            fontWeight: 400,
                                                            opacity: 0.6,
                                                            color: 'black',
                                                            transition: 'all 0.5s ease'
                                                        }}
                                                    >Assets</Typography>
                                                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'white' }}>
                                                        {val.asset_item_service_0_count + val.asset_item_service_1_count}
                                                    </Typography>

                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 1, }} >
                                                    <Avatar size='lg'
                                                        alt='pics' sx={{ bgcolor: 'white', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)' }}
                                                    >
                                                        {AssetTypeIcon[val.asset_type_slno] || <BubbleChartIcon />}

                                                    </Avatar>
                                                </Box>
                                            </Box>
                                            <Divider sx={{ backgroundColor: '#4F5255', height: 2 }} />
                                            <Box sx={{ display: 'flex', width: `calc(100% - 5px)`, alignItems: 'center', height: 35, pl: 1 }}>
                                                <Typography
                                                    level='title-sm'
                                                    sx={{
                                                        color: 'white',
                                                        opacity: 0.8,
                                                        transition: 'all 0.5s ease'
                                                    }}
                                                    fontFamily={'inherit'}
                                                    fontWeight={600}
                                                    fontSize={'.875rem'}
                                                    lineHeight={1.5}
                                                >{val.asset_type_name}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                    <Box sx={{
                        m: .5,
                        px: 1,
                    }}>
                        <TextComponent
                            text="Item type"
                            sx={{ color: 'grey', fontWeight: 600, fontSize: 16, pl: 1, pt: .5 }}
                        />
                        <Box sx={{ display: 'grid', flexGrow: 1, }}>
                            <Grid container spacing={.5} sx={{ flexWrap: { xs: 'wrap', md: 'wrap', lg: 'wrap' } }}>
                                {itemType?.map((val) => (
                                    <Grid xs={12} sm={12} md={6} lg={3} xl={3} key={val.item_type_slno}>

                                        <Box sx={{
                                            display: 'flex',
                                            border: 1,
                                            borderColor: '#e0e0e0',
                                            flex: 1,
                                            flexDirection: 'column',
                                            height: 100,
                                            borderRadius: 12,
                                            p: 0.5,
                                            alignItems: 'center',
                                            boxShadow: 2,
                                            background: 'linear-gradient(90deg, #6A6E72, #8A8E92, #B0B3B6)',
                                            transition: '0.3s',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                                                borderColor: '#b0bec5'
                                            },
                                            overflow: 'hidden'
                                        }}>
                                            <Box
                                                sx={{ display: 'flex', width: `calc(100% - 5px)`, height: 65, justifyContent: 'space-between' }}
                                            >
                                                <Box sx={{ width: `calc(100% - 5px)`, flexDirection: 'column', display: 'flex', pl: 1, justifyContent: 'space-evenly', transition: 'all 0.5s ease' }}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.875rem',
                                                            lineHeight: 1.5,
                                                            textTransform: 'capitalize',
                                                            fontWeight: 400,
                                                            opacity: 0.6,
                                                            color: 'black',
                                                            transition: 'all 0.5s ease'
                                                        }}
                                                    >Assets</Typography>
                                                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'white' }}>
                                                        {val.asset_item_service_0_count + val.asset_item_service_1_count}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 1, }} >
                                                    <Avatar size='lg'
                                                        alt='pics' sx={{ bgcolor: 'white', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)' }}
                                                    >
                                                        {iconMap[val.item_type_slno] || <SpaIcon />}

                                                    </Avatar>
                                                </Box>
                                            </Box>
                                            <Divider sx={{ backgroundColor: '#4F5255', height: 2 }} />
                                            <Box sx={{ display: 'flex', width: `calc(100% - 5px)`, alignItems: 'center', height: 35, pl: 1 }}>
                                                <Typography
                                                    level='title-sm'
                                                    sx={{
                                                        color: 'white',
                                                        opacity: 0.8,
                                                        transition: 'all 0.5s ease'
                                                    }}
                                                    fontFamily={'inherit'}
                                                    fontWeight={600}
                                                    fontSize={'.875rem'}
                                                    lineHeight={1.5}
                                                >{val.item_type_name}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </CssVarsProvider >
        </Box >
    )
}

export default memo(DahboardMain)

