import axios from 'axios';
import expressUrl from '../../common-util';


export const postAuction = (data, token, callback) => {
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        }
    }
    axios.post(expressUrl + '/auctions/', data, header)
        .then(response => {
            const auctionData = response.data
            callback(true, auctionData)
        })
        .catch(error => {
            callback(false, error.response.data)
        })
}


export const updateAuction = (data, token, callback) => {
    axios.put(expressUrl + '/users/signup', data, { headers: { "Authorization": `Bearer ${token}` } })
        .then(response => {
            const auctionData = response.data
            callback(true, auctionData)
        })
        .catch(error => {

        })
}

export const getAllAuctions = (token, callback) => {
    axios.get(expressUrl + '/auctions/', { headers: { "Authorization": `Bearer ${token}` } })
        .then(response => {
            const auctionList = response.data
            callback(true, auctionList)
        })
        .catch(error => {
            callback(false, error.message)
        })
}

export const getAuction = (auctionId, token, callback) => {
    axios.get(expressUrl + `/auctions/${auctionId}`, { headers: { "Authorization": `Bearer ${token}` } })
        .then(response => {
            const auction = response.data
            callback(true, auction)
        })
        .catch(error => {
            callback(false, error.message)
        })
}