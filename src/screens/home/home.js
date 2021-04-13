import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import styles from './styles'
import { hp, wp } from '../../utils/heightWidthRatio';
import DateTimePickerModal from '../../components/modals/datePicker'
import FilterModal from '../../components/modals/filterModal'
import moment from 'moment';
import colors from '../../theme/colors';
import * as actions from '../../redux/action';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

let dot = [1, 2, 3, 4, 5, 6, 7, 8]
let seatType = [{ name: 'AC', icon: Images.ac, id: 1 }, { name: 'Non-AC', icon: Images.nonAc, id: 2 }, { name: 'Sleeper', icon: Images.sleeper, id: 3 }, { name: 'Seater', icon: Images.seater, id: 4 }]
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickUp: '',
      drop: '',
      isDateTimePickerVisible: false,
      searchDate: moment(new Date()).format('DD - MMM - YYYY'),
      modalTitle:'',
      modalSelectedData:null,
      modalSelectedIcon:Images.seater,
      showCities: false,
      cityHistory : [],
      date :  moment(new Date()).format('YYYY/MM/DD'),
      selectedSeatType : '',

      allCities : [],
      searchText:'',
      searchedCities : [],
      selectedCitySearch : null,

      originId : '',
      destId : '' ,
      selectedApiDate : moment(new Date()).format('YYYY-MM-DD'),

      recentSearches : []
    };
  }

  componentDidMount = () => {
    this.getCitiesInfo();
    this.getCityHistory();
    this.getRecentHistory();
  }

  getCitiesInfo = () => {
    const { getCities, navigation } = this.props
    const { allCities } = this.state
    getCities()
      .then((res)=>{
        console.log('res');
        console.log(res);
        if(res.payload.status==200){
          console.log('-res.payload.data.result');
          console.log(res.payload.data.result);

          var data = res.payload.data.result;
          data.forEach(item => {
            if(item[0] == 'id'){
              data.splice(data.indexOf(item), 1);
            }
          })
          this.setState({allCities : data});

          // console.log('cities');
          // console.log(this.state.allCities);
        }
      })
  }

  handleDate(date) {
    let selectedDate = moment(date).format('DD - MMM - YYYY')
    let apiDate = moment(date).format('YYYY-MM-DD')

    // console.log(apiDate);
    // console.log(selectedDate);

    this.setState({ 
      selectedApiDate : apiDate,
      searchDate: selectedDate, isDateTimePickerVisible: false ,
      date :  moment(new Date(date)).format('YYYY/MM/DD'),
    })
  }
  sendRequest(val) {
    this.setState({ modalTitle: val.name, modalSelectedData: val, modalSelectedIcon: val.icon });
    this.setState({selectedSeatType : val.name })
  }

  setCity(val) {
    this.onSaveHistory(val);

    this.setState({showCities : false});
    console.log(val);
    if(this.state.selectedCitySearch == 0){
      this.setState({  
        pickUp: val[1],
        originId : val[0] 
      })
    }else{
      this.setState({  
        drop: val[1],
        destId : val[0]
      })
    }
  }

   renderCitiesData = ({ item, index }) => {      
    return (
      <TouchableOpacity style={{ borderRightWidth: 1,height:40, borderLeftWidth: 1, marginLeft:20,marginRight:20,paddingLeft:20, paddingRight:20, borderBottomWidth: 1, borderColor: Colors.greyE8,justifyContent: 'center'}} onPress={() => this.setCity(item)}>
        <Text>{item[1]}</Text>
      </TouchableOpacity>
    )
  }


  renderItem(item) {
    return (
      <TouchableOpacity style={styles.typeButton} onPress={() => this.sendRequest(item)}>
        <Image resizeMode={'contain'} style={styles.overlay} source={item.icon} />
        <Text style={this.state.modalSelectedData ? ( (item.id === this.state.modalSelectedData.id) ? styles.selectedTextBlue : styles.selectedText ) : styles.selectedText }>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  getCityHistory = async () => {
    try{  
      let cityHistory = await AsyncStorage.getItem('cityHistory');  
      if(cityHistory){
        let cityHistoryData = JSON.parse(cityHistory);  
        // console.log('cityHistory');  
        // console.log(cityHistoryData);
        this.setState({
          searchedCities : cityHistoryData,
          cityHistory : cityHistoryData,
        })  
      } else{
        this.setState({
          searchedCities : [],
          cityHistory : [],
        })
      }  
    }  
    catch(error){  
      console.log(error);  
    }  
  }

  getRecentHistory = async () => {
    try{  
      let history = await AsyncStorage.getItem('recentHistory');  
      if(history){
        let historyData = JSON.parse(history);  
        console.log('recentHistory');  
        console.log(historyData);
        if(historyData.length>8){
          this.setState({
            recentSearches : historyData.splice(0,8),
          })  
        } else {
          this.setState({
            recentSearches : historyData,
          })
        }  
      } else{
        this.setState({
          recentSearches : [],
        })
      }  
    }  
    catch(error){  
      console.log(error);  
    }  
  }

  onSaveHistory = (city) => {
    // console.log(city);

    var count = 0;
    var datas = this.state.cityHistory  ;
    datas.forEach(item => {
      if(item[0] == city[0] ){
          datas.splice(datas.indexOf(city), 1);
          console.log('datas');
          console.log(datas);
      }
    }); 

    datas = [city, ...this.state.cityHistory ] ;

    var data = [];
    
    if(datas.length > 5){
      data = datas.slice(0,5);
    }else{
      data = datas;
    }
    console.log('data');
    console.log(data);
    AsyncStorage.setItem('cityHistory', JSON.stringify(data));  

    this.getCityHistory();
  }

  onSaveRecentSearches = (originId, destId, date) => {
    var origin  = '';
    var dest  = '';
    this.state.allCities.forEach(item => {
      if(item[0] == originId){
        origin = item[1]
      }
      if(item[0] == destId){
        dest = item[1]
      }
    });
    
    var newArr = this.state.recentSearches;
    newArr = [{originId : originId , destId:destId , originN : origin , destN: dest , date : date } , ...newArr]


    console.log('recentSearches');
    console.log(newArr);
    
    this.setState({
      recentSearches : newArr
    })

    AsyncStorage.setItem('recentHistory', JSON.stringify(newArr));  
    this.getRecentHistory();

  }

  render() {
    const { originId,destId, recentSearches , selectedApiDate,selectedSeatType, date, cityHistory, searchDate,showCities,selectedCitySearch, searchedCities, pickUp,drop, allCities,searchText, isDateTimePickerVisible, filterModalVisible, modalTitle, modalSelectedData, modalSelectedIcon } = this.state
    return (
      <View style={styles.mainContainer}>
        <DateTimePickerModal
          isDateTimePickerVisible={isDateTimePickerVisible}
          handleDatePicked={(date) => this.handleDate(date)}
          hideDateTimePicker={() => { this.setState({ isDateTimePickerVisible: false }) }}
          newDate={new Date(moment(date).format('YYYY/MM/DD'))}
          minDate={new Date(moment(new Date()).format('YYYY/MM/DD'))}
          maxDate={new Date(moment().add(60, "days").format('YYYY/MM/DD'))}
        />
        <FilterModal
          visible={filterModalVisible}
          title={modalTitle}
          selectedValue={modalSelectedData}
          data={seatType}
          onSelectValue={(val) => { this.sendRequest(val) }}
          closeModal={() => this.setState({ filterModalVisible: false })}
          idKey={"name"}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={showCities}
          onRequestClose={() => {
            this.setState({ showCities: false })
          }}
          >
            <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0,0.3)'}}>
                <View style={{height:'100%', width:'100%',backgroundColor:Colors.whiteFF, justifyContent: 'center'}}>
                    <TouchableOpacity style={{ alignSelf:'flex-end'}} onPress={() => this.setState({ showCities: false })} >
                        <Image source={Images.cancel} style={{height:40, width:40, resizeMode:'contain'}} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <TextInput
                      style={[styles.textInputStyle, {alignSelf:'center', backgroundColor:Colors.greyED,height:45,width:'90%',borderRadius:7, paddingLeft:17,paddingRight:17}]}
                      value={this.state.searchText}
                      placeholder={'Search'}
                      onChangeText={(val) => {
                        this.setState({ searchText: val });
                        var citiesFound = [];

                        allCities.forEach(item => {
                          var len = val.length;
                          if(item[1].toLowerCase().slice(0,len) == val.toLowerCase() ){
                            citiesFound = [...citiesFound , item];
                          }
                        })
                            this.setState({searchedCities : citiesFound }); 
                      }}
                    />
                     <FlatList
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{borderColor: Colors.whiteFF, borderTopWidth: 1}}
                        data={searchedCities}
                        renderItem  = {this.renderCitiesData}
                    />
                </View>
            </View>
          </Modal>

        <View style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.title}>Home</Text>
            <Image style={styles.appLogo} source={Images.waybusWhiteLogo} />
            <TouchableOpacity onPress={() => this.props.navigation.navigate('notification')}>
              <Image style={styles.appLogo} source={Images.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <View style={styles.locationContent}>
            <View >
              <View style={styles.blueCircle} />
              {dot.map((i) => {
                return (
                  <View style={styles.dotted} />
                )
              })}
              <Image style={styles.mapPin} source={Images.mapPin} />
            </View>
            <View style={styles.textInputView}>
              <TouchableOpacity
                onPress = {() => this.setState({showCities : true, searchText:'',searchedCities :cityHistory, selectedCitySearch : 0})}
                style={styles.textInputStyle}>
                <Text style={{color:pickUp ? 'black' : 'gray',fontSize: Fonts.size.font14 }}>{pickUp ? pickUp :  'From City'}</Text>
              </TouchableOpacity>
              <View style={styles.border} />
              <TouchableOpacity
                onPress = {() => this.setState({showCities : true,searchText:'',searchedCities :cityHistory, selectedCitySearch : 1})}
                style={styles.textInputStyle}>
                <Text style={{color:drop ? 'black' : 'gray',fontSize: Fonts.size.font14 }}>{drop ? drop : 'To City'}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => { 
                this.setState({
                  originId : destId,
                  destId : originId,
                  pickUp : drop,
                  drop : pickUp
                }) 
              }} style={{ width:30,marginLeft: wp(-15)}}>
              <Image style={styles.twoPin} source={Images.twoPin} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={seatType}
            horizontal
            contentContainerStyle={{height:46}}
            style={{ alignSelf: 'center'}}
            renderItem={({ item, index }) => this.renderItem(item, index)}
          />
        </View>
        <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 136, marginHorizontal: 20 }}>

          <View style={{ flexDirection: 'row', alignSelf: 'center', width: '81%', height: 70, backgroundColor: Colors.whiteFF, alignSelf: 'center', borderRadius: 5, borderTopRightRadius:0,borderBottomRightRadius:0, marginTop:20 }}>
            <View>
              <Text style={{ fontSize: Fonts.size.font14, color: Colors.black34, marginLeft: 25, marginTop: 10 }}>When you want to go ?</Text>
              <TouchableOpacity style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', }} onPress={() => { this.setState({ isDateTimePickerVisible: true }) }}>
                <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={Images.calendar} />
                <Text style={{ fontSize: Fonts.size.font14, color: Colors.blueTheme, marginLeft: 10 }}>{searchDate}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginTop: 20, marginLeft: 50 }} onPress={()=>this.setState({filterModalVisible:true})}>
              <Image resizeMode={'contain'} style={styles.overlay} source={modalSelectedIcon} />
              <View style={{
                width: 0,
                height: 0,
                borderLeftWidth: 7,
                borderRightWidth: 7,
                borderTopWidth: 12,
                borderBottomWidth: 0,
                borderStyle: 'solid',
                borderTopColor: Colors.greyE2,
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
                alignSelf: 'center', marginTop: 5
              }} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            onPress={()=>{
              if(originId && destId){
                this.onSaveRecentSearches(originId, destId, selectedApiDate);
                this.props.navigation.navigate('busAvailability', {selectedSeatType:selectedSeatType, originId : originId, destId : destId, date : selectedApiDate, title:pickUp + ' To ' + drop});
              }
            }}
              style={{ alignItems: 'center', justifyContent: 'center', width: 74, height: 70, borderRadius: 5, backgroundColor: Colors.blueTheme,marginTop:20 }} >
            <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={Images.search} />
          </TouchableOpacity>

        </View>
        {recentSearches[0] ? (
          <View style={{marginLeft:7}}> 
            <Text style={{marginTop: 40, marginLeft: 16}}>Recent Search</Text>
            <FlatList
              data={recentSearches}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item})=>{
                return(
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('busAvailability', {selectedSeatType:selectedSeatType, originId : item.originId, destId : item.destId, date : item.date, title:item.originN + ' To ' + item.destN}) } style={{marginHorizontal: 10, marginTop: 10, width: 243, backgroundColor: colors.blueTheme, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
                    <View style={{backgroundColor: 'white',height:85, borderRadius: 5, paddingVertical: 13, paddingLeft: 13}}>
                      <View style={{flexDirection: 'row', alignItems:'center', height:40}}>
                        <Image source={Images.busIcon} style={{height: 13, width: 13}}/>
                        <Text style={{marginLeft: 5}}>{item.originN} To {item.destN}</Text>
                      </View>
                      <Text style={{marginTop:7, marginLeft:7}}>{item.date}</Text>
                    </View>
                    <Text style={{color: 'white', textAlign: 'center', margin: 5}}>Book Now</Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        ) : null}
          
        <View style={{marginTop: 18, marginLeft: 16, flexDirection: 'row', justifyContent: 'space-between', marginRight: 16}}>
        <Text style={{}}>New Offers</Text>
        {/*<Text style={{}}>View all</Text>*/}
        </View>

        <View style={{marginHorizontal: 16,padding:15, backgroundColor: 'white',justifyContent:'center',marginTop: 10, flex:1,borderRadius: 5}}>
          <Text style={{fontSize:14, fontWeight:'bold'}}>Discount : <Text style={{fontSize:18, color : Colors.blueTheme}}> 5%</Text> <Text style={{fontWeight:'400'}}> (Max 50)</Text> </Text>
          <Text style={{fontSize:14 , color:Colors.blueTheme, marginTop:7}}>Applicable to all bookings.</Text>
          <Text style={{fontSize:13 , color:'gray', marginTop:7}}>* Conditions Apply</Text>
        </View>  
        
          {/* <FlatList
            data={[1, 2, 3, 4, 5, 6, 7]}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={()=>{
              return (
                <Image source={Images.offer} resizeMode={'contain'} style={{width: 243, height: 86, marginLeft: 16, marginTop: 10}}/>
                <Image source={Images.offer} resizeMode={'contain'} style={{width: 243, height: 86, marginLeft: 16, marginTop: 10}}/>
              )
            }}
          />*/}
          
        </ScrollView>
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  getCities: () => dispatch(actions.citiesInfoAction()),
});

export default connect(null, mapDispatchToProps)(Home)