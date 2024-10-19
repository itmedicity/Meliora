import { Checkbox, CssVarsProvider, Typography } from '@mui/joy'
import React, { Fragment, memo } from 'react'

const ComplaintCheckBox = ({ value, onChange, name, label, checkedValue, onClick, setcm_am_assetmap_slno, setSelectedAsset, setItem_slno }) => {
    return (
        <Fragment>
            <CssVarsProvider>
                <Checkbox
                    // variant="outlined"
                    color='danger'
                    label={<Typography level="h2" fontSize="md" sx={{ mb: 0.5, color: 'neutral.600' }} >{label}</Typography>}
                    checked={checkedValue !== undefined && checkedValue !== value ? false : true}
                    onChange={(e) => {
                        onChange(e.target.checked === true ? value : null)
                        setcm_am_assetmap_slno('')
                        setSelectedAsset('')
                        setItem_slno(0)
                    }}
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

export default memo(ComplaintCheckBox)