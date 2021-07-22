import React from 'react';
import { postAuction } from '../requests/AuctionRequests';
import { useSelector } from 'react-redux';

function AddAuction() {
    const token = useSelector(state => state.user.token)
    
    function dataPosted(isSuccess, auctionData){
        if(isSuccess){
            console.log("data posted")
        }else{
            console.log("error!")
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const auctionData = {}
        for (let key of data.keys()) {
            console.log(key, data.get(key))
            if(key === 'name'){
                auctionData.name = data.get(key)
            }else if (key === 'startingPrice'){
                auctionData.startingPrice = data.get(key)
            }else if (key === 'closingPrice'){
                auctionData.closingPrice = data.get(key)
            }
        }
        postAuction(auctionData, token, dataPosted)
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
            <form onSubmit={handleSubmit}>
                
                <h3>Add Auction</h3>

                <div className="form-group">
                    <label>Auction Name</label>
                    <input name="name" type="text" className="form-control" placeholder="Enter auction name" />
                </div>

                <div className="form-group">
                    <label>Starting price</label>
                    <input name="startingPrice" type="text" className="form-control" placeholder="Enter starting price" />
                </div>

                <div className="form-group">
                    <label>Closing price</label>
                    <input name="closingPrice" type="text" className="form-control" placeholder="Enter closing price" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
            </div>
        </div>
    );
}

export default AddAuction