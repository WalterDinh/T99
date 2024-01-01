import { resetPasswordType } from 'app/presentation/redux/actions/customer/auth';
import BaseReducer from '../../handlers/BaseReducer';

const reducerHandler = new BaseReducer<any, any>(resetPasswordType);

export default reducerHandler;
