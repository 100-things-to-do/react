import axios from 'axios';
import { expressUrl } from '../others/common-util';

export default {
    createTopic: (bodyData, callback) => {
        axios({
            method: 'post',
            url: expressUrl + `/topics`,
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
            url: expressUrl + `/topics`,
        }).then(response => {
            const topicData = response.data.topics
            callback(true, topicData)
        })
            .catch(error => {
                callback(false, error && error.response && error.response.data ? error.response.data : error)
            })
    },

    getTopic: (topicId, callback) => {
        axios({
            method: 'get',
            url: expressUrl + `/topics/${topicId}`,
        }).then(response => {
            console.log(response)
            const topicData = response.data.topic
            callback(true, topicData)
        })
            .catch(error => {
                callback(false, error && error.response && error.response.data ? error.response.data : error)
            })
    },


    updateTopic(topicId, bodyData, callback) {
        axios({
            method: 'put',
            url: expressUrl + `/topics/${topicId}`,
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





