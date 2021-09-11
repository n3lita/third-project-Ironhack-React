import yoga from '../img/interests/yoga.png'
import happyhour from '../img/interests/happyhour.png'

const images = {
    yoga,
    happyhour
}

const getImageByName = (name) => {
    return images[name.replace(/\s/g, '')]
}

export default getImageByName