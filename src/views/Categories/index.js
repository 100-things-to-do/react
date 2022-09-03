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
import addCategoryIcon from "../../assets/add-document-icon.png"
import EditTopicModal from "./editTopicModal";
import { Link } from 'react-router-dom';
const CDN_URL = process.env.REACT_APP_CDN_URL

require("./index.css")


function Categories() {
    const { topicId } = useParams(); // this is defined in path(mainRouter)
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditTopicModalVisible, setIsEditTopicModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [topic, setTopic] = useState(null);

    useEffect(() => {
        fetchCategories();
        fetchTopic();
    }, []);



    const fetchCategories = async () => {
        const result = await TopicAPI.getCategories(topicId);
        setCategories(result.data);
    }

    const fetchTopic = () => {
        TopicAPI.getTopic(topicId, getTopicCb);
    }


    const getTopicCb = (resultBoolean, topic) => {
        if (resultBoolean) {
            setTopic(topic);
        }
    }

    return (
        <div>
            {modalVisible ?
                <CreateCategoryModal fetchCategories={fetchCategories} setModalVisible={setModalVisible} topicId={topicId} /> : null
            }

            {isEditTopicModalVisible ?
                <EditTopicModal fetchTopic={fetchTopic} setIsEditTopicModalVisible={setIsEditTopicModalVisible} topic={topic} /> : null
            }

            <div className="header-container">
                <div className="width-20 blue">
                    <span>
                    { topic ? `Topic - ${topic.name}` : null
                    }
                    </span>
                    <img className="topic-edit-container clickable" src={editImage}  onClick={() => setIsEditTopicModalVisible(true)}></img>
                </div>

            </div>



            <div className="flex categories-container">
                {
                    categories.map((category, index) =>
                        <Category
                            topicId={topicId}
                            category={category}
                            index={index}
                        />
                    )

                }
                <AddCategoryCard setModalVisible={setModalVisible}/>
            </div>
        </div>

    )
}


function Category({topicId, category}){
    const GO_TO_ACTIVITIES_URL = `/topics/${topicId}/categories/${category.name}/activities`;
    console.log(category)
    return (

        <Link className="flex category-container blue smooth-border margin-2vw" to={GO_TO_ACTIVITIES_URL} >
            <img src={category.img ? CDN_URL + category.img : noImageIcon}
                 className="category-image smooth-border"/>
                {category.name}
        </Link>


    )
}

function AddCategoryCard({setModalVisible}){
    return (
        <div className="flex category-container clickable margin-2vw" onClick={() => setModalVisible(true)}>
            <img className="image-overlay" src={addCategoryIcon}></img>
        </div>

    )
}

export default Categories;
