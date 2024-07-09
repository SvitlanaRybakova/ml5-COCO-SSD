import { v4 as uuidv4 } from 'uuid'
import car from '../assets/car.mp4'
import cat from '../assets/cat.mp4'
import child from '../assets/child.mp4'
import cow from '../assets/cow.mp4'
import dog from '../assets/dog.mp4'
import kitten from '../assets/kitten.mp4'
import penguins from '../assets/penguins.mp4'
import woman from '../assets/women.mp4'

export const videoItems = [
    {
        id: uuidv4(),
        title: 'Car',
        src: car,
    },
    {
        id: uuidv4(),
        title: 'Cat',
        src: cat,
    },
    {
        id: uuidv4(),
        title: 'Child',
        src: child,
    },
    {
        id: uuidv4(),
        title: 'Cow',
        src: cow,
    },
    {
        id: uuidv4(),
        title: 'Dog',
        src: dog,
    },
    {
        id: uuidv4(),
        title: 'Kitten',
        src: kitten,
    },
    {
        id: uuidv4(),
        title: 'Penguins',
        src: penguins,
    },
    {
        id: uuidv4(),
        title: 'Woman',
        src: woman,
    },
]

export const DIMENTIONS = {
    width: 800,
    height: 500,
}

export const buttonName = {
    START: 'Start',
    STOP: 'Stop',
    TOGGLE_SOURCE: 'Camera source / Video',
}

export const status = {
    START: 'PREPARING for detection, please hold on ...',
    READY: 'READY, detecting',
    STOP: 'STOP detecting',
    NO_RESULTS: 'No results found',
    ERROR: 'ERROR detecting the video, press the START button',
}
