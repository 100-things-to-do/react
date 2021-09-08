import React, { useState } from 'react';
import { postAuction } from '../requests/AuctionRequests';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {setToastMsg} from "../redux"

function AddAuction() {
    const token = useSelector(state => state.user.token)
    const [auctionName, setAuctionName] = useState("")
    const [startingPrice, setStartingPrice] = useState("")
    const [closingPrice, setClosingPrice] = useState("")
    const [img, setImg] = useState("")
    const history = useHistory();
    const dispatch = useDispatch()
   
    
    // or auction
    // TODO: take auction id from dataPosted() then redirect to auction with that id.
    const redirectToAuction = (auctionId) =>{ 
        history.push({
            pathname: `auction/${auctionId}`,
            });
      }

    function dataPosted(isSuccess, msg){
        if(isSuccess){
            redirectToAuction(msg._id); 
            dispatch(setToastMsg('Successfully added auction!', 'success'))
        }else{
            console.log(msg)
            dispatch(setToastMsg(msg, 'error'))
        }

    }



    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData();
        data.append('name', auctionName)
        data.append('startingPrice', startingPrice)
        data.append('closingPrice', closingPrice)
        if(img !== ''){
            data.append('img', img)
        }
        postAuction(data, token, dataPosted)
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                
                <h3>Add Auction</h3>

                <div className="form-group">
                    <label>Auction Name</label>
                    <input name="name" type="text" className="form-control" placeholder="Enter auction name" onChange={e=>setAuctionName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Starting price</label>
                    <input name="startingPrice" type="text" className="form-control" placeholder="Enter starting price" onChange={e=>setStartingPrice(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Closing price</label>
                    <input name="closingPrice" type="text" className="form-control" placeholder="Enter closing price" onChange={e=>setClosingPrice(e.target.value)}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="file">Choose file</label>
                    <input type="file" name="img" filename="img" className="form-control-file" onChange={e=>setImg(e.target.files[0])}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
            </div>

        </div>
    );
}

export default AddAuction