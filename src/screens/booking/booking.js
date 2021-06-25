import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { SESSION_KEY } from '../../api/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from '../../redux/action';
import { connect } from 'react-redux';
import { Images } from '../../theme';
import styles from './styles'
import moment from 'moment';


class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      booked: 'Upcoming', /**Upcoming/Past/Cancelled */
      isLoading: true,
      isReady: false,
      upcomingBookings: [],
      pastBookings: [],
      cancelBookings: [],
    };
  }
  componentDidMount() {
    this.getBookingList();
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getBookingList();
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  async getBookingList() {
    const { navigation } = this.props;
    this.setState({ isLoading: true });
    var data = await AsyncStorage.getItem(SESSION_KEY);
    if (data) {
      data = JSON.parse(data);
      if (typeof data.loginType !== "undefined") {
        var userId = '';
        if (data.loginType == "OTP") {
          userId = data.mobile;
        } else if (data.loginType == "Google") {
          userId = data.email;
        } else if (data.loginType == "Facebook") {
          userId = data.email ? data.email : '';
        }
        if (userId != '') {
          //userId = '8095641756';
          this.props.bookingList(userId).then(async (res) => {
            if (res.payload.status == 200 && res.payload.data) {
              let upcomingBookings = [];
              let pastBookings = [];
              let cancelBookings = [];
              if (res.payload.data.length > 0) {
                res.payload.data.map((row, i) => {
                  if (row.ticketStatus) {
                    if (row.ticketStatus == "Confirmed") {
                      if (moment().isAfter(row.travelDate)) {
                        pastBookings.push(row);
                      } else {
                        upcomingBookings.push(row);
                      }
                    } else if (row.ticketStatus == "Cancelled") {
                      cancelBookings.push(row);
                    }
                  }
                });
              }
              this.setState({ upcomingBookings, pastBookings, cancelBookings, isReady: true, isLoading: false });
            } else {
              this.setState({ isReady: true, isLoading: false });
            }
          });
        } else {
          this.setState({ isReady: true, isLoading: false });
        }
      } else {
        this.setState({ isReady: true, isLoading: false });
      }
    } else {
      this.setState({ isReady: true, isLoading: false });
    }
  }
  goToDetails(item) {
    this.props.navigation.navigate('BookingDetails', { pnr: item.ticketNumber, userId: item.contactNumber });
  }
  renderItem({ item, index }) {
    return (
      <TouchableOpacity key={index} onPress={() => this.goToDetails(item)} style={{ height: 77, backgroundColor: '#fff', marginHorizontal: 16, marginTop: 11, paddingHorizontal: 12, paddingTop: 12, borderRadius: 4, borderColor: '#4F4F4F33', borderWidth: 1 }}>
        <Text>{item.origin} To {item.destination}</Text>
        <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
          <Text>{item.travelDate}</Text>
          <Text>₹ {item.fareDetails.finalAmount ?? 0}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: item.ticketStatus == 'Confirmed' ? '#0D9A1E' : 'red' }}>{item.ticketStatus}</Text>
            <Image source={item.ticketStatus == "Confirmed" ? Images.confirmIcon : Images.closeIcon} style={{ height: 17, width: 17, marginLeft: 6 }} />
          </View>
        </View>
        {/* <Image source={Images.downArrowIcon} style={{ height: 5, width: 10, marginTop: 8, alignSelf: 'center' }} /> */}
      </TouchableOpacity>
    )
  }

  render() {
    const { booked, isLoading, isReady, upcomingBookings, pastBookings, cancelBookings } = this.state;
    let bookingDataList = [];
    if (booked == "Upcoming") {
      bookingDataList = upcomingBookings;
    } else if (booked == "Past") {
      bookingDataList = pastBookings;
    } else {
      bookingDataList = cancelBookings;
    }
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
          <View style={{ flexDirection: 'row', marginTop: 22, alignSelf: 'center' }}>
            <TouchableOpacity onPress={() => { this.setState({ booked: "Upcoming" }) }} style={{ height: 36, width: 120, backgroundColor: booked == "Upcoming" ? '#0172E6' : '#E9E9E9', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: booked == "Upcoming" ? '#fff' : '#000000' }}>Upcoming</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setState({ booked: "Past" }) }} style={{ height: 36, width: 120, backgroundColor: booked == "Past" ? '#0172E6' : '#E9E9E9', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: booked == "Past" ? '#fff' : '#000000' }}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setState({ booked: "Cancelled" }) }} style={{ height: 36, width: 120, backgroundColor: booked == "Cancelled" ? '#0172E6' : '#E9E9E9', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: booked == "Cancelled" ? '#fff' : '#000000' }}>Cancelled</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 50 }}>
            {(isReady && bookingDataList.length > 0) ?
              <FlatList
                style={{ marginBottom: 10 }}
                ref={'scrollView'}
                refreshing={true}
                data={bookingDataList}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={item => { item._id }}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isLoading}
                    onRefresh={() => this.getBookingList()}
                  />
                }
              /> :
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <Text style={styles.grayBoldContent}>{isLoading ? "Loading.." : "No Bookings available."}</Text>
              </View>
            }
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  bookingList: (data) => dispatch(actions.bookingListAction(data))
});

export default connect(null, mapDispatchToProps)(Booking)