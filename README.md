
# Real-Time Object Detection React App

This React application enables real-time object detection using either the device's camera or a randomly selected video from a prepared list.


## Features

- **Object Detection**: Utilizes TensorFlow.js, a machine learning library for JavaScript, to perform object detection.
- **ml5 Model**: Implements ml5.js, which offers pre-trained models that can process various types of inputs (images, video, audio, text) and produce outputs such as labels and confidence scores.(based on TensorFlow.js)
- **Common Objects in Context (COCO) Dataset**: The model used in this app is trained on the COCO dataset, a commonly used benchmark for object detection in images.
<img width="357" alt="Screenshot_2" src="https://github.com/SvitlanaRybakova/ml5-COCO-SSD/assets/56434649/bf1794d8-0e39-4efd-974b-370e9311936b">
<img width="356" alt="Screenshot_3" src="https://github.com/SvitlanaRybakova/ml5-COCO-SSD/assets/56434649/2cfff6a2-cede-4860-9940-671aa3c1d563">
<img width="353" alt="Screenshot_4" src="https://github.com/SvitlanaRybakova/ml5-COCO-SSD/assets/56434649/26667ff8-29d7-4f02-ad53-6b501182f8c7">



## How to Use

1. **Camera Usage**: Ensure your browser allows access to the camera when using the camera option.
2. **Video Selection**: Toggle between camera source and a random video using the provided toggle button.
3. **Start/Stop Detection**: Press the "Start" button to initiate object detection. Press "Stop" to halt detection.

## Technologies Used

- React
- ml5.js
- COCO Dataset

## Installation

To run the app locally:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies with `npm install`.
4. Start the development server with `npm start`.

## Hosted URL
This project is hosted [here](https://ml5-coco-ssd.vercel.app)
