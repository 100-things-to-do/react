import axios from 'axios';

export const postAuction = (data, token, callback) => {
    axios.post('http://localhost:5000/auctions/', data, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(response => {
        const auctionData = response.data
        callback(true, auctionData)
    })
    .catch(error => {
        callback(false, error.message)
    })        
}


export const updateAuction = (data, token, callback) => {
    axios.put('http://localhost:5000/users/signup', data, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(response => {
        const auctionData = response.data
        callback(true, auctionData)
    })
    .catch(error => {

    })        
}