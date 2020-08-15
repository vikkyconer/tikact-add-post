/******************************************
 *  Author : AJITH E S   
 *  Created On : Mon Jul 20 2020
 *******************************************/

import { Dimensions } from 'react-native'
const baseWidth = 392
const baseHeight = 738
const { width, height } = Dimensions.get('window')

//this will return normalized values which will help responsiveness 
export const normalize = (value, isBasedWidth) => {
    if (isBasedWidth) {
        return (value * width) / baseWidth
    }
    return (value * height) / baseHeight
}