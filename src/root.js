import React from 'react';
import { StatusBar, YellowBox, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { Colors } from './theme';
import AppStackNavigator from './navigation/appStack';
import store  from './redux/store';
import colors from './theme/colors';
console.disableYellowBox = true
YellowBox.ignoreWarnings(['Require cycle:']);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state= {

        };
    }
    
    render() {
        return (
        <Provider store={store}>
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blueThemeLight }} />
            <StatusBar backgroundColor={Colors.blueThemeLight} barStyle={'dark-content'} />
            <AppStackNavigator/>
        </Provider>
        );
    }
}
export default App;