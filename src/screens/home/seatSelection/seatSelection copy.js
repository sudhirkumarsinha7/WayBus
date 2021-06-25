import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Colors, Fonts, Images, AppStyles} from '../../../theme';
import styles from './styles';
import {hp, wp} from '../../../utils/heightWidthRatio';
import moment from 'moment';
import AppButton from '../../../components/appButton/appButton';
import * as actions from '../../../redux/action';
import {connect} from 'react-redux';

class seatSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      view: [1],

      boardingStages: [],
      droppingStages: [],

      busInfo: [],
      selectedSeats: [],
      busDetails: null,
      lowerBerth: [],
      upperBerth: [],
      scheduleId: '',
      isLoading: false,
      fareInfo: {
        totalBaseFare: 0,
        gst: 0,
        finalAmount: 0,
        merchantFee: 0,
        operatorFee: 0,
        fares: [],
        discount: 0,
      },
    };
  }

  componentDidMount = () => {
    // this.getScheduleInfo();
    const {scheduleId} = this.props.route.params;
    this.setState({scheduleId: scheduleId});
    this.getBusDetails();
  };

  getBusDetails = () => {
    const {getSchedule, navigation} = this.props;
    const {scheduleId} = this.props.route.params;
    this.setState({isLoading: true});
    getSchedule(scheduleId).then((res) => {
      this.setState({isLoading: false});
      if (res.payload.status == 200) {
        if (res.payload.data.result) {
          console.log(
            'res.payload.data.result' + JSON.stringify(res.payload.data.result),
          );

          var coachDetails = res.payload.data.result.bus_layout.coach_details;
          var availableSt = res.payload.data.result.bus_layout.available.split(
            ',',
          );
          var ladiesSt = res.payload.data.result.bus_layout.ladies_seats.split(
            ',',
          );
          var boarding = res.payload.data.result.bus_layout.boarding_stages.split(
            '~',
          );
          var dropoff = res.payload.data.result.bus_layout.dropoff_stages.split(
            '~',
          );
          var lowerB = [];
          var upperB = [];
          var seat;

          coachDetails = coachDetails.split(',');
          coachDetails.forEach((item) => {
            var lowerRow = [];
            var upperRow = [];
            item.split('-').forEach((ST) => {
              seat = ST.split('|');
              if (seat[1] === 'UB' || seat[1] === 'SUB' || seat[1] === 'DUB') {
                upperRow = [...upperRow, ST];
              } else if (
                seat[1] === 'LB' ||
                seat[1] === 'SLB' ||
                seat[1] === 'DLB' ||
                seat[1] === 'SS' ||
                seat[1] === 'ST' ||
                seat[1] === 'PB' ||
                seat[1] === 'NPB' ||
                seat[1] === 'BS'
              ) {
                lowerRow = [...lowerRow, ST];
              } else if (seat[1] === '.GY') {
                // if(upperRow[0]){
                upperRow = [...upperRow, '|.GY'];
                // }
                // if(lowerRow[0]){
                lowerRow = [...lowerRow, '|.GY'];
                // }
              }
            });

            var count = 0;
            upperRow.forEach((item, i) => {
              if (item == '|.GY') {
                count++;
              }
              if (count == upperRow.length) {
                upperRow = [];
              }
            });

            if (upperRow.length > 0) {
              upperB = [...upperB, upperRow];
            }
            if (lowerRow.length > 0) {
              lowerB = [...lowerB, lowerRow];
            }
          });
          console.log('coachDetails' + JSON.stringify(coachDetails));
          // console.log(lowerB);
          // console.log(upperB);

          availableSt.forEach((item) => {
            lowerB.forEach((row, i) => {
              row.forEach((St, j) => {
                if (item.split('|')[0] == St.split('|')[0]) {
                  var val = St + '-' + item.split('|')[1];
                  lowerB[i][j] = val;
                }
              });
            });
          });

          availableSt.forEach((item) => {
            upperB.forEach((row, i) => {
              row.forEach((St, j) => {
                if (item.split('|')[0] == St.split('|')[0]) {
                  var val = St + '-' + item.split('|')[1];
                  upperB[i][j] = val;
                }
              });
            });
          });

          ladiesSt.forEach((item) => {
            lowerB.forEach((row, i) => {
              row.forEach((St, j) => {
                if (item == St.split('|')[0]) {
                  var val = St + '@' + 'L';
                  lowerB[i][j] = val;
                }
              });
            });
          });

          ladiesSt.forEach((item) => {
            upperB.forEach((row, i) => {
              row.forEach((St, j) => {
                if (item == St.split('|')[0]) {
                  var val = St + '@' + 'L';
                  upperB[i][j] = val;
                }
              });
            });
          });

          // console.log(boarding);
          // console.log(dropoff);
          console.log('lowerBerth' + JSON.stringify(lowerB));
          this.setState({
            busDetails: res.payload.data.result,
            lowerBerth: lowerB,
            upperBerth: upperB,
            boardingStages: boarding,
            droppingStages: dropoff,
          });

          if (!lowerB[0]) {
            this.setState({selectedTab: 1});
          }
        } else {
          navigation.goBack();
          console.log(res.payload.data.response.message);
        }
      }
    });
  };

  onSelectSeat = (type, seatN) => {
    var selectedArr = this.state.selectedSeats;
    var res = selectedArr.some((item) => item == seatN);
    if (res) {
      selectedArr.splice(selectedArr.indexOf(seatN), 1);
    } else {
      if (selectedArr.length > 4) {
        return false;
      } else {
        selectedArr = selectedArr.concat(seatN.split('&')[0] + '&1');
      }
    }
    this.setState({selectedSeats: selectedArr});
    var arr = [];
    if (type == 'lower') {
      arr = [...this.state.lowerBerth];
      arr.forEach((row, i) => {
        row.forEach((St, j) => {
          if (St == seatN) {
            var val;
            if (St.split('&')[1]) {
              val = St.split('&')[1] == 0 ? 1 : 0;
            } else {
              val = 1;
            }
            arr[i][j] = St.split('&')[0] + '&' + val;
          }
        });
      });
      this.setState({lowerBerth: arr});
    } else {
      arr = [...this.state.upperBerth];
      arr.forEach((row, i) => {
        row.forEach((St, j) => {
          if (St == seatN) {
            var val;
            if (St.split('&')[1]) {
              val = St.split('&')[1] == 0 ? 1 : 0;
            } else {
              val = 1;
            }
            arr[i][j] = St.split('&')[0] + '&' + val;
          }
        });
      });
      this.setState({upperBerth: arr});
    }

    // fareDetails : {
    //    totalBaseFare: {totalBasefare},
    //    gst: ${totalGST of the seats},
    //    finalAmount: ${totalBasefare + GST},
    //    merchantFee: {2% of the finalAmount},
    //    operatorFee: ${convenience_charge_percent of},
    //    fares: [type of array, fare of each seats],
    //    discount: ${5% discount from base fare Max 50}
    //  }

    var fareInf = {...this.state.fareInfo};
    var fares = [];

    var BP = 0;
    selectedArr.forEach((item) => {
      var price = parseFloat(item.split('&')[0].split('-')[1]);
      BP = BP + price;
      fares = [...fares, price];
    });
    //console.log('base price ' + BP);

    var gst = 0;
    this.state.busDetails.bus_layout.available_gst
      .split(',')
      .forEach((item) => {
        selectedArr.forEach((St) => {
          if (item.split('|')[0] == St.split('|')[0]) {
            gst = gst + parseFloat(item.split('|')[1]);
          }
        });
      });
    // console.log('gst ' + gst);
    if (gst % 1 !== 0) {
      gst = parseFloat(gst.toFixed(2));
    } else {
      gst = gst;
    }

    var baseF = BP + gst;
    var mFee = Math.round((2 * baseF) / 100);
    var opFee = Math.round(
      ((BP + gst) * this.state.busDetails.convenience_charge_percent) / 100,
    );

    var disc = Math.round(
      (5 * BP) / 100 > 50 ? 50 : Math.round((5 * BP) / 100),
    );
    var finalAm = baseF + mFee + opFee - disc;

    if (gst % 1 !== 0) {
      finalAm = parseFloat(finalAm.toFixed(2));
    } else {
      finalAm = finalAm;
    }

    fareInf = {
      ...fareInf,
      totalBaseFare: BP,
      gst: gst,
      finalAmount: finalAm,
      merchantFee: mFee,
      operatorFee: opFee,
      fares: fares,
      discount: disc,
    };

    // console.log(fareInf);
    this.setState({fareInfo: fareInf});
  };

  lowerSeat(item, color) {
    var seatType = 'seater';
    var seatName = item.split('&')[0].split('@')[0].split('-')[0].split('|')[1];

    if (
      seatName === 'ST' ||
      seatName === 'SL' ||
      seatName === 'SS' ||
      seatName === 'PB' ||
      seatName === 'NPB' ||
      seatName === 'BS'
    ) {
      seatType = 'seater';
    } else {
      seatType = 'sleeper';
    }

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 5,
        }}>
        {seatType == 'seater' ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                height: 13,
                width: 35,
                backgroundColor: color,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
            />
            <View
              style={{
                height: 32,
                width: 50,
                backgroundColor: color,
                borderRadius: 4,
                borderColor: Colors.greyD5,
                borderWidth: 1,
                borderTopWidth: 0,
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={[
                  styles.titleBlack,
                  {
                    marginLeft: 0,
                    color: item.split('&')[1] == 1 ? 'white' : 'black',
                  },
                ]}>
                {item.split('|')[0]}
              </Text>
            </View>
            <View
              style={{
                height: 9,
                width: 35,
                backgroundColor: color,
                borderColor: Colors.greyD5,
                borderWidth: 1,
                borderTopWidth: 0,
                borderTopRadius: 0,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              height: 120,
              width: 50,
              paddingVertical: 7,
              backgroundColor: color,
              borderRadius: 4,
              borderColor: Colors.greyD5,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View />
            <Text
              style={[
                styles.titleBlack,
                {
                  color: item.split('&')[1] == 1 ? 'white' : 'black',
                  marginLeft: 0,
                },
              ]}>
              {item.split('|')[0]}
            </Text>
            <View
              style={{
                height: 8,
                width: 30,
                backgroundColor: color,
                borderColor: Colors.greyD5,
                borderWidth: 1,
                borderRadius: 5,
              }}
            />
          </View>
        )}
      </View>
    );
  }

  upperSeat(item, color) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 5,
        }}>
        <View
          style={{
            height: 120,
            width: 50,
            paddingVertical: 7,
            backgroundColor: color,
            borderRadius: 4,
            borderColor: Colors.greyD5,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View />
          <Text
            style={[
              styles.titleBlack,
              {
                color: item.split('&')[1] == 1 ? 'white' : 'black',
                marginLeft: 0,
              },
            ]}>
            {item.split('|')[0]}
          </Text>
          <View
            style={{
              height: 8,
              width: 30,
              backgroundColor: color,
              borderColor: Colors.greyD5,
              borderWidth: 1,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    );
  }
  // seatLeyout1(item, j) {
  //   return <View>
  //      {item.split('|')[0] ? (
  //         <View
  //           key={j}
  //           style={{
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //           }}>
  //           {item.split('-')[1] ? (
  //             <TouchableOpacity
  //               onPress={() => this.onSelectSeat('lower', item)}>
  //               {this.lowerSeat(
  //                 item,
  //                 item.split('&')[1]
  //                   ? item.split('&')[1] == 1
  //                     ? Colors.blueTheme
  //                     : item.split('&')[0].split('@')[1]
  //                     ? '#FF848C'
  //                     : '#FFF'
  //                   : item.split('&')[0].split('@')[1]
  //                   ? '#FF848C'
  //                   : '#FFF',
  //               )}
  //             </TouchableOpacity>
  //           ) : (
  //             <View>{this.lowerSeat(item, '#c1c1c1')}</View>
  //           )}
  //         </View>
  //       ) : (
  //         <View
  //           style={{
  //             width: wp(50),
  //             height: wp(20),
  //           }}
  //         />
  //       )}
  //     </View>
  // }
  seatLeyout=(item, j)=>{
    return <View >
     
          {item.split('|')[0] ? (
                    <View
            key={j}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
          {item.split('-')[1] ? (
              <TouchableOpacity
                onPress={() => this.onSelectSeat('lower', item)}>
                {this.lowerSeat(
                  item,
                  item.split('&')[1]
                    ? item.split('&')[1] == 1
                      ? Colors.blueTheme
                      : item.split('&')[0].split('@')[1]
                      ? '#FF848C'
                      : '#FFF'
                    : item.split('&')[0].split('@')[1]
                    ? '#FF848C'
                    : '#FFF',
                )}
              </TouchableOpacity>
            ) : (
              <View>{this.lowerSeat(item, '#c1c1c1')}</View>
            )}
          </View>
          ):
          
                  <View
            style={{
              width: wp(50),
              height: wp(20),
            }}
          />}
    </View>
  }
  render() {
    const {
      selectedTab,
      isLoading,
      selectedSeats,
      boardingStages,
      droppingStages,
      view,
      lowerBerth,
      upperBerth,
    } = this.state;
    const {date, title, depTime} = this.props.route.params;
    let lower1 = [];
    let lower2 = [];
    let lower3 = [];
    let lower4 = [];
    let lower5 = [];
    if (lowerBerth.length) {
      lower1 = lowerBerth.map((each, index) => {
        if (each.length) {
          return each[0];
        }
      });
      lower1 = lower1.filter(item => item)
      lower2 = lowerBerth.map((each) => {
        if (each.length) {
          return each && each[1];
        }
      });
      lower2 = lower2.filter(item => item)
      lower3 = lowerBerth.map((each) => {
        if (each.length ) {
          return each && each[2];
        }
      });
      lower3 = lower3.filter(item => item)
      lower4 = lowerBerth.map((each) => {
        if (each.length) {
          return each && each[3];
        }
      });
      lower4 = lower4.filter(item => item)
      lower5 = lowerBerth.map((each) => {
        if (each.length && each.length === 5) {
          return each[4];
        }
      });
      lower5 = lower5.filter(item => item)
    }
    console.log('lowerBerth data' + JSON.stringify(lower1));

    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.centerView}>
                <Image style={styles.backIcon} source={Images.backButton} />
              </TouchableOpacity>
              <Text style={styles.title}>Select Seats</Text>
            </View>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <View style={{flex: 1}}>
            <Text
              style={[
                styles.grayBoldContent,
                {textAlign: 'center', marginTop: 10},
              ]}>
              {date} - {depTime}
            </Text>
            <Text
              style={[
                styles.titleBlack,
                {textAlign: 'center', lineHeight: 30},
              ]}>
              {title}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: wp(10),
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={styles.blueBorderBtn}>
                <Text style={styles.blueContent}>Rating</Text>
              </View>

              <View style={styles.blueBorderBtn}>
                <Text style={styles.blueContent}>Cancellation Policy</Text>
              </View>

              <View style={styles.blueBorderBtn}>
                <Text style={styles.blueContent}>
                  Boarding & Dropping Point
                </Text>
              </View>
            </View>

            <View style={{flex: 1, backgroundColor: Colors.greyED}}>
              <View style={{paddingHorizontal: wp(10), alignItems: 'center'}}>
                <View style={styles.tabsContainer}>
                  {lowerBerth[0] ? (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        this.setState({selectedTab: 0});
                      }}
                      style={[
                        styles.tabBtn,
                        {
                          backgroundColor:
                            selectedTab == 0 ? Colors.blueTheme : Colors.greyD5,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.titleBlack,
                          {
                            marginLeft: 0,
                            color:
                              selectedTab == 0
                                ? Colors.whiteFF
                                : Colors.black4f,
                          },
                        ]}>
                        Lower
                      </Text>
                    </TouchableOpacity>
                  ) : null}

                  {upperBerth[0] ? (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        this.setState({selectedTab: 1});
                      }}
                      style={[
                        styles.tabBtn,
                        {
                          backgroundColor:
                            selectedTab == 1 ? Colors.blueTheme : Colors.greyD5,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.titleBlack,
                          {
                            marginLeft: 0,
                            color:
                              selectedTab == 1
                                ? Colors.whiteFF
                                : Colors.black4f,
                          },
                        ]}>
                        Upper
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 40}}>
                  <View style={{flex: 4.5}}>
                    {this.state.selectedTab == 0 ? (
                      lowerBerth[0] ? (
                        <View style={{flexDirection: 'row',paddingBottom: 70}}>
                          <View style={{ flex: 1}}>
                        <FlatList
                          data={lower1}
                          showsVerticalScrollIndicator={false}
                          renderItem={({item, index}) => this.seatLeyout(item, index)}
                          keyExtractor={(item) => {
                            item.split('|')[0];
                          }}
                        />
                        </View>
                        
                        <View style={{ flex: 1,}}>
                        <FlatList
                          data={lower2}
                          showsVerticalScrollIndicator={false}
                          renderItem={({item, index}) => this.seatLeyout(item, index)}
                          keyExtractor={(item) => {
                            item.split('|')[0];
                          }}
                        />
                        </View>
                        <View style={{ flex: 1}}>
                        <FlatList
                          data={lower3}
                          showsVerticalScrollIndicator={false}
                          renderItem={({item, index}) => this.seatLeyout(item, index)}
                          keyExtractor={(item) => {
                            item.split('|')[0];
                          }}
                        />
                        </View>
                        <View style={{ flex: 1}}>
                        <FlatList
                          data={lower4}
                          showsVerticalScrollIndicator={false}
                          renderItem={({item, index}) => this.seatLeyout(item, index)}
                          keyExtractor={(item) => {
                            item.split('|')[0];
                          }}
                        />
                        </View>
                        <View style={{ flex: 1}}>
                        <FlatList
                          data={lower5}
                          showsVerticalScrollIndicator={false}
                          renderItem={({item, index}) => this.seatLeyout(item, index)}
                          keyExtractor={(item) => {
                            item.split('|')[0];
                          }}
                        /> 
                        </View>
                       
                        </View>
                        // <FlatList
                        //   data={lowerBerth}
                        //   horizontal={true}
                        //   showsVerticalScrollIndicator={false}
                        //   renderItem={({item, index}) => (
                        //     <View
                        //       key={index}
                        //       style={{
                        //         flex: 1,
                        //         paddingTop: 20,
                        //         paddingBottom: 70,
                        //       }}>
                        //       <View
                        //         style={{width: '100%', flexDirection: 'row'}}>
                        //         <View
                        //           style={{
                        //             flex: 1,
                        //             alignItems: 'center',
                        //             justifyContent: 'center',
                        //           }}>
                        //           <FlatList
                        //             data={lowerBerth}
                        //             showsVerticalScrollIndicator={false}
                        //             renderItem={({item, i}) => (
                        //               <View
                        //                 style={{
                        //                   // marginVertical: 4,
                        //                   alignItems: 'center',
                        //                   justifyContent: 'center',
                        //                 }}>
                        //                 <FlatList
                        //                   data={item}
                        //                   horizontal={true}
                        //                   scrollEnabled={false}
                        //                   showsHorizontalScrollIndicator={false}
                        //                   keyExtractor={(item) => {
                        //                     item.split('|')[0];
                        //                   }}
                        //                   renderItem={
                        //                     ({item, j}) =>
                        //                       item.split('|')[0] ? (
                        //                         <View
                        //                           key={j}
                        //                           style={{
                        //                             alignItems: 'center',
                        //                             justifyContent: 'center',
                        //                           }}>
                        //                           {item.split('-')[1] ? (
                        //                             <TouchableOpacity
                        //                               onPress={() =>
                        //                                 this.onSelectSeat(
                        //                                   'lower',
                        //                                   item,
                        //                                 )
                        //                               }>
                        //                               {this.lowerSeat(
                        //                                 item,
                        //                                 item.split('&')[1]
                        //                                   ? item.split(
                        //                                       '&',
                        //                                     )[1] == 1
                        //                                     ? Colors.blueTheme
                        //                                     : item
                        //                                         .split('&')[0]
                        //                                         .split('@')[1]
                        //                                     ? '#FF848C'
                        //                                     : '#FFF'
                        //                                   : item
                        //                                       .split('&')[0]
                        //                                       .split('@')[1]
                        //                                   ? '#FF848C'
                        //                                   : '#FFF',
                        //                               )}
                        //                             </TouchableOpacity>
                        //                           ) : (
                        //                             <View>
                        //                               {this.lowerSeat(
                        //                                 item,
                        //                                 '#c1c1c1',
                        //                               )}
                        //                             </View>
                        //                           )}
                        //                         </View>
                        //                       ) : (
                        //                         <View
                        //                           style={{
                        //                             width: wp(50),
                        //                             height: wp(20),
                        //                           }}
                        //                         />
                        //                       )
                        //                     // ) :null
                        //                   }
                        //                 />
                        //               </View>
                        //             )}
                        //           />
                        //         </View>
                        //       </View>
                        //     </View>
                        //   )}
                        //   keyExtractor={(index) => {
                        //     index;
                        //   }}
                        // />
                      ) : null
                    ) : upperBerth[0] ? (
                      <FlatList
                        data={view}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index}) => (
                          <View
                            key={index}
                            style={{
                              flex: 1,
                              paddingTop: 20,
                              paddingBottom: 70,
                            }}>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                              <View style={{flex: 1, alignItems: 'center'}}>
                                <FlatList
                                  data={upperBerth}
                                  showsVerticalScrollIndicator={false}
                                  renderItem={({item, i}) => (
                                    <View
                                      style={{
                                        marginVertical: 4,
                                        alignItems: 'center',
                                      }}>
                                      <FlatList
                                        data={item}
                                        horizontal={true}
                                        scrollEnabled={false}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => {
                                          item.split('|')[0];
                                        }}
                                        renderItem={({item, j}) =>
                                          item.split('|')[0] ? (
                                            <View
                                              style={{alignItems: 'center'}}>
                                              {item.split('-')[1] ? (
                                                <TouchableOpacity
                                                  onPress={() =>
                                                    this.onSelectSeat(
                                                      'upper',
                                                      item,
                                                    )
                                                  }>
                                                  {this.upperSeat(
                                                    item,
                                                    item.split('&')[1]
                                                      ? item.split('&')[1] == 1
                                                        ? Colors.blueTheme
                                                        : item
                                                            .split('&')[0]
                                                            .split('@')[1]
                                                        ? '#FF848C'
                                                        : 'white'
                                                      : item
                                                          .split('&')[0]
                                                          .split('@')[1]
                                                      ? '#FF848C'
                                                      : '#fff',
                                                  )}
                                                  {/*<Image source = {item.split('&')[1] ? (item.split('&')[1] == 1 ?Images.upperBlueSeat : (item.split('&')[0].split('@')[1] ? Images.upperPinkSeat : Images.upperWhiteSeat)) : (item.split('&')[0].split('@')[1] ? Images.upperPinkSeat : Images.upperWhiteSeat)} style={styles.largeSeatImg} />*/}
                                                </TouchableOpacity>
                                              ) : (
                                                <View>
                                                  {this.upperSeat(
                                                    item,
                                                    '#c1c1c1',
                                                  )}
                                                </View>
                                              )}
                                            </View>
                                          ) : (
                                            <View
                                              style={{
                                                width: wp(50),
                                                height: wp(60),
                                              }}
                                            />
                                          )
                                        }
                                      />
                                    </View>
                                  )}
                                />
                              </View>
                            </View>
                          </View>
                        )}
                        keyExtractor={(index) => {
                          index;
                        }}
                      />
                    ) : null}
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <View
                      style={[
                        styles.identifiers,
                        {backgroundColor: Colors.whiteFF},
                      ]}
                    />
                    <Text style={styles.blackContent}>Available</Text>

                    <View
                      style={[
                        styles.identifiers,
                        {backgroundColor: Colors.greyD5},
                      ]}
                    />
                    <Text style={styles.blackContent}>Booked</Text>

                    <View
                      style={[
                        styles.identifiers,
                        {backgroundColor: Colors.blueTheme},
                      ]}
                    />
                    <Text style={styles.blackContent}>Selected</Text>

                    <View
                      style={[styles.identifiers, {backgroundColor: '#FF848C'}]}
                    />
                    <Text style={styles.blackContent}>Ladies</Text>
                  </View>
                </View>
              </View>
            </View>

            {selectedSeats[0] ? (
              <View
                style={[
                  AppStyles.shadow2,
                  {
                    bottom: 0,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: Colors.whiteFF,
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={[styles.lightGrayContent, {flex: 1}]}>
                    Ticket Price
                  </Text>
                  <Text style={styles.lightGrayContent}>:</Text>
                  <Text
                    style={[
                      styles.lightGrayContent,
                      {flex: 1, textAlign: 'right'},
                    ]}>
                    ₹{this.state.fareInfo.totalBaseFare}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.lightGrayContent, {flex: 1}]}>Tax</Text>
                  <Text style={styles.lightGrayContent}>:</Text>
                  <Text
                    style={[
                      styles.lightGrayContent,
                      {flex: 1, textAlign: 'right'},
                    ]}>
                    ₹{this.state.fareInfo.gst}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.lightGrayContent, {flex: 1}]}>
                    Convenience Fee
                  </Text>
                  <Text style={styles.lightGrayContent}>:</Text>
                  <Text
                    style={[
                      styles.lightGrayContent,
                      {flex: 1, textAlign: 'right'},
                    ]}>
                    ₹
                    {parseFloat(this.state.fareInfo.operatorFee) +
                      parseFloat(this.state.fareInfo.merchantFee)}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.lightGrayContent, {flex: 1}]}>
                    Discount
                  </Text>
                  <Text style={styles.lightGrayContent}>:</Text>
                  <Text
                    style={[
                      styles.lightGrayContent,
                      {flex: 1, textAlign: 'right'},
                    ]}>
                    - ₹{this.state.fareInfo.discount}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <Text style={[styles.blueContent, {flex: 1}]}>Total</Text>
                  <Text style={styles.blueContent}>:</Text>
                  <Text
                    style={[styles.blueContent, {flex: 1, textAlign: 'right'}]}>
                    ₹{this.state.fareInfo.finalAmount}
                  </Text>
                </View>

                <AppButton
                  testId={'seatSelection'}
                  title={'Book Now'}
                  type={'withoutContainer'}
                  disable={false}
                  containerStyle={{alignSelf: 'center'}}
                  buttonPressed={() => {
                    this.props.navigation.navigate('AddPickupDrop', {
                      scheduleId: this.state.scheduleId,
                      busDetails: this.props.route.params.busDetails,
                      boarding_stages: boardingStages,
                      dropoff_stages: droppingStages,
                      selectedSeats: selectedSeats,
                      date: this.props.route.params.apiDate,
                      originId: this.props.route.params.originId,
                      destId: this.props.route.params.destId,
                      fareInfo: this.state.fareInfo,
                    });
                  }}
                />
              </View>
            ) : null}
          </View>
        </View>
        <ActivityIndicator
          size="large"
          color={Colors.blueTheme}
          animating={isLoading}
          style={{
            bottom: Dimensions.get('window').height / 2,
            position: 'absolute',
            alignSelf: 'center',
          }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAvailability: (scheduleId) => dispatch(actions.seatInfoAction(scheduleId)),
  getSchedule: (scheduleId) => dispatch(actions.busInfoAction(scheduleId)),
});

export default connect(null, mapDispatchToProps)(seatSelection);
