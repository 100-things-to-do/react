import axios from 'axios';
import { expressUrl } from '../others/common-util';

export default{
    createActivity: (topicId, categoryId, data, callback) => {
        const header = {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }
        axios.post(expressUrl + `/topics/${topicId}/categories/${categoryId}/activities`, data, header)
            .then(response => {
                const activityResponse = response.data.newActivity
                callback(true, activityResponse)
            })
            .catch(error => {
                callback(false, error && error.response && error.response.data ? error.response.data : error);
            })
    },

    updateActivity: (topicId, categoryId, activityId, data, callback) => {
        const header = {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }
        axios.put(expressUrl + `/topics/${topicId}/categories/${categoryId}/activities/${activityId}`, data, header)
            .then(response => {
                const activityResponse = response.data.newActivity
                callback(true, activityResponse)
            })
            .catch(error => {
                callback(false, error && error.response && error.response.data ? error.response.data : error);
            })
    },

    getActivities: (topicId, categoryId, callback) => {
        axios.get(expressUrl + `/topics/${topicId}/categories/${categoryId}/activities`)
            .then(response => {
                const activityData = response.data.activities
                callback(true, activityData)
            })
            .catch(error => {
                console.log(error)
                callback(false, error && error.response && error.response.data ? error.response.data : error);
            })
    }
}
