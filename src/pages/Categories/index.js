import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import CategoryModal from './Modal';
import { getCategories } from '../../requests/CategoryRequests'
import { getTopic } from '../../requests/TopicRequests'
import {useParams} from "react-router-dom";


function Categories() {
    const { topicId } = useParams(); // this is defined in path(mainRouter)
    const [modalVisible, setModalVisible] = useState(false);
    const [Categories, setCategories] = useState([]);
    const [topic, setTopic] = useState([]);

    useEffect(() => {
        getCategories(topicId, getCategoriesCb);
        getTopic(topicId, getTopicCb);
    }, []);

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
            { topic ? `Topic - ${topic.name}` : null
            }
            {modalVisible ?
                <CategoryModal setModalVisible={setModalVisible} topicId={topicId} /> : null
            }
            <DropdownButton id="dropdown-basic-button" title="Category List">
                {Categories}
            </DropdownButton>
            <button onClick={() => setModalVisible(true)}>Add Category</button>
        </div>

    )
}

export default Categories;