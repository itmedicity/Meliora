import React, { memo } from 'react'
import { useFetchAllHospitalStaffDetail, useFetchAllPghHsStaffDetail } from '../CommonComponent/useQuery'

const SelectDifferentStaffDetail = () => {
    // selectstaff 

    //selectstaff == PG,HS,AND Hospital Staff
    const { data: pgHsStaffDetail } = useFetchAllPghHsStaffDetail()
    const { data: HospitalStaffDetail } = useFetchAllHospitalStaffDetail()

    console.log({
        pgHsStaffDetail,
        HospitalStaffDetail
    });

    return (
        <div>selectDifferentStaffDetail</div>
    )
}

export default memo(SelectDifferentStaffDetail)