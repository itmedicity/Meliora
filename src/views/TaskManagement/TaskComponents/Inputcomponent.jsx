
import { CssVarsProvider, FormControl } from '@mui/joy'
import Input from "@mui/joy/Input"
import React, { Fragment, memo } from 'react'

const InputComponent = ({
    size,
    placeholder,
    type,
    startDecorator,
    endDecorator,
    style,
    onchange,
    value,
    min, slotProps,
    defaultValue, name, disabled
}) => {
    // --- size --> sm,lg,md Default medium Size

    // Text Feild Custome Style 
    const textStyle = {
        width: '100%',
        height: 35,
        bgcolor: 'transparent',
        '--Input-radius': '0px',
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: '2px solid',
        borderColor: 'neutral.outlinedBorder',
        '&:hover': {
            borderColor: 'neutral.outlinedHoverBorder',
        },
        '&::before': {
            border: '1px solid var(--Input-focusedHighlight)',
            transform: 'scaleX(0)',
            left: 0,
            right: 0,
            bottom: '-2px',
            top: 'unset',
            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
            borderRadius: 0,
        },
        '&:focus-within::before': {
            transform: 'scaleX(1)',
        },
    }



    return (
        <Fragment>
            <CssVarsProvider>
                <FormControl size={size}>
                    <Input
                        slotProps={slotProps}
                        placeholder={placeholder}
                        type={type}
                        startDecorator={startDecorator}
                        endDecorator={endDecorator}
                        sx={{ ...textStyle, ...style }}
                        onChange={(e) => onchange(e)}
                        min={min}
                        value={value}
                        defaultValue={defaultValue}
                        name={name}
                        autoComplete="off"
                        disabled={disabled} />

                </FormControl>
            </CssVarsProvider>
        </Fragment >
    );
}

export default memo(InputComponent)