import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Images } from '../../theme';
import styles from './styles'

let MoreData = [{ name: "Edit Profile", icon: Images.profile },
{ name: "Wallet", icon: Images.wallet },
{ name: "Cards", icon: Images.card },
{ name: "Refer & Earn", icon: Images.dollor },
{ name: "Help", icon: Images.help },
{ name: "Settings", icon: Images.settings },
{ name: "About Us", icon: Images.about },
{ name: "Logout", icon: Images.logout }]

export default class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goToTab = (tab) => {
    console.log(tab);
    if(tab == 'Wallet') {
      this.props.navigation.navigate('Wallet');
    }else if(tab == 'Cards') {
      this.props.navigation.navigate('Cards');
    }else if(tab == 'Edit Profile') {
      this.props.navigation.navigate('Profile');
    }else if(tab == 'Settings') {
      this.props.navigation.navigate('settings');
    }else if(tab == 'Help') {
      this.props.navigation.navigate('Help');
    }else if(tab == 'About Us') {
      this.props.navigation.navigate('about');
    }
  }

  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.goToTab(item.name)} style={styles.button}>
        <View style={styles.buttonView}>
          <Image style={styles.icons} source={item.icon} />
          <Text style={styles.titles}>{item.name}</Text>
        </View>
        <Image style={styles.icons} source={Images.rightArrow} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.title}>More</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('notification')}>
              <Image style={styles.appLogo} source={Images.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <FlatList
            data={MoreData}
            scrollEnabled={false}
            style={styles.locationContent}
            renderItem={({ item, index }) => this.renderItem(item, index)}
          />
         <View style={styles.logoView}>
         <Image style={styles.logoIcon} source={Images.Wbus} />
         <Text style={[styles.titles, {textAlign:'center'}]}>Version : 1.0</Text>
        </View>
        </View>
      </View>
    );
  }
}
