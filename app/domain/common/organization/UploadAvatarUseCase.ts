import { resizeImage } from 'app/presentation/helper/ReduceImageSize';
import { ICommonRepository } from '..';
import { IUseCase } from '../../index';
import dayjs from 'dayjs';
import { Platform } from 'react-native';
export class UploadAvatarUseCase implements IUseCase {
    customerRepo: ICommonRepository;
    data: any;
    constructor(customerRepo: ICommonRepository, data: any) {
        this.customerRepo = customerRepo;
        this.data = data;
    }

    execute = async () => {
        const body: any = new FormData();
        if (this.data) {
            const resizeImagePath: any = await resizeImage(
                `file://${this.data?.path}`,
            );
            const objImage = {
                uri:
                    Platform.OS === 'ios'
                        ? resizeImagePath?.path
                        : `file://${resizeImagePath?.path}`,
                type: this.data.mime || 'image/jpg',
                name:
                    resizeImagePath?.name ||
                    `image${dayjs().toISOString()}.jpg`,
            };
            body.append('File', objImage);
        }
        try {
            const uploadAvtResp = await this.customerRepo.uploadAvatar(body);
            return uploadAvtResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
