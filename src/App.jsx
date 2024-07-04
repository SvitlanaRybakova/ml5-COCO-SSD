import Webcam from 'react-webcam'
import './App.css'
import { useEffect, useRef } from 'react'
import ErrorBoundary from './components/ErrorBoundary'


const dimensions = {
    width: 800,
    height: 500,
}

function App() {
    const { width, height } = dimensions
    const detections = useRef([])
    const webcamRef = useRef()
    const canvasRef = useRef()
 

    const draw = () => {
        const ctx = canvasRef.current.getContext('2d')
        ctx.clearRect(0, 0, width, height)
        detections.current.forEach((detection) => {
            ctx.beginPath()
            ctx.fillStyle = '#FF0000'
            ctx.fillText(detection.label, detection.x, detection.y - 5)
            ctx.rect(
                detection.x,
                detection.y,
                detection.width,
                detection.height
            )
            ctx.stroke()
        })
    }


    const detect = (objectDetector) => {
        console.log(webcamRef.current.video.readyState);
        if (webcamRef.current.video.readyState !== 4) {
            console.error('Video not ready yet')
            return
        }

        objectDetector.detect(webcamRef.current.video, (err, results) => {
            if (err) {
                console.error('Error, detecting the video')
                return
            }

            detections.current = results
            draw()
        })
    }

    useEffect(() => {
        let detectionInterval

        const modelLoaded = () => {

            webcamRef.current.video.width = width;
            webcamRef.current.video.height = height;
            canvasRef.current.width = width;
            canvasRef.current.height = height;
        }
        const objectDetector = ml5.objectDetector('cocossd', modelLoaded)

        if (modelLoaded) {
            detectionInterval = setInterval(() => {
                detect(objectDetector)
            }, 200)
        }


        return () => {
            if (detectionInterval) {
                clearInterval(detectionInterval)
            }

        }
    }, [width, height])

    return (
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <Webcam ref={webcamRef} className="webcam" />
            <canvas ref={canvasRef} className="canvas" />
            

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
