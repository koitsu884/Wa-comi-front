import axios from 'axios';
const apiBaseURL = process.env.REACT_APP_API_ROOT;

const slugUniqueCheck = async (slug) => {
    console.log("Slug check " + slug);
    return axios.get('groups/slug_check/' + slug, { baseURL: apiBaseURL })
        .then(res => {
            if (res.data.data === 'OK') {
                return true;
            }
            else {
                return false
            }
        })
}

export default slugUniqueCheck;