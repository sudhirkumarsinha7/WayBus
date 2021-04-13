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
        padding : wp(20)
    },
    smallIcon: {
        width: wp(22),
        height: wp(22),
        resizeMode: 'contain',
        margin : wp(10)
    },
    grayContent: {
        color: Colors.grey9A,
        fontSize: Fonts.size.font14,
    },
    darkGrayContent : {
        color: Colors.grey4A,
        fontSize: Fonts.size.font14,
        fontWeight : 'bold'
    },
    whiteContent: {
        fontWeight : 'bold',
        color: Colors.whiteF4,
        fontSize: Fonts.size.font14,
    },
    eachContainer : {
        backgroundColor: Colors.whiteFF, 
        borderRadius : wp(7),
        padding : wp(10),
        justifyContent:'center',
        marginTop:hp(10),
        marginBottom:hp(10),
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
    inputContainer : {
        flex:1, 
        borderBottomWidth :1,
        borderColor : Colors.greyED,
        marginTop:wp(10),
        marginBottom:wp(5),
        flexDirection:'row', 
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    inputLabel : {
        flex:1
    },
    inputValue : {
        flex:2,
    }

    

})

export default styles;