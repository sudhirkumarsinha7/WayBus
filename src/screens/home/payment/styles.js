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
        height:hp(115),
        backgroundColor: Colors.blueTheme,
    },
    headerView: {
        justifyContent: 'center',
        paddingHorizontal: wp(20),
        marginTop: hp(20)
    },
    title: {
        color: Colors.whiteFF,
        fontWeight: 'bold',
        fontSize: Fonts.size.font16
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
        width: wp(20),
        height: wp(20),
        resizeMode: 'contain',
        margin:8
    },
    icon: {
        width: wp(15),
        height: wp(15),
        resizeMode: 'contain',
    },
    grayContent : {
        color: Colors.grey4B,
        fontWeight : 'bold',
        fontSize: Fonts.size.font15,
    },
    lightGrayContent : {
        color: Colors.grey4B,
        fontSize: Fonts.size.font13,
    },
    titleBlack: {
        fontSize: Fonts.size.font14,
        fontWeight :'bold', 
        color: Colors.black34,
        marginLeft:wp(10)
    },
    blueText: {
        fontSize: Fonts.size.font14,
        fontWeight :'bold', 
        color: Colors.blueTheme,
    },
    itemContainer : {
        marginTop:wp(10),
        marginBottom:wp(10),
        padding:wp(15),
        borderRadius : 6,
        backgroundColor: Colors.whiteFF,
        borderColor : Colors.blueTheme
    },
    rowContent : {
        padding:5,
        flexDirection:'row', 
        justifyContent : 'space-between', 
        alignItems:'center'
    }

})

export default styles;