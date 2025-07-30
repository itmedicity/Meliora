import { Box } from '@mui/joy'
import React, { memo } from 'react'
import RelatedToCard from './RelatedToCard';

const SelectNatureOfIncident = ({ handleMultiSelect, selectedCategories }) => {


    const selectNatureofIncident = [
        { label: 'Clinical', },
        { label: 'Non Clinical', },
        { label: 'Drug', },
        { label: 'Violence', },
        { label: 'Fire', },
        { label: 'Security', },
        { label: 'Equipment', },
        { label: 'Accident', },
        { label: 'Work Related || Health', },
        { label: 'Infection Related', },
        { label: 'Other', },
    ];



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
                {selectNatureofIncident?.map(({ label, symbol }) => (
                    <RelatedToCard
                        width={'auto'}
                        size={12}
                        key={symbol}
                        label={label}
                        symbol={label}
                        selected={selectedCategories?.includes(label)}
                        multiple={true}
                        onSelect={handleMultiSelect}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default memo(SelectNatureOfIncident)