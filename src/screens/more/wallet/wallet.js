import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Images, Colors } from '../../../theme';
import styles from './styles'
import { hp, wp } from '../../../utils/heightWidthRatio';

export default class Wallet extends Component {
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
              <Text style={styles.title}>Wallet</Text>
            </View>  
            <TouchableOpacity onPress={() => this.props.navigation.navigate('notification')}>
              <Image style={styles.appLogo} source={Images.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.locationContainer}>
            <Image style={{height : hp(100),marginTop:50, resizeMode : 'contain'}} source={Images.walletGroup} />

            <View style={{marginTop:90, alignItems:'center'}}>
              <Text style={styles.grayContent}>Your Balance in the wallet</Text>
              <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>
                <Image style={styles.smallIcon} source={Images.walletOutline} />
                <Text style={[styles.blueContent]}>$200.00</Text>
              </View>
            </View>


            <View style={{marginTop:50, alignItems:'center'}}>
              <Text style={styles.grayContent}>Refer friends, Earn wallet money</Text>
              <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>
                <Image style={styles.smallIcon} source={Images.fb} />
                <Image style={styles.smallIcon} source={Images.google} />
                <Image style={styles.smallIcon} source={Images.whatsapp} />
                <Image style={styles.smallIcon} source={Images.twitter} />
              </View>
            </View>
        </View>
      </View>
    );
  }
}
