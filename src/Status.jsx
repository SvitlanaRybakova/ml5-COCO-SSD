import React from 'react'

const Status = ({statusText}) => {
  return (
    <p className="text-l italic font-semibold text-gray-500"> Status: 
      <span className="text-gray-700"> {statusText} </span>
    </p>
  )
}

export default Status
