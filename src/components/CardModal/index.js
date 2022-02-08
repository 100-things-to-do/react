import React, { useState, useRef } from 'react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createCard } from '../../requests/CardRequests';
import { setToastMsg } from '../../redux'
import { useSelector, useDispatch } from 'react-redux';


function CardModal({ domainId, cardId, setModalVisible }) {
    const [activityText, setActivityText] = useState("");
    const [img, setImg] = useState("");
    const dispatch = useDispatch()


    function createCardCb(isSuccess, msg) {
        setModalVisible(false);
        if (isSuccess) {
            console.log("success");
            dispatch(setToastMsg('🦄 Successfully added card!', 'success'))
        } else {
            dispatch(setToastMsg(msg, 'error'))
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("img", img);
        let formData = new FormData();
        formData.append('domain_id', domainId);
        formData.append('index', cardId);
        formData.append('text', activityText)
        if (img !== '') {
            formData.append('img', img)
        }
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        createCard(formData, createCardCb);
    }

    return (
        <Modal show={true} onHide={() => setModalVisible(false)}>
            <Modal.Header closeButton>Edit {cardId}th Card</Modal.Header>
            <Modal.Body>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="form-group">
                                <Row>
                                    <Col md={6}>
                                        <label>Activity Text</label>
                                    </Col>
                                    <Col md={6}>
                                        <input name="name" type="text" className="form-control" placeholder="Enter text" onChange={e => setActivityText(e.target.value)} />
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
        </Modal>
    )
}


export default CardModal;