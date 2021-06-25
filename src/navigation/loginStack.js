import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {Platform} from 'react-native';
import Login from '../screens/onboarding/login';
import Otp from '../screens/onboarding/otp/index';


const Stack = createStackNavigator();

function LoginStackNavigator() {
    return(
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}
export default LoginStackNavigator;