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
        fontSize: Fonts.size.font16,
        marginLeft:wp(10)
    },
    grayContent: {
        color: Colors.grey9A,
        fontSize: Fonts.size.font14,
    },
    darkGrayContent : {
        color: Colors.grey4A,
        fontSize: Fonts.size.font14,
    },
    whiteContent: {
        color: Colors.whiteF4,
        fontSize: Fonts.size.font14,
    },
    blueContent : {
        color: Colors.blueTheme,
        fontSize: Fonts.size.font16,
        fontWeight:'bold'
    },
    grayBoldContent: {
        color: Colors.grey9A,
        fontWeight: 'bold',
        fontSize: Fonts.size.font15,
    },
    appLogo: {
        width: wp(20),
        height: wp(20),
        resizeMode: 'contain'
    },
    bodyContainer: {
        flex:1,  
        backgroundColor: Colors.whiteF4, 
        borderTopLeftRadius: wp(15), 
        borderTopRightRadius:wp(15), 
        marginTop:hp(-40),
        padding: wp(15)
    },
    smallIcon: {
        width: wp(14),
        height: wp(14),
        resizeMode: 'contain'
    },
    backIcon: {
        width: wp(20),
        height: wp(20),
        resizeMode: 'contain',
        margin:3
    },
    centerView : {
        alignItems:'center',
        justifyContent:'center'
    },
    eachContainer : {
        backgroundColor: Colors.whiteFF, 
        borderRadius : wp(7),
        padding : wp(10),
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:hp(10),
        marginBottom:hp(10)
    },
    blueButton : {
        backgroundColor: Colors.blueTheme, 
        borderRadius : wp(5),
        justifyContent:'center',
        alignItems:'center',
        paddingTop:wp(7),
        paddingBottom:wp(7),
        paddingLeft:wp(12),
        paddingRight:wp(12),
    },
    blueLine : {
        backgroundColor: Colors.blueTheme, 
        height:hp(2),
        width:wp(30)
    },
    rowContent : {
        flex:1, 
        marginTop:wp(5),
        marginBottom:wp(5),
        flexDirection:'row', 
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    titles: {
        fontSize: Fonts.size.font14,
        fontWeight :'bold', 
        color: Colors.black34,
        marginLeft:wp(10)
    },
    modalTab: {
        height:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
})

export default styles;