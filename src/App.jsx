import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import p5 from 'p5'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary'

import Button from './components/Button'
import Player from './components/Player'

import video from './assets/cow.mp4'

const dimensions = {
    width: 800,
    height: 500,
}

function App() {
    const { width, height } = dimensions
    const detections = useRef([])
    const webcamRef = useRef()
    const sketchRef = useRef()
    const playerRef = useRef()
    const [detectStatus, setDetectStatus] = useState(null)
    const [isDetecting, setIsDetecting] = useState(false)

    const detect = (objectDetector) => {
        // if (webcamRef.current?.video?.readyState !== 4) {
        //     console.error('Video not ready yet')
        //     return
        // }

        setDetectStatus('LOADING')
        objectDetector.detect(playerRef.current, (err, results) => {
            if (err) {
                console.error('Error detecting the video', err)
                setDetectStatus('ERROR')
                return
            }
            if (results && results.length > 0) {
                detections.current = results
                setDetectStatus('READY, detecting')
            } else {
                setDetectStatus('No results found')
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
                    detect(objectDetector)
                }, 1000)
            }

            objectDetector = window.ml5.objectDetector('cocossd', modelLoaded)

            const p5Instance = new p5(sketch, sketchRef.current)

            return () => {
                if (detectionInterval) {
                    clearInterval(detectionInterval)
                }
                p5Instance.remove()
            }
        }
    }, [isDetecting, width, height])

    const handleButtonClickStart = () => {
        setDetectStatus('Start detecting...')
        setIsDetecting(true)
    }

    const handleButtonClickStop = () => {
        setDetectStatus('Stop detecting')
        setIsDetecting(false)
        setDetectStatus(null)
    }

    return (
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
            {isDetecting && (
                <div>
                    {/* <Webcam ref={webcamRef} className="webcam" /> */}

                    <div ref={sketchRef} className="canvas" />
                </div>
            )}
            {detectStatus && <p>{detectStatus}</p>}
            <Button
                handleClick={handleButtonClickStart}
                disabled={isDetecting}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                btnText={'Start Detecting'}
            />

            <Button
                handleClick={handleButtonClickStop}
                disabled={!isDetecting}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                btnText={'Stop Detecting'}
            />
            <>
                <Player
                    ref={playerRef}
                    width={width}
                    height={height}
                    src={video}
                    type={'video/mp4'}
                />
            </>
        </ErrorBoundary>
    )
}

export default App
