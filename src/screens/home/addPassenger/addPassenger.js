import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Images, Colors } from '../../../theme';
import styles from './styles'
import { hp, wp } from '../../../utils/heightWidthRatio';
import FilterModal from '../../../components/modals/filterModal'
import AppButton from '../../../components/appButton/appButton';
import * as actions from '../../../redux/action';
import { connect } from 'react-redux';
import moment from 'moment';

class addPassenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      email : '',
      phone : '',
      selectedSeats : [],
      fareInfo : null,
     
      errName : '',
      errEmail : '',
      errPhone : '',
      errPI : '',

      passengerTypes : [],
      view : [1],

      modalTitle:'Select Gender',
      filterModalVisible : false,
      genderType : [{ name: 'Male', value : 'M' }, { name: 'Female', value:'F' }],
      selectedGender : { name: 'Male', value : 0 },
      selectedIndex : null,
    };
  }

  componentDidMount = () => {

    console.log('this.props.route.params');
    console.log(this.props.route.params.selectedPickup);
    console.log(this.props.route.params.selectedDrop);
    console.log(this.props.route.params.selectedSeats);
    console.log(this.props.route.params.fareInfo);

    var newArr = [];
    this.props.route.params.selectedSeats.forEach(item => {
      newArr = [...newArr, {
            seat_number: item.split('|')[0],
            fare: item.split('&')[0].split('@')[0].split('-')[1],
            title: "Ms",
            is_primary: "true",
            id_card_type: "N/A",
            id_card_number: "N/A",
            id_card_issued_by: "N/A"
      }]
      console.log(newArr);
    })
    this.setState({
      passengerTypes : newArr ,
      fareInfo : this.props.route.params.fareInfo
    })
  }

  addPassengerInfo = () => {
    console.log('1');
    const { name, email, phone, passengerTypes } = this.state

    this.setState({
      errName : '',
      errEmail : '',
      errPhone : '',
      errPI : '',
    })

    var contactD = {
           "mobile_number": phone,
           "emergency_name": name,
           "email": email
         }

    var newArr = passengerTypes;
    newArr.forEach((item, index) => {
      newArr[index] = {...newArr[index], sex : item.sex.value };
      var title = item.sex.value == "M" ? "Mr" : "Ms";
      newArr[index] = {...newArr[index], title : title };
    })

    console.log('newArr');
    console.log(newArr);

    this.props.navigation.navigate('Payment', { passengerTypes : newArr, busDetails:this.props.route.params.busDetails, contactDetail : contactD, scheduleId : this.props.route.params.scheduleId, selectedPickup : this.props.route.params.selectedPickup , selectedDrop : this.props.route.params.selectedDrop, selectedSeats : this.props.route.params.selectedSeats, date: this.props.route.params.date, originId : this.props.route.params.originId, destId : this.props.route.params.destId, fareInfo : this.props.route.params.fareInfo});
  }

  sendRequest(val) {
    const { selectedIndex } = this.state;
    console.log(val);
    console.log('val');
    this.addValues('sex', val, selectedIndex);
    this.setState({ selectedGender: val })
  }

  addValues = (key, value, index) => {
    const {passengerTypes} = this.state;

    // console.log('key ' + key);
    // console.log('value ' + value);
    // console.log('index ' + index);

    var newArr = [...passengerTypes ];

    if(key == 'name'){
      newArr[index] = {...newArr[index] , name : value }
    }else if(key == 'age'){
      newArr[index] = {...newArr[index] , age : value }
    }if(key == 'sex'){
      newArr[index] = {...newArr[index] , sex : value }
    }
    console.log(newArr);

    this.setState({passengerTypes : newArr});
  }

  render() {
    const { name, email, phone, passengerTypes, view, filterModalVisible, modalTitle, selectedGender, genderType } = this.state
    return (
      <View style={styles.mainContainer}>
        <FilterModal
          visible={filterModalVisible}
          title={modalTitle}
          selectedValue={selectedGender}
          data={genderType}
          onSelectValue={(val) => { this.sendRequest(val) }}
          closeModal={() => this.setState({ filterModalVisible: false })}
          idKey={"name"}
        />

        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{flexDirection : 'row', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.centerView}>
                <Image style={[styles.smallIcon, {marginLeft:0}]} source={Images.backButton} />
              </TouchableOpacity>
              <Text style={styles.title}>Add Passenger</Text>
            </View>  
          </View>
        </View>
        <View style={styles.locationContainer}>
          <View style={{flex:1}}>

          {this.state.fareInfo ? (
            <View style={[styles.itemContainer, {marginTop:0}]}>
              <Text style={styles.grayContent}>Fare Details</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>
                <Text style={[styles.lightGrayContent,{flex:1}]}>Ticket Price</Text>
                <Text style={styles.lightGrayContent}>:</Text>
                <Text style={[styles.lightGrayContent,{flex:1, textAlign:'right'}]}>₹{this.state.fareInfo.totalBaseFare}</Text>
              </View>

              <View style={{flexDirection:'row'}}>
                <Text style={[styles.lightGrayContent,{flex:1}]}>Tax</Text>
                <Text style={styles.lightGrayContent}>:</Text>
                <Text style={[styles.lightGrayContent, {flex:1, textAlign:'right'}]}>₹{this.state.fareInfo.gst}</Text>
              </View>

              <View style={{flexDirection:'row'}}>
                <Text style={[styles.lightGrayContent,{flex:1}]}>Convenience Fee</Text>
                <Text style={styles.lightGrayContent}>:</Text>
                <Text style={[styles.lightGrayContent, {flex:1, textAlign:'right'}]}>₹{parseFloat(this.state.fareInfo.operatorFee) + parseFloat(this.state.fareInfo.merchantFee)}</Text>
              </View>

              <View style={{flexDirection:'row'}}>
                <Text style={[styles.lightGrayContent,{flex:1}]}>Discount</Text>
                <Text style={styles.lightGrayContent}>:</Text>
                <Text style={[styles.lightGrayContent, {flex:1, textAlign:'right'}]}>- ₹{this.state.fareInfo.discount}</Text>
              </View>

              <View style={{flexDirection:'row', justifyContent:'space-between' , marginBottom:10}}>
                <Text style={[styles.blueContent, {flex:1}]}>Total</Text>
                <Text style={styles.blueContent}>:</Text>
                <Text style={[styles.blueContent, {flex:1, textAlign:'right'}]}>₹{this.state.fareInfo.finalAmount}</Text>
              </View>
            </View>
          ) : null }

            <FlatList
              data={view}
              showsVerticalScrollIndicator = {false}
              renderItem={({ item, index}) => (
                <View>
                  <View style={styles.itemContainer}>
                    <Text style={styles.grayContent}>Contact Information</Text>
                    <View style={{flexDirection:'row', borderColor : this.state.errName ? 'red' : Colors.greyAc , borderBottomWidth :0.8,padding:5, justifyContent : 'space-between', alignItems:'center'}}>
                      <Text style={styles.lightGrayContent}>Name : </Text>
                      <TextInput 
                        placeholder = "Enter Name"
                        style={{flex:1, marginLeft:20}}
                        value = {this.state.name}
                        onChangeText = {name => this.setState({name})}
                      />
                    </View>
                    {this.state.errName ? (
                      <Text style={{color : 'red', fontSize:13}}>{this.state.errName ? this.state.errName : ''}</Text>
                    ) : null}

                    <View style={{flexDirection:'row', borderColor : this.state.errEmail ? 'red' : Colors.greyAc , borderBottomWidth :0.8,padding:5, justifyContent : 'space-between', alignItems:'center'}}>
                      <Text style={styles.lightGrayContent}>Email : </Text>
                      <TextInput 
                        keyboardType = "email-address"
                        placeholder = "Enter Email ID"
                        style={{flex:1, marginLeft:20}}
                        value = {email}
                        onChangeText = {email => this.setState({email})}
                      />
                    </View>
                    {this.state.errPhone ? (
                      <Text style={{color : 'red', fontSize:13}}>{this.state.errEmail ? this.state.errEmail : ''}</Text>
                    ) : null}

                    <View style={{flexDirection:'row',borderColor : this.state.errPhone ? 'red' : Colors.greyAc , borderBottomWidth :0.8, padding:5, justifyContent : 'space-between', alignItems:'center'}}>
                      <Text style={styles.lightGrayContent}>Phone : </Text>
                      <TextInput 
                        keyboardType = "numeric"
                        placeholder = "Enter Mobile Number"
                        maxLength = {10}
                        style={{flex:1, marginLeft:20}}
                        value = {phone}
                        onChangeText = {phone => this.setState({phone})}
                      />
                    </View>
                    {this.state.errPhone ? (
                      <Text style={{color : 'red', fontSize:13}}>{this.state.errPhone ? this.state.errPhone : ''}</Text>
                    ) : null}
                  </View>

                  <FlatList
                    data={passengerTypes}
                    scrollEnabled = {false}
                    renderItem={({ item, index}) => (
                      
                      <View style={styles.itemContainer}>
                        <Text style={styles.grayContent}>Passenger: <Text style={styles.blueText}>Seat {item.seat_number}</Text> </Text>
                        <View style={{height:40, marginTop:10,marginBottom:10}}>
                          <TextInput 
                            onChangeText={(text) => this.addValues('name', text, index)}
                            placeholder = "Enter Name"
                            style={{flex:1, borderColor:Colors.greyAc , borderWidth : 0.8, borderRadius : 5,paddingLeft:5, paddingRight:5}}
                          />
                        </View>  
                        <View style={{flexDirection:'row',flex:1, justifyContent:'space-between'}}>
                          <View style={{flex:1, height:40, marginTop:10,marginBottom:10}}>
                            <TextInput 
                              keyboardType = "numeric"
                              onChangeText={(text) => this.addValues('age', text, index)} 
                              placeholder = "Enter Age"
                              style={{flex:1, borderColor:Colors.greyAc , borderWidth : 0.8, borderRadius : 5,paddingLeft:5, paddingRight:5, marginRight:10}}
                            />
                          </View>
                          <View style={{flex:1, height:40, marginTop:10,marginBottom:10}}>
                            <TouchableOpacity onPress={()=> { this.setState({filterModalVisible:true, selectedIndex : index});  }} style={{flex:1,flexDirection:'row',alignItems:'center', justifyContent:'space-between', borderColor:Colors.greyAc , borderWidth : 0.8, borderRadius : 5,paddingLeft:5, paddingRight:5, marginLeft:10}}>
                              <Text style={[styles.lightGrayContent, {width : wp(80), color : item.sex ? 'black' : '#9b9b9b' }]}>{item.sex ? item.sex.name : 'Gender'}</Text>
                              <Image style={{height:hp(12), width:hp(12), resizeMode:'contain', marginTop:wp(5)}} source={Images.dropDownArrow} />
                            </TouchableOpacity>
                          </View>
                        </View>
                    
                      </View>

                    )}
                    keyExtractor = {item=> {item.seat_number}}
                  />  
                  <Text style={{color : 'red', fontSize:13}}>{this.state.errPI ? this.state.errPI : ''}</Text>
                </View>   

              )}
                keyExtractor = {item=> {item}}
            />
            
            <AppButton
              testId={"passenderAdded"}
              title={"Done"}
              type={'withoutContainer'}
              disable={false}
              containerStyle={{ alignSelf: 'center' }}
              buttonPressed={() => { 
                // console.log(passengerTypes);
                var count = 0;
                var isSeatsInfoFilled = false;
                this.setState({
                  errName : '',
                  errEmail : '',
                  errPhone : '',
                  errPI : '',
                });

                if(!name){
                  this.setState({errName : 'Please fill the name.'});
                }

                const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if(!email){
                  this.setState({errEmail : 'Please fill the email.'});
                }else if(reg.test(email.trim()) === false){
                    this.setState({errEmail : 'Please enter a valid email.'});
                }

                const reg2 = /^[0]?[789]\d{9}$/;
                if(!phone){
                  this.setState({errPhone : 'Please fill the phone number.'});
                }else if (reg2.test(phone.trim()) === false) {
                   this.setState({errPhone : 'Please enter a valid phone number.'});
                }
                  
                passengerTypes.forEach(item => {
                  if(item.sex && item.name && item.age){
                    count++ ;
                  }
                  if(count == passengerTypes.length){
                    isSeatsInfoFilled = true
                  };
                })

                if(name && email && phone && isSeatsInfoFilled ){
                  this.addPassengerInfo()
                }else{
                  this.setState({errPI : 'Please fill the passenger details.'})
                }
                
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
});

export default connect(null, mapDispatchToProps)(addPassenger)