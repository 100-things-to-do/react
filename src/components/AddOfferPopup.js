import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { postOffer } from '../requests/OfferRequests';
import './popup.css';

function AddOfferPopup(props) {
    const token = useSelector(state => state.user.token)
    const [price, setPrice] = useState("")
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    function handleSubmitCb(isSuccess, msg){
        if(isSuccess){
            setShowError(false)
        }else{
            setShowError(true)
            console.log(msg)
            setErrorMsg(msg)
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData();
        data.append('price', price)
        postOffer(data, token, props.auctionId, handleSubmitCb)
    }

    return (
        <div className="popup">
            <div className="popup_close">aaa</div>
            <div className="popup_inner">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                
                <h3>Add Auction</h3>

                    { showError ? (
                        <div className="form-group row">
                            <label className="col-sm-2">Closing price</label>
                            <div className="col-sm-7">
                                <input name="price" type="text" className="form-control is-invalid" placeholder="Enter price" onChange={e=>setPrice(e.target.value)}/>
                            </div>
                            <div class="col-sm-3">
                                <small id="errorMsg" class="text-danger">
                                    {errorMsg}
                                </small>      
                            </div>
                        </div>

                    )
                        :
                    (
                        <div className="form-group row">
                            <label className="col-sm-2">Closing price</label>
                            <div className="col-sm-5">
                                <input name="price" type="text" className="form-control" placeholder="Enter price" onChange={e=>setPrice(e.target.value)}/>
                            </div>

                        </div>
                    )

                    }
                    

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                
            </form>
            </div>
        </div>
    );
}

export default AddOfferPopup;