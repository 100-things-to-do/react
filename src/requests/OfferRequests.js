import axios from "axios";
import { expressUrl } from '../common-util';

export const postOffer = (data, token, auctionId, callback) => {
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        }
    }
    axios.post(expressUrl + `/offers/${auctionId}`, data, header)
        .then(response => {
            const offerData = response.data
            callback(true, offerData)
        })
        .catch(error => {
            callback(false, error.response.data)
        })
}