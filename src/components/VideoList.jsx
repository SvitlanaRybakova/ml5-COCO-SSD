import React from 'react'
import VideoItem from './VideoItem'
import {videoItems} from '../utils/constants'

const VideoList = () => {
  return (
    <div>
    <h1 className="text-2xl font-black text-gray-900 m-4">Video List</h1>
      {videoItems && videoItems.map(item =>(
<VideoItem key={item.id} title={item.title}/>
      ))}
    </div>
  )
}

export default VideoList
