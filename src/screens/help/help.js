import React, {Component} from 'react';
import {
  Keyboard,
  Linking,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {SESSION_KEY, DATE_FORMAT} from '../../api/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import * as actions from '../../redux/action';
import {connect} from 'react-redux';
import {Images} from '../../theme';
import styles from './styles';
const emailRegx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

class HelpSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isReady: false,
      filePresent: false,
      selectedFile: null,
      subject: '',
      pnr: '',
      name: '',
      mobile: '',
      email: '',
      question: '',
      errors: {},
    };
  }
  componentDidMount() {
    this.getUser();
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getUser();
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  async getUser() {
    const {navigation} = this.props;
    this.setState({isLoading: true});
    var data = await AsyncStorage.getItem(SESSION_KEY);
    if (data) {
      data = JSON.parse(data);
      if (typeof data.loginType !== 'undefined') {
        if (data.loginType == 'OTP') {
          this.setState({mobile: data.mobile, isReady: true, isLoading: false});
        } else if (data.loginType == 'Google') {
          let name = data.name;
          this.setState({
            email: data.email,
            name,
            isReady: true,
            isLoading: false,
          });
        } else if (data.loginType == 'Facebook') {
          let name = data.name;
          this.setState({
            email: data.email ? data.email : '',
            name,
            isReady: true,
            isLoading: false,
          });
        }
      } else {
        this.setState({isReady: true, isLoading: false});
      }
    } else {
      this.setState({isReady: true, isLoading: false});
    }
  }
  sendQuery() {
    Keyboard.dismiss();
    const {subject, pnr, name, mobile, email, question} = this.state;
    let errors = {};
    if (subject == '' || subject.length < 4) {
      errors.subject = 'Please enter valid subject!';
    } else if (pnr == '' || pnr.length < 8) {
      errors.pnr = 'Please enter valid pnr number!';
    } else if (name == '' || name.length < 4) {
      errors.name = 'Please enter valid name!';
    } else if (mobile == '' || mobile.trim().length != 10) {
      errors.mobile = 'Please enter valid mobile!';
    } else if (email == '' || !emailRegx.test(String(email).toLowerCase())) {
      errors.email = 'Please enter valid email!';
    } else if (question == '' || name.length < 10) {
      errors.question = 'Please enter valid question(more than 10 character)!';
    } else {
      errors = {};
    }
    this.setState({errors});
    if (!(Object.keys(errors).length > 0)) {
      this.setState({isLoading: true});
      var bodyFormData = new FormData();
      bodyFormData.append('subject', subject);
      bodyFormData.append('pnr', pnr);
      bodyFormData.append('name', name);
      bodyFormData.append('mobile', mobile);
      bodyFormData.append('email', email);
      bodyFormData.append('question', question);
      this.props.saveQuery(bodyFormData).then(async (res) => {
        if (res.payload.status == 200) {
          Toast.show(
            'You query submitted successfully! We will get back to you soon!',
          );
          this.setState(
            {
              subject: '',
              pnr: '',
              name: '',
              mobile: '',
              email: '',
              question: '',
            },
            () => {
              this.getUser();
            },
          );
        } else {
          let message = 'Unable to submit your request!';
          if (typeof res.payload.data !== 'undefined') {
            message = res.payload.data;
          }
          Toast.show(message);
        }
        this.setState({isLoading: false});
      });
    }
  }

  render() {
    const {subject, pnr, name, mobile, email, question} = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.title}>Help</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('notification')}>
              <Image style={styles.appLogo} source={Images.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={() => this.getUser()}
              />
            }>
            <TextInput
              numberOfLines={1}
              value={subject}
              style={{
                marginHorizontal: 12,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#4F4F4F1A',
                marginTop: 22,
                paddingHorizontal: 12,
                height: 40,
                backgroundColor: '#fff',
              }}
              onChangeText={(val) => this.setState({subject: val})}
              placeholder={'Subject'}
            />
            {this._renderError('subject')}
            <TextInput
              numberOfLines={1}
              value={pnr}
              style={{
                marginHorizontal: 12,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#4F4F4F1A',
                marginTop: 22,
                paddingHorizontal: 12,
                height: 40,
                backgroundColor: '#fff',
              }}
              onChangeText={(val) => this.setState({pnr: val})}
              placeholder={'Enter PNR Number'}
            />
            {this._renderError('pnr')}
            <TextInput
              numberOfLines={1}
              value={name}
              style={{
                marginHorizontal: 12,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#4F4F4F1A',
                marginTop: 22,
                paddingHorizontal: 12,
                height: 40,
                backgroundColor: '#fff',
              }}
              onChangeText={(val) => this.setState({name: val})}
              placeholder={'Enter Your Name'}
            />
            {this._renderError('name')}
            <TextInput
              numberOfLines={1}
              value={mobile}
              style={{
                marginHorizontal: 12,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#4F4F4F1A',
                marginTop: 11,
                paddingHorizontal: 12,
                height: 40,
                backgroundColor: '#fff',
              }}
              onChangeText={(val) => this.setState({mobile: val})}
              placeholder={'Enter Contact Number'}
            />
            {this._renderError('mobile')}
            <TextInput
              numberOfLines={1}
              value={email}
              style={{
                marginHorizontal: 12,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#4F4F4F1A',
                marginTop: 11,
                paddingHorizontal: 12,
                height: 40,
                backgroundColor: '#fff',
              }}
              onChangeText={(val) => this.setState({email: val})}
              placeholder={'Enter Email Id'}
            />
            {this._renderError('email')}
            <TextInput
              numberOfLines={4}
              value={question}
              style={{
                marginHorizontal: 12,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#4F4F4F1A',
                marginTop: 11,
                paddingHorizontal: 12,
                height: 100,
                backgroundColor: '#fff',
              }}
              onChangeText={(val) => this.setState({question: val})}
              placeholder={'Question Description'}
            />
            {this._renderError('question')}
            <TouchableOpacity
              onPress={() => this.sendQuery()}
              style={{
                height: 40,
                marginHorizontal: 16,
                marginTop: 15,
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0172E6',
              }}>
              <Text style={{color: '#fff'}}>Submit</Text>
            </TouchableOpacity>
            <Text style={{color: '#4F4F4F', marginTop: 19, marginLeft: 16}}>
              Reach out to us
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 12,
                marginLeft: 16,
              }}>
              <Image
                resizeMode={'contain'}
                source={Images.mail}
                style={{height: 10, width: 14}}
              />
              <TouchableOpacity
                onPress={() => Linking.openURL('mailto:support@waybus.in')}>
                <Text style={{color: 'blue', marginLeft: 8}}>
                support@waybus.in
                </Text>
              </TouchableOpacity>
              {/* <Text style={{color: '#4F4F4F', marginLeft: 8}}>
                support@waybus.in
              </Text> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginLeft: 16,
              }}>
              <Image
                resizeMode={'contain'}
                source={Images.smartphone}
                style={{height: 10, width: 14}}
              />
              <TouchableOpacity
                onPress={() => Linking.openURL('tel:8095858591')}>
                <Text style={{color: 'blue', marginLeft: 8}}>
                  8095858591
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL('tel:8095858592')}>
                <Text style={{color: 'blue', marginLeft: 8}}>
                  8095858592
                </Text>
              </TouchableOpacity>

            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginLeft: 16,
              }}>
              <Image
                resizeMode={'contain'}
                source={Images.headphone}
                style={{height: 10, width: 14}}
              />
              <Text style={{color: '#4F4F4F', marginLeft: 8}}>24/7</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
  _renderError(key) {
    const {errors} = this.state;
    if (
      Object.keys(errors).length > 0 &&
      errors.hasOwnProperty(key) &&
      errors[key] !== ''
    ) {
      return (
        <Text style={{margin: 5, marginLeft: 15, fontSize: 12, color: 'red'}}>
          {errors[key]}
        </Text>
      );
    } else {
      return <View />;
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveQuery: (params) => dispatch(actions.saveHelpAction(params)),
});

export default connect(null, mapDispatchToProps)(HelpSupport);
