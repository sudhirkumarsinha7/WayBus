import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Images } from '../../theme';
import styles from './styles'

let MoreData = [{ name: "Edit Profile", icon: Images.profile },
{ name: "Wallet", icon: Images.wallet },
{ name: "Cards", icon: Images.card },
{ name: "Refer & Earn", icon: Images.dollor },
{ name: "Help", icon: Images.help },
{ name: "Settings", icon: Images.settings },
{ name: "About Us", icon: Images.about },
{ name: "Logout", icon: Images.logout }]

export default class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pnrText: '',
            contactText: '',
            emailId: '',
            des: ''
        };
    }



    render() {
        const {pnrText, contactText, emailId, des} = this.state
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.headerView}>
                        <Text style={styles.title}>Help</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notification')}>
                            <Image style={styles.appLogo} source={Images.notification} />
                        </TouchableOpacity>    
                    </View>
                </View>
                <View style={styles.locationContainer}>
                    <TextInput
                        numberOfLines={1}
                        value={pnrText}
                        style={{
                            marginHorizontal: 12,
                            borderRadius: 4,
                            borderWidth: 1,
                            borderColor: '#4F4F4F1A',
                            marginTop: 22,
                            paddingHorizontal: 12,
                            height: 40,
                            backgroundColor: '#fff'
                        }}
                        onChangeText={(val) => this.setState({pnrText: val})}
                        placeholder={"Enter PNR Number"}
                    />
                    <TextInput
                        numberOfLines={1}
                        value={contactText}
                        style={{
                            marginHorizontal: 12,
                            borderRadius: 4,
                            borderWidth: 1,
                            borderColor: '#4F4F4F1A',
                            marginTop: 11,
                            paddingHorizontal: 12,
                            height: 40,
                            backgroundColor: '#fff'
                        }}
                        onChangeText={(val) => this.setState({contactText: val})}
                        placeholder={"Enter Contact Number"}
                    />
                    <TextInput
                        numberOfLines={1}
                        value={emailId}
                        style={{
                            marginHorizontal: 12,
                            borderRadius: 4,
                            borderWidth: 1,
                            borderColor: '#4F4F4F1A',
                            marginTop: 11,
                            paddingHorizontal: 12,
                            height: 40,
                            backgroundColor: '#fff'
                        }}
                        onChangeText={(val) => this.setState({emailId: val})}
                        placeholder={"Enter Email Id"}
                    />
                    <TextInput
                        numberOfLines={4}
                        value={des}
                        style={{
                            marginHorizontal: 12,
                            borderRadius: 4,
                            borderWidth: 1,
                            borderColor: '#4F4F4F1A',
                            marginTop: 11,
                            paddingHorizontal: 12,
                            height: 100,
                            backgroundColor: '#fff'
                        }}
                        onChangeText={(val) => this.setState({des: val})}
                        placeholder={"Description"}
                    />
                    <TouchableOpacity style={{height: 40, marginHorizontal: 16, marginTop: 15, borderRadius: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0172E6'}}>
                        <Text style={{color: '#fff'}}>Submit</Text>
                    </TouchableOpacity>
                    <Text style={{color: '#4F4F4F', marginTop: 19, marginLeft: 16}}>Reach out to us</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 12, marginLeft: 16}}>
                        <Image resizeMode={'contain'} source={Images.mail} style={{height: 10, width: 14}}/>
                        <Text style={{color: '#4F4F4F', marginLeft: 8}}>support@waybus.in</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 16}}>
                        <Image resizeMode={'contain'} source={Images.smartphone} style={{height: 10, width: 14}}/>
                        <Text style={{color: '#4F4F4F', marginLeft: 8}}>8095858591/92</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 16}}>
                        <Image resizeMode={'contain'} source={Images.headphone} style={{height: 10, width: 14}}/>
                        <Text style={{color: '#4F4F4F', marginLeft: 8}}>24/7</Text>
                    </View>
                </View>
            </View>
        );
    }
}
