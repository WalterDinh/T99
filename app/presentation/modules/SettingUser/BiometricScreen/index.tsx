import { StackNavigationProp } from '@react-navigation/stack';
import { StorageGatewayFactory } from 'app/data/gateway/storage';
import { FormSwitch } from 'app/presentation/components/switch/FormSwitch';
import { useGetUser } from 'app/presentation/hooks/useGetUser';
import { getString } from 'app/presentation/localization';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { User } from 'app/shared/constants';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'InformationAccount'>;
}
const BiometricScreen = (props: IProps) => {
    //! State
    const [value, setValue] = useState(false);
    const storageClient = StorageGatewayFactory.createWithSecureClient();
    const id = useGetUser()?.user?.cif || '';

    useEffect(() => {
        const onCheckBiometric = () => {
            storageClient.doGet(User.IDBiometric).then((data) => {                
                setValue(data.data == id);
            });
        };
        onCheckBiometric();
    }, [id]);

    //! Function
    const onSetBiometric = (data: boolean) => {
        if (data) {
            storageClient.doUpdate(User.IDBiometric, id).then(() => {
                setValue(data);
            });
        } else {
            storageClient.doDelete(User.IDBiometric).then(() => {
                setValue(data);
            });
        }
    };
    //! Render
    return (
        <View style={{ flex: 1 }}>
            <FormSwitch
                title={`${getString('loginWithBiometric')}:`}
                value={value}
                disabledInput
                style={{
                    backgroundColor: 'transparent',
                    paddingHorizontal: 22,
                }}
                onValueChange={onSetBiometric}
            />
        </View>
    );
};

export default BiometricScreen;
