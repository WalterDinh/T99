import RNFS from 'react-native-fs';

export async function downloadFsFile(
    data: any,
    onSuccess: (fileName: string) => void,
    onProgress: (received: number, total: number) => void,
    fileName: string
) {
    // const {fileUrl} = data;
    const url = 'https://benefit-cms-staging.azurewebsites.net/media/5vsjhkl2/requirementsgatheringquestions.pdf'; // remove
    return (
        RNFS.downloadFile({
            fromUrl: url,
            toFile: `${RNFS.DocumentDirectoryPath}/${fileName}`,
            begin: () => {
                // to do
            },
            progress: (res) => {
                onProgress(res.bytesWritten, res.contentLength);
            }
        }).promise.then((res) => {
            onSuccess(`${RNFS.DocumentDirectoryPath}/${fileName}`);
            return res;
        }).catch(error => {
            console.info(error.message);
        })
    );
}

export const getFileName = (str: any, limitLength = 20) => {
    if(!str) {
        return '';
    }
    if(str.length > limitLength) {
        return (
            str.substring(0, limitLength - 5) + '...' + str.substring(str.length - 2)
        );
    } else {
        return str;
    }
};