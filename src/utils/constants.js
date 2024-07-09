import { v4 as uuidv4 } from 'uuid'
import cars_in_desert from '../assets/cars_in_desert.mp4'
import cat from '../assets/cat.mp4'
import child from '../assets/child.mp4'
import cow from '../assets/cow.mp4'
import dog from '../assets/dog.mp4'
import kitten from '../assets/kitten.mp4'
import penguins from '../assets/penguins.mp4'
import running_man from '../assets/running_man.mp4'

export const videoItems = [
    {
        id: uuidv4(),
        title: 'Cars in a desert',
        src: cars_in_desert,
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
        title: 'Running person',
        src: running_man,
    },
]

export const DIMENTIONS = {
    width: 800,
    height: 500,
}

export const buttonName = {
    START: 'Start Detecting',
    STOP: 'Stop Detecting',
    TOGGLE_SOURCE: 'Camera source / Video',
}

export const status = {
    START: 'Start detecting...',
    READY: 'READY, detecting',
    STOP: 'Stop detecting',
    NO_RESULTS: 'No results found',
    ERROR: 'Error detecting the video',
}
