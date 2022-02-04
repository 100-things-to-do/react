import React, { useState, useRef } from 'react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function CardModal({ domainId, cardId, setModalVisible }) {
    const [isOpen, setIsOpen] = useState(true);

    const hideModal = () => {
        console.log(setModalVisible);
        setModalVisible(false);
    };

    return (
        <Modal show={true} onHide={hideModal}>
            <Modal.Header>Edit {cardId}th Card</Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
                <button onClick={hideModal}>Cancel</button>
                <button>Save</button></Modal.Footer>
        </Modal>
    )
}


export default CardModal;