import React, { useState } from 'react';
import { useEffect } from 'react';
import { getAllAuctions } from '../requests/AuctionRequests';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Cardboard() {
    const [cards, setCards] = useState([])
    const token = useSelector(state => state.user.token)
    let rowIndex = 0
    let cardArray = []
    let tempCards = []



    useEffect(() => {
        renderCards(true, [1, 2, 3, 4, 5])
    }, [])


    const renderCard = (auction, index) => {
        if (index !== 0 && index % 3 === 0) {
            tempCards.push(
                <div className="row mt-3" key={++rowIndex}>
                    {cardArray}
                </div>
            )
            cardArray = []
        }

        cardArray.push(
            <div className="card" key={index} style={{ width: 300, marginRight: 20 }}>
                <div className="card-body">
                    <h5 className="card-title"></h5>
                    <p className="card-text"></p>
                    <p className="card-text"></p>
                </div>

            </div>
        )



    }


    function renderCards(isSuccess, data) {
        if (isSuccess) {
            console.log(data);
            data.forEach(renderCard);
            if (cardArray !== []) {
                tempCards.push(
                    <div className="row mt-3" key={++rowIndex}>
                        {cardArray}
                    </div>
                )
            }
            setCards(tempCards)
        } else {
            console.log(data)
        }
    }





    return (
        <div className="p-4 mt-5">
            {cards}
        </div>
    );
}

export default Cardboard;