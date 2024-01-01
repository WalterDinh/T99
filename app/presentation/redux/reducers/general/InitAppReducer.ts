import {initAppType} from '../../actions/general/appInitiation';
import BaseReducer from '../handlers/BaseReducer';

const reducerHandler = new BaseReducer<any, any>(initAppType);

export default reducerHandler;