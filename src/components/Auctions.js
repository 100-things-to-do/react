import React, { useState } from 'react';
import { useEffect } from 'react';
import { getAllAuctions } from '../requests/AuctionRequests';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

function Auctions() {
    var history = useHistory();
    const token = useSelector(state => state.user.token)
    const [auctions, setAuctions] = useState([])
    const IMG_URL = "http://localhost:5000/"
    let rowIndex = 0
    let cardArray = []
    let tempAuctions = []

    const toastShowSuccessfullyLoggedIn = () => {
        toast.success("Successfully logged in.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    const toastShowSuccessfullyLoggedOut = () => {
        toast.success("Successfully logged out.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    const renderCard = (auction, index) => {
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
        if (history && history.location && history.location.state && history.location.state.showToastLoggedIn) {
            toastShowSuccessfullyLoggedIn()
            history = createHistory();
            let state = { ...history.location.state };
            delete state.showToastLoggedIn;
            history.replace({ ...history.location, state });
        }
        if(history && history.location && history.location.state && history.location.state.showToastLoggedOut){
            toastShowSuccessfullyLoggedOut()
            history = createHistory();
            let state = { ...history.location.state };
            delete state.showToastLoggedOut;
            history.replace({ ...history.location, state });            
        }
    }, [])

    return (
        <div className="p-4 mt-5">
            {auctions}
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
        </div>
    );
}

export default Auctions;