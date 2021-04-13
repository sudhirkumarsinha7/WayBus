import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../theme';
import {wp,hp} from '../../utils/heightWidthRatio';

export default function AppButton(props) {
    const { title, buttonPressed, type, containerStyle, disable, accessibilityLabel, textStyle, testId } = props
    /**
       *  This component display the App button with app theme color throughout the application.
    */
    return (
        <TouchableOpacity testID={testId} accessibilityLabel={testId} nativeID={testId} disabled={(disable) ? disable : false} onPress={() => { (buttonPressed) && buttonPressed() }} style={[styles[type], (disable) && styles.disableColor, containerStyle]}>
            <Text style={[styles[type + 'Text'], textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    borderContainerText: {
        fontSize: Fonts.size.font16,
        color: Colors.blueTheme,
        textAlign: 'center',
        fontWeight:'bold'
    },
    disableColor: {
        backgroundColor: Colors.greyAc,
    },
    withoutContainerText: {
        fontSize: Fonts.size.font16,
        color: Colors.whiteFF,
        textAlign: 'center',
        fontWeight:'bold'
    },
    borderContainer: {
        marginTop: hp(16),
        height: wp(40),
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: wp(25),
        width: wp(320),
        backgroundColor: Colors.whiteFF,
        borderColor: Colors.blueTheme,
        borderWidth: 2

    },
    withoutContainer: {
        marginTop: hp(16),
        height: hp(40),
        borderRadius:10,
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: wp(25),
        width: wp(320),
        backgroundColor: Colors.blueTheme,

    }
})