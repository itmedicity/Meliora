import React, { Fragment, memo } from 'react'

const ImageViewComp = ({ src, alt, style }) => {
    return (
        < Fragment>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                style={{ ...style }}
            />

        </Fragment>
    )
}

export default memo(ImageViewComp)