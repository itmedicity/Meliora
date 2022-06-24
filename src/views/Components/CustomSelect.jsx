import React, { Fragment, memo } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core'

const CustomSelect = (props) => {
    const { name, value, onchange, defaultvalue, style, mappingarray } = props

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={name}
                    value={value}
                    onChange={onchange}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={defaultvalue}
                    style={style}
                >
                    <MenuItem value='0' disabled>

                    </MenuItem>
                    {
                        mappingarray
                    }
                </Select>
            </FormControl>
        </Fragment >
    )
}

export default memo(CustomSelect)