import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity,ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import { hp, wp } from '../../utils/heightWidthRatio';
import { AppButton } from '../../components';
import styles from './styles';
import * as actions from '../../redux/action';
import { connect } from 'react-redux';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      err : '',
      isLoading : false
    };
  }
sendOtp(){
 const { sendOtp,navigation } = this.props
 console.log("this.state.mobile",this.state.mobileNumber)
  this.setState({err : ''});

 if(this.state.mobileNumber){
   if(this.state.mobileNumber.length == 10){
     this.setState({isLoading : true});

      sendOtp(`91${this.state.mobileNumber}`)
      .then((res)=>{
        if(res.payload.status==200){
          if(res.payload.data.type == 'success'){
            navigation.navigate('Otp',{mobile:this.state.mobileNumber})
          }else{
            if(res.payload.data.message){
              this.setState({err : res.payload.data.message});
            }
          }
        }
        this.setState({isLoading : false});
      })
    } else{
       this.setState({err : 'Mobile number is invalid.'});
    } 
 }else{
   this.setState({err : 'Mobile number is required.'});
 }
}
  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.container} />
          <View style={styles.view}>
            <Text style={styles.title}>Welcome to</Text>
            <Image style={styles.appLogo} source={Images.logoTitle} />
          </View>
          <Image style={styles.apptitleLogo} source={Images.appLogo} />
          <View style={styles.inputView}>
            <Text style={styles.numCode}>+91</Text>
            <Image style={styles.downArrow} source={Images.downArrow} />
            <View style={styles.border} />
            <TextInput
              onChangeText={(val) => { this.setState({ mobileNumber: val }) }}
              style={{alignContent:'center',justifyContent:'center', height:50}}
              placeholder={"Enter Mobile Number"}
              maxLength={10}
              keyboardType={'number-pad'}
            />
          </View>
          
          {this.state.err ? (
            <Text style={{marginLeft:22, color : 'red', fontSize:13}}>{this.state.err ? this.state.err : ''}</Text>
          ) : 
          null }
            
          <AppButton
            testId={"LoginButton"}
            title={"Continue"}
            type={'withoutContainer'}
            disable={false}
            containerStyle={{ alignSelf: 'center' }}
            buttonPressed={() => { this.sendOtp() }}
          />
          <View style={styles.socialContainer}>
            <Text style={styles.signInText}>Sign In With</Text>
            <View style={styles.socialLogoContainer}>
              <TouchableOpacity>
                <Image style={styles.socialLogoIcon} source={Images.fb} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.socialLogoIcon} source={Images.google} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>  
        <ActivityIndicator size="large" color={Colors.blueTheme} animating={this.state.isLoading} style={{bottom:Dimensions.get('window').height/2}} />
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  sendOtp: (mobile) => dispatch(actions.sendOtpAction(mobile)),
});
export default connect(null, mapDispatchToProps)(login)