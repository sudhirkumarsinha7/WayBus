import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../utils/heightWidthRatio';
import { Fonts, Images, Colors } from '../../../theme';

const styles = StyleSheet.create({
    mainContainer: {
        flex:1, 
        backgroundColor: Colors.whiteFF,
    },
    container: {
        width:'100%', 
        height:hp(120), 
        backgroundColor: Colors.blueTheme,
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(20),
        marginTop: hp(20)
    },
    title: {
        color: Colors.whiteFF,
        fontWeight: 'bold',
        fontSize: Fonts.size.font16
    },
    appLogo: {
        width: wp(32),
        height: wp(32),
        resizeMode: 'contain'
    },
    locationContainer: {
        flex:1,  
        backgroundColor: Colors.whiteF4, 
        borderTopLeftRadius: wp(15), 
        borderTopRightRadius:wp(15), 
        marginTop:hp(-40), 
        alignItems:'center',
        padding : wp(20)
    },
    smallIcon: {
        width: wp(22),
        height: wp(22),
        resizeMode: 'contain',
        margin : wp(10)
    },
    grayContent : {
        color: Colors.grey4B,
        fontWeight : 'bold',
        fontSize: Fonts.size.font15,
    },
    blueContent : {
        color: Colors.blueTheme,
        fontSize: Fonts.size.font20,
        fontWeight:'bold'
    },
    

})

export default styles;