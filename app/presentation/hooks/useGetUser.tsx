import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CustomerSelectors from 'app/presentation/redux/selectors/customer';
import CustomerRepository from 'app/data/repository/customer';
import UserModel from 'app/models/user/UserModel';

export const useGetUser: any = () => {
    const profileReducer = useSelector(CustomerSelectors.selectProfileReducer);
    const [user, setUser] = useState(new UserModel());

    useEffect(() => {
        const getUser = async () => {
            const customerRepo = new CustomerRepository();
            const user = await customerRepo.getUser();
            setUser(profileReducer?.data || user.data || new UserModel());
        };
        getUser();
    }, [profileReducer?.data]);

    return { user };
};
