import React from 'react'

const Button = ({ handleClick, disabled, className, btnText }) => {
    const handleButtonClick = (e) => {
        e.preventDefault()
        handleClick && handleClick()
    }

    return (
        <button
            onClick={handleButtonClick}
            disabled={disabled}
            type="button"
            className={className}
        >
            {btnText}
        </button>
    )
}

export default Button
