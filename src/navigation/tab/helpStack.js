
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Platform } from 'react-native';
import Help from '../../screens/help/help';

const Stack = createStackNavigator();


function HelpStackNavigator({ navigation, route }) {
    navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });
  
    return (
        <Stack.Navigator screenOptions={{  headerShown: false, ...(Platform.OS === "android" && TransitionPresets.SlideFromRightIOS) }}>
          <Stack.Screen name="Help" component={Help} options={{ headerShown: false,  }} />
        </Stack.Navigator>
    );
  }
  
  export default HelpStackNavigator;