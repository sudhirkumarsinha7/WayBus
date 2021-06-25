import React, {Component} from 'react';
import {
  Keyboard,
  Platform,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Colors, Fonts, Images} from '../../theme';
import {hp, wp} from '../../utils/heightWidthRatio';
import {AppButton} from '../../components';
import styles from './styles';
import * as actions from '../../redux/action';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {SESSION_KEY, ACCESS_TOKEN} from '../../api/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginButton,
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {GAPI_WEB_CLIENT_ID, GOIS_WEB_CLIENT_ID} from '../../api/constant';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      err: '',
      isLoading: false,
    };
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access
      webClientId: GAPI_WEB_CLIENT_ID,
      iosClientId: GOIS_WEB_CLIENT_ID,
      offlineAccess: true,
      hostedDomain: '',
      forceConsentPrompt: true,
      accountName: '',
    });
  }
  componentDidMount() {
    this.initIsLogin();
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.initIsLogin();
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  async initIsLogin() {
    var data = await AsyncStorage.getItem(SESSION_KEY);
    if (data) {
      data = JSON.parse(data);
      if (typeof data.loginType !== 'undefined') {
        this.props.navigation.dispatch(
          CommonActions.reset({index: 0, routes: [{name: 'Tabbar'}]}),
        );
      }
    }
  }

  sendOtp() {
    const {sendOtp, navigation} = this.props;
    //console.log("this.state.mobile", this.state.mobileNumber)
    this.setState({err: ''});
    if (this.state.mobileNumber) {
      if (this.state.mobileNumber.length == 10) {
        this.setState({isLoading: true});
        sendOtp(`91${this.state.mobileNumber}`).then((res) => {
          if (res.payload.status == 200) {
            if (res.payload.data.type == 'success') {
              navigation.navigate('Otp', {mobile: this.state.mobileNumber});
            } else {
              if (res.payload.data.message) {
                this.setState({err: res.payload.data.message});
              }
            }
          }
          this.setState({isLoading: false});
        });
      } else {
        this.setState({err: 'Mobile number is invalid.'});
      }
    } else {
      this.setState({err: 'Mobile number is required.'});
    }
  }
  async registerUser(data) {
    this.setState({isLoading: true});
    let {userName, name, email, mobile, avatar, loginType, token} = data;
    this.props.signupUser(userName, {name, email, mobile}).then(async (res) => {
      await AsyncStorage.setItem(ACCESS_TOKEN, token);
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(data));
      this.props.navigation.dispatch(
        CommonActions.reset({index: 0, routes: [{name: 'Tabbar'}]}),
      );
      this.setState({isLoading: false});
    });
  }
  resetStack = (whichStack) => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: whichStack}],
      }),
    );
  };
  async gSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      let userData = userInfo.user;
      let data = {
        userName: userData.email,
        name: userData.givenName + ' ' + userData.familyName,
        email: userData.email,
        avatar: userData.photo,
        mobile: '',
        loginType: 'Google',
        token: userInfo.idToken,
      };
      this.registerUser(data);
    } catch (error) {
      console.log("gSignIn error: " + JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        this.setState({err: 'Process Cancelled'});
      } else if (error.code === statusCodes.IN_PROGRESS) {
        this.setState({err: 'Process in progress'});
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        this.setState({err: 'Play services are not available'});
      } else {
        this.setState({
          err: 'Something else went wrong... ' + error.toString(),
        });
      }
    }
  }
  fbLoginSuccess(userData, idToken) {
    let data = {
      userName: userData.email,
      name: userData.name,
      email: userData.email,
      avatar: '',
      mobile: '',
      loginType: 'Facebook',
      token: idToken,
    };
    this.registerUser(data);
  }
  getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {string: 'id, name, first_name, last_name, email'},
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          this.fbLoginSuccess(result, token);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  loginWithFacebook = () => {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (login) => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container} />
          <View style={styles.view}>
            <Text style={styles.title}>Welcome to</Text>
            <Image style={styles.appLogo} source={Images.logoTitle} />
          </View>
          <Image style={styles.apptitleLogo} source={Images.appLogo} />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => this.resetStack('Tabbar')}>
            <Text style={{fontWeight: 'bold'}}>Skip Login</Text>
          </TouchableOpacity>
          <View style={styles.inputView}>
            <Text style={styles.numCode}>+91</Text>
            <Image style={styles.downArrow} source={Images.downArrow} />
            <View style={styles.border} />
            <TextInput
              onChangeText={(val) => {
                this.setState({mobileNumber: val});
              }}
              style={{
                width: '100%',
                alignContent: 'center',
                justifyContent: 'center',
                height: 50,
              }}
              placeholder={'Enter Mobile Number'}
              maxLength={10}
              keyboardType={'number-pad'}
            />
          </View>

          {this.state.err ? (
            <Text style={{marginLeft: 22, color: 'red', fontSize: 13}}>
              {this.state.err ? this.state.err : ''}
            </Text>
          ) : null}

          <AppButton
            testId={'LoginButton'}
            title={'Continue'}
            type={'withoutContainer'}
            disable={false}
            containerStyle={{alignSelf: 'center', backgroundcolor: 'green'}}
            buttonPressed={() => {
              Keyboard.dismiss();
              this.sendOtp();
            }}
          />
          <View style={styles.socialContainer}>
            <Text style={styles.signInText}>Sign In With</Text>
            <View style={{...styles.socialLogoContainer}}>
              {/* <View> */}
              <TouchableOpacity
                style={styles.socialIconBtnFb}
                onPress={() => this.loginWithFacebook()}>
                {/* <Image style={styles.socialLogoIcon} source={Images.fb} /> */}
                <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>
                  {' '}
                  f{' '}
                </Text>
                <Text style={styles.socialTextFb}>FACEBOOK</Text>
              </TouchableOpacity>
              {/* <LoginButton
                style={{ width: 160, height: 33, alignItems: "center" }}
                onLoginFinished={(error, result) => {
                  if (error) {
                    console.log("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    console.log("login is cancelled.");
                  } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                      console.log(data);
                      const accessToken = data.accessToken.toString();
                      this.getInfoFromToken(accessToken);
                    });
                  }
                }
                }
                onLogoutFinished={() => console.log("logout.")}
              /> */}
              {/* <GoogleSigninButton
                style={{ width: 160, height: 40 }}
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => this.gSignIn()}
              /> */}
              <TouchableOpacity
                style={styles.socialIconBtnGo}
                onPress={() => this.gSignIn()}>
                <Image style={styles.socialLogoIcon} source={Images.google} />
                <Text style={styles.socialTextGo}>GOOGLE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <ActivityIndicator
          size="large"
          color={Colors.blueTheme}
          animating={this.state.isLoading}
        />
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  sendOtp: (mobile) => dispatch(actions.sendOtpAction(mobile)),
  setSocialLogin: (user) => dispatch(actions.setSocialLogin(user)),
  signupUser: (mobile, data) => dispatch(actions.signupAction(mobile, data)),
});
export default connect(null, mapDispatchToProps)(login);
