import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Switch } from 'react-native';
import { Images, Colors } from '../../../../theme';
import styles from './styles'
import { hp, wp } from '../../../../utils/heightWidthRatio';

export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view : [1],
      faqs : [
        { id : 1, name : "Ticket booking related",title :"How do I book a ticket on WAYBUS.in?", value : "You can book the tickets here https://www.waybus.in which is a very simple three step process. We advise you to book your tickets at least two hours before scheduled departure time. After you purchase your ticket you will be receive an email/mobile confirmation that also serves as your boarding pass for most of the bus operators. We don't oversell our schedules, so this boarding pass will guarantee for your seat/berth on your journey schedule." },
        { id : 2, name : "Cancellation Related", title :"", value :"" },
        { id : 3, name : "Payments Related", title :"", value :"" },
        { id : 4, name : "Refunds Related", title :"", value :"" },
        { id : 5, name : "Operator Related", title :"", value :"" },
        { id : 6, name : "Other Information", title :"", value :"" },
      ],
      currentTab : null
    };
  }

  render() {
    const { view, faqs, currentTab } = this.state
    return (
      <View style={styles.mainContainer}>

        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{flexDirection : 'row', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.centerView}>
                <Image style={[styles.smallIcon, {marginLeft:0}]} source={Images.backButton} />
              </TouchableOpacity>
              <Text style={styles.title}>About Us</Text>
            </View>  
            <TouchableOpacity onPress={() => this.props.navigation.navigate('notification')}>
              <Image style={styles.backIcon} source={Images.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <View style={{flex:1}}>

            <FlatList
              data={view}
              showsVerticalScrollIndicator = {false}
              renderItem={({ item, index}) => (
                <View>

                  <Text style={styles.titleBlack}>FAQ'S</Text>
                  
                  <FlatList
                    data={faqs}
                    showsVerticalScrollIndicator = {false}
                    renderItem={({ item, index}) => (
                      <View>

                        <TouchableOpacity activeOpacity = {1} onPress={() => this.setState({currentTab : item.id})} style={styles.itemContainer}>
                          <Text style={styles.title}>{item.name}</Text>
                          <Image style={styles.icon} source={Images.whiteArrowDown} />
                        </TouchableOpacity>

                        {currentTab == item.id && (item.title || item.value) ? (

                          <View style={styles.valueContainer}>
                            <Text style={[styles.grayContent, {color:'black', fontWeight:'bold', marginBottom:7}]}>
                              {item.title}
                            </Text>
                            <Text style={styles.grayContent}>
                              {item.value}
                            </Text>

                            {item.id == 1 ? (
                              <View>
                                <Text style={[styles.grayContent, {color:'black', fontWeight:'bold', marginBottom:7}]}>
                                  What happens if my scheduled journey/service got cancelled?
                                </Text>
                                <Text style={styles.grayContent}>
                                  You can book the tickets here https://www.waybus.in which is a very simple three step process. We advise you to book your tickets at least two hours before scheduled departure time. After you purchase your ticket you will be receive an email/mobile confirmation that also serves as your boarding pass for most of the bus operators. We don't oversell our schedules, so this boarding pass will guarantee for your seat/berth on your journey schedule.
                                </Text>
                              </View>      
                            ) : (
                              <View></View>
                            )}
                          </View>
                        ) : (
                          <View></View>
                        )}    

                      </View>                      
                    )}
                      keyExtractor = {item=> {item.id}}
                  />  
                </View>   

              )}
                keyExtractor = {item=> {item}}
            />

          </View>   
        </View>
      </View>
    );
  }
}
