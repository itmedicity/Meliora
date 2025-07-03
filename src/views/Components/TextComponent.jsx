import React from 'react'
import Typography from '@mui/joy/Typography'

const TextComponent = ({ text, level = 'body1', color = 'neutral', sx = {}, ...props }) => {
  return (
    <Typography level={level} color={color} sx={sx} {...props}>
      {text}
    </Typography>
  )
}

export default TextComponent
