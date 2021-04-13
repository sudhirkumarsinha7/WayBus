import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Images } from '../../theme';
import styles from './styles'

export default class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderItem() {
    return (
      <View style={{ backgroundColor: '#fff',  marginHorizontal: 16, marginTop: 11, padding: 12, borderRadius: 4, borderColor: '#4F4F4F33', borderWidth: 1}}>
        <View style={{flexDirection: 'row', marginTop: 8, justifyContent: 'space-between'}}>
          <View style={{flex:1}}>
            <View style={styles.dateRound}>
              <Text style={styles.blueContent}>28</Text>
              <Text style={styles.blueContent}>May</Text>
            </View>
          </View>  

          <View style={{flex:4}}>
            <Text style={styles.titles}>Mumbai To Pune</Text>
            
            <View style={{flexDirection:'row',marginTop:6, alignItems:'center', justifyContent:'space-between'}}>
              <View style={{flexDirection: 'row', alignItems : 'center'}}>
                <Image source={Images.bus_dark} style={{height: 17, width: 17, marginLeft: 6}}/>
                <Text style={{marginLeft:7}}>Volvo Bus</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems : 'center'}}>
                <Text style={{color:'#0D9A1E', fontWeight:'bold'}}>Confirmed</Text>
                <Image source={Images.confirmIcon} style={{height: 17, width: 17, marginLeft: 6}}/>
              </View>
            </View>  
          </View>  
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image style={styles.appLogo} source={Images.backButton} />
            </TouchableOpacity>  
            <Text style={styles.title}>Notification</Text>
          </View>
        </View>
        <View style={styles.locationContainer}>
         
          {this.renderItem()}
          {this.renderItem()}
        </View>
      </View>
    );
  }
}
