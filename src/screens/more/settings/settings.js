import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Switch } from 'react-native';
import { Images, Colors } from '../../../theme';
import styles from './styles'
import { hp, wp } from '../../../utils/heightWidthRatio';
import {FilterModal1} from '../../../components/modals/filterModal'

export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langType : [{ name: 'English', value : 0 }, { name: 'Spanish', value:1 }],
      countryType : [{ name: 'India', value : 0 }, { name: 'Spain', value:1 }],
      langModalVisible : false, 
      countryModalVisible : false, 

      isEmail : false,
      isContact : false,
      language : { name: 'English', value : 0 },
      country : { name: 'Spain', value : 0 }
    };
  }

  setLang = (val) => {
    this.setState({language : val})
  }


  setCountry = (val) => {
    this.setState({country : val})
  }

  render() {
    const {isEmail, isContact, language, country, langType, countryType,langModalVisible, countryModalVisible} = this.state
    return (
      <View style={styles.mainContainer}>
        
        <FilterModal1
          visible={langModalVisible}
          title={'select Language'}
          selectedValue={language}
          data={langType}
          onSelectValue={(val) => { this.setLang(val) }}
          closeModal={() => this.setState({ langModalVisible: false })}
          idKey={"name"}
        />

        <FilterModal1
          visible={countryModalVisible}
          title={'select Country'}
          selectedValue={country}
          data={countryType}
          onSelectValue={(val) => { this.setCountry(val) }}
          closeModal={() => this.setState({ countryModalVisible: false })}
          idKey={"name"}
        />

        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{flexDirection : 'row', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.centerView}>
                <Image style={[styles.smallIcon, {marginLeft:0}]} source={Images.backButton} />
              </TouchableOpacity>
              <Text style={styles.title}>Settings</Text>
            </View>  
            <TouchableOpacity onPress={() => this.props.navigation.navigate('notification')}>
              <Image style={styles.appLogo} source={Images.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.locationContainer}>

          <View style={styles.itemContainer}>
            <Text style={styles.titleBlack}>Email notification Settings</Text>
            <View style={{flexDirection:'row',marginTop:5, alignItems:'center', justifyContent : 'space-between'}}>
              <Text style={styles.grayContent}>Email Notification</Text>
              <Switch
                trackColor={{ false: "#767577", true: '#F4F4G8' }}
                thumbColor={isEmail ? Colors.blueTheme : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.setState({isEmail : !this.state.isEmail})}
                value={isEmail}
              />
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.titleBlack}>Contact Settings</Text>
            <View style={{flexDirection:'row',marginTop:5, alignItems:'center', justifyContent : 'space-between'}}>
              <Text style={styles.grayContent}>Number Notification</Text>
              <Switch
                trackColor={{ false: "#767577", true: '#F4F4G8' }}
                thumbColor={isContact ? Colors.blueTheme : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.setState({isContact : !this.state.isContact})}
                value={isContact}
              />
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.titleBlack}>Language Settings</Text>
            <View style={{flexDirection:'row',marginTop:5, alignItems:'center'}}>
              <Text style={styles.grayContent}>Language:</Text>

              <TouchableOpacity onPress={()=>this.setState({ langModalVisible: true })} style={{flexDirection:'row', marginLeft:30}}>
                <Text style={styles.grayContent}>{language.name}</Text>
                <Image style={styles.icon} source={Images.dropDownArrow} />
              </TouchableOpacity>  
              
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.titleBlack}>Country Settings</Text>
            <View style={{flexDirection:'row',marginTop:5, alignItems:'center'}}>
              <Text style={styles.grayContent}>Country:</Text>

              <TouchableOpacity onPress={()=>this.setState({ countryModalVisible: true })} style={{flexDirection:'row', marginLeft:30}}>
                <Text style={styles.grayContent}>{country.name}</Text>
                <Image style={styles.icon} source={Images.dropDownArrow} />
              </TouchableOpacity>  
              
            </View>
          </View>
           
        </View>
      </View>
    );
  }
}
