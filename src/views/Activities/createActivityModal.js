import React, {useState, useRef, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ActivityAPI from '../../apis/ActivityAPI';
import {setToastMsg} from '../../redux'
import {useSelector, useDispatch} from 'react-redux';


function CreateActivityModal({topicId, categoryId, selectedActivity, setModalVisible, fetchActivities}) {
    const [activityText, setActivityText] = useState("");
    const [img, setImg] = useState("");
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedActivity) {
            setActivityText(selectedActivity.name)
        }
    }, [])

    function createActivityCb(isSuccess) {
        setModalVisible(false);
        if (isSuccess) {
            console.log("success");
            dispatch(setToastMsg('🦄 Successfully added activity!', 'success'))
        } else {
            dispatch(setToastMsg("Error!", 'error'))
        }
        fetchActivities();
    }

    function updateActivityCb(isSuccess, msg) {
        setModalVisible(false);
        if (isSuccess) {
            console.log("success");
            dispatch(setToastMsg('🦄 Successfully updated activity!', 'success'))
        } else {
            dispatch(setToastMsg(msg, 'error'))
        }
        fetchActivities();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('name', activityText)
        if (img !== '') {
            formData.append('img', img)
        }
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        console.log(formData);
        if (selectedActivity) {
            ActivityAPI.updateActivity(topicId, categoryId, selectedActivity._id, formData, updateActivityCb);

        } else {
            const result = await ActivityAPI.createActivity(topicId, categoryId, formData, createActivityCb);
            createActivityCb(result)
        }
    }

    return (
        <Modal show={true} onHide={() => setModalVisible(false)}>
            <Modal.Header closeButton>
                <span className="thick">{selectedActivity ? "Update Activity" : "Create Activity"}</span>
            </Modal.Header>
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
                                        <input name="name" type="text" className="form-control" value={activityText}
                                               placeholder="Name" onChange={e => setActivityText(e.target.value)}/>
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
                            {selectedActivity && selectedActivity.image ?
                                <div className="form-group">
                                    <Row>
                                        <Col md={6}>
                                            <label htmlFor="oldImage">Old Image</label>
                                        </Col>
                                        <Col md={6}>
                                            <img src={selectedActivity.image} alt="Activity Image"/>
                                        </Col>
                                    </Row>
                                </div> : null
                            }

                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        </form>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    )
}


export default CreateActivityModal;
