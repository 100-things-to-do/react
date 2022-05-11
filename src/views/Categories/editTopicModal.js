import React, { useState, useRef } from 'react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { setToastMsg } from '../../redux'
import { useSelector, useDispatch } from 'react-redux';
import TopicAPI from '../../apis/TopicAPI';



function EditTopicModal({ fetchTopic, setIsEditTopicModalVisible, topic }) {
    const [name, setName] = useState(topic.name);
    const dispatch = useDispatch()

    const updateTopicCb = () => {
        setIsEditTopicModalVisible(false);
        fetchTopic();
        dispatch(setToastMsg('🦄 Topic updated!', 'success'))
    }

    const createBodyData = () => {
        const bodyData = {
            name,
        }
        return bodyData;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const bodyData = createBodyData();
        TopicAPI.updateTopic(topic._id, bodyData, updateTopicCb);
    }


    return (
        <Modal show={true} onHide={() => setIsEditTopicModalVisible(false)}>
            <Modal.Header closeButton>Edit Topic</Modal.Header>
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
                                        <input name="name" type="text" className="form-control" placeholder="Enter category name" value={name} onChange={e => setName(e.target.value)} />
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

export default EditTopicModal;