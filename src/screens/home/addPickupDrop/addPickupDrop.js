import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Images, Colors } from '../../../theme';
import styles from './styles'
import { hp, wp } from '../../../utils/heightWidthRatio';

export default class addPickupDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab : 0,
      pickupPoints : [{id : 1 , name : 'Pickup 1'}, {id : 2 , name : 'Pickup 2'}],
      droppingPoints : [{id : 1 , name : 'Dropping 1'}, {id : 2 , name : 'Dropping 2'}],
      selectedPickup : null,
      selectedDrop : null,
    };
  }

  componentDidMount = () => {
    // console.log('this.props.route.params');
    // console.log(this.props.route.params.boarding_stages);
    // console.log(this.props.route.params.dropoff_stages);
    var boarding = [];
    var dropoff = [];

    // console.log(boarding);
    // console.log(dropoff);

    this.props.route.params.boarding_stages.forEach(i => {
      var item = i.split('|');
      boarding = [...boarding , {id : item[0], time : item[1], address:item[5], landmark:item[3], contact: item[4], locality:item[5] } ]
    })

    this.props.route.params.dropoff_stages.forEach(i => {
      var item = i.split('|');
      dropoff = [...dropoff , {id : item[0], time : item[1], address:item[5], landmark:item[3], contact: item[4], locality:item[5] } ]
    })

    this.setState({
      pickupPoints : boarding,
      droppingPoints : dropoff
    })

  }

  render() {
    const { selectedTab ,pickupPoints, selectedPickup, droppingPoints, selectedDrop} = this.state
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{flexDirection : 'row', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.centerView}>
                <Image style={[styles.smallIcon, {marginLeft:0}]} source={Images.backButton} />
              </TouchableOpacity>
              <Text style={styles.title}>Add Pickup - Dropping Point</Text>
            </View>  
          </View>
        </View>
        <View style={styles.locationContainer}>
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                activeOpacity = {1}
                onPress={() => {this.setState({selectedTab : 0})}} 
                style={[styles.tabBtn, {backgroundColor : selectedTab == 0 ? Colors.blueTheme : Colors.greyD5 , borderTopLeftRadius:8, borderBottomLeftRadius:8 }]}>
                <Text style={[styles.titleBlack, {marginLeft:0, color : selectedTab == 0 ? Colors.whiteFF : Colors.black4f}]}>Pickup Point</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                activeOpacity = {1}
                onPress={() => {if(this.state.selectedPickup){this.setState({selectedTab : 1})} }}
                style={[styles.tabBtn, {backgroundColor : selectedTab == 1 ? Colors.blueTheme : Colors.greyD5, borderTopRightRadius:8, borderBottomRightRadius:8 }]}>
                <Text style={[styles.titleBlack, {marginLeft:0, color : selectedTab == 1 ? Colors.whiteFF : Colors.black4f}]}>Dropping Point</Text>
              </TouchableOpacity>
            </View>

            {selectedTab == 0 ? (
              <View style={{flex:1}}>

                <FlatList
                  data={pickupPoints}
                  showsVerticalScrollIndicator = {false}
                  renderItem={({ item, index}) => (
                    <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({selectedPickup : item.id}); setTimeout(()=> {this.setState({selectedTab : 1}) },2000) }} style={[styles.itemContainer, { borderWidth : selectedPickup == item.id ? 1.5 : 0 }]}>
                      <View style={{flex:1, flexDirection:'row',marginBottom:4, justifyContent : 'space-between'}}>
                        <Text style={[styles.grayContent, {flex:6}]}>{item.address}</Text>
                        <Text style={[styles.grayContent, {flex:1, textAlign:'right'}]}>{item.time}</Text>
                      </View>

                      <Text style={styles.lightGrayContent}>Landmark : <Text style={{color:'black'}}> {item.landmark}</Text> </Text>
                      <Text style={styles.lightGrayContent}>Contact : <Text style={styles.grayContent}>{item.contact}</Text> </Text>
                    </TouchableOpacity>
                   )}
                  keyExtractor = {item=> {item.id}}
                />   

              </View>    
            ) : (
              <View style={{flex:1}}>

                <FlatList
                  data={droppingPoints}
                  renderItem={({ item, index}) => (
                    <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({selectedDrop : item.id}); this.props.navigation.navigate('AddPassenger', {scheduleId : this.props.route.params.scheduleId, busDetails:this.props.route.params.busDetails, selectedPickup : selectedPickup , selectedDrop : item.id, selectedSeats : this.props.route.params.selectedSeats, date: this.props.route.params.date, originId : this.props.route.params.originId, destId : this.props.route.params.destId,  fareInfo : this.props.route.params.fareInfo }) }} style={[styles.itemContainer, { borderWidth : selectedDrop == item.id ? 1.5 : 0 }]}>
                      <View style={{flex:1, flexDirection:'row',marginBottom:4, justifyContent : 'space-between'}}>
                        <Text style={[styles.grayContent, {flex:6}]}>{item.address}</Text>
                        <Text style={[styles.grayContent, {flex:1, textAlign:'right'}]}>{item.time}</Text>
                      </View>

                      <Text style={styles.lightGrayContent}>Landmark : <Text style={{color:'black'}}> {item.landmark}</Text> </Text>
                      <Text style={styles.lightGrayContent}>Contact : <Text style={styles.grayContent}>{item.contact}</Text> </Text>
                    </TouchableOpacity>
                   )}
                  keyExtractor = {item=> {item.id}}
                />   

              </View>    
            )}
        </View>
      </View>
    );
  }
}
