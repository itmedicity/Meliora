import React, { memo, useMemo } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { UseRoomTypeDetail } from '../Diet/CommonData/UseQuery';

/**
 * value           -> selected room category IDs (array)
 * setValue        -> setter for selected IDs
 * categoryDetail  -> FULL diet room master list (table data)
 * currentSlno     -> current editing row slno (0 for insert)
 */
const MultipleRoomCategroySelect = ({
    value = [],
    setValue,
    categoryDetail = [],
    currentSlno = 0
}) => {

    // Fetch all room types
    const { data: RoomType = [] } = UseRoomTypeDetail();

    //  SAFE JSON PARSER
    const safeParse = (val) => {
        try {
            return Array.isArray(val) ? val : JSON.parse(val || '[]');
        } catch {
            return [];
        }
    };

    /**
     *  Collect all USED room category IDs
     * Exclude current row when editing
     */
    const usedCategoryIds = useMemo(() => {
        const set = new Set();

        categoryDetail?.forEach(row => {
            // Skip same row while editing
            if (row?.diet_rm_category_slno === currentSlno) return;

            const ids = safeParse(row?.diet_rm_categories);
            ids?.forEach(id => set?.add(id));
        });

        return set;
    }, [categoryDetail, currentSlno]);

    /**
     * Convert selected IDs → objects for Autocomplete
     */
    const selectedOptions = useMemo(() => {
        return RoomType?.filter(rt => value?.includes(rt.fb_rc_slno));
    }, [RoomType, value]);

    /**
     * Store ONLY IDs in state
     */
    const handleChange = (event, selected) => {
        const ids = selected?.map(item => item.fb_rc_slno);
        setValue(ids);
    };

    return (
        <Autocomplete
            multiple
            options={RoomType}
            value={selectedOptions}
            placeholder="Select Room Categories"
            getOptionLabel={(option) => option.fb_rcc_desc || ''}
            isOptionEqualToValue={(option, value) =>
                option?.fb_rc_slno === value?.fb_rc_slno
            }
            onChange={handleChange}

            //  DISABLE already used room types
            getOptionDisabled={(option) =>
                usedCategoryIds?.has(option.fb_rc_slno)
            }

            sx={{
                width: '100%',
                minHeight: 40,
                bgcolor: 'transparent',
                borderBottom: '2px solid',
                borderColor: 'neutral.outlinedBorder',
            }}
        />
    );
};

export default memo(MultipleRoomCategroySelect);
