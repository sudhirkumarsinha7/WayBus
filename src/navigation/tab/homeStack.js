
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Platform } from 'react-native';
import Home from '../../screens/home/home';
import busAvailability from '../../screens/home/busAvailability/busAvailability';
import seatSelection from '../../screens/home/seatSelection/seatSelection';
import AddPickupDrop from '../../screens/home/addPickupDrop/addPickupDrop';
import addPassenger from '../../screens/home/addPassenger/addPassenger';
import payment from '../../screens/home/payment/payment';
import payment2 from '../../screens/home/payment2/payment2';

const Stack = createStackNavigator();


function ActivityStackNavigator({ navigation, route }) {
    navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });
  
    return (
        <Stack.Navigator screenOptions={{  headerShown: false, ...(Platform.OS === "android" && TransitionPresets.SlideFromRightIOS) }}>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="busAvailability" component={busAvailability} options={{ headerShown: false  }} />
          <Stack.Screen name="seatSelection" component={seatSelection} options={{ headerShown: false  }} />
          <Stack.Screen name="AddPickupDrop" component={AddPickupDrop} options={{ headerShown: false  }} />
          <Stack.Screen name="AddPassenger" component={addPassenger} options={{ headerShown: false  }} />
          {/*<Stack.Screen name="AddPassenger" component={addPassenger} options={{ headerShown: false  }} />*/}
          <Stack.Screen name="Payment" component={payment} options={{ headerShown: false  }} />
          <Stack.Screen name="Payment2" component={payment2} options={{ headerShown: false  }} />
        </Stack.Navigator>
    );
  }
  
  export default ActivityStackNavigator;