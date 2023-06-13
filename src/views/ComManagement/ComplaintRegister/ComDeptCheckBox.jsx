import { Checkbox, CssVarsProvider, Typography } from '@mui/joy'
import React, { Fragment, memo } from 'react'

const ComDeptCheckBox = ({ value, onChange, name, label, checkedValue, onClick, checked, onCheked }) => {


    // const handleChange = (e) => {
    //     const {
    //         target: { value }
    //     } = e;
    //     // setPersonName(
    //     //     // On autofill we get a the stringified value.
    //     //     typeof value === "string" ? value.split(",") : value
    //     // );
    // };


    return (
        <Fragment>
            <CssVarsProvider>

                {/* <Checkbox
                    // variant={variant}
                    color='danger'
                    size="lg"
                    // defaultChecked={false}
                    //    disabled={disabled}
                    label={<Typography level="h2" fontSize="md" sx={{ mb: 0.5, color: 'neutral.600' }} >{label}</Typography>}
                    value={value}
                    onChange={(e) => onCheked(e)}
                    checked={checked}
                    name={name}
                /> */}

                <Checkbox
                    // variant="outlined"
                    color='danger'
                    label={<Typography level="h2" fontSize="md" sx={{ mb: 0.5, color: 'neutral.600' }} >{label}</Typography>}
                    checked={checkedValue !== undefined && checkedValue !== value ? false : true}
                    onChange={(e) => {
                        onChange(e.target.checked === true ? value : null)
                    }}
                    multiple
                    onClick={onClick}
                    name={name}
                    size="lg"
                    sx={{ display: 'flex' }}
                //disabled={checkedValue !== undefined && checkedValue !== val.value ? true : false}
                />
            </CssVarsProvider >
        </Fragment >
    )
}

export default memo(ComDeptCheckBox)