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
    bodyContainer: {
        flex:1,  
        backgroundColor: Colors.whiteF4, 
        borderTopLeftRadius: wp(15), 
        borderTopRightRadius:wp(15), 
        marginTop:hp(-50),
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
    blueContent : {
        color: Colors.blueTheme,
        fontSize: Fonts.size.font13,
        fontWeight:'bold'
    },
    grayBoldContent: {
        color: Colors.grey9A,
        fontWeight: 'bold',
        fontSize: Fonts.size.font15,
    },
    lightGrayContent : {
        color: Colors.grey4B,
        fontSize: Fonts.size.font13,
    },
    backIcon: {
        width: wp(20),
        height: wp(20),
        resizeMode: 'contain',
        margin:3
    },
    seatImg: {
        width: wp(50),
        height: wp(50),
        resizeMode: 'contain',
    },
    largeSeatImg: {
        width: wp(60),
        height: wp(70),
        resizeMode: 'contain',
    },
    blueBorderBtn : {
        borderColor: Colors.blueTheme,
        borderWidth:wp(1), 
        borderRadius : wp(5),
        justifyContent:'center',
        alignItems:'center',
        margin:3,
        padding:wp(7),
    },
    tabsContainer : {
        width:'80%',
        paddingTop:5,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    tabBtn :{
        height:45,
        alignItems:'center', 
        justifyContent:'center',
        flex:1
    },
    titleBlack: {
        fontSize: Fonts.size.font14,
        fontWeight :'bold', 
        color: Colors.black34,
        marginLeft:wp(10)
    },
    identifiers : {
        height:20,
        width:20,
        borderColor : Colors.grey9A,
        borderWidth:0.5,
        backgroundColor:Colors.whiteFF,
        marginTop:25
    },
    blackContent : {
        marginTop:5,
        fontSize : Fonts.size.font11,
        fontWeight : 'bold',
        color : Colors.black34
    },
    
})

export default styles;