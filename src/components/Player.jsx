import React, { useRef } from 'react'

import { forwardRef } from 'react'

const Player = forwardRef(function Player({ src, type, width, height }, ref) {
    return (
        <video width={width} ref={ref} height={height} controls>
            <source src={src} type={type} />
        </video>
    )
})

export default Player
