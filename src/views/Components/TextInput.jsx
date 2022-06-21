import React, { memo } from 'react'

const TextInput = (props) => {
    const { type, id, Placeholder, value, classname, changeTextValue, name, disabled, max, min } = props;

    return (
        <div>
            <input
                type={type}
                className={classname}
                id={id}
                placeholder={Placeholder}
                aria-label=".form-control-sm"
                value={value}
                autoComplete="off"
                onChange={changeTextValue}
                name={name}
                disabled={disabled}
                max={max}
                min={min}

            />
        </div>
    )
}

export default memo(TextInput)