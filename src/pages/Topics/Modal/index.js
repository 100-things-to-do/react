import React, { useState, useRef } from 'react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { setToastMsg } from '../../../redux'
import { useSelector, useDispatch } from 'react-redux';
import { createTopic } from '../../../requests/TopicRequests';



function TopicModal({ setModalVisible }) {
    const [name, setName] = useState(null);
    const [size, setSize] = useState(null);
    const dispatch = useDispatch()

    const createTopicCb = () => {
        setModalVisible(false);
        dispatch(setToastMsg('🦄 Topic added!', 'success'))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const bodyData = {
            name,
            size
        }
        createTopic(bodyData, createTopicCb);
    }


    return (
        <Modal show={true} onHide={() => setModalVisible(false)}>
            <Modal.Header closeButton>Create Domain</Modal.Header>
            <Modal.Body>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Row>
                                    <Col md={6}>
                                        <label>Name</label>
                                    </Col>
                                    <Col md={6}>
                                        <input name="name" type="text" className="form-control" placeholder="Enter topic name" onChange={e => setName(e.target.value)} />
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

export default TopicModal;