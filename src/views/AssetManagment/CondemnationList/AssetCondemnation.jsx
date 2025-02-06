import { Box } from '@mui/joy';
import React, { memo, useMemo } from 'react'
import { useQuery } from 'react-query';
import { Virtuoso } from 'react-virtuoso';
import { getAssetUnderCondmnation } from 'src/api/AssetApis';

const AssetCondemnation = ({ empdept }) => {

    const { data: AsssetCodmnation, } = useQuery({
        queryKey: ['getAssetUnderCondmnation', empdept],
        queryFn: () => getAssetUnderCondmnation(empdept),
    });

    const AsssetCodm = useMemo(() => AsssetCodmnation || [], [AsssetCodmnation]);

    return (
        <Box>
            {AsssetCodm.length !== 0 ?
                <Box sx={{ width: '100%', overflow: 'auto', p: 1, }}>
                    <Box sx={{ width: '100%', }}>
                        <Box sx={{
                            height: 45, display: 'flex', borderBottom: 1, borderTop: 1, borderColor: 'lightgray', pt: 1.5,
                            bgcolor: 'white'
                        }}>
                            <Box sx={{ flex: 1, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>#</Box>
                            <Box sx={{ flex: 2, fontWeight: 600, color: '#444444', fontSize: 12, }}>Asset No.</Box>
                            <Box sx={{ flex: 3, fontWeight: 600, color: '#444444', fontSize: 12, }}>Category</Box>
                            <Box sx={{ flex: 8, fontWeight: 600, color: '#444444', fontSize: 12, pl: 6 }}>Item Name</Box>
                        </Box>
                        <Box sx={{ width: '100%', overflow: 'auto', }}>
                            <Box sx={{ width: '100%' }}>
                                <Virtuoso
                                    style={{ height: '70vh' }}
                                    totalCount={AsssetCodm.length}
                                    itemContent={(index) => {
                                        const val = AsssetCodm[index];
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
                                                <Box sx={{ flex: 1, pl: 1.7, color: '#444444', fontSize: 14 }}>
                                                    {index + 1}
                                                </Box>
                                                <Box sx={{ flex: 2, color: '#444444', fontSize: 14 }}>
                                                    {val.spare_asset_no
                                                        ? `${val.spare_asset_no}/${(val.spare_asset_no_only ?? 0).toString().padStart(6, '0')}`
                                                        : `${val.item_asset_no}/${(val.item_asset_no_only ?? 0).toString().padStart(6, '0')}`}
                                                </Box>
                                                <Box sx={{ flex: 3, color: '#444444', fontSize: 14 }}>
                                                    {val.category_name}
                                                </Box>
                                                <Box sx={{ flex: 8, color: '#444444', fontSize: 14, pl: 6 }}>
                                                    {val.item_name}
                                                </Box>
                                            </Box>
                                        );
                                    }}
                                />
                            </Box>
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
                    Empty  List

                </Box>
            }
        </Box>
    )
}

export default memo(AssetCondemnation)


