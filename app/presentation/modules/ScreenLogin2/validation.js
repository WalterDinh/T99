import { getString } from 'app/presentation/localization';
import Validators from 'app/shared/helper/validators';
import * as Yup from 'yup';

export default  ValidationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('')
        .matches(Validators.PHONE_REGEX, getString('isPhoneNumberValid')),
    password: Yup.string().required('')
    .matches(Validators.PASSWORD_REGEX,getString('isPasswordValid'))
});
