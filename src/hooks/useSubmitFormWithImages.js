import { useDispatch } from 'react-redux';
import { setModalMessage } from '../actions/commonActions';
import { resizeFile } from '../utils/imageManager';
import client from '../utils/client';
import { setFormErrors } from '../actions/formActions';
import Alert from '../utils/alert';
import { getFormData } from '../utils/getFormData';

export const useSubmitFormWithImages = () => {
    const dispatch = useDispatch();

    const uploadImages = async (url, files, maxSize = 600) => {
        let cnt = 1;
        let failedCnt = 0;
        for (var file of files) {
            let fd = new FormData();
            let resizedFile;
            try {
                dispatch(setModalMessage(`${cnt++}つ目の画像をアップロード中です`));
                resizedFile = await resizeFile(file, maxSize, file.name);
                fd.append('image', resizedFile, resizedFile.name);
                await client.post(url, fd);
            }
            catch (error) {
                console.log(error);
                failedCnt++;
            }
        }
        if (failedCnt > 0) {
            Alert.error("一部画像のアップロードに失敗しました。<br/>少し時間を置いた後に再度アップロードしてください。")
        }
        dispatch(setModalMessage(null));
    }

    const submitFormData = async (submitedData, postApi) => {
        dispatch(setModalMessage("投稿内容をアップロード中です"));

        let fd = getFormData(submitedData);
        var result = null;

        try {
            console.log("posting");
            result = await postApi(fd);
        }
        catch (error) {
            let formErrors = error.response.data.errors;
            if (formErrors) {
                // console.log(formErrors);
                dispatch(setFormErrors(formErrors))
            }
            else {
                Alert.error("投稿に失敗しました。<br/>時間を置いてから再度投稿してみてください。");
            }
        }
        dispatch(setModalMessage(null));

        return result;
    }

    return [uploadImages, submitFormData]
}
