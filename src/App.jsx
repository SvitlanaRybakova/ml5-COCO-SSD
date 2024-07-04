import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import p5 from 'p5'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary'

const dimensions = {
    width: 800,
    height: 500,
}

function App() {
    const { width, height } = dimensions
    const detections = useRef([])
    const webcamRef = useRef()
    const sketchRef = useRef()
    const [detectLoading, setDetectLoading] = useState('Start detecting...');

    const detect = (objectDetector) => {
        if (webcamRef.current?.video.readyState !== 4) {
            console.error('Video not ready yet')
            return
        }

        setDetectLoading('LOADING');

        objectDetector.detect(webcamRef.current.video, (err, results) => {
            if (err) {
                console.error('Error detecting the video', err)
                setDetectLoading('ERROR');
                return
            }
              if (results && results.length > 0) {
                detections.current = results;
                setDetectLoading('READY, detecting');
            } else {
                setDetectLoading('No results found');
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

        const modelLoaded = () => {
            detectionInterval = setInterval(() => {
                detect(objectDetector)
            }, 2000)
        }

        const objectDetector = window.ml5.objectDetector('cocossd', modelLoaded)

        const p5Instance = new p5(sketch, sketchRef.current)

        return () => {
            if (detectionInterval) {
                clearInterval(detectionInterval)
            }
            p5Instance.remove()
        }
    }, [width, height])

    return (
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <div>
                <Webcam ref={webcamRef} className="webcam" />
                <div ref={sketchRef} className="canvas"></div>
            </div>
    <p>{detectLoading}</p>
            <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Default
            </button>
        </ErrorBoundary>
    )
}

export default App
