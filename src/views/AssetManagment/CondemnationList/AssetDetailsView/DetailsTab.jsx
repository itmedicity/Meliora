import { Box, Input, Table } from '@mui/joy';
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query';
import { getallSpareUnderAsset, getSpecification } from 'src/api/AssetApis';
import TextComponent from 'src/views/Components/TextComponent';

const DetailsTab = ({ AssetDetails }) => {

    const { am_item_map_slno, asset_am_manufacture_no, asset_am_asset_old_no, spare_am_asset_old_no, spare_am_manufacture_no } = AssetDetails

    const [specificationTabledata, setspecificationTabledata] = useState([])
    const [spareDetails, setSpareDetails] = useState([])

    const { data: specificationDetailsData } = useQuery({
        queryKey: ['getAssetSpecification'],
        queryFn: () => getSpecification(am_item_map_slno),
        enabled: am_item_map_slno !== undefined,
    });
    const specificationDetails = useMemo(() => specificationDetailsData, [specificationDetailsData])
    useEffect(() => {
        setspecificationTabledata(specificationDetails || []);
    }, [specificationDetails]);

    const { data: allSpareUnderAssetData } = useQuery({
        queryKey: ['getSpareUnderAssett'],
        queryFn: () => getallSpareUnderAsset(am_item_map_slno),
    });

    const allSpareUnderAsset = useMemo(() => allSpareUnderAssetData, [allSpareUnderAssetData])

    useEffect(() => {
        setSpareDetails(allSpareUnderAsset || []);
    }, [allSpareUnderAsset]);


    return (
        <Box>
            <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2 }}>
                <TextComponent
                    text={"DETAILS"}
                    sx={{
                        flex: 1,
                        fontWeight: 500,
                        color: 'black',
                        fontSize: 15,
                    }}
                />
                <Box sx={{ flex: 1, display: 'flex' }} >
                    <Box sx={{ width: 500 }}>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={"Manufacture Slno"}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    pt: 1,
                                    width: 130

                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Input
                                    type="text"
                                    size="sm"
                                    name="asset_am_manufacture_no"
                                    value={asset_am_manufacture_no || spare_am_manufacture_no || ''}
                                    readOnly

                                />
                            </Box>

                        </Box>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={"Asset Old No."}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    pt: 1,
                                    width: 130

                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Input
                                    type="text"
                                    size="sm"
                                    name="asset_am_asset_old_no"
                                    value={asset_am_asset_old_no || spare_am_asset_old_no || ''}
                                    readOnly
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                    </Box>
                </Box>
            </Box>
            {am_item_map_slno !== undefined ?
                <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 1.8, mt: .5 }}>
                    <TextComponent
                        text={"SPECIFICATIONS"}
                        sx={{
                            fontWeight: 500,
                            color: 'black',
                            fontSize: 15,
                            py: .5
                        }}
                    />


                    {specificationTabledata.length > 0 ?
                        <Box sx={{ flex: 1, border: 1, borderColor: 'lightgrey', mr: 1.5, mb: 1 }}>
                            <Table stickyHeader size='sm' >
                                <thead>
                                    <tr>
                                        <th style={{ width: 40, align: "center", ml: 2 }}>#</th>
                                        <th style={{ flexGrow: 1, align: "center" }}>Specifications</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {specificationTabledata && specificationTabledata.map((val, index) => {
                                        return <tr
                                            key={index}
                                            sx={{
                                                maxHeight: 60,
                                                minHeight: 2,


                                            }}
                                        >
                                            <td> {index + 1}</td>
                                            <td> {val.specifications}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                        </Box>
                        : null
                    }
                </Box> : null}

            {spareDetails.length > 0 ?
                <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 1.8, mt: .5 }}>
                    <TextComponent
                        text={"SPARE PARTS"}
                        sx={{
                            fontWeight: 500,
                            color: 'black',
                            fontSize: 15,
                            py: .5
                        }}
                    />
                    <Box sx={{ flex: 1, border: 1, borderColor: 'lightgrey', mr: 1.5, mb: 1 }}>
                        <Table stickyHeader size='sm' >
                            <thead>
                                <tr>

                                    <th style={{ width: 40, align: "center", ml: 2 }}>#</th>
                                    <th style={{ width: 100, align: "center" }}>Spare Number</th>
                                    <th style={{ flexGrow: 1, align: "center" }}>Spare Name</th>


                                </tr>
                            </thead>
                            <tbody>
                                {spareDetails && spareDetails.map((val, index) => {
                                    const formattedSlno = val.spare_asset_no_only !== undefined ? val.spare_asset_no_only.toString().padStart(6, '0') : 0;
                                    return <tr
                                        key={index}
                                        sx={{
                                            maxHeight: 60,
                                            minHeight: 2,


                                        }}
                                    >
                                        <td> {index + 1}</td>
                                        <td> {val.spare_asset_no}/{formattedSlno}</td>
                                        <td>  {val.item_name}</td>

                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </Box>

                </Box>
                : null}

        </Box >
    )
}

export default memo(DetailsTab)