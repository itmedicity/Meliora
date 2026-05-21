import React, { memo } from 'react'
import '../../Master/DietMasters/DietStyle/DietStyle.css'

const DietSearchComponent = ({
    value = '',
    onChange,
    placeholder = 'Search...',
    width = '250px'
}) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <input
                className="qty-input"
                placeholder={placeholder}
                type="text"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                style={{ width: width, fontSize: '12px' }}
            />
        </div>
    )
}

export default memo(DietSearchComponent)
