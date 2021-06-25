import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl,Alert } from 'react-native';
import { SESSION_KEY, DATE_FORMAT } from '../../api/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from '../../redux/action';
import { connect } from 'react-redux';
import { Images } from '../../theme';
import styles from './styles'
import moment from 'moment';
import AppButton from '../../components/appButton/appButton';
let genderObj = { M: 'Male', F: 'Female' };

class BookingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isLoading: false,
      isReady: false,
      ticket: {},
      canCancel: false,
    };
  }
  componentDidMount() {
    this.getBookingDetails();
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getBookingDetails();
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  async getBookingDetails() {
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
          let pnr = this.props.route.params.pnr;
          let userId = this.props.route.params.userId;
          this.props.bookingData(pnr, userId).then(async (res) => {
            if (res.payload.status == 200 && res.payload.data) {
              let bookingInfo = res.payload.data.result.ticket_details;
              this.setState({ ticket: bookingInfo[0], isReady: true, isLoading: false }, () => this.isEligibleForCancel(pnr));
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
  isEligibleForCancel(pnr) {
    this.props.canCancelBooking(pnr).then(async (res) => {
      if (res.payload.status == 200 && res.payload.data) {
        let cancelInfo = res.payload.data.result.is_ticket_cancellable;
        if (cancelInfo && cancelInfo.is_cancellable) {
          this.setState({ canCancel: true});
        }
      }
    });
  }
  CanCancelTicket(pnr, seat_no) {
    this.props.canCancelBooking(pnr).then(async (res) => {
      if (res.payload.status == 200 && res.payload.data) {
        let cancelInfo = res.payload.data.result.is_ticket_cancellable;
        console.log('cancelInfo res'+ JSON.stringify(res ))
        if (cancelInfo && cancelInfo.is_cancellable) {
          this.setState({ canCancel: true,cancelInfo:res.payload.data.result});
          Alert.alert(
            'Are you sure you want to Cancel the Ticket?',
            'Refund Amount ' + cancelInfo.refund_amount,
            [
              {text: 'YES', onPress: () => this.onCancelBooking(pnr, seat_no)},
              {text: 'NO', onPress: () => console.log('Cancel Logging Out')},
            ],
            {cancelable: true},
          );
        }
      }
    });
  }
  async onCancelBooking(pnr, seat_no) {
    this.setState({ isLoading: true });
    // let userId = this.props.route.params.userId;
    // console.log('onCancelBooking userId'+ userId);
    var data = await AsyncStorage.getItem(SESSION_KEY);
      data = JSON.parse(data);
      let userId ='';
      if(data){
        userId = data.email || data.mobile;
      }
    this.props.cancelBooking(pnr, seat_no, userId).then(async (res) => {
      console.log('onCancelBooking res'+ JSON.stringify(res));
      if (res.payload.status == 200) {
        this.setState({ isLoading: false, canCancel: true }, () => this.getBookingDetails());
        alert(res.payload&& res.payload.data&& res.payload.data.response && res.payload.data.response.message||'Tickets canceled Successfully')
      } else {
        this.setState({ isLoading: false });
        alert(res.payload&& res.payload.data&& res.payload.data.response && res.payload.data.response.message)

      }
    });
  }

  render() {
    const { isLoading, isReady, ticket, canCancel } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.centerView}>
              <Image style={[styles.smallIcon, { marginLeft: 0 }]} source={Images.backButton} />
            </TouchableOpacity>
            <Text style={styles.title}>Booking Details</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('notification')}>
              <Image style={styles.appLogo} source={Images.notification} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <ScrollView keyboardShouldPersistTaps="always" refreshControl={<RefreshControl refreshing={this.state.isLoading} onRefresh={() => this.getBookingDetails()} />}>
            <View style={{ marginBottom: 10 }}>
              {(isReady && Object.keys(ticket).length) ?
                <View>
                  <View style={{ marginHorizontal: 16, marginBottom: 30, paddingBottom: 10, marginTop: 11, paddingTop: 12, borderRadius: 4, borderColor: '#4F4F4F33', borderWidth: 1, backgroundColor: '#fff' }}>
                    <View style={{ marginLeft: 12 }}>
                      <Text style={{ marginTop: 2 }}>{ticket.origin} To {ticket.destination}</Text>
                      <Text style={{ marginTop: 8 }}>Journey Date: {moment(ticket.travel_date).format(DATE_FORMAT)}</Text>
                      <Text style={{ marginTop: 8 }}>{ticket.travels}</Text>
                      <Text style={{ marginTop: 8 }}>{ticket.bus_type}</Text>
                    </View>
                    <View style={{ marginTop: 13, paddingLeft: 12, flexDirection: 'row', height: 64, backgroundColor: '#F4F4F4', alignItems: 'center' }}>
                      <Text>{ticket.dep_time}</Text>
                      <View style={{ height: 1, backgroundColor: '#4F4F4F33', width: 30, marginHorizontal: 20 }} />
                      <View style={{ alignItems: 'center' }}>
                        <Image source={Images.busIcon} style={{ height: 19, width: 18 }} />
                        <Text>{(parseInt(ticket.duration.split(':')[0]) + ' h ' + (parseInt(ticket.duration.split(':')[1]) ? (parseInt(ticket.duration.split(':')[1]) + 'm') : ''))}</Text>
                      </View>
                      <View style={{ height: 1, backgroundColor: '#4F4F4F33', width: 30, marginHorizontal: 20 }} />
                      <Text>{ticket.drop_off_details && ticket.drop_off_details.arrival_time}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 15 }}>
                      <View style={{ marginTop: 14, paddingLeft: 12, width: 220 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text>Seat No</Text>
                          <Text style={{ width: 150, color: '#0172E6' }} numberOfLines={1}>: {ticket.seat_numbers}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                          <Text>Ticket No</Text>
                          <Text style={{ width: 150, color: '#0172E6' }} numberOfLines={1}>: {ticket.operator_pnr}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 6, justifyContent: 'space-between' }}>
                          <Text>PNR No</Text>
                          <Text style={{ color: '#0172E6' }} numberOfLines={1}>: {ticket.pnr_number}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 7, justifyContent: 'space-between' }}>
                          <Text>Total Fare</Text>
                          <Text style={{ width: 150, color: '#0172E6' }} numberOfLines={1}>: ₹{ticket.total_fare}</Text>
                        </View>
                      </View>
                      <Image source={ticket.ticket_status == "Confirmed" ? Images.confirmed : Images.cancelled} style={{ height: 86, width: 86, alignSelf: 'center', marginTop: 10 }} />
                    </View>
                    {(ticket.passenger_details && Object.keys(ticket.passenger_details).length) ? (
                      <View style={{ marginLeft: 12, marginTop: 15, marginRight: 12 }}>
                        <Text style={{ ...styles.grayContent, fontSize: 14 }}>Passenger Details</Text>
                        {ticket.passenger_details.map((passenger, i) => {
                          return (
                            <View key={i} style={{ flexDirection: 'row', marginTop: 7, justifyContent: 'space-between' }}>
                              <Text>{(i+1)}. {passenger.title} {passenger.name}</Text>
                              <Text>Age: {passenger.age}</Text>
                              <Text>{passenger.gender && genderObj[passenger.gender]}</Text>
                            </View>
                          );
                        })}


                      </View>
                    ) : <View />}
                    {(ticket.boarding_point_details && Object.keys(ticket.boarding_point_details).length) ? (
                      <View style={{ marginLeft: 12, marginTop: 15 }}>
                        <Text style={{ ...styles.grayContent, fontSize: 14 }}>Boarding Point</Text>
                        <Text>{ticket.boarding_point_details.address}{ticket.boarding_point_details.boarding_stage_address}</Text>
                        <Text>{ticket.boarding_point_details.landmark}</Text>
                      </View>
                    ) : <View />}
                    {(ticket.drop_off_details && Object.keys(ticket.drop_off_details).length) ? (
                      <View style={{ marginLeft: 12, marginTop: 15 }}>
                        <Text style={{ ...styles.grayContent, fontSize: 14 }}>Drop Point</Text>
                        <Text>{ticket.drop_off_details.name}{ticket.drop_off_details.drop_off_address}</Text>
                        <Text>{ticket.drop_off_details.landmark}</Text>
                      </View>
                    ) : <View />}

                    {/*<View style={{marginTop:0, marginTop:15}}>
                      <Text style={styles.grayContent}>Fare Details</Text>
                      <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>
                        <Text style={[styles.lightGrayContent,{flex:1}]}>Ticket Price</Text>
                        <Text style={styles.lightGrayContent}>:</Text>
                        <Text style={[styles.lightGrayContent,{flex:1, textAlign:'right'}]}>₹{fareInfo.totalBaseFare}</Text>
                      </View>

                      <View style={{flexDirection:'row'}}>
                        <Text style={[styles.lightGrayContent,{flex:1}]}>Tax</Text>
                        <Text style={styles.lightGrayContent}>:</Text>
                        <Text style={[styles.lightGrayContent, {flex:1, textAlign:'right'}]}>₹{fareInfo.gst}</Text>
                      </View>

                      <View style={{flexDirection:'row'}}>
                        <Text style={[styles.lightGrayContent,{flex:1}]}>Convenience Fee</Text>
                        <Text style={styles.lightGrayContent}>:</Text>
                        <Text style={[styles.lightGrayContent, {flex:1, textAlign:'right'}]}>₹{parseFloat(fareInfo.operatorFee) + parseFloat(fareInfo.merchantFee)}</Text>
                      </View>

                      <View style={{flexDirection:'row'}}>
                        <Text style={[styles.lightGrayContent,{flex:1}]}>Discount</Text>
                        <Text style={styles.lightGrayContent}>:</Text>
                        <Text style={[styles.lightGrayContent, {flex:1, textAlign:'right'}]}>-₹{fareInfo.discount}</Text>
                      </View>

                      <View style={{flexDirection:'row', justifyContent:'space-between' , marginBottom:10}}>
                        <Text style={[styles.blueText, {flex:1}]}>Total</Text>
                        <Text style={styles.blueText}>:</Text>
                        <Text style={[styles.blueText, {flex:1, textAlign:'right'}]}>₹{fareInfo.finalAmount}</Text>
                      </View>
                    </View>
                   */}
                  </View>
                  {(ticket.qr_code && ticket.qr_code != '') ?
                    <View style={{ marginBottom: 30, justifyContent: "center", alignItems: "center" }}>
                      <Image source={{ uri: ticket.qr_code }} style={{ height: 150, width: 150 }} />
                    </View>
                    : <View />}
                    {/* <View>{JSON.stringify(this.state.cancelBooking)}</View> */}
                    {canCancel && ticket.ticket_status == "Confirmed" ? <AppButton
                    testId={"Cancel"}
                    title={"Cancel"}
                    type={'withoutContainer'}
                    containerStyle={{alignSelf: 'center'}}
                    // buttonPressed={() => { this.onCancelBooking(ticket.pnr_number, ticket.seat_numbers) }}
                    buttonPressed={() => { this.CanCancelTicket(ticket.pnr_number, ticket.seat_numbers) }}
                  />: <Text style={{color: 'red', alignSelf: 'center'}}>
                  This Ticket is Not Cancancellable
                  </Text>}
                 
                </View> :

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 70 }}>
                  <Text style={styles.grayBoldContent}>{isLoading ? "Loading.." : "No Bookings available."}</Text>
                </View>
              }
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  bookingData: (pnr, userId) => dispatch(actions.bookingDetailsAction(pnr, userId)),
  canCancelBooking: (pnr) => dispatch(actions.canCancelAction(pnr)),
  cancelBooking: (pnr, seat_no, userId) => dispatch(actions.cancelBookingAction(pnr, seat_no, userId)),
});

export default connect(null, mapDispatchToProps)(BookingDetails)