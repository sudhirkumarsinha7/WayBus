/**
 * Dynamically height width for compoennts
 * Takes val of component
 *  667 - avg height of mobile
 *  375 - avg width of mobile
 */
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"

export const hp = (val) => {
    return heightPercentageToDP((val / 719) * 100)
}

export const wp = (val) => {
    return widthPercentageToDP((val / 360) * 100)
}