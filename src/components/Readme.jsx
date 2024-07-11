import React from 'react'
import { instrunction } from '../utils/constants'

const Readme = () => {
    return (
        <div>
            <h2 className="text-4xl font-extrabold text-gray-700 mb-10">
                Real-Time Object Detection
            </h2>
            <hr class="h-px my-8 bg-gray-200 border-0"></hr>
            <ul class="space-y-1 text-gray-500 list-disc list-inside text-left ">
                {instrunction.map((item) => (
                    <li key={item.id}> {item.text} </li>
                ))}
            </ul>
            <hr class="h-px my-8 bg-gray-200 border-0 "></hr>
        </div>
    )
}

export default Readme
