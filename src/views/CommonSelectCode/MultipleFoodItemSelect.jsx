import React, { memo, useMemo } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { UseFoodDetail } from '../Diet/CommonData/UseQuery';

/**
 * value           -> selected room category IDs (array)
 * setValue        -> setter for selected IDs
 * categoryDetail  -> FULL diet room master list (table data)
 * currentSlno     -> current editing row slno (0 for insert)
 */
const MultipleFoodItemSelect = ({
    value = [],
    setValue,
    categoryDetail = [],
    currentSlno = 0
}) => {
    
    // Fetch all room types
    const { data: FoodDetail = [] } = UseFoodDetail()

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
        return FoodDetail?.filter(rt => value?.includes(rt.item_slno));
    }, [FoodDetail, value]);

    /**
     * Store ONLY IDs in state
     */
    const handleChange = (event, selected) => {
        const ids = selected?.map(item => item.item_slno);
        setValue(ids);
    };

    return (
        <Autocomplete
            multiple
            options={FoodDetail}
            value={selectedOptions}
            placeholder="Select Room Categories"
            getOptionLabel={(option) => option.item_name || ''}
            isOptionEqualToValue={(option, value) =>
                option?.item_slno === value?.item_slno
            }
            onChange={handleChange}

            //  DISABLE already used room types
            getOptionDisabled={(option) =>
                usedCategoryIds?.has(option.item_slno)
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

export default memo(MultipleFoodItemSelect);
