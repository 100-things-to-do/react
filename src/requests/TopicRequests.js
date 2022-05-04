import axios from 'axios';
import { expressUrl } from '../others/common-util';



export const createTopic = (bodyData, callback) => {
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
}

export const getTopics = (callback) => {
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
}

export const getTopic = (topicId, callback) => {
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
}