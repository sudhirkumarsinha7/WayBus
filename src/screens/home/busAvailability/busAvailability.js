import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, Image, ActivityIndicator, Dimensions, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Fonts, Images } from '../../../theme';
import styles from './styles'
import { hp, wp } from '../../../utils/heightWidthRatio';
import DateTimePickerModal from '../../../components/modals/datePicker'
import moment from 'moment';
import colors from '../../../theme/colors';
import * as actions from '../../../redux/action';
import { connect } from 'react-redux';

class busAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      showFilterModal: false,
      searchDate: moment(new Date()).format('DD - MMM - YYYY'),
      availabilityArray: [],
      totalAvailableBuses: [],
      busesArrayAfterBusTypeSelection: [],

      modalVisible: false,
      priceSort: '',
      timeSort: '',

      busTypes: [{ id: 1, name: 'AC' }, { id: 2, name: 'Non-AC' }, { id: 3, name: 'Sleeper' }, { id: 4, name: 'Seater' }, { id: 5, name: 'Semi Sleeper' }],
      selectedBusTypes: props.route.params.selectedSeatType ? [props.route.params.selectedSeatType] : ['AC', 'Non-AC', 'Sleeper', 'Seater', 'Semi Sleeper'],

      noData: false,

      title: '',
      date: moment(new Date(props.route.params.date)).format('YYYY/MM/DD'),
      isLoading: false,
    };
    console.log('props.route.params.selectedSeatType');
    console.log(props.route.params.selectedSeatType);
  }

  componentDidMount = () => {
    console.log('this.props.route.params');
    console.log(this.props.route.params);

    const { originId, destId, date, title } = this.props.route.params

    this.setState({
      searchDate: moment(date).format('DD - MMM - YYYY'),
      title: title
    });

    this.getBusesInfo(date);
  }

  handleDate = (date) => {
    let selectedDate = moment(date).format('DD - MMM - YYYY')
    this.getBusesInfo(moment(date).format('YYYY-MM-DD'));
    this.setState({
      searchDate: selectedDate,
      isDateTimePickerVisible: false,
      date: moment(new Date(date)).format('YYYY/MM/DD'),
    })

  }

  onDateBefore = () => {
    const { date } = this.state;
    var dateN = new Date(moment(date).format('YYYY/MM/DD'));
    var dateChanged = moment(dateN).subtract(1, "days").format('DD - MMM - YYYY');
    // console.log(date);
    if (new Date() < new Date(date)) {
      this.setState({
        searchDate: dateChanged,
        date: moment(dateN).subtract(1, "days").format('YYYY/MM/DD'),
      })
      this.getBusesInfo(moment(moment(dateN).subtract(1, "days").format('YYYY/MM/DD')).format('YYYY-MM-DD'));
    }
  }

  onDateAfter = () => {
    const { date } = this.state;
    var dateN = new Date(moment(date).format('YYYY/MM/DD'));
    var dateChanged = moment(dateN).add(1, "days").format('DD - MMM - YYYY');
    // console.log(date);
    this.setState({
      searchDate: dateChanged,
      date: moment(dateN).add(1, "days").format('YYYY/MM/DD'),
    })
    this.getBusesInfo(moment(moment(dateN).add(1, "days").format('YYYY/MM/DD')).format('YYYY-MM-DD'));
  }


  busTypeSelection = (value) => {
    console.log(value);
    var selectedArray = this.state.selectedBusTypes;
    // console.log(selectedArray);

    var res = selectedArray.some(item => (item == value));
    if (res) {
      selectedArray.splice(selectedArray.indexOf(value), 1);
    } else {
      selectedArray = selectedArray.concat(value);
    }

    this.setState({ selectedBusTypes: selectedArray });
    // console.log(selectedArray);

    var finalArr = [];
    this.state.totalAvailableBuses.forEach(itemOld => {
      selectedArray.forEach(val => {
        if (itemOld[8].includes(val)) {
          var res = finalArr.some(item => (item == itemOld));
          if (!res) {
            finalArr = [...finalArr, itemOld];
          }
        }
      })
    })

    //console.log('finalArr');
    //console.log(finalArr);
    this.setState({
      availabilityArray: finalArr,
      busesArrayAfterBusTypeSelection: finalArr,
    });
  }

  handleCheckBusType(val) {
    var output = this.state.selectedBusTypes.some(item => (item == val));
    return output;
  }


  getBusesInfo = (date) => {
    const { getSchedules, navigation } = this.props
    const { originId, destId } = this.props.route.params
    this.setState({ isLoading: true })

    getSchedules(originId, destId, date)
      .then((res) => {
        this.setState({ isLoading: false });
        if (res.payload.status == 200) {
          // console.log('schedules getting');
          // console.log(res.payload.data.result);
          if (res.payload.data.result) {
            var newArr = res.payload.data.result;
            newArr = newArr.slice(1, res.payload.data.result.length);

            var valuesArr = [];
            var finalArr = [];
            newArr.forEach(item => {
              if (item[18] != "Unavailable-Service Left" && item[18] != "Unavailable-SoldOut") {
                valuesArr = [...valuesArr, item]
              }
            })

            valuesArr.forEach(itemOld => {
              this.state.selectedBusTypes.forEach(val => {
                if (itemOld[8].includes(val)) {
                  // console.log('contains ' , item[8]);
                  var res = finalArr.some(item => (item == itemOld));
                  if (!res) {
                    finalArr = [...finalArr, itemOld];
                  }
                }
              })
            })

            console.log('finalArr');
            console.log(finalArr);

            this.setState({
              availabilityArray: finalArr,
              busesArrayAfterBusTypeSelection: finalArr,
              totalAvailableBuses: valuesArr
            });
          } else {
            this.setState({
              availabilityArray: [],
              noData: true
            });
          }
        }
      })
  }


  onSetFilter = () => {
    // console.log(this.state.priceSort);
    // console.log(this.state.timeSort);

    var finalArr = [];
    if (this.state.timeSort == '00:00-12:00') {
      this.state.busesArrayAfterBusTypeSelection.forEach(item => {
        if (parseInt(item[9].split(':')[0]) < 12) {
          finalArr = [...finalArr, item];
        }
      })
    } else if (this.state.timeSort == '12:00-18:00') {
      this.state.busesArrayAfterBusTypeSelection.forEach(item => {
        if (parseInt(item[9].split(':')[0]) < 18 && parseInt(item[9].split(':')[0]) >= 12) {
          finalArr = [...finalArr, item];
        }
      })
    } else if (this.state.timeSort == '18:00-24:00') {
      this.state.busesArrayAfterBusTypeSelection.forEach(item => {
        if (parseInt(item[9].split(':')[0]) < 24 && parseInt(item[9].split(':')[0]) >= 18) {
          finalArr = [...finalArr, item];
        }
      })
    } else {
      finalArr = this.state.busesArrayAfterBusTypeSelection;
    }


    if (this.state.priceSort == 'LTH') {
      finalArr = finalArr.sort(function (a, b) {
        return a[15].split(',')[0].split(':')[1] - b[15].split(',')[0].split(':')[1];
      });
    } else if (this.state.priceSort == 'HTL') {
      finalArr = finalArr.sort(function (a, b) {
        return b[15].split(',')[0].split(':')[1] - a[15].split(',')[0].split(':')[1];
      });
    } else if (this.state.priceSort == 'Asc') {
      finalArr = finalArr.sort(function (a, b) {
        if (parseInt(a[11].split(':')[0]) == parseInt(b[11].split(':')[0])) {
          return parseInt(a[11].split(':')[1]) - parseInt(b[11].split(':')[1]);
        } else {
          return parseInt(a[11].split(':')[0]) - parseInt(b[11].split(':')[0]);
        }

      });
    } else if (this.state.priceSort == 'Desc') {
      finalArr = finalArr.sort(function (a, b) {
        if (parseInt(a[11].split(':')[0]) == parseInt(b[11].split(':')[0])) {
          return parseInt(b[11].split(':')[1]) - parseInt(a[11].split(':')[1]);
        } else {
          return parseInt(b[11].split(':')[0]) - parseInt(a[11].split(':')[0]);
        }
      });
    } else if (this.state.priceSort == '') {
      finalArr = finalArr;
    }
    // console.log(this.state.totalAvailableBuses);
    // console.log(finalArr);
    if (finalArr[0]) {
      this.setState({ availabilityArray: finalArr });
    } else {
      this.setState({
        availabilityArray: [],
        noData: true
      });
    }

  }

  renderItem(item) {

    return (
      <TouchableOpacity
        onPress={() => {
          var busDetails = { date: this.state.searchDate, from: this.props.route.params.title.split(' To ')[0], to: this.props.route.params.title.split(' To ')[1], depTime: item[9], arrTime: item[10], duration: item[11] }
          this.props.navigation.navigate('seatSelection', { scheduleId: item[0], busDetails: busDetails, date: this.state.searchDate, apiDate: this.state.date, title: this.props.route.params.title, depTime: item[9], originId: this.props.route.params.originId, destId: this.props.route.params.destId,travelsName: item[3] })
        }}
        style={{ ...styles.eachContainer, flexDirection: 'column' }}>
        <View style={styles.rowContent}>
          <View>
            <Text style={{ ...styles.whiteContent, textAlign: "left" }}>{item[3]}</Text>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          {/*<Text style={[styles.whiteContent, {color:'gray', fontWeight:'bold'}]}>{item[2]}</Text>*/}
          <Text style={styles.grayContent}>Bus-type: <Text style={{ color: 'black' }}>{item[8]}</Text></Text>
          {/*<Text style={styles.grayContent}>Status: <Text style={{color:'black'}}>{item[18]}</Text></Text>*/}
        </View>

        <View style={styles.rowContent}>
          <Text style={styles.darkGrayContent}>{item[9]}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styles.backIcon} source={Images.busIcon} />
            <View style={styles.blueLine}></View>

            <View style={styles.centerView}>
              <Text style={styles.grayContent}>Duration</Text>
              <View style={styles.blueButton}>
                <Text style={{ ...styles.whiteContent }}>{item[11]}</Text>
              </View>
              <Text style={styles.grayContent}>{item[38] ? (item[38].length + ' Holds') : ''} </Text>
            </View>

            <View style={styles.blueLine}></View>
            <Image style={styles.backIcon} source={Images.busIcon} />
          </View>
          <Text style={styles.darkGrayContent}>{item[10]}</Text>
        </View>

        <View style={styles.rowContent}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {/*<Image style={styles.smallIcon} source={Images.polygon} />
            <Text style={styles.darkGrayContent}> 3/5</Text>*/}
          </View>
          <Text style={styles.blueContent}>₹{item[15].split(',')[0].split(':')[1]}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { searchDate, noData, isLoading, busTypes, modalVisible, priceSort, timeSort, date, showFilterModal, isDateTimePickerVisible, availabilityArray } = this.state
    let sDate = new Date(date);
    // let sDate1 = sDate.getMilliseconds()
    var now = new Date();
    // var now = d.getMilliseconds();
    return (
      <View style={styles.mainContainer}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            this.setState({ modalVisible: !modalVisible });
          }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <View style={{ backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, width: '100%', justifyContent: 'center', height: 480 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => this.setState({ priceSort: '', timeSort: '' })} style={{ borderWidth: 1, borderColor: Colors.blueTheme, padding: 5, marginRight: 15, borderRadius: 4 }}>
                  <Text style={{ color: Colors.blueTheme, fontWeight: 'bold' }}>CLEAR</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.onSetFilter(); this.setState({ modalVisible: false }) }} style={{ borderWidth: 1, borderColor: Colors.blueTheme, padding: 5, borderRadius: 4 }}>
                  <Text style={{ color: Colors.blueTheme, fontWeight: 'bold' }}>DONE</Text>
                </TouchableOpacity>
              </View>

              <View style={{ borderBottomWidth: 0.5, paddingBottom: 25, borderColor: 'gray', padding: 5 }}>
                <Text style={{ fontSize: 16, color: Colors.blueTheme, fontWeight: 'bold', marginVertical: 10 }}>Sort By Price</Text>
                <TouchableOpacity onPress={() => {
                  let { priceSort } = this.state;
                  this.setState({ priceSort: (priceSort === 'LTH') ? '' : 'LTH' });
                }} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderColor: '#dcdcdc', borderWidth: 0.1 }}>
                  <Image style={styles.backIcon} source={priceSort == 'LTH' ? Images.checked : Images.unchecked} />
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}> Low To High</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  let { priceSort } = this.state;
                  this.setState({ priceSort: (priceSort === 'HTL') ? '' : 'HTL' });
                }} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderColor: '#dcdcdc', borderWidth: 0.1 }}>
                  <Image style={styles.backIcon} source={priceSort == 'HTL' ? Images.checked : Images.unchecked} />
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}> High To Low</Text>
                </TouchableOpacity>
              </View>

              <View style={{ borderBottomWidth: 0.5, paddingBottom: 25, borderColor: 'gray', padding: 5 }}>
                <Text style={{ fontSize: 16, color: Colors.blueTheme, fontWeight: 'bold', marginVertical: 10 }}>Sort By Duration</Text>
                <TouchableOpacity onPress={() => {
                  let { priceSort } = this.state;
                  this.setState({ priceSort: (priceSort === 'Asc') ? '' : 'Asc' });
                }} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderColor: '#dcdcdc', borderWidth: 0.1 }}>
                  <Image style={styles.backIcon} source={priceSort == 'Asc' ? Images.checked : Images.unchecked} />
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}> Ascending</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  let { priceSort } = this.state;
                  this.setState({ priceSort: (priceSort === 'Desc') ? '' : 'Desc' });
                }} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderColor: '#dcdcdc', borderWidth: 0.1 }}>
                  <Image style={styles.backIcon} source={priceSort == 'Desc' ? Images.checked : Images.unchecked} />
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}> Descending</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 16, color: Colors.blueTheme, fontWeight: 'bold', marginVertical: 10 }}>Sort By Time</Text>
                <TouchableOpacity onPress={() => {
                  let { timeSort } = this.state;
                  this.setState({ timeSort: (timeSort === '00:00-12:00') ? '' : '00:00-12:00' });
                }} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderColor: '#dcdcdc', borderWidth: 0.1 }}>
                  <Image style={styles.backIcon} source={timeSort == '00:00-12:00' ? Images.checked : Images.unchecked} />
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}> 00:00 - 12:00</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                  let { timeSort } = this.state;
                  this.setState({ timeSort: (timeSort === '12:00-18:00') ? '' : '12:00-18:00' });
                }} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderColor: '#dcdcdc', borderWidth: 0.1 }}>
                  <Image style={styles.backIcon} source={timeSort == '12:00-18:00' ? Images.checked : Images.unchecked} />
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}> 12:00 - 18:00</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => {
                  let { timeSort } = this.state;
                  this.setState({ timeSort: (timeSort === '18:00-24:00') ? '' : '18:00-24:00' });
                }} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderColor: '#dcdcdc', borderWidth: 0.1 }}>
                  <Image style={styles.backIcon} source={timeSort == '18:00-24:00' ? Images.checked : Images.unchecked} />
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}> 18:00 - 24:00</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showFilterModal}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            this.setState({ showFilterModal: false });
          }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({ showFilterModal: false })} style={{ alignSelf: 'flex-end', right: 20, bottom: 10, zIndex: 1 }}>
              <Image source={Images.cancel} style={{ width: wp(40), height: wp(40), resizeMode: 'contain' }} />
            </TouchableOpacity>

            <View style={{ backgroundColor: Colors.whiteFF, width: '80%', padding: 20, top: -40, borderRadius: 10 }}>

              <View style={[styles.modalTab, { borderBottomWidth: 1, borderColor: Colors.greyED }]}>
                <Text style={styles.grayBoldContent}>Bus Type</Text>
              </View>

              <FlatList
                data={busTypes}
                renderItem={({ item, index }) => (
                  <TouchableOpacity activeOpacity={1} onPress={() => this.busTypeSelection(item.name)} style={styles.modalTab}>
                    <Text style={[styles.grayBoldContent, { color: Colors.grey4F }]}>{item.name}</Text>
                    <Image source={this.handleCheckBusType(item.name) ? Images.checked : Images.unchecked} style={styles.backIcon} />
                  </TouchableOpacity>
                )}
                keyExtractor={item => { item.id }}
              />

            </View>
          </View>
        </Modal>

        <DateTimePickerModal
          isDateTimePickerVisible={isDateTimePickerVisible}
          handleDatePicked={(date) => this.handleDate(date)}
          hideDateTimePicker={() => { this.setState({ isDateTimePickerVisible: false }) }}
          newDate={new Date(moment(date).format('YYYY/MM/DD'))}
          minDate={new Date(moment(new Date()).format('YYYY/MM/DD'))}
          maxDate={new Date(moment().add(60, "days").format('YYYY/MM/DD'))}
        />
        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.centerView}>
                <Image style={styles.backIcon} source={Images.backButton} />
              </TouchableOpacity>
              <Text style={styles.title}>{this.state.title}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.setState({ showFilterModal: true })}>
                <Image style={styles.appLogo} source={Images.vector} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} style={[styles.centerView, { marginLeft: 6 }]}>
                <Image style={styles.backIcon} source={Images.sort} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.eachContainer}>
              <TouchableOpacity onPress={() => this.onDateBefore()} style={styles.centerView}>
{   sDate>now ?           <Image style={styles.smallIcon} source={Images.leftArrow} />: null
}              
{/* <Text>{d+ ''}</Text> */}
</TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ isDateTimePickerVisible: true })} style={styles.centerView}>
                <Text style={styles.titles}>{searchDate}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.onDateAfter()} style={styles.centerView}>
                <Image style={styles.smallIcon} source={Images.rightArrow} />
              </TouchableOpacity>
            </View>

            {availabilityArray[0] ? (
              <View style={[styles.centerView, { margin: hp(10) }]}>
                <Text style={styles.grayBoldContent}>{availabilityArray.length > 2 ? (availabilityArray.length + ' Buses available') : (availabilityArray.length + ' Bus available')} </Text>
              </View>
            ) : (
              noData ?
                <View style={[styles.centerView, { marginTop: hp(60) }]}>
                  <Text style={styles.grayBoldContent}>No bus available.</Text>
                </View>
                : null
            )}

            <FlatList
              data={availabilityArray}
              renderItem={({ item, index }) => this.renderItem(item, index)}
            />

          </ScrollView>

        </View>
        <ActivityIndicator size="large" color={Colors.blueTheme} animating={isLoading} style={{ bottom: Dimensions.get('window').height / 2 }} />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSchedules: (originId, destId, date) => dispatch(actions.busesInfoAction(originId, destId, date)),
});

export default connect(null, mapDispatchToProps)(busAvailability)