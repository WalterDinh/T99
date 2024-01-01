
import Config from 'app/config/config';
import {startNetworkLogging} from 'react-native-network-logger';
import {DEBUG} from './config.dev';
import {PRODUCTION} from './config.production';
import { UAT } from './config.uat';
import RNBuildConfig from './RNBuildConfig';

const buildEnv = RNBuildConfig.buildEnv;

console.info('Build env:', buildEnv);

const initConfig = () => {
    switch(buildEnv) {
        case 'dev':
            return DEBUG;
        case 'stag':
            return UAT;
        case 'prod':
            return PRODUCTION;
        default: return PRODUCTION;
    }
}

let configs = initConfig(); // Default fallback to Prod

if(configs.enableDeveloperConsole && configs.enableNetworkDebugger) {
    startNetworkLogging({
        ignoredHosts: [
            'clients3.google.com'
        ]
    });
}

export const getConfig = (): Config => {
    if(!configs) { // Backward compatible for old version with different init config logic
        configs = initConfig();
    }
    return configs;
};
