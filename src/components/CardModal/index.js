import React, { useState, useRef } from 'react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function CardModal({ domainId, cardId, setModalVisible }) {
    const [isOpen, setIsOpen] = useState(true);
    const [activityText, setActivityText] = useState("");
    const [img, setImg] = useState("");

    const hideModal = () => {
    };

    function postDataCb(isSuccess, msg) {
        setModalVisible(false);

        if (isSuccess) {
            console.log("success");
            //dispatch(setToastMsg('Successfully added auction!', 'success'))
        } else {
            console.log(msg)
            //dispatch(setToastMsg(msg, 'error'))
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("text", activityText)
        let formData = new FormData();
        formData.append('activityText', activityText)
        if (img !== '') {
            formData.append('img', img)
        }
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        //postData(data, postDataCb);

    }

    return (
        <Modal show={true} onHide={hideModal}>
            <Modal.Header>Edit {cardId}th Card</Modal.Header>
            <Modal.Body>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">

                            <h3>Add Auction</h3>

                            <div className="form-group">
                                <Row>
                                    <Col md={6}>
                                        <label>Activity Text</label>
                                    </Col>
                                    <Col md={6}>
                                        <input name="name" type="text" className="form-control" placeholder="Enter auction name" onChange={e => setActivityText(e.target.value)} />
                                    </Col>
                                </Row>
                            </div>

                            <div className="form-group">
                                <Row>
                                    <Col md={6}>
                                        <label htmlFor="file">Choose image</label>

                                    </Col>
                                    <Col md={6}>
                                        <input type="file" name="img" filename="img" className="form-control-file" onChange={e => setImg(e.target.files[0])} />
                                    </Col>
                                </Row>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        </form>
                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer>

                <button onClick={hideModal}>Cancel</button>
                <button>Save</button></Modal.Footer>
        </Modal>
    )
}


export default CardModal;