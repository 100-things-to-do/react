import React, { useState } from 'react';
import { useEffect } from 'react';
import { getAllAuctions } from '../requests/AuctionRequests';
import { useSelector } from 'react-redux';
import Auction from './Auction';
import { Link } from 'react-router-dom';

function Auctions() {
    const token = useSelector(state => state.user.token)
    const [auctions, setAuctions] = useState([])

    function getResult(isSuccess, data){
        if(isSuccess){
            console.log(data)
            setAuctions(data.map(auction =>
                <div class="auction">
                    <Link to={`/auction/${auction._id}`}>{auction.name}</Link>
                    <br/>
                </div>
                )
            )
        }else{
            console.log(data)
        }
    }

    useEffect(() => {
        getAllAuctions(token, getResult)
    }, [])

    return (
        <div>
            {auctions}
        </div>
    );
}

export default Auctions;