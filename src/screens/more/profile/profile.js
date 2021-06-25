import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  TextInput,
} from 'react-native';
import {ACCESS_TOKEN, SESSION_KEY} from '../../../api/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from '../../../redux/action';
import {connect} from 'react-redux';
import {Colors, Fonts, Images} from '../../../theme';
import styles from './styles';
import {hp, wp} from '../../../utils/heightWidthRatio';
import AppButton from '../../../components/appButton/appButton';
import Toast from 'react-native-simple-toast';
import DateTimePickerModal from '../../../components/modals/datePicker';
import moment from 'moment';
import RadioForm from 'react-native-simple-radio-button';
import {RadioButton} from 'react-native-paper';

let genderRadio = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
];

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      avatar: Images.user,
      userName: '',
      name: '',
      email: '',
      mobile: '',
      dateOfBirth: null,
      gender: '',
      isDateTimePickerVisible: false,
      myID: null,
    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getprofiledata();
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  async getprofiledata() {
    this.setState({isLoading: true});
    let {
      userName,
      name,
      email,
      mobile,
      dateOfBirth,
      gender,
      avatar,
      myID,
    } = this.state;
    var data = await AsyncStorage.getItem(SESSION_KEY);
    // console.log('data '+ JSON.stringify(data));
    if (data) {
      data = JSON.parse(data);
      if (typeof data.loginType !== 'undefined') {
        var userId = '';
        if (data.loginType == 'Facebook') {
          userId = data.email ? data.email : '';
          name = data.name;
          email = data.email ? data.email : '';
        } else if (data.loginType == 'Google') {
          userId = data.email;
          name = data.name;
          email = data.email;
          avatar = {uri: data.avatar};
        } else if (data.loginType == 'OTP') {
          userId = data.mobile;
          mobile = data.mobile;
        }
        this.props.getUser(userId).then(async (res) => {
          if (res.payload.status == 200) {
            let user = res.payload.data;
            console.log('user data ' + JSON.stringify(user));

            if (user) {
              if (user.name) {
                name = user.name;
              }
              if (user.email) {
                email = user.email;
              }
              if (user.mobile) {
                mobile = user.mobile;
              }
              if (user.gender) {
                gender = user.gender;
              }
              if (user.dateOfBirth) {
                dateOfBirth = user.dateOfBirth;
              }
              if (user.userName) {
                userName = user.userName;
              }
              if (user._id) {
                myID = user._id;
              }
            }
          }
          this.setState({
            userName,
            name,
            email,
            mobile,
            gender,
            dateOfBirth,
            avatar,
            myID,
            isLoading: false,
          });
        });
      }
    }
  }

  updateProfile() {
    let {userName, name, email, mobile, gender, dateOfBirth, myID} = this.state;
    let data = {
      name: name,
      email: email,
      mobile: mobile,
      gender: gender,
      dateOfBirth: dateOfBirth,
      _id: myID,
    };
    console.log('userName' + userName);
    console.log('update data ' + JSON.stringify(data));
    this.props.updateUser(userName, data).then(async (res) => {
      console.log('updateUser ' + JSON.stringify(res));
      if (res.payload.status == 200) {
        Toast.show('Profile updated successfully!');
        this.getprofiledata();
      } else {
        let message = 'Unable to update your profile!';
        if (typeof res.payload.data !== 'undefined') {
          message = res.payload.data;
        }
        Toast.show(message);
      }
    });
  }
  handleDate(date) {
    let selectedDate = moment(date).format('DD-MM-YYYY');
    this.setState({
      dateOfBirth: selectedDate,
      isDateTimePickerVisible: false,
    });
  }
  render() {
    const {isDateTimePickerVisible, gender} = this.state;
    console.log('gender ' + this.state.gender);
    let index =
      this.state.gender === 'male' ||
      this.state.gender === 'Male' ||
      this.state.gender === 'M'
        ? 0
        : this.state.gender === 'Female' ||
          this.state.gender === 'female' ||
          this.state.gender === 'F'
        ? 1
        : null;
    console.log('gender index' + index);

    return (
      <View style={styles.mainContainer}>
        <DateTimePickerModal
          isDateTimePickerVisible={isDateTimePickerVisible}
          handleDatePicked={(date) => this.handleDate(date)}
          hideDateTimePicker={() => {
            this.setState({isDateTimePickerVisible: false});
          }}
          newDate={new Date(moment().format('YYYY/MM/DD'))}
          minDate={
            new Date(moment().subtract(100, 'years').format('YYYY/MM/DD'))
          }
          maxDate={new Date(moment().subtract(5, 'years').format('YYYY/MM/DD'))}
        />
        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.centerView}>
                <Image
                  style={[styles.smallIcon, {marginLeft: 0}]}
                  source={Images.backButton}
                />
              </TouchableOpacity>
              <Text style={styles.title}>Edit Profile</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('notification')}>
              <Image style={styles.appLogo} source={Images.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={() => this.getprofiledata()}
              />
            }>
            <View style={{flex: 1}}>
              <Image
                style={{
                  height: hp(80),
                  marginTop: 10,
                  marginBottom: 30,
                  resizeMode: 'contain',
                }}
                source={this.state.avatar}
              />

              <View style={styles.eachContainer}>
                <Text style={styles.darkGrayContent}>Edit Your Name</Text>

                <View style={styles.inputContainer}>
                  <View style={styles.inputLabel}>
                    <Text style={styles.grayContent}>Name:</Text>
                  </View>
                  <View style={styles.inputValue}>
                    <TextInput
                      value={this.state.name}
                      onChangeText={(name) => this.setState({name})}
                      style={styles.grayContent}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputLabel}>
                    <Text style={styles.grayContent}>Date of Birth:</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({isDateTimePickerVisible: true})
                    }
                    style={{
                      ...styles.inputValue,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      // value={moment(this.state.dateOfBirth).format('DD-MM-YYYY')}
                      value={moment(this.state.dateOfBirth).format('DD/MM/YYYY') === 'Invalid date'
                      ? this.state.dateOfBirth
                      : moment(this.state.dateOfBirth).format('DD/MM/YYYY')}
                      style={styles.grayContent}
                      onFocus={() =>
                        this.setState({isDateTimePickerVisible: true})
                      }
                    />
                    <Image
                      style={{width: 20, height: 30}}
                      source={require('../../../res/image/calendar.png')}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>

                <View style={{...styles.inputContainer, flexDirection: 'row'}}>
                  <View style={styles.inputLabel}>
                    <Text style={styles.grayContent}>Gender</Text>
                  </View>
                  <View style={{...styles.inputValue, flexDirection: 'row'}}>
                    {/* <RadioForm
                      radio_props={genderRadio}
                      initial={null}
                      buttonSize={12}
                      onPress={(gender) => this.setState({gender})}
                      formHorizontal={true}
                    /> */}
                    {/* <RadioButton.Group
                      onValueChange={(gender) => this.setState({gender})}
                      value={this.state.gender}>
                      <View style={{ flexDirection: 'row',alignItems: 'center'}}>
                      <RadioButton value="male" />
                        <Text>Male</Text>
                      </View>
                      <View style={{ flexDirection: 'row',alignItems: 'center'}}>
                      <RadioButton value="female" />
                        <Text>Female</Text>
                      </View>
                    </RadioButton.Group> */}
                     <View style={{ flexDirection: 'row',alignItems: 'center'}}>
                    <RadioButton
                      value={'male'}
                      status={gender === 'male' ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({gender: 'male'});
                      }}
                    />
                    <Text>Male</Text>
                    </View>
                    <View style={{ flexDirection: 'row',alignItems: 'center'}}>
                    <RadioButton
                      value="female"
                      status={gender === 'female' ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({gender: 'female'});
                      }}
                    />
                    <Text>Female</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.eachContainer}>
                <Text style={styles.darkGrayContent}>Edit Your</Text>

                <View style={styles.inputContainer}>
                  <View style={styles.inputLabel}>
                    <Text style={styles.grayContent}>Email:</Text>
                  </View>
                  <View style={styles.inputValue}>
                    <TextInput
                      keyboardType="email-address"
                      value={this.state.email}
                      onChangeText={(email) => this.setState({email})}
                      style={styles.grayContent}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputLabel}>
                    <Text style={styles.grayContent}>Phone:</Text>
                  </View>
                  <View style={styles.inputValue}>
                    <TextInput
                      keyboardType="numeric"
                      value={this.state.mobile}
                      onChangeText={(mobile) => this.setState({mobile})}
                      style={styles.grayContent}
                    />
                  </View>
                </View>
              </View>

              <AppButton
                testId={'updateProfile'}
                title={'Save'}
                type={'withoutContainer'}
                disable={false}
                containerStyle={{alignSelf: 'center'}}
                buttonPressed={() => this.updateProfile()}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUser: (mobile) => dispatch(actions.getUserAction(mobile)),
  updateUser: (mobile, data) =>
    dispatch(actions.updateUserAction(mobile, data)),
});

export default connect(null, mapDispatchToProps)(Profile);
