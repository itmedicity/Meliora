import { Checkbox, CssVarsProvider } from '@mui/joy'
import React, { Fragment, memo } from 'react'

const ComplaintCheckBox = ({ value, onChange, name, label, checkedValue, onClick }) => {
    return (
        <Fragment>
            <CssVarsProvider>
                <Checkbox
                    variant="outlined"
                    color="success"
                    label={label.toLowerCase()}
                    checked={checkedValue !== undefined && checkedValue !== value ? false : true}
                    onChange={(e) => {
                        onChange(e.target.checked === true ? value : null)

                    }}
                    onClick={onClick}
                    // checked={100}
                    name={name}
                //disabled={checkedValue !== undefined && checkedValue !== val.value ? true : false}
                />

            </CssVarsProvider >
        </Fragment >
    )
}

export default memo(ComplaintCheckBox)