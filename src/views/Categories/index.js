import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import CreateCategoryModal from './createCategoryModal';
import CategoryAPI from '../../apis/CategoryAPI'
import TopicAPI  from '../../apis/TopicAPI'
import {useParams} from "react-router-dom";
import {Image} from "react-bootstrap";
import editImage from "../../assets/edit-icon.png"
import noImageIcon from "../../assets/no-image-icon.png"
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
            setCategories(categories);
        }
    }
    
    return (
        <div>
            {modalVisible ?
                <CreateCategoryModal setModalVisible={setModalVisible} topicId={topicId} /> : null
            }

            {isEditTopicModalVisible ?
                <EditTopicModal setIsTopicUpdated={setIsTopicUpdated} setIsEditTopicModalVisible={setIsEditTopicModalVisible} topic={topic} /> : null
            }

            <div className="header-container">
                <div className="header-inner-container">
                    <span>
                    { topic ? `Topic - ${topic.name}` : null
                    }
                    </span>
                    <img className="topic-edit-container" src={editImage}  onClick={() => setIsEditTopicModalVisible(true)}></img>
                </div>

            </div>



            <div className="categories-container">
                {
                    categories.map((category, index) =>
                        <Category
                            topicId={topicId}
                            category={category}
                            index={index}
                        />
                    )
                }
            </div>
            <button onClick={() => setModalVisible(true)}>Add Category</button>
        </div>

    )
}


function Category({topicId, category}){
    const URL_POSTFIX = `/topics/${topicId}/categories/${category._id}/activities`;
    return (
        <div className="category-container">
            <img src={category.image ? category.image : noImageIcon}
                 className="category-image"/>
            <a href={URL_POSTFIX}>
                {category.name}
            </a>
        </div>

    )
}

export default Categories;