
import React, { memo, useEffect, useMemo, useState } from 'react'
import { Box, CssVarsProvider, Grid, } from '@mui/joy'
import { useSelector } from 'react-redux';
import TextComponent from 'src/views/Components/TextComponent';
import { useQuery } from 'react-query';
import { getAssetCount, getAssetValue, getCategoryDetails, getCategoryDetailsSpare, getSpareCount, getSpareValue } from 'src/api/CommonApi';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import hosptl from '../../../assets/images/assetservice/hosp.png'
import spareimage from '../../../assets/images/assetservice/money-manag.png'
import assetimage from '../../../assets/images/assetservice/assetNW.png'
import ruppeeImage from '../../../assets/images/assetservice/rupee.png'
import PhotoIcon from '@mui/icons-material/Photo';
import DashBoadTile from './DashBoadTile';

const DashboardMainAsset = () => {
    const [categoryDetails, setcategoryDetails] = useState([])
    const [categoryDetailsSpare, setcategoryDetailsSpare] = useState([])
    const [assetTotVal, setassetTotVal] = useState(0)
    const [spareTotVal, setspareTotVal] = useState(0)
    const [totAssetcount, settotAssetcount] = useState(0)
    const [spareCount, setspareCount] = useState(0)
    const TotalAssetValue = (assetTotVal + spareTotVal)

    const empdeptname = useSelector((state) => {
        return state.LoginUserData.empdeptname
    })

    const empdept = useSelector((state) => {
        return state.LoginUserData.empdept
    })

    const postData = useMemo(() => {
        return {
            am_custodian_dept_slno: empdept
        }
    }, [empdept])

    const { data: queryDataVal } = useQuery({
        queryKey: ['getCategoryDetailsDash', postData],
        queryFn: () => getCategoryDetails(postData),
    });

    const { data: queryDataSpareVal } = useQuery({
        queryKey: ['getCategoryDetailsSpare', postData],
        queryFn: () => getCategoryDetailsSpare(postData),
    });

    const { data: assetCountDataVal } = useQuery({
        queryKey: ['getAssetCount', postData],
        queryFn: () => getAssetCount(postData),
    });

    const { data: spareCountDataVal } = useQuery({
        queryKey: ['getSpareCount', postData],
        queryFn: () => getSpareCount(postData),
    });

    const { data: assetValueVal } = useQuery({
        queryKey: ['getAssetValue', postData],
        queryFn: () => getAssetValue(postData),
    });

    const { data: spareValueVal } = useQuery({
        queryKey: ['getSpareValue', postData],
        queryFn: () => getSpareValue(postData),
    });

    const queryData = useMemo(() => queryDataVal, [queryDataVal])
    const queryDataSpare = useMemo(() => queryDataSpareVal, [queryDataSpareVal])
    const assetCountData = useMemo(() => assetCountDataVal, [assetCountDataVal])
    const spareCountData = useMemo(() => spareCountDataVal, [spareCountDataVal])
    const assetValue = useMemo(() => assetValueVal, [assetValueVal])
    const spareValue = useMemo(() => spareValueVal, [spareValueVal])

    useEffect(() => {
        if (queryData) {
            setcategoryDetails(queryData);
        } else {
            setcategoryDetails([]);
        }
    }, [queryData]);


    useEffect(() => {
        if (queryDataSpare) {
            setcategoryDetailsSpare(queryDataSpare);
        } else {
            setcategoryDetailsSpare([]);
        }
    }, [queryDataSpare]);

    useEffect(() => {
        if (assetCountData) {
            settotAssetcount(assetCountData);
        } else {
            settotAssetcount(0);
        }
    }, [assetCountData]);

    useEffect(() => {
        if (spareCountData) {
            setspareCount(spareCountData);
        } else {
            setspareCount(0);
        }
    }, [spareCountData]);

    useEffect(() => {
        if (assetValue && assetValue.length > 0) {
            const { tot_asset } = assetValue[0];
            setassetTotVal(tot_asset);
        } else {
            setassetTotVal(0);
        }
    }, [assetValue]);

    useEffect(() => {
        if (spareValue && spareValue.length > 0) {
            const { tot_spare } = spareValue[0];
            setspareTotVal(tot_spare);
        } else {
            setspareTotVal(0);
        }
    }, [spareValue]);

    const combinedArray = [...categoryDetails, ...categoryDetailsSpare];

    const AllCategory = combinedArray.filter((value, index, self) =>
        index === self.findIndex((item) => (
            item.category_slno === value.category_slno && item.category_name === value.category_name
        ))
    );
    AllCategory.sort((a, b) => a.category_name.localeCompare(b.category_name))

    return (
        <Box sx={{
            height: '88vh',
            borderRadius: 1, boxShadow: 2, border: 1, borderColor: '#BDC6D9',
            bgcolor: 'white',
        }}>
            <CssVarsProvider>
                <Box sx={{ flex: 1, textAlign: 'center', pt: 1 }}>
                    <img src={hosptl} alt='Asset' width={80} height={55} />
                    <TextComponent
                        text={`ASSET & SPARE  OVERVIEW - ${empdeptname}`}
                        sx={{ color: '#474B4F', fontWeight: 600, fontSize: 16, pt: 1 }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexGrow: 1, mt: 1, justifyContent: 'center' }}>
                    <Grid container spacing={.5} sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
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
                                    <Box sx={{ fontSize: 16, fontWeight: 700, pl: 1 }}>Total Asset Value</Box>
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
                                    <Box sx={{ fontSize: 16, fontWeight: 700 }}>Total Asset Count</Box>
                                    <Box sx={{ fontSize: 24, fontWeight: 900 }}>{totAssetcount}</Box>
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
                                    <Box sx={{ fontSize: 16, fontWeight: 700 }}>Total Spare Count</Box>
                                    <Box sx={{ fontSize: 24, fontWeight: 900 }}>{spareCount}</Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ flex: 1, mx: .5, height: '59vh', mt: .6, overflowY: 'auto', overflowX: 'hidden' }}>
                    <Box sx={{ pb: 1, }}>
                        <Grid container spacing={0.5} sx={{ flex: 1, }}>
                            {AllCategory?.map((val) => {
                                const imageUrl = val.file_name ? `${PUBLIC_NAS_FOLDER}/AssetName/Category/${val.category_slno}/${val.file_name}` : null
                                return (
                                    <Grid xs={12} sm={12} md={6} lg={3} xl={3} key={val.category_slno}>
                                        <DashBoadTile
                                            imageUrl={imageUrl}
                                            Name={val.category_name}
                                            totalCount={
                                                val.asset_item_service_0_count !== undefined || val.asset_item_service_1_count !== undefined ?
                                                    val.asset_item_service_0_count + val.asset_item_service_1_count :
                                                    val.spare_service_0_count + val.spare_service_1_count
                                            }
                                            icon={<PhotoIcon />}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </Box>

            </CssVarsProvider>
        </Box>
    )
}

export default memo(DashboardMainAsset)
