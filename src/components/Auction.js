import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getAuction } from '../requests/AuctionRequests';
import { useSelector } from 'react-redux';
import './popup.css';
import AddOfferPopup from './AddOfferPopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auction() {
    const token = useSelector(state => state.user.token)
    const userId = useSelector(state => state.user.userId)
    let { id } = useParams()
    const [auction, setAuction] = useState(null)
    const [offers, setOffers] = useState([])
    const [ownerId, setOwnerId] = useState(null)
    const [togglePopup, setTogglePopup] = useState(false)
    const [offerAdded, setOfferAdded] = useState(localStorage.getItem('offerAdded') || false)
    const IMG_URL = "http://localhost:5000/"
    let tempOffers = []
    
    function getResult(isSuccess, data){
        if(isSuccess){
            setOwnerId(data.owner._id)
            const imgUrl = IMG_URL + (data.img ? data.img : "empty.jpeg")
            setAuction(
                <div className="card" style={{width: 300, marginRight: 20}}>
                    <img src={imgUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text">Starting price: {data.startingPrice}</p>
                        <p className="card-text">Closing price: {data.closingPrice}</p>
                    </div>
                </div>
                )
            data.offers.map(renderOffer)
            setOffers(tempOffers)
        }else{
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
        console.log(offerAdded)
        if(offerAdded){
            toast.success('🦄 Offer added!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            setOfferAdded(false)
        }

    }, [])

    return (
        <div className="row">
            <div className="p-4 mt-5 col-md-6">
                {auction}
            </div>
            <div className="p-4 mt-5 col-md-6">
                <ul>
                {offers}
                </ul>
                {userId === ownerId ? <button onClick={() => setTogglePopup(!togglePopup)} className="btn btn-primary">Make Offer</button> : <></>}
            </div>
            {
            togglePopup ? (
                <AddOfferPopup auctionId={id} setOfferAdded={setOfferAdded}/>
            ) : null
            }
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
                {/* Same as */}
            <ToastContainer />

        </div>
    );
}

export default Auction;