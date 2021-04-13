
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Platform } from 'react-native';
import Booking from '../../screens/booking/booking';

const Stack = createStackNavigator();


function BookingStackNavigator({ navigation, route }) {
    navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });
  
    return (
        <Stack.Navigator screenOptions={{  headerShown: false, ...(Platform.OS === "android" && TransitionPresets.SlideFromRightIOS) }}>
          <Stack.Screen name="Booking" component={Booking} options={{ headerShown: false,  }} />
        </Stack.Navigator>
    );
  }
  
  export default BookingStackNavigator;