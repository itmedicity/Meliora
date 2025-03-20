import { Box } from '@mui/joy';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Virtuoso } from 'react-virtuoso';
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
        <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2, mt: .5, }}>
            <TextComponent
                text={"PM DETAIL LIST"}
                sx={{
                    flex: 1,
                    fontWeight: 500,
                    color: 'black',
                    fontSize: 15,
                }}
            />
            <Box sx={{ flex: 1, pr: 1, pt: 1 }}>


                {pmDetailsAll.length === 0 ?
                    <Box sx={{ height: 160, fontSize: 24, fontWeight: 600, color: 'lightgrey', textAlign: 'center', pt: 5 }}>
                        Empty PM Details
                    </Box>
                    :
                    <>
                        <Box sx={{ flex: 1, display: 'flex', borderTop: 1, borderBottom: 1, borderColor: 'lightgrey', pl: 1, py: .5, gap: .5 }}>
                            <Box sx={{ flex: 1, }}>
                                #
                            </Box>
                            <Box sx={{ flex: 4, }}>
                                Pm Done Date
                            </Box>
                            <Box sx={{ flex: 4, }}>
                                Pm Due Date
                            </Box>
                            <Box sx={{ flex: 3, }}>
                                Status
                            </Box>
                        </Box>

                        <Virtuoso
                            style={{ height: '28vh' }}
                            totalCount={pmDetailsAll?.length}
                            itemContent={(index) => {
                                const sortedList = [...pmDetailsAll].sort((a, b) => (b.status === 1 ? 1 : 0) - (a.status === 1 ? 1 : 0));
                                const val = sortedList[index];
                                return (
                                    <Box key={index} sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: 'lightgrey', pl: 1, py: .6, gap: .5 }}>
                                        <Box sx={{ flex: 1, fontWeight: 600 }}>
                                            {index + 1}
                                        </Box>
                                        <Box sx={{ flex: 4, fontWeight: 600 }}>
                                            {val.am_pm_fromdate ? format(new Date(val.am_pm_fromdate), 'dd MMM yyyy') : ''}
                                        </Box>
                                        <Box sx={{ flex: 4, fontWeight: 600 }}>
                                            {val.am_pm_dutedate ? format(new Date(val.am_pm_dutedate), 'dd MMM yyyy') : ''}
                                        </Box>
                                        <Box
                                            sx={{
                                                flex: 3,
                                                fontWeight: 600,
                                                color: val.status === 1 ? 'darkgreen' : val.status === 0 ? '#523A28' : 'black'
                                            }}
                                        >
                                            {val.status === 1 ? "Active *" : val.status === 2 ? "Inactive" : val.status === 0 ? "Expired" : "NotUpdated"}
                                        </Box>
                                    </Box>
                                );
                            }}
                        />
                    </>}
            </Box>
        </Box>
    )
}

export default PmDetails