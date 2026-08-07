import React, { memo, useMemo } from 'react'

const ChooseAdmittedPatient = ({
    value,
    setValue,
    disabled,
    patientDetail = []
}) => {

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const filteredPatients = useMemo(() => {
        return [
            ...new Map(
                patientDetail.map(item => [item.fb_pt_no, item])
            ).values()
        ]
    }, [patientDetail])

    return (
        <select
            value={value ? String(value) : ''}
            onChange={handleChange}
            disabled={disabled}
            style={{
                minWidth: 220,
                height: 30,
                fontSize: '11px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: 'transparent',
                outline: 'none'
            }}
        >
            <option value="">
                Select Patient
            </option>

            {filteredPatients.map((item) => (
                <option
                    key={item.fb_pt_no}
                    value={item.fb_pt_no}
                >
                    {item.fb_ptc_name} ({item.fb_ip_no})
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseAdmittedPatient)