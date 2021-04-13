
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Platform } from 'react-native';
import More from '../../screens/more/more';
import Profile from '../../screens/more/profile/profile';
import Wallet from '../../screens/more/wallet/wallet';
import cards from '../../screens/more/cards/cards';
import settings from '../../screens/more/settings/settings';

import about from '../../screens/more/aboutUs/more';
import faq from '../../screens/more/aboutUs/faq/faq/';
import privacy from '../../screens/more/aboutUs/privacy/privacy';
import terms from '../../screens/more/aboutUs/terms/terms';

const Stack = createStackNavigator();


function MoreStackNavigator({ navigation, route }) {
    navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });
  
    return (
        <Stack.Navigator screenOptions={{  headerShown: false, ...(Platform.OS === "android" && TransitionPresets.SlideFromRightIOS) }}>
          <Stack.Screen name="More" component={More} options={{ headerShown: false,  }} />
          <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false  }} />
          <Stack.Screen name="Cards" component={cards} options={{ headerShown: false  }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false  }} />
          <Stack.Screen name="settings" component={settings} options={{ headerShown: false  }} />
          
          <Stack.Screen name="about" component={about} options={{ headerShown: false  }} />
          <Stack.Screen name="faq" component={faq} options={{ headerShown: false  }} />
          <Stack.Screen name="privacy" component={privacy} options={{ headerShown: false  }} />
          <Stack.Screen name="terms" component={terms} options={{ headerShown: false  }} />
        </Stack.Navigator>
    );
  }
  
  export default MoreStackNavigator;