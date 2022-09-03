import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export default {
    createTopic: (bodyData, callback) => {
        axios({
            method: 'post',
            url: SERVER_URL + `/topics`,
            data: bodyData,
        }).then(response => {
            const topicData = response.data
            callback(true, topicData)
        })
            .catch(error => {
                callback(false, error && error.response && error.response.data ? error.response.data : error)
            })
    },

    getTopics: (callback) => {
        axios({
            method: 'get',
            url: SERVER_URL + `/topics`,
        }).then(response => {
            const topicData = response.data
            callback(true, topicData)
        })
            .catch(error => {
                callback(false, error && error.response && error.response.data ? error.response.data : error)
            })
    },

    getTopic: (topicId, callback) => {
        axios({
            method: 'get',
            url: SERVER_URL + `/topics/${topicId}`,
        }).then(response => {
            const topicData = response.data
            callback(true, topicData)
        })
            .catch(error => {
                callback(false, error && error.response && error.response.data ? error.response.data : error)
            })
    },

    getCategories: (topicName) => {
        return axios.get(SERVER_URL + `/topics/${topicName}/categories`);
    },


    updateTopic(topicId, bodyData, callback) {
        axios({
            method: 'put',
            url: SERVER_URL + `/topics/${topicId}`,
            data: bodyData,
        }).then(response => {
            console.log(response)
            const topicData = response.data.topic
            callback(true, topicData)
        })
            .catch(error => {
                callback(false, error && error.response && error.response.data ? error.response.data : error)
            })
    }
}





