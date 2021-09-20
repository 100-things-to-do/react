import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getAuction } from '../requests/AuctionRequests';
import { useSelector, useDispatch } from 'react-redux';
import './popup.css';
import AddOfferPopup from './AddOfferPopup';
import {setToastMsg} from '../redux'


function Auction() {
    const token = useSelector(state => state.user.token)
    const userId = useSelector(state => state.user.userId)
    let { id } = useParams()
    const [auction, setAuction] = useState(null)
    const [offers, setOffers] = useState([])
    const [ownerId, setOwnerId] = useState(null)
    const [togglePopup, setTogglePopup] = useState(false)
    const [offerAdded, setOfferAdded] = useState(localStorage.getItem('offerAdded') || false)
    const dispatch = useDispatch()
    const IMG_URL = "http://localhost:5000/"
    let tempOffers = []


    function getResult(isSuccess, data) {
        if (isSuccess) {
            setOwnerId(data.owner._id)
            const imgUrl = IMG_URL + (data.img ? data.img : "empty.jpeg")
            setAuction(
                <div className="card" style={{ width: 300, marginRight: 20 }}>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text">Starting price: {data.startingPrice}</p>
                        <p className="card-text">Closing price: {data.closingPrice}</p>
                    </div>
                </div>
            )
            data.offers.map(renderOffer)
            setOffers(tempOffers)
        } else {
            console.log(data)
        }
    }


    const renderOffer = (offer, index) => {
        tempOffers.push(
            <li key={index}>
                Offer Price: {offer.price}
            </li>
        )
    }

    useEffect(() => {
        getAuction(id, token, getResult)
    }, [])

    useEffect(() => {
        console.log(offerAdded)
        if (offerAdded === true) {
            dispatch(setToastMsg('🦄 Offer added!', 'success'))
            getAuction(id, token, getResult)
            setOfferAdded(false)
        }
    }, [offerAdded])


    return (
        <div className="row">
            <div className="p-4 mt-5 col-md-6">
                {auction}
            </div>
            <div className="p-4 mt-5 col-md-6">
                <ul>
                    {offers}
                </ul>
                {userId !== ownerId ? <button onClick={() => setTogglePopup(!togglePopup)} className="btn btn-primary">Make Offer</button> : <></>}
            </div>
            {
                togglePopup ? (
                    <AddOfferPopup auctionId={id} setOfferAdded={setOfferAdded} setTogglePopup={setTogglePopup} />
                ) : null
            }
        </div>
    );


}

export default Auction;