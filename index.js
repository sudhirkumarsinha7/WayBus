/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/root';
//import App from './App';
import {name as appName} from './app.json';
//YellowBox.ignoreWarnings(['Require cycle:']);

AppRegistry.registerComponent(appName, () => App);
