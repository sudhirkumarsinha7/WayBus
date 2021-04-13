import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList,Modal, TextInput } from 'react-native';
import { Images, Colors, Fonts } from '../../../theme';
import styles from './styles'
import { hp, wp } from '../../../utils/heightWidthRatio';
import FilterModal from '../../../components/modals/filterModal'
import AppButton from '../../../components/appButton/appButton';

export default class payment2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCvv : false,
      openModal : false,

      cardNum : '',
      month : { name: '1', value : 1 },
      year : { name: '2021', value : 0 },
      cvv : '',
      name : '',
      offerCode : '',
      view : [1],

      monthModalVisible : false,
      yearModalVisible : false,
      yearType : [{ name: '2021', value : 0 }, { name: '2022', value:1 }, { name: '2023', value:1 }, { name: '2024', value:1 }, { name: '2025', value:1 }, { name: '2026', value:1 }],
      monthType : [{ name: '1', value : 1 }, { name: '2', value:2 }, { name: '3', value:3 }, { name: '4', value:4 }, { name: '5', value:5}, { name: '6', value:6 }, { name: '7', value:7 }, { name: '8', value:8 }, { name: '9', value:9 }, { name: '10', value:10 }, { name: '11', value:11 }, { name: '12', value:12 }],
      
    };
  }

  selectMonth(val) {
    console.log(val);
    this.setState({ month: val })
  }

  selectYear(val) {
    console.log(val);
    this.setState({ year: val })
  }

  _handlingCardNumber(number) {
    // console.log(number);
    this.setState({
      cardNum: number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
    });
  }

  render() {
    const { isShowCvv,openModal, cardNum ,month , year ,cvv ,name ,offerCode , view, filterModalVisible, monthModalVisible, yearModalVisible, yearType, monthType } = this.state
    return (
      <View style={styles.mainContainer}>
        <FilterModal
          visible={monthModalVisible}
          title={'select Month'}
          selectedValue={month}
          data={monthType}
          onSelectValue={(val) => { this.selectMonth(val) }}
          closeModal={() => this.setState({ monthModalVisible: false })}
          idKey={"name"}
        />

        <FilterModal
          visible={yearModalVisible}
          title={'select Year'}
          selectedValue={year}
          data={yearType}
          onSelectValue={(val) => { this.selectYear(val) }}
          closeModal={() => this.setState({ yearModalVisible: false })}
          idKey={"name"}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={openModal}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            this.setState({openModal : false});
          }}
        >
          <View style={{flex:1,alignItems:'center', justifyContent:'center', backgroundColor : 'rgba(0,0,0,0.2)'}}>
            <View style={{ backgroundColor : Colors.whiteFF, height:'30%', width:'80%'}}>

              <View style={{padding:15, alignItems:'center'}}>
                <Image style={{marginLeft:0,marginBottom:15, height:hp(40), width:wp(40), marginTop:30, resizeMode:'contain'}} source={Images.success} />
                <Text style={styles.titleBlack}>Payment Success!</Text>
                <Text style={[styles.lightGrayContent, {fontSize : Fonts.size.font14,marginTop:10, fontWeight:'bold', color : Colors.grey9A }]}>Thank you for booking. Enjoy your trip.</Text>
              </View>

              <View style={{justifyContent:'flex-end', flex:1}}>
                <TouchableOpacity onPress={() => this.setState({openModal : false})} style={{backgroundColor : Colors.green4e, height:45, alignItems:'center', justifyContent:'center'}}>
                  <Text style={{color:Colors.whiteFF, fontSize:Fonts.size.font16, fontWeight:'bold'}}>Close</Text>
                </TouchableOpacity>
              </View>  
                
            </View>
          </View>
        </Modal>  

        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{flexDirection : 'row', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.centerView}>
                <Image style={[styles.smallIcon, {marginLeft:0}]} source={Images.backButton} />
              </TouchableOpacity>
              <Text style={[styles.title, {marginLeft:5}]}>Payment</Text>
            </View>
            <Text style={styles.title}>4:52</Text>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <View style={{flex:1}}>

            <FlatList
              data={view}
              showsVerticalScrollIndicator = {false}
              renderItem={({ item, index}) => (
                <View style={{flex:1}}>

                  <View style={{marginTop:10}}>                  
                    <Text style={styles.titleBlack}>Card Number</Text>        
                    <TextInput 
                      keyboardType = "numeric"
                      style={styles.inputStyles}
                      value = {cardNum}
                      onChangeText={(text) => this._handlingCardNumber(text)}
                      maxLength = {19}
                    />
                  </View> 
                  
                  <View style={{flexDirection:'row'}}>                  
                    <View style={[styles.inputStyles, {marginRight:7, paddingLeft :0, paddingRight:0}]}>
                      <TouchableOpacity onPress={()=>this.setState({monthModalVisible:true})} style={{flex:1,flexDirection:'row',alignItems:'center', justifyContent:'space-between', borderRadius : 5,paddingLeft:5, paddingRight:5, marginLeft:10}}>
                        <Text style={styles.lightGrayContent}>Select Month</Text>
                        <View style={{flexDirection:'row'}}>
                          <Text style={styles.lightGrayContent}>{month.name}</Text>
                          <Image style={{height:hp(10), width:hp(10), resizeMode:'contain', marginTop:wp(5), marginLeft:wp(5)}} source={Images.dropDownArrow} />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.inputStyles, {marginLeft:7, paddingLeft :0, paddingRight:0}]}>
                      <TouchableOpacity onPress={()=>this.setState({yearModalVisible:true})} style={{flex:1,flexDirection:'row',alignItems:'center', justifyContent:'space-between', borderRadius : 5,paddingLeft:5, paddingRight:5, marginLeft:10}}>
                        <Text style={styles.lightGrayContent}>Select Year</Text>
                        <View style={{flexDirection:'row'}}>
                          <Text style={styles.lightGrayContent}>{year.name}</Text>
                          <Image style={{height:hp(10), width:hp(10), resizeMode:'contain', marginTop:wp(5), marginLeft:wp(5)}} source={Images.dropDownArrow} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>  

                  <View style={{marginTop:10}}>                  
                    <Text style={styles.titleBlack}>CVV</Text>        
                    <TextInput 
                      keyboardType = "numeric"
                      style={styles.inputStyles}
                      secureTextEntry = {isShowCvv ? true : false}
                      value = {cvv}
                      onChangeText={cvv => this.setState({cvv})}
                      maxLength = {3}
                    />
                    <TouchableOpacity onPress={() => this.setState({isShowCvv : !isShowCvv})} style={{ left:'90%', bottom:hp(41)}}>
                      <Image style={{height:hp(15), width:wp(15), resizeMode:'contain', marginTop:wp(5), marginLeft:wp(5)}} source={Images.eyeOff} />
                    </TouchableOpacity>
                  </View>

                  <View style={{bottom:10}}>                  
                    <Text style={styles.titleBlack}>Card Holder Name</Text>        
                    <TextInput 
                      style={styles.inputStyles}
                      value = {name}
                      onChangeText={name => this.setState({name})}
                    />
                  </View>

                  <View>                  
                    <Text style={styles.titleBlack}>Offer Code</Text>        
                    <TextInput 
                      style={styles.inputStyles}
                      value = {offerCode}
                      onChangeText={offerCode => this.setState({offerCode})}
                    />
                  </View>

                  <View style={styles.itemContainer}>
                    <View style={{flexDirection:'row', borderBottomWidth:2, borderColor : Colors.greyE2, paddingBottom:20, marginBottom:10}}>
                      <View style={{flexDirection:'column', alignItems:'center'}}>
                        <Image style={styles.icon} source={Images.locationFrom} />
                        <View style={styles.blueDot}></View>
                        <View style={styles.blueDot}></View>
                        <View style={styles.blueDot}></View>
                        <View style={styles.blueDot}></View>
                        <Image style={styles.icon} source={Images.mapPin} />
                      </View>

                      <View style={{flexDirection:'column', justifyContent:'space-between', marginLeft:10}}>
                        <Text style={styles.titleBlack}>Hyderabad</Text>
                        <Text style={styles.titleBlack}>Bangalore</Text>
                      </View>

                      <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                        <Image style={styles.smallIcon} source={Images.downArrowIcon} />
                      </View>
                    </View>

                    <View style={styles.rowContent}>
                      <Text style={[styles.titleBlack, {width:130,marginLeft : 0}]}>Pickup Point</Text>
                      <Text style={styles.lightGrayContent}>Pickup 1</Text>
                    </View>

                    <View style={styles.rowContent}>
                      <Text style={[styles.titleBlack, {width:130,marginLeft : 0}]}>Dropping Point</Text>
                      <Text style={styles.lightGrayContent}>Dropping 1</Text>
                    </View>

                    <View style={styles.rowContent}>
                      <Text style={[styles.blueText, {width:130}]}>Total Amount</Text>
                      <Text style={styles.blueText}>$1522.50</Text>
                    </View>                      
                  </View>

                </View>   
              )}
                keyExtractor = {item=> {item}}
            />

            <AppButton
              testId={"payNow"}
              title={"Pay Now"}
              type={'withoutContainer'}
              disable={false}
              containerStyle={{ alignSelf: 'center' }}
              buttonPressed={() => { 
                this.setState({openModal : true})
              }}
            />

          </View>  
        </View>
      
      </View>
    );
  }
}
