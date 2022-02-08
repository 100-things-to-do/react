import axios from 'axios';
import { expressUrl } from '../common-util';



export const createDomain = (bodyData, callback) => {
    axios({
        method: 'post',
        url: expressUrl + `/domains/`,
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
        url: expressUrl + `/domains/`,
    }).then(response => {
        const auctionData = response.data
        callback(true, auctionData)
    })
        .catch(error => {
            callback(false, error && error.response && error.response.data ? error.response.data : error)
        })
}