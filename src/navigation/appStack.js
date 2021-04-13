import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LoginStack from './loginStack';
import TabbarNavigation from './tab/tabNav';
import {navigationRef} from './rootNavigation';
import notification from './../screens/notification/notification';
import { Platform } from 'react-native';

const Stack = createStackNavigator();
class AppStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  

  render() {
    return (
      <NavigationContainer ref={navigationRef}>

        <Stack.Navigator screenOptions={{  ...(Platform.OS === "android" && TransitionPresets.SlideFromRightIOS) }} initialRouteName={'LoginStack'}>
          <Stack.Screen
            name="LoginStack"
            component={LoginStack}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Tabbar"
            component={TabbarNavigation}
            options={{headerShown: false}}
          />
          
          
          <Stack.Screen
            name="notification"
            component={notification}
            options={{headerShown: false}}
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppStack;