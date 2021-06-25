import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {ACCESS_TOKEN, SESSION_KEY} from '../../api/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk';
import {Images} from '../../theme';
import styles from './styles';

let MoreData = [
  {id: 1, name: 'Edit Profile', icon: Images.profile},
  // { id: 2, name: "Wallet", icon: Images.wallet },
  // { id: 3, name: "Cards", icon: Images.card },
  // { id: 4, name: "Refer & Earn", icon: Images.dollor },
  {id: 5, name: 'Help', icon: Images.help},
  {id: 6, name: 'Settings', icon: Images.settings},
  {id: 7, name: 'About Us', icon: Images.about},
  {id: 8, name: 'Logout', icon: Images.logout},
];
let MoreDataGuest = [
  {id: 5, name: 'Help', icon: Images.help},
  {id: 6, name: 'Settings', icon: Images.settings},
  {id: 7, name: 'About Us', icon: Images.about},
  {id: 8, name: 'Login', icon: Images.about},
];

export default class More extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount(){
    let  data = await AsyncStorage.getItem(SESSION_KEY);
    if(data){
      this.setState({list: MoreData})
    }else{
      this.setState({list:MoreDataGuest})
    }
  }
  async logoutNow() {
    LoginManager.logOut();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    await AsyncStorage.removeItem(ACCESS_TOKEN);
    await AsyncStorage.removeItem(SESSION_KEY);
    this.props.navigation.dispatch(
      CommonActions.reset({index: 0, routes: [{name: 'LoginStack'}]}),
    );
  }
  goToTab = (tab) => {
    if (tab == 'Wallet') {
      this.props.navigation.navigate('Wallet');
    } else if (tab == 'Cards') {
      this.props.navigation.navigate('Cards');
    } else if (tab == 'Edit Profile') {
      this.props.navigation.navigate('Profile');
    } else if (tab == 'Settings') {
      this.props.navigation.navigate('settings');
    } else if (tab == 'Help') {
      this.props.navigation.navigate('Help');
    } else if (tab == 'About Us') {
      this.props.navigation.navigate('about');
      
    } else if (tab == 'Login') {
      this.props.navigation.dispatch(
        CommonActions.reset({index: 0, routes: [{name: 'LoginStack'}]}),
      );
    }  else if (tab == 'Logout') {
      // this.logoutNow();
      Alert.alert(
        'Confirm Logging Out',
        'Ticket booking are faster when you logged in. Are you sure you want to logout?',
        [
          {text: 'YES', onPress: () => this.logoutNow()},
          {text: 'NO', onPress: () => console.log('Cancel Logging Out')},
        ],
        {cancelable: true},
      );
    }
  };

  renderItem(item, key) {
    return (
      <TouchableOpacity
        key={key}
        onPress={() => this.goToTab(item.name)}
        style={styles.button}>
        <View style={styles.buttonView}>
          <Image style={styles.icons} source={item.icon} />
          <Text style={styles.titles}>{item.name}</Text>
        </View>
        <Image style={styles.icons} source={Images.rightArrow} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.title}>More</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('notification')}>
              <Image style={styles.appLogo} source={Images.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <FlatList
            data={this.state.list}
            scrollEnabled={false}
            style={styles.locationContent}
            renderItem={({item, index}) => this.renderItem(item, index)}
            keyExtractor={(item) => {
              item.id;
            }}
          />
          <View style={styles.logoView}>
            <Image style={styles.logoIcon} source={Images.Wbus} />
            <Text style={[styles.titles, {textAlign: 'center'}]}>
              Version : 1.0
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
