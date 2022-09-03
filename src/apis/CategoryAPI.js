import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const header = {
    headers: {
        "Content-Type": 'multipart/form-data'
    }
}

export default {
    createCategory: async (topicId, bodyData) => {
        const createUrl = SERVER_URL + `/categories/${topicId}`;
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
            url: SERVER_URL + `/topics/${topicId}/categories`,
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
            url: SERVER_URL + `/categories/${topicName}`,
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
            url: SERVER_URL + `/topics/${topicId}/categories/${categoryId}`,
        }).then(response => {
            const topicData = response.data.category
            callback(true, topicData)
        })
            .catch(error => {
                callback(false, error && error.response && error.response.data ? error.response.data : error)
            })
    }
}




