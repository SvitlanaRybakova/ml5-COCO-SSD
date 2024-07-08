import React, { useRef } from 'react'

import { forwardRef } from 'react'

const Player = forwardRef(function Player(
    { src, type, width, height, className },
    ref
) {
    return (
        <video
            width={width}
            ref={ref}
            height={height}
            className={className}
            controls
            loop
        >
            <source src={src} type={type} />
        </video>
    )
})

export default Player
