import React, { useState, useRef } from 'react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { setToastMsg } from '../../redux'
import { useSelector, useDispatch } from 'react-redux';
import CategoryAPI from '../../apis/CategoryAPI';



function CreateCategoryModal({ fetchCategories, setModalVisible, topicId }) {
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const dispatch = useDispatch()

    const createCategoryCb = (isSuccess) => {
        setModalVisible(false);
        fetchCategories();
        console.log(isSuccess)
        if(isSuccess){
            dispatch(setToastMsg('🦄 Category added!', 'success'))
        }else{
            dispatch(setToastMsg('🦄 Category could not added!', 'error'))
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('name', name);
        formData.append('img', img);

        const isSuccess = await CategoryAPI.createCategory(topicId, formData);
        createCategoryCb(isSuccess);
    }


    return (
        <Modal show={true} onHide={() => setModalVisible(false)}>
            <Modal.Header closeButton>Create Category</Modal.Header>
            <Modal.Body>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                            <div className="form-group">
                                <Row>
                                    <Col md={6}>
                                        <label htmlFor="file">Choose image</label>

                                    </Col>
                                    <Col md={6}>
                                        <input type="file" name="image" filename="image" className="form-control-file"
                                               onChange={e => setImg(e.target.files[0])}/>
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
