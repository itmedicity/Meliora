import { Box, Table } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { memo, useEffect, useState } from 'react'
import { getPMDetailList } from 'src/api/AssetApis';
import TextComponent from 'src/views/Components/TextComponent';

const PmDetails = ({ AssetDetails }) => {

    const { am_item_map_slno } = AssetDetails
    const [pmDetailsAll, setpmDetailsAll] = useState([])

    const { data: PmDetailss, } = useQuery({
        queryKey: ['getPMDetailLists'],
        enabled: am_item_map_slno !== undefined,
        queryFn: () => getPMDetailList(am_item_map_slno),
    });

    useEffect(() => {
        if (PmDetailss) {
            setpmDetailsAll(PmDetailss);
        } else {
            setpmDetailsAll([]);
        }
    }, [PmDetailss]);

    return (
        <Box sx={{ mb: 1.5 }}>
            <TextComponent
                text={"PM DETAIL LIST"}
                sx={{
                    flex: 1,
                    fontWeight: 500,
                    color: 'black',
                    fontSize: 15,
                }}
            />
            <Box sx={{ flex: 1, pr: 1, pt: .5 }}>


                {pmDetailsAll.length === 0 ?
                    <Box sx={{ height: 80, fontSize: 24, fontWeight: 600, color: 'lightgrey', textAlign: 'center', pt: 2, border: 1, borderColor: '#d3d6dc' }}>
                        Empty PM Details
                    </Box>
                    :
                    <>
                        <Table
                            variant="outlined" size='sm'
                            stickyHeader
                            sx={{
                                minWidth: 600,
                                borderRadius: 0

                            }}
                        >
                            <thead>
                                <tr>
                                    <th style={{ width: 50, textAlign: 'center' }}>#</th>
                                    <th style={{ width: 200 }}>PM Done Date</th>
                                    <th style={{ width: 200 }}>PM Due Date</th>
                                    <th style={{ width: 150 }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...pmDetailsAll]
                                    .sort((a, b) => (b.status === 1 ? 1 : 0) - (a.status === 1 ? 1 : 0))
                                    .map((val, index) => (
                                        <tr key={index}>
                                            <td style={{ fontWeight: 600, textAlign: 'center' }}>{index + 1}</td>
                                            <td style={{ fontWeight: 600 }}>
                                                {val.am_pm_fromdate ? format(new Date(val.am_pm_fromdate), 'dd MMM yyyy') : ''}
                                            </td>
                                            <td style={{ fontWeight: 600 }}>
                                                {val.am_pm_dutedate ? format(new Date(val.am_pm_dutedate), 'dd MMM yyyy') : ''}
                                            </td>
                                            <td
                                                style={{
                                                    fontWeight: 600,
                                                    color:
                                                        val.status === 1
                                                            ? 'darkgreen'
                                                            : val.status === 0
                                                                ? '#523A28'
                                                                : 'black',
                                                }}
                                            >
                                                {val.status === 1
                                                    ? 'Active *'
                                                    : val.status === 2
                                                        ? 'Inactive'
                                                        : val.status === 0
                                                            ? 'Expired'
                                                            : 'NotUpdated'}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </>}
            </Box>
        </Box>
    )
}

export default memo(PmDetails)