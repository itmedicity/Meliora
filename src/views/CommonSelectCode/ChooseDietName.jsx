import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDiet } from 'src/redux/actions/Diet.action'

const ChooseDietName = ({ value, setValue, width, disabled = false }) => {
    const dispatch = useDispatch()

    const dietdata = useSelector(
        state => state.getDiet.dietList ?? []
    )

    useEffect(() => {
        dispatch(getDiet())
    }, [dispatch])

    return (
        <select
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            style={{
                minWidth: width ? width : 150,
                height: 30,
                // padding: '6px',
                fontSize: '11px',
                borderRadius: 4,
                border: '1px solid #ccc',
                backgroundColor: 'transparent',
                outline: 'none'
            }}
            disabled={disabled}
        >
            <option value={0}>
                Select Diet
            </option>

            {dietdata.map((val) => (
                <option key={val.diet_slno} value={val.diet_slno}>
                    {val.diet_name}
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseDietName)
