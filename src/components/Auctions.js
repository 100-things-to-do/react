import React, { useState } from 'react';
import { useEffect } from 'react';
import { getAllAuctions } from '../requests/AuctionRequests';
import { useSelector } from 'react-redux';
import Auction from './Auction';
import { Link } from 'react-router-dom';

function Auctions() {
    const token = useSelector(state => state.user.token)
    const [auctions, setAuctions] = useState([])

    let rowIndex = 0
    let cardArray = []
    let tempAuctions = []

    const renderCard = (auction, index) => {
            console.log(index)
            if(index !== 0 && index % 3 === 0){
                const finalCardArray = cardArray
                cardArray = []
                cardArray.push(
                    <div className="card" key={index} style={{width: 180, marginRight: 20}}>
                        <div className="card-body">
                            <h5 className="card-title">Name</h5>
                            <p className="card-text">Text</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                        <Link to={`/auction/${auction._id}`}>{auction.name}</Link>
                    </div>
                )
                tempAuctions.push(
                    <div className="row mt-3" key={++rowIndex}>
                        {finalCardArray}
                    </div>
                )

                

            }
            else{
                cardArray.push(
                    <div className="card" key={index} style={{width: 180, marginRight: 20}}>
                        <div className="card-body">
                            <h5 className="card-title">Name</h5>
                            <p className="card-text">Text</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                        <Link to={`/auction/${auction._id}`}>{auction.name}</Link>
                    </div>
                )
            }
         
        
    }


    function getResult(isSuccess, data){
        if(isSuccess){
            console.log(data)
            data.map(renderCard)
            if(cardArray !== []){
                tempAuctions.push(
                    <div className="row mt-3" key={++rowIndex}>
                        {cardArray}
                    </div>
                )
            }
            setAuctions(tempAuctions)
        }else{
            console.log(data)
        }
    }



    useEffect(() => {
        getAllAuctions(token, getResult)
    }, [])

    return (
        <div className="p-4 mt-5">
            {auctions}
        </div>
    );
}

export default Auctions;