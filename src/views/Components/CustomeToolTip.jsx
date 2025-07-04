import React, { Fragment } from 'react';
import { styled } from '@mui/material/styles';
import { CssVarsProvider, Tooltip, tooltipClasses, Typography } from '@mui/joy';


const CuatomTooltip = styled(({ className, ...props }) => (
  <Tooltip arrow {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#424242',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(16),
    border: '1px solid #424242',
  },
}))

const CustomeToolTip = ({ title, children, placement }) => {
  return (
    <CuatomTooltip
      title={
        <Fragment>
          <CssVarsProvider>
            <Typography level="body1" sx={{ color: 'white' }}>
              {title}
            </Typography>
          </CssVarsProvider>
        </Fragment>
      }
      placement={placement}
    >
      {children}
    </CuatomTooltip>
  )
}

export default CustomeToolTip
