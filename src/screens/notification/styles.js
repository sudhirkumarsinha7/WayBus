import { StyleSheet } from 'react-native'
import { hp, wp } from '../../utils/heightWidthRatio';
import { Fonts, Images } from '../../theme';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
    mainContainer: {
        flex:1, 
        backgroundColor: colors.whiteFF,
    },
    container: {
        width:'100%', 
        height:hp(120), 
        backgroundColor: colors.blueTheme,
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(20),
        marginTop: hp(27)
    },
    title: {
        color: colors.whiteFF,
        fontWeight: 'bold',
        fontSize: Fonts.size.font16
    },
    blueContent: {
        color: colors.blueTheme,
        fontSize: Fonts.size.font14
    },
    appLogo: {
        width: wp(22),
        height: wp(22),
        marginRight:wp(10),
        resizeMode: 'contain'
    },
    locationContainer: {
        flex:1,  
        backgroundColor: colors.whiteF4, 
        borderTopLeftRadius: wp(15), 
        borderTopRightRadius:wp(15), 
        marginTop:hp(-40)
    },
    locationContent: {
        marginTop:hp(20),
        marginBottom:hp(10)
    },
    button: {
        flexDirection:'row', 
        alignItems:'center', 
        height:hp(40), 
        width:'90%', 
        alignSelf:'center', 
        backgroundColor: colors.whiteFF, 
        justifyContent:'space-between', 
        marginVertical:hp(6), 
        paddingHorizontal:hp(10), 
        borderRadius:wp(5)
    },
    buttonView: {
        flexDirection:'row', 
        alignItems:'center'
    },
    icons: {
        width: wp(15),
        height: wp(15),
        resizeMode: 'contain',
    },
    titles: {
        fontSize: Fonts.size.font14, 
        color: colors.black34,
        fontWeight:'bold'
    },
    dateRound : {
        height:wp(50),
        width:wp(50),
        borderRadius:50,
        borderColor : colors.blueTheme,
        borderWidth : 1.5,
        alignItems:'center',
        justifyContent:'center',
        padding:5
    },
    logoView:{
        alignSelf:'center',
        marginBottom:hp(20)
    },
    logoIcon:{
        width:wp(40), 
        height: wp(40), 
        resizeMode:'contain', 
        alignSelf:'center', 
        marginBottom:hp(10)
    }

})

export default styles;