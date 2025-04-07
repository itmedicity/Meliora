
import React, { memo, useEffect, useMemo, useState } from 'react'
import { Box, CssVarsProvider, Grid, } from '@mui/joy'
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { getAssetCount, getAssetValue, getCategoryDetails, getCategoryDetailsSpare, getSpareCount, getSpareValue } from 'src/api/CommonApi';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import PhotoIcon from '@mui/icons-material/Photo';
import DashBoadTile from './DashBoadTile';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FitbitIcon from '@mui/icons-material/Fitbit';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

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
            minHeight: '88vh',
            borderRadius: 1, boxShadow: 2, border: 1, borderColor: '#BDC6D9',
        }}>
            <CssVarsProvider>
                <Box sx={{ flex: 1, height: 25, m: 1, fontSize: 14, p: .5, fontWeight: 600, color: '#636b74' }}>
                    ASSET & SPARE OVERVIEW - {empdeptname}
                </Box>
                <Box sx={{ flex: 1, height: 64, mx: 1, display: 'flex', gap: .5, mb: .5 }}>
                    <Box sx={{
                        display: 'flex',
                        border: 1, borderColor: '#d0d6e5',
                        flex: 1, bgcolor: 'white', borderRadius: 5
                    }}>
                        <Box sx={{
                            width: 60, m: .5, display: 'flex', justifyContent: 'center',
                            alignItems: 'center', border: 1, borderColor: '#d0d6e5', bgcolor: '#f5fcf5'

                        }}>
                            <CurrencyRupeeIcon sx={{ width: 35, height: 35, color: 'darkgreen' }} />
                        </Box>
                        <Box sx={{ flex: 1, }}>
                            <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: .8, pt: .5 }}>
                                Total Asset Value
                            </Box>
                            <Box sx={{ fontSize: 20, fontWeight: 600, color: 'darkgreen', pt: .1 }} >
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
                    <Box sx={{
                        display: 'flex',
                        border: 1, borderColor: '#d0d6e5',
                        flex: 1, bgcolor: 'white', borderRadius: 5
                    }}>
                        <Box sx={{
                            width: 60, m: .5, display: 'flex', justifyContent: 'center',
                            alignItems: 'center', border: 1, borderColor: '#d0d6e5', bgcolor: '#fafcfe'

                        }}>
                            <FitbitIcon sx={{ width: 35, height: 35, color: '#41729F' }} />
                        </Box>
                        <Box sx={{ flex: 1, }}>
                            <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: .8, pt: .5 }}>
                                Total Asset Count
                            </Box>
                            <Box sx={{ fontSize: 20, fontWeight: 600, color: '#41729F', pt: .1, pl: 1 }} >
                                {totAssetcount}
                            </Box>
                        </Box>

                    </Box >
                    <Box sx={{
                        display: 'flex',
                        border: 1, borderColor: 'lightgrey',
                        flex: 1, bgcolor: 'white', borderRadius: 5
                    }}>
                        <Box sx={{
                            width: 60, m: .5, display: 'flex', justifyContent: 'center',
                            alignItems: 'center', border: 1, borderColor: '#d0d6e5', bgcolor: '#fef5f5'
                        }}>
                            <MiscellaneousServicesIcon sx={{ width: 35, height: 35, color: '#a31545' }} />
                        </Box>
                        <Box sx={{ flex: 1, }}>
                            <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: .8, pt: .5 }}>
                                Total Spare Count
                            </Box>
                            <Box sx={{ fontSize: 20, fontWeight: 600, color: '#a31545', pt: .1, pl: 1 }} >
                                {spareCount}
                            </Box>
                        </Box>
                    </Box >
                </Box>

                <Box sx={{ flex: 1, mx: .5, overflowY: 'auto', overflowX: 'hidden', height: '80%' }}>
                    <Box sx={{ pb: 1, px: .5 }}>
                        <Grid container spacing={0.5} sx={{ flex: 1, }}>
                            {AllCategory?.map((val) => {
                                const imageUrl = val.file_name ? `${PUBLIC_NAS_FOLDER}/AssetName/Category/${val.category_slno}/${val.file_name}` : null
                                return (
                                    <Grid xs={12} sm={12} md={6} lg={4} xl={3} key={val.category_slno}>
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
