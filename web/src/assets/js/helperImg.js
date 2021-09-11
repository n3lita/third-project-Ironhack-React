import yoga from '../img/interests/yoga.png'
import happyhour from '../img/interests/happyhour.png'
import art from '../img/interests/art.png'
import dance from '../img/interests/dance.png'
import fashion from '../img/interests/fashion.png'
import fitness from '../img/interests/fitness.png'
import married from '../img/interests/married.png'
import maryjane from '../img/interests/maryjane.png'
import party from '../img/interests/party.png'
import rooftops from '../img/interests/rooftop.png'
import singles from '../img/interests/single.png'
import travel from '../img/interests/travel.png'
import volunteering from '../img/interests/volunteering.png'
import withkids from '../img/interests/withkids.png'
import food from '../img/interests/food.png'



const images = {
    yoga,
    happyhour,
    art, 
    dance, 
    fashion, 
    fitness, 
    married, 
    maryjane, 
    rooftops,
    party,
    singles, 
    travel, 
    volunteering, 
    withkids, 
    food
}

const getImageByName = (name) => {
    return images[name.replace(/\s/g, '')]
}

export default getImageByName