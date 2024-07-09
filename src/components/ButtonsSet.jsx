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
            <Button
                handleClick={handleButtonClickStart}
                disabled={isDetecting}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none disabled:opacity-50"
                btnText={buttonName.START}
            />

            <Button
                handleClick={handleButtonClickStop}
                disabled={!isDetecting}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 disabled:opacity-50"
                btnText={buttonName.STOP}
            />

            <DetectionSourceToggle
                handleToggle={handleToggleDetectionSource}
                btnText={buttonName.TOGGLE_SOURCE}
            />
        </div>
    )
}

export default ButtonsSet
