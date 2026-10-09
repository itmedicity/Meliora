import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { warningNotify } from '../Common/CommonCode'
import { getallNurseStation } from 'src/api/CommonApiCRF'
import CustomSelectWithLabel from './CustomSelectWithLabel'

const SelectNursingStation = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['allnursestation'],
        queryFn: () => getallNurseStation(),
    })

    const formattedData = data ?
        data?.map((dep) => ({
            value: dep.NS_CODE,
            label: dep.NSC_DESC,
        }))
        : [];

    if (error) return warningNotify('An error has occurred: ' + error)

    return (
        <CustomSelectWithLabel
            labelName={label || 'List'}
            dataCollection={formattedData}
            values={(value)}
            handleChangeSelect={handleChange}
            placeholder={isLoading ? "Loading..." : "Select here ..."}
        />
    )
}

export default memo(SelectNursingStation) 