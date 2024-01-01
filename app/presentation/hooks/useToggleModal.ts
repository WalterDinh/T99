import {useCallback, useState} from 'react';

export const useToggleModal = () => {
    const [isShow, setIsShow] = useState(false);

    const toggle = useCallback(() => {
        setIsShow(prev => !prev);
    }, [setIsShow]);

    const showModal = useCallback(() => {
        setIsShow(true);
    }, [setIsShow])

    const hideModal = useCallback(() => {
        setIsShow(false);
    }, [setIsShow])

    return {isShow, showModal, hideModal, toggle}
}