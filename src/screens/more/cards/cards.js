import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Images, Colors } from '../../../theme';
import styles from './styles'
import { hp, wp } from '../../../utils/heightWidthRatio';

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{flexDirection : 'row', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.centerView}>
                <Image style={[styles.smallIcon, {marginLeft:0}]} source={Images.backButton} />
              </TouchableOpacity>
              <Text style={styles.title}>Cards</Text>
            </View>
            <Image style={[styles.smallIcon, {width : wp(18)}]} source={Images.plus} />
          </View>
        </View>
        <View style={styles.locationContainer}>
          <ScrollView showsVerticalScrollIndicator = {false}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              
              <Image style={styles.cardImg} source={Images.paypal} />
              <Image style={styles.cardImg} source={Images.visa} />
          
            </View>  
          </ScrollView>  
            
        </View>
      </View>
    );
  }
}
