import React, { useState } from 'react';
import { useEffect } from 'react';
import { getAllAuctions } from '../requests/AuctionRequests';
import { useSelector } from 'react-redux';
import Auction from './Auction';
import { NavLink } from 'react-router-dom';

function Auctions() {
    const token = useSelector(state => state.user.token)
    const [auctions, setAuctions] = useState([])
    const IMG_URL = "http://localhost:5000/"
    let rowIndex = 0
    let cardArray = []
    let tempAuctions = []

    const renderCard = (auction, index) => {
            console.log(index)
            if(index !== 0 && index % 3 === 0){
                const finalCardArray = cardArray
                const src = IMG_URL + (auction.img ? auction.img : "empty.jpeg")
                cardArray = []
                cardArray.push(
                    <div className="card" key={index} style={{width: 300, marginRight: 20}}>
                        <img className="card-img-top" src={src} alt="Card image cap"></img>
                        <div className="card-body">
                            <h5 className="card-title">{auction.name}</h5>
                            <p className="card-text">Starting Price: {auction.startingPrice}</p>
                            <p className="card-text">Ending Price: {auction.closingPrice}</p>
                            <NavLink to={`/auction/${auction._id}`} className="btn btn-primary">{auction.name}</NavLink>
                        </div>
                    </div>
                )
                tempAuctions.push(
                    <div className="row mt-3" key={++rowIndex}>
                        {finalCardArray}
                    </div>
                )

                

            }
            else{                
                const src = IMG_URL + (auction.img ? auction.img : "empty.jpeg")
                cardArray.push(
                    <div className="card" key={index} style={{width: 300, marginRight: 20}}>
                        <img className="card-img-top" src={src} alt="Card image cap"></img>
                        <div className="card-body">
                            <h5 className="card-title">{auction.name}</h5>
                            <p className="card-text">Starting Price: {auction.startingPrice}</p>
                            <p className="card-text">Ending Price: {auction.closingPrice}</p>
                            <NavLink to={`/auction/${auction._id}`} className="btn btn-primary">{auction.name}</NavLink>
                        </div>

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