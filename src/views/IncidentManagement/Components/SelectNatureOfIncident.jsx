import { Box } from '@mui/joy'
import React, { memo, useMemo } from 'react'
import RelatedToCard from './RelatedToCard';
import { useInidentNatuer } from '../CommonComponent/useQuery';

const SelectNatureOfIncident = ({ handleMultiSelect, selectedCategories }) => {

    const {
        data: NatureofIncident = [],
    } = useInidentNatuer();

    const selectNatureofIncident = useMemo(() => {
        return Array.isArray(NatureofIncident) && NatureofIncident?.filter(item => item?.inc_nature_status === 1)
    }, [NatureofIncident]);


    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{
                mt: 1,
                border: '1.5px solid #d8dde2ff',
                p: 2,
                borderRadius: 5,
                position: 'relative'
            }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                {selectNatureofIncident?.map((label, symbol) => {
                    return (
                        <Box key={label?.inc_nature_slno}>
                            <RelatedToCard
                                width={'auto'}
                                size={12}
                                key={symbol}
                                label={label?.inc_nature_name}
                                symbol={label?.inc_nature_name}
                                selected={selectedCategories?.includes(label?.inc_nature_name)}
                                multiple={true}
                                onSelect={handleMultiSelect}
                            />
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default memo(SelectNatureOfIncident)