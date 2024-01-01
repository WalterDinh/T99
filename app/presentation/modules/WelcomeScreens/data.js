import images from 'app/assets/images';
import { getString } from 'app/presentation/localization';

const data = [
    {
        id: 1,
        body: getString(
            'golferCreditPackage',
        ),
        imgUrl: images.Backgrounds.WelcomeBackground4,
    },
    {
        id: 2,
        body: getString(
            'theApplicationHelps',
        ),
        imgUrl: images.Backgrounds.WelcomeBackground3,
    },
    {
        id: 3,
        body: getString(
            'weProvide',
        ),
        imgUrl: images.Backgrounds.WelcomeBackground2,
    },
    {
        id: 4,
        body: getString(
            'cooperatingWithLeadingInsurance',
        ),
        imgUrl: images.Backgrounds.WelcomeBackground1,
    },
];

export default data;
