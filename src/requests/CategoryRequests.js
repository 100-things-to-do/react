import axios from 'axios';
import { expressUrl } from '../others/common-util';



export const createCategory = (topicId, bodyData, callback) => {
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
}

export const getCategories = (topicId, callback) => {
    axios({
        method: 'get',
        url: expressUrl + `/topics/${topicId}/categories`,
    }).then(response => {
        const topicData = response.data.categories
        callback(true, topicData)
    })
        .catch(error => {
            callback(false, error && error.response && error.response.data ? error.response.data : error)
        })
}

export const getCategory = (topicId, categoryId, callback) => {
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