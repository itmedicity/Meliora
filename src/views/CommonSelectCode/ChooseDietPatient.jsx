import React, { memo, useMemo } from 'react'
const ChooseDietPatient = (
    { value, setValue, disabled, PtDetail }
) => {
    const handleChange = (e) => {
        setValue(e.target.value)
    }


    console.log(
        {
            PtDetail
        }
    );


    const FilterdPatient = useMemo(() => {
        return [
            ...new Map(
                PtDetail?.map(item => {
                    const patientNo = item.fb_pt_no || item.pt_no;

                    return [patientNo, item];
                })
            ).values()
        ];
    }, [PtDetail]);


    return (
        <select
            value={value ? String(value) : ''}
            onChange={handleChange}
            style={{
                minWidth: 180,
                height: 30,
                fontSize: '11px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: 'transparent',
                outline: 'none'
            }}
            disabled={disabled}
        >
            <option value="">
                Select Patient
            </option>

            {FilterdPatient?.map((item, inx) => (
                <option
                    key={inx}
                    value={item?.fb_pt_no || item?.pt_no}
                >
                    {(item?.fb_ptc_name || item?.ptc_ptname)}
                    {" - "}
                    {(item?.fb_pt_no || item?.pt_no)}
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseDietPatient)
