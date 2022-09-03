import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const header = {
    headers: {
        "Content-Type": 'multipart/form-data'
    }
}

export default{
    createActivity: async (topicId, categoryId, data) => {
        const createActivityUrl = SERVER_URL + `/activity/${categoryId}`
        let result = true;
        await axios.post(createActivityUrl, data, header)
            .catch(error => {
                console.log(error);
                result = false;
            })
        return result;
    },

    updateActivity: (topicId, categoryId, activityId, data, callback) => {
        const header = {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }
        axios.put(SERVER_URL + `/topics/${topicId}/categories/${categoryId}/activities/${activityId}`, data, header)
            .then(response => {
                const activityResponse = response.data
                callback(true, activityResponse)
            })
            .catch(error => {
                callback(false, error && error.response && error.response.data ? error.response.data : error);
            })
    },

    getActivities: (topicId, categoryId, callback) => {
        axios.get(SERVER_URL + `/activity/${categoryId}`)
            .then(response => {
                const activityData = response.data
                callback(true, activityData)
            })
            .catch(error => {
                console.log(error)
                callback(false, error && error.response && error.response.data ? error.response.data : error);
            })
    }
}
