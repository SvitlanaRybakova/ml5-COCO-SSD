import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary'
import Player from './components/Player'
import ButtonsSet from './components/ButtonsSet'
import VideoList from './components/VideoList'
import { DIMENTIONS, status, videoItems } from './utils/constants'

function App() {
    const { width, height } = DIMENTIONS
    const detections = useRef([])
    const webcamRef = useRef()
    const canvasRef = useRef()
    const playerRef = useRef()
    const [detectStatus, setDetectStatus] = useState(null)
    const [isDetecting, setIsDetecting] = useState(false)
    const [useCamera, setUseCamera] = useState(true)
    const [selectedVideo, setSelectedVideo] = useState(videoItems[0].src)

    const clearCanvas = (context, canvas) => {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    const detect = (objectDetector, mediaStream) => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        objectDetector.detect(mediaStream, (err, results) => {
            if (err) {
                console.error('Error detecting the video', err)
                clearCanvas(context, canvas)
                setDetectStatus(status.ERROR)
                setIsDetecting(false)
                return
            }
            if (results && results.length > 0) {
                detections.current = results
                setDetectStatus(status.READY)
            } else {
                clearCanvas(context, canvas)
                setDetectStatus(status.NO_RESULTS)
            }
        })
    }

    const drawDetections = () => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        clearCanvas(context, canvas)

        detections.current.forEach((detection) => {
            context.strokeStyle = 'rgb(21, 225, 43)'
            context.lineWidth = 2
            context.strokeRect(
                detection.x,
                detection.y,
                detection.width,
                detection.height
            )

            context.font = '20px Arial'
            context.fillStyle = 'rgb(21, 225, 43)'
            context.fillText(
                detection.label,
                detection.x,
                detection.y > 10 ? detection.y - 5 : 10
            )
        })
    }

    useEffect(() => {
        let detectionInterval
        let objectDetector

        if (isDetecting) {
            const modelLoaded = () => {
                detectionInterval = setInterval(() => {
                    const mediaStream = useCamera
                        ? webcamRef.current.video
                        : playerRef.current
                    detect(objectDetector, mediaStream)
                }, 1000)
            }

            objectDetector = window.ml5.objectDetector('cocossd', modelLoaded)

            return () => {
                if (detectionInterval) {
                    clearInterval(detectionInterval)
                }
            }
        }
    }, [isDetecting, useCamera])

    useEffect(() => {
        if (isDetecting) {
            const interval = setInterval(drawDetections, 1000 / 30) // 30 fps for drawing
            return () => clearInterval(interval)
        }
    }, [isDetecting])

    const handleButtonClickStart = () => {
        setDetectStatus(status.START)
        setIsDetecting(true)
    }

    const handleButtonClickStop = () => {
        setDetectStatus(status.STOP)
        setIsDetecting(false)
    }

    const handleToggleDetectionSource = () => {
        setUseCamera(!useCamera)
    }

    const handleVideoSelect = (src) => {
        setSelectedVideo(src)
    }

    return (
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <div className="lg:flex justify-between">
                <div className="flex flex-col lg:w-[60%]">
                    <ButtonsSet
                        handleToggleDetectionSource={
                            handleToggleDetectionSource
                        }
                        handleButtonClickStart={handleButtonClickStart}
                        handleButtonClickStop={handleButtonClickStop}
                        isDetecting={isDetecting}
                    />
                    <p className="text-black mt-10 h-[80px]">
                        {isDetecting ? `Status: ${detectStatus}` : ''}
                    </p>
                    <div className="relative video-container">
                        {useCamera ? (
                            <Webcam
                                ref={webcamRef}
                                width={width}
                                height={height}
                            />
                        ) : (
                            <Player
                                key={selectedVideo} // Add key prop to force re-render
                                ref={playerRef}
                                width={width}
                                height={height}
                                src={selectedVideo}
                                type={'video/mp4'}
                            />
                        )}
                        <canvas
                            ref={canvasRef}
                            className="canvas"
                            width={width}
                            height={height}
                        />
                    </div>
                </div>

                {!useCamera && (
                    <div className="lg:w-[30%]">
                        <VideoList
                            onVideoSelect={handleVideoSelect}
                            selectedVideo={selectedVideo}
                        />
                    </div>
                )}
            </div>
        </ErrorBoundary>
    )
}

export default App
