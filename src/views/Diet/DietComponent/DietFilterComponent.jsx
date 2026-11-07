import React, { } from 'react'
import {
    Box, Checkbox,
} from '@mui/joy'
import ChooseDIetType from 'src/views/CommonSelectCode/ChooseDIetType'
import DietSearchComponent from './DietSearchComponent'



const DietFilterComponent = ({
    setSearch,
    setDietType,
    search,
    dietType,
    select,
    HanldeSelectAll
}) => {

    return (
        <Box
            sx={{
                width: '95%',
                height: 40,
                border: '1px solid #e9e5e56c',
                mt: 1,
                p: 1,
                bgcolor: '#f6f6f6d9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                borderRight: '4px solid #7c51a1',
                borderLeft: '4px solid #7c51a1',
                borderRadius: 5,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
                <ChooseDIetType value={dietType} setValue={setDietType} />

                <Checkbox
                    size='sm'
                    label="Select All"
                    checked={select}
                    onChange={(e) => HanldeSelectAll(e.target.checked)}

                />
            </Box>

            <DietSearchComponent
                value={search}
                onChange={setSearch}
                placeholder="Search food..."
            />
        </Box>
    )
}

export default DietFilterComponent
