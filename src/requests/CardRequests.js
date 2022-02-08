import axios from 'axios';
import { expressUrl } from '../common-util';


export const createCard = (data, callback) => {
    const header = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    }
    axios.post(expressUrl + `/cards/`, data, header)
        .then(response => {
            const auctionData = response.data
            callback(true, auctionData)
        })
        .catch(error => {
            callback(false, error && error.response && error.response.data ? error.response.data : error);
        })
}

export const getDomainCards = (domainId, callback) => {
    axios.get(expressUrl + `/cards/${domainId}`)
        .then(response => {
            const auctionData = response.data
            callback(true, auctionData)
        })
        .catch(error => {
            console.log(error)
            callback(false, error && error.response && error.response.data ? error.response.data : error);
        })
}