import {StyleSheet} from 'react-native';
import {hp, wp} from '../../utils/heightWidthRatio';
import {Fonts, Images} from '../../theme';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.whiteF4,
    position: 'absolute',
  },
  container: {
    width: '100%',
    height: hp(20),
    backgroundColor: colors.blueTheme,
    position: 'absolute',
  },
  view: {
    marginTop: hp(70),
    marginLeft: wp(20),
    // position: 'absolute',
  },
  title: {
    color: colors.black4f,
    fontSize: Fonts.size.font18,
    fontWeight: 'bold',
    marginLeft: wp(7),
  },
  appLogo: {
    width: wp(183),
    height: hp(62),
    resizeMode: 'contain',
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
    marginTop: hp(10),
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
    resizeMode: 'contain',
  },
  border: {
    width: 1,
    height: hp(20),
    backgroundColor: colors.blueTheme,
    marginRight: wp(15),
    marginLeft: wp(10),
  },
  socialContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(26),
    marginTop: hp(30),
  },
  signInText: {
    color: colors.black4f,
    fontSize: Fonts.size.font12,
    fontWeight: 'bold',
  },
  socialLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: hp(30),
    marginBottom: hp(30),
  },
  socialLogoIcon: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  socialIconBtnFb: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    padding: 6,
    backgroundColor: '#4267B2',
    borderRadius: 40,
    width: '40%',
  },
  socialIconBtnGo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    padding: 10,
    borderRadius: 40,
    width: '40%',
    backgroundColor: 'lightgray',
  },
  socialTextFb: {
    color: '#fff',
    fontSize: Fonts.size.font12,
    fontWeight: 'bold',
    marginRight: 10,
  },
  socialTextGo: {
    color: colors.blueTheme,
    fontSize: Fonts.size.font12,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default styles;
