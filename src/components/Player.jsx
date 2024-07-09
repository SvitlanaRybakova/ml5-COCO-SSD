import React from 'react'
import { forwardRef } from 'react'

const Player = forwardRef(function Player(
    { src, type, width, height, className },
    ref
) {
    return (
        <video
            className="w-full"
            width={width}
            ref={ref}
            height={height}
            className={className}
            autoPlay 
            muted 
            controls
            loop
        >
            <source src={src} type={type} />
        </video>
    )
})

export default Player
