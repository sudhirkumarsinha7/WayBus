import React from 'react';
import { StatusBar, YellowBox, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import { Colors } from './theme';
import AppStackNavigator from './navigation/appStack';
import store  from './redux/store';
import colors from './theme/colors';
import RemotePushService from './services/RemotePushService';
console.disableYellowBox = true
YellowBox.ignoreWarnings(['Require cycle:']);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state= {

        };
    }
    componentDidMount(){
        SplashScreen.hide();
    }
    render() {
        return (
        <Provider store={store}>
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blueThemeLight }} />
            <StatusBar backgroundColor={Colors.blueThemeLight} barStyle={'dark-content'} />
            <AppStackNavigator/>
           <RemotePushService/>
        </Provider>
        );
    }
}
export default App;