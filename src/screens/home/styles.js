import { StyleSheet } from 'react-native'
import { hp, wp } from '../../utils/heightWidthRatio';
import { Fonts, Images } from '../../theme';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        width: '100%',
        height: '20%',
        backgroundColor: colors.blueTheme
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(20),
        marginTop: hp(20)
    },
    title: {
        color: colors.whiteFF,
        fontWeight: 'bold',
        fontSize: Fonts.size.font16
    },
    appLogo: {
        width: wp(32),
        height: wp(32),
        resizeMode: 'contain'
    },
    locationContainer: {
        width: '92%',
        height: '29%',
        backgroundColor: colors.whiteFF,
        position: 'absolute',
        zIndex: 11111,
        top: hp(65),
        alignSelf: 'center',
        borderRadius: wp(5),
        paddingHorizontal: wp(10)
    },
    locationContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(10),
        marginTop: hp(20)
    },
    blueCircle: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
        backgroundColor: colors.blueTheme,
    },
    dotted: {
        width: wp(0.7),
        height: hp(3),
        borderRadius: wp(1),
        backgroundColor: colors.blueTheme,
        alignSelf: 'center',
        marginTop: hp(2)
    },
    mapPin: {
        width: wp(20),
        height: wp(20),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    textInputView: {
        top:22,
        width: '87%',
        height: hp(110),
        marginLeft: wp(10),
    },
    textInputStyle: {
        width: '90%',
        height: hp(30),
        justifyContent:'center',
    },
    border: {
        width: '95%',
        height: hp(1),
        backgroundColor: colors.greyE2,
        marginVertical: hp(5)
    },
    twoPin: {
        width: wp(26),
        height: wp(26),
        resizeMode: 'contain'
    },
    typeButton: {
        paddingHorizontal: wp(10),
    },
    socialLogoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    overlay: {
        width: wp(20),
        height: wp(20),
        alignSelf: 'center',
        resizeMode:'contain'
    },
    selectedText: {
        marginLeft: wp(3),
        marginTop: hp(5),
        fontSize: Fonts.size.font12,
        color: colors.grey4F
    },
    selectedTextBlue: {
        marginLeft: wp(3),
        marginTop: wp(5),
        fontSize: Fonts.size.font12,
        color: colors.blueTheme,
        fontWeight:'bold'
    }
})

export default styles;