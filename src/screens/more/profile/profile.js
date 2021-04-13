import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView , TextInput} from 'react-native';
import { Images, Colors } from '../../../theme';
import styles from './styles'
import { hp, wp } from '../../../utils/heightWidthRatio';
import AppButton from '../../../components/appButton/appButton';
import FilterModal from '../../../components/modals/filterModal'

export default class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalTitle:'Select Gender',
      filterModalVisible : false,
      genderType : [{ name: 'Male', value : 0 }, { name: 'Female', value:1 }],
      selectedGender : { name: 'Male', value : 0 },

      firstN : '',
      lastN : '',
      email : '',
      phone : ''
    };
  }


  sendRequest(val) {
    console.log(val);
    this.setState({ selectedGender: val })
  }

  render() {
    const { filterModalVisible, modalTitle, selectedGender, genderType } = this.state
    return (
      <View style={styles.mainContainer}>
      <FilterModal
        visible={filterModalVisible}
        title={modalTitle}
        selectedValue={selectedGender}
        data={genderType}
        onSelectValue={(val) => { this.sendRequest(val) }}
        closeModal={() => this.setState({ filterModalVisible: false })}
        idKey={"name"}
      />

        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{flexDirection : 'row', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.centerView}>
                <Image style={[styles.smallIcon, {marginLeft:0}]} source={Images.backButton} />
              </TouchableOpacity>
              <Text style={styles.title}>Edit Profile</Text>
            </View>  
            <TouchableOpacity onPress={() => this.props.navigation.navigate('notification')}>
              <Image style={styles.appLogo} source={Images.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <ScrollView showsVerticalScrollIndicator = {false}>
            <View style={{flex:1}}>
              <Image style={{height : hp(80),marginTop:10,marginBottom:30, resizeMode : 'contain'}} source={Images.user} />

              <View style={styles.eachContainer}>
                <Text style={styles.darkGrayContent}>Edit Your Name</Text>

                <View style={styles.inputContainer}>
                  <View style={styles.inputLabel}>
                    <Text style={styles.grayContent}>First Name:</Text>
                  </View>
                  <View style={styles.inputValue}>
                    <TextInput 
                      value = {this.state.firstN}
                      onChangeText = {firstN => this.setState({firstN})}
                      style={styles.grayContent}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputLabel}>
                    <Text style={styles.grayContent}>Last Name:</Text>
                  </View>
                  <View style={styles.inputValue}>
                    <TextInput 
                      value = {this.state.lastN}
                      onChangeText = {lastN => this.setState({lastN})}
                      style={styles.grayContent}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputLabel}>
                    <Text style={styles.grayContent}>Gender</Text>
                  </View>
                  <TouchableOpacity onPress={()=>this.setState({filterModalVisible:true})} style={[styles.inputValue, {flexDirection:'row'}]}>
                    <Text style={[styles.grayContent, {width : wp(80)}]}>{selectedGender.name}</Text>
                    <Image style={{height:hp(14), width:hp(14), resizeMode:'contain', marginTop:wp(5)}} source={Images.dropDownArrow} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.eachContainer}>
                <Text style={styles.darkGrayContent}>Edit Your</Text>

                <View style={styles.inputContainer}>
                  <View style={styles.inputLabel}>
                    <Text style={styles.grayContent}>Email:</Text>
                  </View>
                  <View style={styles.inputValue}>
                    <TextInput 
                      keyboardType = "email-address"
                      value = {this.state.email}
                      onChangeText = {email => this.setState({email})}
                      style={styles.grayContent}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputLabel}>
                    <Text style={styles.grayContent}>Phone:</Text>
                  </View>

                  <View style={styles.inputValue}>
                    <TextInput 
                      keyboardType = "numeric"
                      value = {this.state.phone}
                      onChangeText = {phone => this.setState({phone})}
                      style={styles.grayContent}
                    />
                  </View>
                </View>
              </View>

              <AppButton
                testId={"updateProfile"}
                title={"Save"}
                type={'withoutContainer'}
                disable={false}
                containerStyle={{ alignSelf: 'center' }}
                buttonPressed={() => { 
                  // this.props.navigation.navigate('Otp') 
                }}
              />
            </View>  

          </ScrollView>  
        </View>
      </View>
    );
  }
}
