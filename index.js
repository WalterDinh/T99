/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './app/App';
import dayjs from 'dayjs';
var advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);
AppRegistry.registerComponent(appName, () => App);
