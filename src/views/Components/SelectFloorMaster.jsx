import React, { useMemo } from 'react'
import { memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllFloorMaster } from 'src/api/CommonApiCRF'
import { warningNotify } from '../Common/CommonCode'
import CustomSelectWithLabel from './CustomSelectWithLabel'

const SelectFloorMaster = ({ handleChange, value, label, type }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['allfloormast'],
        queryFn: () => getAllFloorMaster(),
    })



    const floordata = useMemo(() => {
        if (!data) return [];
        return data.filter((item) =>
            type === "HB"
                ? item.rm_buildblock_name === "HOSPITAL BLOCK"
                : item.rm_buildblock_name === "SERVICE BLOCK"
        );
    }, [data, type]); // Runs only when `data` or `type` changes


    const formattedData = type !== '' ? floordata ?
        floordata?.map((dep) => ({
            value: dep.rm_floor_slno,
            label: dep.rm_floor_name,
        }))
        : [] : [];

    if (error) return warningNotify('An error has occurred: ' + error)

    return (
        <CustomSelectWithLabel
            labelName={label || 'List'}
            dataCollection={formattedData}
            values={Number(value)}
            handleChangeSelect={handleChange}
            placeholder={isLoading ? "Loading..." : "Select here ..."}
        />
    )
}

export default memo(SelectFloorMaster)
