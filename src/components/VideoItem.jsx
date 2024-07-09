import React from 'react'

const VideoItem = ({ title, src, onVideoSelect }) => {
    return (
        <div
            className="cursor-pointer flex items-center ps-4 border border-gray-200 rounded hover:bg-gray-100 "
            onClick={() => onVideoSelect(src)}
        >
            <input
                id={title}
                type="radio"
                value=""
                name="bordered-radio"
                className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2"
            />
            <label
                htmlFor={title}
                className="cursor-pointer w-full py-4 ms-8 text-sm  text-start font-medium text-gray-900"
            >
                {title}
            </label>
        </div>
    )
}

export default VideoItem
