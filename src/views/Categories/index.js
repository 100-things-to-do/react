import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import CategoryModal from './Modal';
import CategoryAPI from '../../apis/CategoryAPI'
import TopicAPI  from '../../apis/TopicAPI'
import {useParams} from "react-router-dom";
import {Image} from "react-bootstrap";
import editImage from "../../assets/edit-icon.png"
import EditTopicModal from "./editTopicModal";
require("./index.css")

function Categories() {
    const { topicId } = useParams(); // this is defined in path(mainRouter)
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditTopicModalVisible, setIsEditTopicModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [topic, setTopic] = useState(null);
    const [isTopicUpdated, setIsTopicUpdated] = useState(false);

    useEffect(() => {
        CategoryAPI.getCategories(topicId, getCategoriesCb);
        TopicAPI.getTopic(topicId, getTopicCb);
    }, []);

    useEffect(() => {
        if(isTopicUpdated){
            TopicAPI.getTopic(topicId, getTopicCb);
            setIsTopicUpdated(false);
        }
    }, [isTopicUpdated])

    const getTopicCb = (resultBoolean, topic) => {
        if (resultBoolean) {
            setTopic(topic);
        }
    }

    const getCategoriesCb = (resultBoolean, categories) => {
        if (resultBoolean) {
            setCategories(categories.map((category) => {
                return <Dropdown.Item href={`/topics/${topicId}/categories/${category._id}/activities`}>{category.name}</Dropdown.Item >
            }))
        }
    }
    
    return (
        <div>
            <div className="topic-container">
                <div>
                    { topic ? `Topic - ${topic.name}` : null
                    }
                </div>
                    <img className="topic-edit-container" src={editImage}  onClick={() => setIsEditTopicModalVisible(true)}></img>
            </div>

            {modalVisible ?
                <CategoryModal setModalVisible={setModalVisible} topicId={topicId} /> : null
            }

            {isEditTopicModalVisible ?
                <EditTopicModal setIsTopicUpdated={setIsTopicUpdated} setIsEditTopicModalVisible={setIsEditTopicModalVisible} topic={topic} /> : null
            }

            <DropdownButton id="dropdown-basic-button" title="Category List">
                {categories}
            </DropdownButton>
            <button onClick={() => setModalVisible(true)}>Add Category</button>
        </div>

    )
}

export default Categories;