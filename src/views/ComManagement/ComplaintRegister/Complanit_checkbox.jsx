import { Checkbox, CssVarsProvider } from '@mui/joy'
import React, { Fragment } from 'react'
import { useState } from 'react'

const Complanit_checkbox = ({ value, onChange, name, label, checkedValue }) => {

    return (
        <Fragment>
            <CssVarsProvider>
                <Checkbox
                    variant="outlined"
                    color="success"
                    label={label}
                    checked={checkedValue !== undefined && checkedValue !== value ? false : true}
                    onChange={(e) => {
                        onChange(e.target.checked === true ? value : null)

                    }}
                    // checked={100}
                    name={name}
                //disabled={checkedValue !== undefined && checkedValue !== val.value ? true : false}
                />

            </CssVarsProvider >
        </Fragment >
    )
}

export default Complanit_checkbox