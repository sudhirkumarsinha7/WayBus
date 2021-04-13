import { StyleSheet } from 'react-native'
import { hp, wp } from '../../utils/heightWidthRatio';
import { Fonts, Images } from '../../theme';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    backgroundColor: colors.whiteF4
  },
  container: {
    width: '100%', 
    height: hp(20), 
    backgroundColor: colors.blueTheme
  },
  view:{
    marginTop: hp(70), 
    marginLeft: wp(20),
  },
  title: {
    color: colors.black4f, 
    fontSize: Fonts.size.font18, 
    fontWeight: 'bold', 
    marginLeft:wp(7)
  },
  appLogo: {
    width: wp(183), 
    height: hp(62), 
    resizeMode: 'contain'
  },
  apptitleLogo: {
    width: wp(246), 
    height: hp(106), 
    resizeMode: 'contain', 
    alignSelf: 'center', 
    marginTop: hp(37),
  },
  inputView: {
    fontSize: Fonts.size.font14, 
    height: hp(48), 
    borderWidth: 1, 
    borderColor: colors.greyE5, 
    width: wp(320), 
    alignItems: 'center', 
    flexDirection: 'row', 
    paddingHorizontal: wp(10), 
    alignSelf: 'center', 
    backgroundColor: colors.whiteFF, 
    borderRadius: 5, 
    marginTop: hp(65)
  },
  numCode: {
    color: colors.blueTheme, 
    fontSize: Fonts.size.font14, 
    fontWeight: 'bold', 
    marginRight: wp(10),
  },
  downArrow: {
    width: wp(12), 
    height: wp(12), 
    resizeMode: 'contain'
  },
  border: {
    width: 1, 
    height: hp(20), 
    backgroundColor: colors.blueTheme,
     marginRight: wp(15), 
     marginLeft: wp(10),
  },
  socialContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginHorizontal:wp(30),
    marginTop:hp(30)
  },
  signInText:{
    color: colors.black4f, 
    fontSize: Fonts.size.font12, 
    fontWeight: 'bold'
  },
  socialLogoContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    
  },
  socialLogoIcon:{
    width: wp(20), 
    height: wp(20), 
    resizeMode: 'contain' 
  }
})

export default styles;