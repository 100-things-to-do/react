import axios from 'axios';



export const createDomain = (bodyData, callback) => {
    axios({
        method: 'post',
        url: `http://localhost:5000/domains/`,
        data: bodyData,
    }).then(response => {
        const auctionData = response.data
        callback(true, auctionData)
    })
        .catch(error => {
            callback(false, error && error.response && error.response.data ? error.response.data : error)
        })
}

export const getDomains = (callback) => {
    axios({
        method: 'get',
        url: `http://localhost:5000/domains/`,
    }).then(response => {
        const auctionData = response.data
        callback(true, auctionData)
    })
        .catch(error => {
            callback(false, error && error.response && error.response.data ? error.response.data : error)
        })
}