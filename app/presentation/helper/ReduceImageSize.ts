import ImageResizer from '@bam.tech/react-native-image-resizer';
const compressSizer = (size: number) => {
    const MB = size / Math.pow(1024, 2);
    if (Math.round(MB) === 0) return 1;
    if (Math.round(MB) === 1) return 0.9;
    if (Math.round(MB) === 2) return 0.8;
    if (Math.round(MB) === 3) return 0.7;
    if (Math.round(MB) === 4) return 0.6;
    if (Math.round(MB) >= 5) return 0.5;
    if (Math.round(MB) >= 10) return 0.4;
    if (Math.round(MB) >= 15) return 0.3;
    if (Math.round(MB) >= 20) return 0.2;
    if (Math.round(MB) >= 25) return 0.1;
};
export const resizeImage = async (path: string) => {
    let newPath: any = { uri: path, path: path };
    try {
        const responseFullSize = await ImageResizer.createResizedImage(
            path,
            300,
            300,
            'JPEG',
            100,
        );
        const opacity = compressSizer(responseFullSize.size);

        const response = ImageResizer.createResizedImage(
            path,
            300,
            300,
            'JPEG',
            opacity || 0.5,
        );
        return response;
    } catch (error) {
        return newPath;
    }
};
