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

                <div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">{data.name}</h5>
                        <p class="card-text">{data.startingPrice}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
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