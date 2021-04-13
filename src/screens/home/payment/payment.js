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
import { BASE_URL } from '../../../api/constant';

var CryptoJS = require("crypto-js");

class payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentTypes : [{id:1, name : 'Net Banking', image:Images.card}, {id:2, name : 'Credit Card', image:Images.card},{id:3, name : 'Debit Card', image:Images.wallet},{id:4, name : 'Mobile Wallet', image:Images.wallet},],
      view : [1],

      commonErr : '',
      fareInfo : null,
      busDetails : null,
      showfareInfo : false,
      isLoading : false,
      showModal : false,
      pnr : '',

      config : null,
      webViewData : ''
    };
    this.formRef = React.createRef();
  }

  componentDidMount = () => {
    console.log('this.props.route.params');
    console.log(this.props.route.params);

    this.setState({
      fareInfo : this.props.route.params.fareInfo,
      busDetails : this.props.route.params.busDetails
    })
    console.log(this.props.route.params.busDetails);

    this.getWebViewPaymentData();
    // var data = { ...this.state.config , 
    //   accessCode : 'AVKR03HI38AD28RKDA' , 
    //   workingKey : '24A31EE1524E1CB34BCBF2DD0CB4F911' , 
    //   paymentUrl : 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction',
    //   merchantId : '271029',
    //   currency : 'INR',
    //   BASE_URL : BASE_URL,
    //   merchantConviniencePercent: 2,
    // } ;
    
    //prod :
    // var data = { ...this.state.config , 
    //   accessCode : 'AVDQ94HH54CA56QDAC' , 
    //   workingKey : 'D9730E7F6421014656862D2EE09A6311' , 
    //   paymentUrl : 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction',
    //   merchantId : '271029',
    //   currency : 'INR',
    //   BASE_URL : BASE_URL,
    //   merchantConviniencePercent: 2,
    // } ;
    

    // this.setState({
    //   config : data
    // });

    // this.encrypting("merchant_id=271029&order_id=1617122058&currency=INR&amount=1287.45&redirect_url=https://api.waybus.in/ccavResponse&cancel_url=https://api.waybus.in/ccavResponse&language=EN&billing_country=India&billing_tel=9464649494&billing_email=Test@gmail.com");

  }

  encrypting = (data) => {
    var ciphertext = CryptoJS.AES.encrypt(data, '24A31EE1524E1CB34BCBF2DD0CB4F911');
    console.log("encrypted text", ciphertext.toString());

    this.setState({
      encRequest : ciphertext.toString()
    })


    var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), '24A31EE1524E1CB34BCBF2DD0CB4F911');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    console.log("decrypted text", plaintext);
  }

  getWebViewPaymentData = () => {
    //test :
    var data = { ...this.state.config , 
      accessCode : 'AVKR03HI38AD28RKDA' , 
      workingKey : '24A31EE1524E1CB34BCBF2DD0CB4F911' , 
      paymentUrl : 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction',
      merchantId : '271029',
      currency : 'INR',
      BASE_URL : BASE_URL,
      merchantConviniencePercent: 2,
    } ;
    
    //prod :
    // var data = { ...this.state.config , 
    //   accessCode : 'AVDQ94HH54CA56QDAC' , 
    //   workingKey : 'D9730E7F6421014656862D2EE09A6311' , 
    //   paymentUrl : 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction',
    //   merchantId : '271029',
    //   currency : 'INR',
    //   BASE_URL : BASE_URL,
    //   merchantConviniencePercent: 2,
    // } ;
    

    this.setState({
      config : data
    });

    const orderId = Math.round((new Date()).getTime() / 1000);

    var body = `merchant_id=${
                 // this.state.config.merchantId
                 data.merchantId
               }&order_id=${orderId}&currency=${
                 // this.state.config.currency
                 data.currency
               }&amount=${
                 this.props.route.params.fareInfo.finalAmount
               }&redirect_url=${BASE_URL}/ccavResponse&cancel_url=${BASE_URL}/ccavResponse&language=EN&billing_country=India&billing_tel=${
                 this.props.route.params.contactDetail.mobile_number
               }&billing_email=${
                 this.props.route.params.contactDetail.email
               }`;

    console.log('config');           
    console.log(data);           
    console.log('body');           
    console.log(body);

    // this.encrypting("merchant_id=271029&order_id=1617122058&currency=INR&amount=1287.45&redirect_url=https://api.waybus.in/ccavResponse&cancel_url=https://api.waybus.in/ccavResponse&language=EN&billing_country=India&billing_tel=9464649494&billing_email=Test@gmail.com");
    this.encrypting(body);
    
    this.setState({
      webViewData : body
    })           

  }

onTentativeBooking = () => {
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

    this.setState({isLoading : true});

    tentativeBooking(id,orderId, data)
    .then((res)=>{
      console.log('res');
      console.log(res);
      if(res.payload.status==200){
        console.log('adding passenger');
        // console.log(res.payload.data);
        console.log(res.payload.data.result);
        if(res.payload.data.result){
          if(res.payload.data.result.ticket_details){
            var tktDetails = res.payload.data.result.ticket_details;

            this.setState({
              pnr : tktDetails.pnr_number,
              showModal : true
            });
            // this.onConfirmPayment(tktDetails.pnr_number);
            // "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
             // this.props.navigation.navigate('Payment2')
            // this.props.navigation.navigate('Payment', {tktDetails : res.payload.data.result.ticket_details , scheduleId : this.props.route.params.scheduleId, fareInfo : this.props.route.params.fareInfo}); 
          }
        }else {
          console.log(res.payload.data.response.message);
          this.setState({commonErr : res.payload.data.response.message});
        }

      }
      this.setState({isLoading : false});
    })
  }

    // onConfirmPayment = (pnrN) => {
    //   const { confirmPayment,navigation } = this.props;
    //   var pnr = this.state.pnr ;
    //   console.log(pnrN);
    //   console.log(pnr);
    //   this.setState({isLoading : true});

    //   confirmPayment(pnrN)
    //   .then((res)=>{
    //     console.log('res');
    //     console.log(res);
    //     if(res.payload.status==200){
    //       console.log('confirm booking');
    //       console.log(res.payload);
    //       console.log(res.payload.data);
    //       console.log(res.payload.data.result);
    //       if(res.payload.data.result){
    //         if(res.payload.data.result.ticket_details){
    //           // this.setState({showModal : true});
    //            this.props.navigation.navigate('Booking');
    //         }
    //       }else {
    //         console.log(res.payload.data.response.message);
    //       }

    //     }else{
    //       console.log('res false');
    //       console.log(res);
    //     }
    //     this.setState({isLoading : false});
    //   })  
    // }

  sendRequest(val) {
    console.log(val);
    this.setState({ selectedGender: val })
  }

  _onNavigationStateChange = async (webViewState) => {
      console.log('webViewState.url');
      console.log(webViewState);
      console.log(webViewState.url);
      var url = webViewState.url;
      console.log('url');
      console.log(url);
      console.log(url.split('?')[0]);

      // console.log("https://daycarepanel.stage02.obdemo.com/api/v1/transactionsuccessful?status=succeeded&transaction_id=ch_1IWb8LER2uSW8gLnqywqZ6JZ");

      // if (url.split('?')[0] == 'https://daycarepanel.stage02.obdemo.com/api/v1/transactionsuccessful') {
      //     var res = url.split('?')[1];
      //     console.log('res ' + res);

      //     var status = res.split('&')[0].split('=')[1];
      //     var transID = res.split('&')[1].split('=')[1];
      //     console.log(transID);
      //     console.log(status);

      //     this.setState({
      //         transactionId: transID,
      //         showModal: false
      //     });

      //     if (this.state.kid_id) {
      //         this.onKidPayment(transID, status);
      //     } else {
      //         this.onCheckout(transID, status);
      //     }
      // }
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

    const webViewScript =`
      <form id="nonseamless"
          ref = {this.formRef}
           method="POST"
           name="redirect"
           action={'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction'}>
       <input type="hidden" id="encRequest" name="encRequest" value={this.state.encRequest} />
       <input type="hidden" name="access_code" id="access_code" value={'AVKR03HI38AD28RKDA'} />
       <Button type="submit" bsStyle="primary" className="submitBtn">Pay Now</Button>
       <script language="javascript">document.redirect.submit();</script>
    </form>
    `;

    const { paymentTypes, view, busDetails, fareInfo , isLoading} = this.state
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

                  source={{ uri: 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction' }}

                  onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                  renderLoading={this.ActivityIndicatorLoadingView}
                  startInLoadingState={true}

                  injectedJavaScript={
                    webViewScript
                  }

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

            <AppButton
              testId={"Payment"}
              title={"Pay Now"}
              type={'withoutContainer'}
              disable={false}
              containerStyle={{ alignSelf: 'center' }}
              buttonPressed={() => { 
                this.onTentativeBooking() 
              }}
            />

            {/*<FlatList
              data={view}
              showsVerticalScrollIndicator = {false}
              renderItem={({ item, index}) => (
                <View>
                  <Text style={[styles.grayContent, {marginBottom:5}]}>Select Payment Method</Text>
                  <FlatList
                    data={paymentTypes}
                    scrollEnabled = {false}
                    renderItem={({ item, index}) => (
                      
                      <TouchableOpacity onPress={() => this.onTentativeBooking()} style={styles.itemContainer}>
                        <View style={[styles.rowContent, {padding:0}]}>
                          <View style={{flexDirection : 'row', alignItems:'center'}}>
                            <Image style={[styles.smallIcon, {marginLeft:0}]} source={item.image} />
                            <Text style={styles.lightGrayContent}>{item.name}</Text>
                          </View>
                          <Image style={styles.icon} source={Images.rightArrow} />
                        </View>  
                      </TouchableOpacity>

                    )}
                    keyExtractor = {item=> {item.id}}
                  />  
                </View>   

              )}
                keyExtractor = {item=> {item}}
            />*/}

          </View>  
        </View>
        <ActivityIndicator size="large" color={Colors.blueTheme} animating={isLoading} style={{bottom:Dimensions.get('window').height/1.8}} />
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  tentativeBooking: (id,orderId, data) => dispatch(actions.tentativeBookingAction(id,orderId, data)),
  confirmPayment: (pnr) => dispatch(actions.confirmBookingAction(pnr)),
});

export default connect(null, mapDispatchToProps)(payment)