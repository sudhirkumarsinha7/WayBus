import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity,ScrollView, ActivityIndicator, Dimensions} from 'react-native';
import { Colors, Fonts, Images } from '../../../theme';
import { hp, wp } from '../../../utils/heightWidthRatio';
import { CommonActions } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import colors from '../../../theme/colors';
import styles from './styles';
import * as actions from '../../../redux/action';
import { connect } from 'react-redux';

class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      code: '',
      count : 60,
      err : '',
      isLoading : false
    };
  }

  componentDidMount = () => {
    this.onCount();
  }

  resetStack = (whichStack) => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: whichStack }],
      }),
    );
  };
  
  nextPressed(){
    const { verifyOtp,route } = this.props
    let mobile=route.params.mobile
    console.log("mobile",mobile);

    if(this.state.code && this.state.code.length == 4 ){
      this.setState({isLoading : true});

      verifyOtp(mobile,this.state.code)
        .then((res)=>{
          console.log(res.payload);
          console.log("res",res.payload.status)
          if(res.payload.status==200){
            if(res.payload.data.type == 'success'){
              this.resetStack('Tabbar');
            }else{
              if(res.payload.data.message){
                this.setState({err : res.payload.data.message});
              }
            }
          }
          this.setState({isLoading : false});
        })
    } else{
      this.setState({err : 'Please enter 4 digit otp.'});
    }    
  }

  resend = () => {
    const { resendOtp,route } = this.props
    let mobile=route.params.mobile

    resendOtp(mobile,'text')
    .then((res)=>{
      console.log("res resend otp",res.payload.status)
      console.log(res.payload);
      if(res.payload.status==200){
        if(res.payload.data.type == 'success'){
          console.log(res.payload.data);
          this.setState({count : 60});
          this.onCount();
        }
      }
    })
  }

  onCount = () => {
    var count = this.state.count;
    this.timer = setInterval(() => {
      if(count >= 0){
        // console.log(count); 
        this.setState({count : count--})
      }   
    }, 1000)    
  }

  render() {

    const {count} =this.state;
    return (
      <View style={styles.mainContainer}>

        <View style={{flexDirection : 'row', alignItems:'center', marginTop: hp(25), marginLeft: wp(16) }}>
          <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.centerView}>
            <Image style={{height:20, width:20, resizeMode:'contain'}} source={Images.backButton} />
          </TouchableOpacity>
          <Text style={styles.header}>Verification</Text>
        </View>  

          <View style={styles.mainView}>
            <ScrollView style={{flex:1, width:'100%'}}>
              <View style={{flex:1, alignItems:'center'}}>
                <Image source={Images.otpIcon} resizeMode={'contain'} style={styles.otpIcon} />
                <Text style={styles.enterText}>Enter Your Verification Code</Text>
                <Text style={styles.num}>we just sent you on your mobile number</Text>
                <OTPInputView
                  style={styles.otpContainer}
                  pinCount={4}
                  code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  onCodeChanged={code => { this.setState({ code }) }}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.codeInput}
                  codeInputHighlightStyle={{
                    borderColor: 'gray',
                  }}
                  onCodeFilled={(code) => {
                    console.log(`Code is ${code}, you are good to go!`)
                  }}
                />
                {this.state.err ? (
                  <Text style={{marginLeft:12, width:'60%', color : 'red', fontSize:13}}>{this.state.err ? this.state.err : ''}</Text>
                ) : 
                null }

                <View style={styles.bottomView}>
                {count > 0 ? (
                  <Text style={{ color: colors.blueTheme }}>{count} seconds left</Text>
                ) : (
                  <View style={{borderColor:colors.blueTheme}}>
                    <Text onPress={()=> this.resend()} style={{ color: colors.blueTheme }}>Resend</Text>
                  </View>
                )}  
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginRight: wp(13) }}>Verify</Text>
                    <TouchableOpacity onPress={()=>{this.nextPressed()}}>
                      <Image source={Images.nextArrow} style={{ height: wp(38), width: wp(38) }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>  
            </ScrollView>  
          </View>
        <ActivityIndicator size="large" color={Colors.blueTheme} animating={this.state.isLoading} style={{bottom:Dimensions.get('window').height/1.8}} />

      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  verifyOtp: (mobile,otp) => dispatch(actions.verifyOtpAction(mobile,otp)),
  resendOtp: (mobile,type) => dispatch(actions.resendOtpAction(mobile,type)),
});
export default connect(null, mapDispatchToProps)(Otp)