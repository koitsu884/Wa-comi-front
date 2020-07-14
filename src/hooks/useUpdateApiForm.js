import { useDispatch } from 'react-redux';
import { setLoading } from '../actions/commonActions';
import { setFormErrors } from '../actions/formActions';
import { getFormData } from '../utils/getFormData';
import Alert from '../utils/alert';

export const useUpdateApiForm = () => {
    const dispatch = useDispatch();

    const submitFormData = async (id, submittedData, patchApi) => {
        dispatch(setLoading(true));

        let fd = getFormData(submittedData);
        var result = null;

        try {
            result = await patchApi(id, fd);
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
        dispatch(setLoading(false));

        return result;
    }

    return [submitFormData]
}
