import { StyleSheet } from 'react-native'
import { Fonts } from '../../../theme';
import colors from '../../../theme/colors';
import { hp, wp } from '../../../utils/heightWidthRatio';

const styles = StyleSheet.create({
    mainContainer: { 
      flex: 1, 
      backgroundColor: colors.blueTheme
    },
    header: {
        fontSize: Fonts.size.font16, 
        color: colors.whiteFF ,
        marginLeft: wp(8), 
    },
    mainView: { 
        flex:1,
        marginTop: hp(24), 
        alignItems: 'center', 
        backgroundColor: colors.whiteF4, 
        borderTopLeftRadius: wp(20), 
        borderTopRightRadius: wp(20) 
    },
    otpIcon: { 
        height: hp(131), 
        width: wp(157), 
        marginTop: hp(53) 
    },
    enterText: { 
        color: colors.grey4F, 
        marginTop: hp(36), 
        fontSize: Fonts.size.font14 
    },
    num: { 
        color: colors.grey4F, 
        marginTop: 4, 
        fontSize: Fonts.size.font14 
    },
    otpContainer: { 
        width: '60%',
        marginTop:50, 
        height: hp(60) ,
    },
    codeInput: {
        width: wp(30),
        height: hp(60),
        color : 'black',
        borderWidth: 0,
        borderColor:'#b5b5b5',
        borderBottomWidth: 2,
    },
    bottomView: { 
        paddingHorizontal: wp(18), 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: hp(36), 
        flexDirection: 'row' 
    }
})

export default styles;