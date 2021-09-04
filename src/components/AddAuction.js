import React, { useState } from 'react';
import { postAuction } from '../requests/AuctionRequests';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddAuction() {
    const token = useSelector(state => state.user.token)
    const [auctionName, setAuctionName] = useState("")
    const [startingPrice, setStartingPrice] = useState("")
    const [closingPrice, setClosingPrice] = useState("")
    const [img, setImg] = useState("")
    
    function dataPosted(isSuccess, msg){
        if(isSuccess){
            console.log("data posted")
            toast.success("Successfully added auction.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else{
            console.log(msg)
            toast.error(msg, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }

    }



    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData();
        data.append('name', auctionName)
        data.append('startingPrice', startingPrice)
        data.append('closingPrice', closingPrice)
        data.append('img', img)
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

export default AddAuction