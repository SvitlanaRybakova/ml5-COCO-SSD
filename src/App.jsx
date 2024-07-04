import Webcam from 'react-webcam';
import './App.css';
import { useEffect, useRef } from 'react';

const dimensions = {
  width: 800,
  height: 500,
};

function App() {
    const webcamRef = useRef();
    const canvasRef = useRef();
    const { width, height } = dimensions;
 
 useEffect(() => {
   let detectionInterval;

   const modelLoaded = () => {
     webcamRef.current.video.width = width;
     webcamRef.current.video.height = height;
     canvasRef.current.width = width;
     canvasRef.current.height = height;

     detectionInterval = setInterval(() => {
       detect();
     }, 200);
   };

   const objectDetector = ml5.objectDetector('cocossd', modelLoaded);

   const detect = () => {
     if (webcamRef.current.video.readyState !== 4) {
       console.warn('Video not ready yet');
       return;
     }

     objectDetector.detect(webcamRef.current.video, (err, results) => {
       
       const ctx = canvasRef.current.getContext('2d');
       ctx.clearRect(0, 0, width, height);
       if (results && results.length) {
         results.forEach((detection) => {
           ctx.beginPath();
           ctx.fillStyle = '#FF0000';
           const { label, x, y, width, height } = detection;
           ctx.fillText(label, x, y - 5);
           ctx.rect(x, y, width, height);
           ctx.stroke();
         });
       }
     });
   };

   return () => {
     if (detectionInterval) {
       clearInterval(detectionInterval);
     }
   };
 }, [width, height]);

  return (
    <>
      <Webcam ref={webcamRef} className='webcam' />
      <canvas ref={canvasRef} className='canvas' />

      <button
        type='button'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
      >
        Default
      </button>
    </>
  );
}

export default App;
