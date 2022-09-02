import axios from 'axios';
import { expressUrl } from '../others/common-util';

const header = {
    headers: {
        "Content-Type": 'multipart/form-data'
    }
}

export default {
    createCategory: async (topicId, bodyData) => {
        const createUrl = expressUrl + `/categories/${topicId}`;
        let result = true;
        await axios.post(createUrl, bodyData, header).catch((error) => {
            console.log(error);
            result = false;
        })
        return result;
    },
    /*
    createCategory: (topicId, bodyData, callback) => {
        axios({
            method: 'post',
            url: expressUrl + `/topics/${topicId}/categories`,
            data: bodyData,
        }).then(response => {
            const topicData = response.data
            callback(true, topicData)
        })
            .catch(error => {
                callback(false, error && error.response && error.response.data ? error.response.data : error)
            })
    },
     */
    getCategories: (topicName, callback) => {
        axios({
            method: 'get',
            url: expressUrl + `/categories/${topicName}`,
        }).then(response => {
            console.log("respp", response.data)
            const topicData = response.data
            callback(true, topicData)
        })
            .catch(error => {
                callback(false, error && error.response && error.response.data ? error.response.data : error)
            })
    },
    getCategory: (topicId, categoryId, callback) => {
        axios({
            method: 'get',
            url: expressUrl + `/topics/${topicId}/categories/${categoryId}`,
        }).then(response => {
            const topicData = response.data.category
            callback(true, topicData)
        })
            .catch(error => {
                callback(false, error && error.response && error.response.data ? error.response.data : error)
            })
    }
}




