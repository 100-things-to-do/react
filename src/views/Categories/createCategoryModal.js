import React, { useState, useRef } from 'react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { setToastMsg } from '../../redux'
import { useSelector, useDispatch } from 'react-redux';
import CategoryAPI from '../../apis/CategoryAPI';



function CreateCategoryModal({ fetchCategories, setModalVisible, topicId }) {
    const [name, setName] = useState(null);
    const [size, setSize] = useState(null);
    const dispatch = useDispatch()

    const createCategoryCb = () => {
        setModalVisible(false);
        fetchCategories();
        dispatch(setToastMsg('🦄 Category added!', 'success'))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const bodyData = {
            name,
            size
        }
        CategoryAPI.createCategory(topicId, bodyData, createCategoryCb);
    }


    return (
        <Modal show={true} onHide={() => setModalVisible(false)}>
            <Modal.Header closeButton>Create Category</Modal.Header>
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
                                        <input name="name" type="text" className="form-control" placeholder="Enter category name" onChange={e => setName(e.target.value)} />
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

export default CreateCategoryModal;