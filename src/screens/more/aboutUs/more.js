import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Switch } from 'react-native';
import { Images, Colors } from '../../../theme';
import styles from './styles'
import { hp, wp } from '../../../utils/heightWidthRatio';

export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view : [1],
    };
  }

  render() {
    const { view } = this.state
    return (
      <View style={styles.mainContainer}>

        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{flexDirection : 'row', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.centerView}>
                <Image style={[styles.smallIcon, {marginLeft:0}]} source={Images.backButton} />
              </TouchableOpacity>
              <Text style={styles.title}>More</Text>
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

                  <Image style={styles.appLogo} source={Images.logoTitle} />
                  
                  <Text style={styles.grayContent}>
                    WAYBUS is India’s online bus ticketing platform that has transformed bus travel in the country by bringing ease and convenience to our beloved passengers. WAYBUS Founded in 2020. By providing widest choice, superior customer service, lowest prices and unmatched benefits. We are a growing online travel company in India for providing 'best in class' customer experience with the goal to be India's largest Travel Planner through our website www.waybus.in the business travellers can explore, research, compare prices and book a wide range of services to their travel needs.
                  </Text>
                 
                  <Text style={styles.grayContent}>
                    Growing a large online bus ticketing platform and trusted travel brand of India, our strengths include a large and trustworthy customer base and business travellers a strong technology platform designed to deliver a high level of scalability and innovation travel industry in India.
                  </Text>

                  <View style={{marginTop:50}}>

                    <Text onPress={() => this.props.navigation.navigate('faq')} style={styles.titleBlack}>Faq</Text>
                    <Text onPress={() => this.props.navigation.navigate('privacy')} style={styles.titleBlack}>Privacy Policy</Text>
                    <Text onPress={() => this.props.navigation.navigate('terms')} style={styles.titleBlack}>Terms & conditions</Text>

                  </View>

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
