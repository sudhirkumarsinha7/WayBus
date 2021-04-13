import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../../utils/heightWidthRatio';
import { Fonts, Images, Colors } from '../../../../theme';

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
    appLogo: {
        width: wp(183), 
        height: hp(62), 
        resizeMode: 'contain',
        alignSelf:'center',
        marginBottom:25
    },
    title: {
        color: Colors.whiteFF,
        fontWeight: 'bold',
        fontSize: Fonts.size.font15
    },
    backIcon: {
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
        padding : wp(15)
    },
    smallIcon: {
        width: wp(22),
        height: wp(22),
        resizeMode: 'contain',
        margin : wp(10)
    },
    icon : {
        width: wp(15),
        height: wp(15),
        resizeMode: 'contain',
        marginLeft : wp(10),
        marginTop : wp(5)
    },
    grayContent : {
        color: Colors.grey4B,
        fontSize: Fonts.size.font14,
        marginBottom:15
    },
    blueContent : {
        color: Colors.blueTheme,
        fontSize: Fonts.size.font20,
        fontWeight:'bold'
    },
    itemContainer : {
        marginTop:wp(7),
        paddingLeft : wp(15), 
        paddingRight : wp(15),
        height : hp(55),
        borderRadius : 8,
        alignItems:'center', 
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor: Colors.blueTheme,
        borderColor : Colors.blueTheme
    },
    valueContainer : {
        padding:wp(10),
        marginBottom : wp(15),
        borderColor: Colors.greyD5,
        borderWidth:1.5,
        borderTopWidth:0,
        borderRadius : 5
    },
    titleBlack: {
        fontSize: Fonts.size.font18,
        fontWeight :'bold', 
        color: Colors.black34,
    },
    

})

export default styles;