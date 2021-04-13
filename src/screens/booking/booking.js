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

export default class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      booked: true
    };
  }

  renderItem() {
    return (
      <TouchableOpacity onPress={()=>{this.setState({open: true})}} style={{height: 77, backgroundColor: '#fff',  marginHorizontal: 16, marginTop: 11, paddingHorizontal: 12, paddingTop: 12, borderRadius: 4, borderColor: '#4F4F4F33', borderWidth: 1}}>
            <Text>Mumbai To Pune</Text>
            <View style={{flexDirection: 'row', marginTop: 8, justifyContent: 'space-between'}}>
              <Text>27-May-2019</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: this.state.booked ? '#0D9A1E' : 'red'}}>{this.state.booked ? 'Confirmed' : 'Cancelled'}</Text>
                <Image source={Images.confirmIcon} style={{height: 17, width: 17, marginLeft: 6}}/>
              </View>
            </View>
            <Image source={Images.downArrowIcon} style={{height: 5, width: 10, marginTop: 8, alignSelf: 'center'}}/>
          </TouchableOpacity>
    )
  }

  renderDetailItem() {
    return (
      <TouchableOpacity onPress={()=>{this.setState({open: false})}} style={{ height: 262, marginHorizontal: 16, marginTop: 11, paddingTop: 12, borderRadius: 4, borderColor: '#4F4F4F33', borderWidth: 1, backgroundColor: '#fff' }}>
        <Text style={{ marginLeft: 12 }}>Mumbai To Pune</Text>
        <Text style={{ marginTop: 8, marginLeft: 12 }}>27-May-2019</Text>
        <View style={{ marginTop: 13, paddingLeft: 12, flexDirection: 'row', height: 64, backgroundColor: '#F4F4F4', alignItems: 'center' }}>
          <Text>1:00</Text>
          <View style={{ height: 1, backgroundColor: '#4F4F4F33', width: 85, marginHorizontal: 20 }} />
          <View style={{ alignItems: 'center' }}>
            <Image source={Images.busIcon} style={{ height: 19, width: 18 }} />
            <Text>8 Hour</Text>
          </View>
          <View style={{ height: 1, backgroundColor: '#4F4F4F33', width: 85, marginHorizontal: 20 }} />
          <Text>8:00</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 15 }}>
          <View style={{ marginTop: 14, paddingLeft: 12, width: 220 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Seat No</Text>
              <Text style={{ width: 120, color: '#0172E6' }} numberOfLines={1}>: 2,8</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
              <Text>Ticket No</Text>
              <Text style={{ width: 120, color: '#0172E6' }} numberOfLines={1}>: KH432534354</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 6, justifyContent: 'space-between' }}>
              <Text>PNR No</Text>
              <Text style={{ width: 120, color: '#0172E6' }} numberOfLines={1}>: 4325435354</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 7, justifyContent: 'space-between' }}>
              <Text>Total Fare</Text>
              <Text style={{ width: 120, color: '#0172E6' }} numberOfLines={1}>: ₹250</Text>
            </View>
          </View>
          <Image source={this.state.booked ? Images.confirmed : Images.cancelled} style={{ height: 86, width: 86, alignSelf: 'center', marginTop: 10 }} />
        </View>
        <Image source={Images.upArrow} style={{ height: 5, width: 10, marginTop: 8, alignSelf: 'center' }} />
      </TouchableOpacity> 
    )
  }

  render() {
    const {booked} = this.state
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.title}>My Bookings</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('notification')}>
              <Image style={styles.appLogo} source={Images.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <View style={{flexDirection: 'row', marginTop: 22, alignSelf: 'center'}}>
            <TouchableOpacity onPress={()=>{this.setState({booked: true})}} style={{height: 36, width: 164, backgroundColor: !booked ? '#E9E9E9' : '#0172E6', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: !booked ? '#000000' : '#fff'}}>Booked</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({booked: false})}} style={{height: 36, width: 164, backgroundColor: booked ? '#E9E9E9' : '#0172E6', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: booked ? '#000000' : '#fff'}}>Cancelled</Text>
            </TouchableOpacity>
          </View>
        {this.state.open ? this.renderDetailItem() : this.renderItem()}
        </View>
      </View>
    );
  }
}
