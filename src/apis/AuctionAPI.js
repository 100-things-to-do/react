import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export const postAuction = (data, token, callback) => {
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        }
    }
    axios.post(SERVER_URL + '/auctions/', data, header)
        .then(response => {
            const auctionData = response.data
            callback(true, auctionData)
        })
        .catch(error => {
            callback(false, error.response.data)
        })
}


export const updateAuction = (data, token, callback) => {
    axios.put(SERVER_URL + '/users/signup', data, { headers: { "Authorization": `Bearer ${token}` } })
        .then(response => {
            const auctionData = response.data
            callback(true, auctionData)
        })
        .catch(error => {

        })
}

export const getAllAuctions = (token, callback) => {
    axios.get(SERVER_URL + '/auctions/', { headers: { "Authorization": `Bearer ${token}` } })
        .then(response => {
            const auctionList = response.data
            callback(true, auctionList)
        })
        .catch(error => {
            callback(false, error.message)
        })
}

export const getAuction = (auctionId, token, callback) => {
    axios.get(SERVER_URL + `/auctions/${auctionId}`, { headers: { "Authorization": `Bearer ${token}` } })
        .then(response => {
            const auction = response.data
            callback(true, auction)
        })
        .catch(error => {
            callback(false, error.message)
        })
}
