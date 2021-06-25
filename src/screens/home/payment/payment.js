import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Modal,Button, TextInput,Dimensions, ActivityIndicator } from 'react-native';
import { Images, Colors, Fonts } from '../../../theme';
import styles from './styles';
import moment from 'moment';
import { hp, wp } from '../../../utils/heightWidthRatio';
import AppButton from '../../../components/appButton/appButton';
import * as actions from '../../../redux/action';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { PAYMENT_MODE } from '../../../api/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SESSION_KEY, ACCESS_TOKEN} from '../../../api/constant';

class payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commonErr : '',
      fareInfo : null,
      busDetails : null,
      showfareInfo : false,
      isLoading : false,
      showModal : false,
      pnr : '',

      config : null,
      webViewData : '',
      tickedBookedSuccess: false,
      ticketDetails: null
    };
    this.formRef = React.createRef();
  }

  componentDidMount = async () => {
    console.log('this.props.route.params');
    console.log(this.props.route.params)
    this.setState({
      fareInfo : this.props.route.params.fareInfo,
      busDetails : this.props.route.params.busDetails
    })
    console.log(this.props.route.params.busDetails);

  }

  onTentativeBooking = () => {
    this.setState({isLoading : true});
    const { tentativeBooking,navigation } = this.props
    const { scheduleId, passengerTypes, selectedPickup, selectedDrop, date, originId, destId, contactDetail } = this.props.route.params;
    if(moment(date).format('YYYY-MM-DD') < moment(new Date()).format('YYYY-MM-DD')){
      console.log("date is greater than today's date");
      this.props.navigation.navigate('Home');
    }

    this.setState({
      commonErr : ''
    })

    var id = scheduleId;
    var data = {
       "book_ticket": {
         "seat_details": {
           "seat_detail": passengerTypes
         },
         "contact_detail": contactDetail
       },
       "origin_id": originId.toString(),
       "destination_id": destId.toString(),
       "boarding_at": selectedPickup,
       "drop_of": selectedDrop,
       "no_of_seats": passengerTypes.length,
       "travel_date": moment(date).format('YYYY-MM-DD'),
       "customer_company_gst": {
         "name": "REDBUS",
         "gst_id": "T123DT",
         "address": "TEST"
       },
       fareDetails :this.state.fareInfo
       // fareDetails : {
       //    totalBaseFare: {totalBasefare},
       //    gst: ${totalGST of the seats},
       //    finalAmount: ${totalBasefare + GST},
       //    merchantFee: {2% of the finalAmount},
       //    operatorFee: ${convenience_charge_percent of},
       //    fares: [type of array, fare of each seats],
       //    discount: ${5% discount from base fare Max 50}
       //  }
    }

    console.log('data');
    console.log(data);
    console.log(data.book_ticket.seat_details);
    const orderId = Math.round((new Date()).getTime() / 1000);

    console.log(id);
    console.log(orderId);

    

    tentativeBooking(id,orderId, data)
    .then((res)=>{
      console.log('res');
      console.log(res);
      if(res.payload.status==200){
        console.log('adding passenger');
        console.log(res.payload.data.result);
        if(res.payload.data.result){
          if(res.payload.data.result.ticket_details){
            var tktDetails = res.payload.data.result.ticket_details;
            const {mobilePayment} = this.props;
            const { contactDetail, fareInfo } = this.props.route.params;
            
            const requestHeader = {
              amount: fareInfo.finalAmount,
              email: contactDetail.email,
              contact: contactDetail.mobile_number,
              sourceType: PAYMENT_MODE,
              orderId
            }
            console.log('mobilePayment requestHeader'+ JSON.stringify(requestHeader))
            mobilePayment(requestHeader).then((res) => {
              console.log('mobilePayment res'+ JSON.stringify(res))
              this.setState({ 
                webViewData: res.payload.data,
                pnr: tktDetails.pnr_number, showModal: true
              });
            });
          }
        }else {
          console.log(res.payload.data.response.message);
          this.setState({commonErr : res.payload.data.response.message});
        }

      }
      this.setState({isLoading : false});
    })
  }

    onConfirmPayment = async (pnrN) => {
      const { confirmPayment,navigation } = this.props;
      const { contactDetail, fareInfo } = this.props.route.params;
      const {pnr, webViewData} = this.state;
      var data = await AsyncStorage.getItem(SESSION_KEY);
      data = JSON.parse(data);
      let userId ='';
      if(data){
        userId = data.email || data.mobile;
      }
      console.log(pnrN);
      console.log(pnr);
      console.log(pnr);
      this.setState({isLoading : true});
      const request = {
        user:  data.email || data.mobile,
        phone: contactDetail.mobile_number,
        email: contactDetail.email,
        gst: fareInfo.gst,
        order_id: webViewData.orderId,
        discount: fareInfo.discount,
        convenienceFee: parseFloat(fareInfo.operatorFee) + parseFloat(fareInfo.merchantFee)
      }
      console.log('confirmPayment request '+ JSON.stringify(request));
      console.log('confirmPayment pnr '+ JSON.stringify(pnr));
      confirmPayment(pnr, request)
      .then((res)=>{
        console.log('confirmPayment res '+ JSON.stringify(res));
        if(res.payload.status==200){
          console.log('confirm booking');
          console.log(res.payload);
          console.log(res.payload.data);
          console.log(res.payload.data.result);
          if(res.payload.data.result){
            if(res.payload.data.result.ticket_details){
              this.setState({showModal : false, tickedBookedSuccess: true, ticketDetails: res.payload.data.result.ticket_details});
              //  this.props.navigation.navigate('Booking');
            }
          }else {
            console.log(res.payload.data.response.message);
          }

        }else{
          console.log('res false');
          console.log(res);
        }
        this.setState({isLoading : false});
      })  
    }

  sendRequest(val) {
    console.log(val);
    this.setState({ selectedGender: val })
  }



  _onNavigationStateChange = async (webViewState) => {
    console.log('_onNavigationStateChange webViewState.url');
    // console.log(webViewState);
    // console.log(webViewState.url);
    var url = webViewState.url;
    console.log('_onNavigationStateChange webViewState' + JSON.stringify(webViewState));
    // console.log(webViewState.title);
    console.log(url.split('?')[0]);
    let str = url.split('?')[0];
    let splitData = str.split("/")
    let proessCheck =  splitData[splitData.length - 1];
    // if (webViewState.title === "Payment Success") {
      if (webViewState.title === "Payment Success"|| proessCheck==='processNbkReq') {
      // success payment will give the status with title
      this.onConfirmPayment(this.state.pnr);
    }
  }


  ActivityIndicatorLoadingView() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <ActivityIndicator
          size="large"
          color={Colors.blueTheme}
        />
      </View>
    );
  }


  render() {
    console.log('this.state.encRequest');
    console.log(this.state.encRequest);
    const { busDetails, fareInfo , isLoading, webViewData, tickedBookedSuccess, pnr, ticketDetails} = this.state;
    if (tickedBookedSuccess) {
      return (
        <View style={styles.mainContainer}>
          <View style={styles.locationContainer}>
            <View style={{ flex: 1 }}>
              <View style={styles.itemContainer}>
                <Text style={[styles.grayContent, { fontSize: Fonts.size.font18, marginBottom: 10, alignSelf: 'center', textDecorationLine: 'underline' }]}>Ticket Booked Succesfully</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.lightGrayContent, { flex: 1 }]}>PNR</Text>
                  <Text style={styles.lightGrayContent}>:</Text>
                  <Text style={[styles.lightGrayContent, { flex: 1, textAlign: 'right' }]}>{pnr}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.lightGrayContent, { flex: 1 }]}>Status</Text>
                  <Text style={styles.lightGrayContent}>:</Text>
                  <Text style={[styles.lightGrayContent, { flex: 1, textAlign: 'right' }]}>{ticketDetails.ticket_status}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.lightGrayContent, { flex: 1 }]}>Origin</Text>
                  <Text style={styles.lightGrayContent}>:</Text>
                  <Text style={[styles.lightGrayContent, { flex: 1, textAlign: 'right' }]}>{ticketDetails.origin}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.lightGrayContent, { flex: 1 }]}>Destination</Text>
                  <Text style={styles.lightGrayContent}>:</Text>
                  <Text style={[styles.lightGrayContent, { flex: 1, textAlign: 'right' }]}>{ticketDetails.destination}</Text>
                </View>
                <TouchableOpacity
                    style={{ flexDirection: 'row',justifyContent: 'center', alignItems: 'center', backgroundColor:'green'}}
                    onPress={()=>{this.props.navigation.push('Home');this.props.navigation.navigate('Booking')}}>
                  
                      <Text style={{fontWeight:'bold', color: 'white',fontSize: 20}}>ok</Text>
                  
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <Modal
            animationType={"slide"}
            visible={this.state.showModal}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity
                onPress={() => { this.setState({ showModal: false }) }}
                style={{ flex: 1, justifyContent: 'center', alignSelf: 'flex-start' }}>
                <Image source={Images.cancel} style={{ height: 40, width: 40, marginLeft: 10 }} />
              </TouchableOpacity>

              <View style={{ height: '95%', width: '100%' }}>
                <WebView
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                  source={{ uri: `${webViewData.paymentUrl}/transaction.do?command=initiateTransaction&encRequest=${
                    webViewData.encRequest
                  }&access_code=${
                    webViewData.accessCode
                  }`}}
                  onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                  renderLoading={this.ActivityIndicatorLoadingView}
                  startInLoadingState={true}
                />
              </View>
            </View>
        </Modal>

        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{flexDirection : 'row', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.centerView}>
                <Image style={[styles.smallIcon, {marginLeft:0}]} source={Images.backButton} />
              </TouchableOpacity>
              <Text style={styles.title}>Payment</Text>
            </View>

          </View>
        </View>
        <View style={styles.locationContainer}>
          <View style={{flex:1}}>

          {busDetails ? (

            <View style={styles.itemContainer}>
              <Text style={[styles.grayContent, {fontSize:Fonts.size.font18, marginBottom:10, alignSelf:'center', textDecorationLine: 'underline'}]}>Booking Details</Text>
              
              <View style={styles.rowContent}>
                <Text style={styles.lightGrayContent}>{busDetails.from}</Text>
                <Image style={[styles.smallIcon, {marginLeft:0}]} source={Images.arrowRight} />
                <Text style={styles.lightGrayContent}>{busDetails.to}</Text>
              </View>

              <View style={styles.rowContent}>
                <Text style={styles.lightGrayContent}>{busDetails.arrTime}</Text>
                <Text style={styles.lightGrayContent}>{busDetails.duration ? ( parseInt(busDetails.duration.split(':')[0]) + ' hrs ' + (parseInt(busDetails.duration.split(':')[1]) ? (parseInt(busDetails.duration.split(':')[1]) + 'mins') : '' ) ) : null}</Text>
                <Text style={styles.lightGrayContent}>{busDetails.depTime}</Text>
              </View>

              <View style={[styles.rowContent, {justifyContent:'center'}]}>
                <Text style={[styles.lightGrayContent, {fontWeight:'bold'}]}>{busDetails.date}</Text>
              </View>

              {fareInfo ? (
                <View>
                  <View style={styles.rowContent}>
                    <Text style={styles.lightGrayContent}>Pay <Text style={styles.blueText}>₹{fareInfo.finalAmount}</Text> </Text>
                    <TouchableOpacity onPress={() => this.setState({showfareInfo : !this.state.showfareInfo})} style={{flexDirection:'row', alignItems:'center'}}>
                      <Text style={[styles.blueText, {fontWeight:'400'}]}>View Details</Text>
                      <Image style={[styles.icon, {marginLeft:8}]} source={this.state.showfareInfo ? Images.upArrow :Images.downArrowIcon} />
                    </TouchableOpacity>
                  </View>
                    
                  {this.state.showfareInfo ? (
                    <View style={{marginTop:0, marginTop:15}}>
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
                  ) : null}
                

                </View>  
              ) : null }  
              
            </View>  
          ) : null}
            
            {this.state.commonErr ? (
              <Text style={{color : 'red', fontSize:13}}>{this.state.commonErr ? this.state.commonErr : ''}</Text>
            ) : null}
           <ActivityIndicator size="large" color={Colors.blueTheme} animating={isLoading} style={{bottom:Dimensions.get('window').height/1.8}} />

            <AppButton
              testId={"Payment"}
              title={"Pay Now"}
              type={'withoutContainer'}
              disable={isLoading}
              containerStyle={{ alignSelf: 'center' }}
              buttonPressed={() => { 
                this.onTentativeBooking() 
              }}
            />
          </View>  
        </View>
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  tentativeBooking: (id,orderId, data) => dispatch(actions.tentativeBookingAction(id,orderId, data)),
  confirmPayment: (pnr, requestPayload) => dispatch(actions.confirmBookingAction(pnr, requestPayload)),
  mobilePayment: (requestHeader) => dispatch(actions.mobilePaymentAction(requestHeader)),
});

export default connect(null, mapDispatchToProps)(payment)