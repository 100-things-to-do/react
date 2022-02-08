import axios from 'axios';

export const createCard = (data, callback) => {
    const header = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    }
    axios.post(`http://localhost:5000/cards/`, data, header)
        .then(response => {
            const auctionData = response.data
            callback(true, auctionData)
        })
        .catch(error => {
            callback(false, error && error.response && error.response.data ? error.response.data : error);
        })
}

export const getDomainCards = (domainId, callback) => {
    console.log("asdasfas")
    axios.get(`http://localhost:5000/cards/${domainId}`)
        .then(response => {
            const auctionData = response.data
            callback(true, auctionData)
        })
        .catch(error => {
            console.log(error)
            callback(false, error && error.response && error.response.data ? error.response.data : error);
        })
}