import {NativeModules} from 'react-native';
const BuildConfigModule = NativeModules.RNConfig;

type BuildEnv = 'stag' | 'prod' | 'dev';
// console.info('Ignore codepush: ', BuildConfigModule.ignoreCodePush);
 
class RNBuildConfig {
    buildEnv: BuildEnv = BuildConfigModule.RNConfig;
    // ignoreCodePush: boolean = Platform.OS === 'android' ? BuildConfigModule.ignoreCodePush : BuildConfigModule.ignoreCodePush === 'true';
    // e2eBuild: boolean = Platform.OS === 'android' ? BuildConfigModule.e2eBuild : BuildConfigModule.e2eBuild === 'true';
}

export default new RNBuildConfig();