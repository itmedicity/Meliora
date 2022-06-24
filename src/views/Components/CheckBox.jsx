import React, { memo } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
const CheckBox = (props) => {
    const { value, name, label, color, checked, onchange } = props;
    return (
        <div>
            <FormControlLabel
                className="pb-0 mb-0"
                control={
                    <Checkbox
                        name={name}
                        color={color}
                        value={value}
                        checked={checked}
                        className="ml-2"
                        onChange={onchange}
                    />
                }
                label={label}
            />
        </div>
    )
}

export default memo(CheckBox)