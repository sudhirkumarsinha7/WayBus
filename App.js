import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isSplashReady: false,
      isLogin: false,
    };
  }
  componentDidMount() {
    SplashScreen.hide()
  }


  render() {
    return (
      <View style={{ flex: 1 }}><Text style={{ fontSize: 40 }}>Welcome To Waybus</Text></View>
    );
  }
}

export default App
