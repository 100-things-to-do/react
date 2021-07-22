import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getAuction } from '../requests/AuctionRequests';
import { useSelector } from 'react-redux';

function Auction() {
    const token = useSelector(state => state.user.token)
    let { id } = useParams()
    const [auction, setAuction] = useState(null)
    function getResult(isSuccess, data){
        if(isSuccess){
            setAuction(
                <div><h3>Name: {data.name}</h3>
                    <h3>Starting price: {data.startingPrice}</h3>
                </div>
                )
        }else{
            console.log(data)
        }
    }

    useEffect(() => {
        getAuction(id, token, getResult)
    }, [])

    return (
        <div>
            {auction}
        </div>
    );
}

export default Auction;