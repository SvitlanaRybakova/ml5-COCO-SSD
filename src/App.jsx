import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import p5 from 'p5'
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
    const sketchRef = useRef()
    const playerRef = useRef()
    const [detectStatus, setDetectStatus] = useState(null)
    const [isDetecting, setIsDetecting] = useState(false)
    const [useCamera, setUseCamera] = useState(true)
    const [selectedVideo, setSelectedVideo] = useState(videoItems[0].src)

    const detect = (objectDetector, mediaStream) => {
        objectDetector.detect(mediaStream, (err, results) => {
            if (err) {
                console.error('Error detecting the video', err)
                setDetectStatus(status.ERROR)
                setIsDetecting(false)
                return
            }
            if (results && results.length > 0) {
                detections.current = results
                setDetectStatus(status.READY)
            } else {
                setDetectStatus(status.NO_RESULTS)
            }
        })
    }

    const sketch = (p) => {
        p.setup = () => {
            p.createCanvas(width, height)
        }

        p.draw = () => {
            p.clear()

            detections.current.forEach((detection) => {
                p.noFill()
                p.stroke(21, 225, 43)
                p.rect(
                    detection.x,
                    detection.y,
                    detection.width,
                    detection.height
                )
                p.textSize(16)
                p.fill(0, 0, 0)
                p.text(
                    detection.label,
                    detection.x,
                    detection.y > 10 ? detection.y - 5 : 10
                )
            })
        }
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

            const p5Instance = new p5(sketch, sketchRef.current)

            if (!isDetecting) p5Instance.remove() // Remove p5 on stop detection

            return () => {
                if (detectionInterval) {
                    clearInterval(detectionInterval)
                }
                p5Instance.remove()
            }
        }
    }, [isDetecting, width, height, useCamera])

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
                    <div className="relative">
                        {useCamera ? (
                            <Webcam 
                            ref={webcamRef}  />
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
                        <div ref={sketchRef} className="canvas" />
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
