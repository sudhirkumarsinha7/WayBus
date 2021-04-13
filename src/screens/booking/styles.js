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
        marginLeft:wp(10)
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