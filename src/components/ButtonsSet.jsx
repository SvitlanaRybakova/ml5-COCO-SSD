import React from 'react'
import Button from './Button'
import DetectionSourceToggle from './DetectionSourceToggle'
import { buttonName } from '../utils/constants'

const ButtonsSet = ({
    handleButtonClickStart,
    handleButtonClickStop,
    handleToggleDetectionSource,
    isDetecting,
}) => {
    return (
        <div className="flex flex-col items-center justify-center lg:flex-row">
            <div className={isDetecting ? '' : 'pulse-animation'}>
                <Button
                    handleClick={
                        isDetecting
                            ? handleButtonClickStop
                            : handleButtonClickStart
                    }
                    className={isDetecting ? 'stop' : 'play'}
                    btnText={isDetecting ? buttonName.STOP : buttonName.START}
                />
            </div>

            <DetectionSourceToggle
                handleToggle={handleToggleDetectionSource}
                btnText={buttonName.TOGGLE_SOURCE}
            />
        </div>
    )
}

export default ButtonsSet
