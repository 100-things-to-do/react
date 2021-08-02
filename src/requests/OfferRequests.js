import axios from "axios";

export const postOffer = (data, token, auctionId, callback) => {
    const header = {
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        }
    }
    axios.post(`http://localhost:5000/offers/${auctionId}`, data, header)
    .then(response => {
        const offerData = response.data
        callback(true, offerData)
    })
    .catch(error => {
        callback(false, error.response.data)
    }) 
}