import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import TopicModal from './Modal';
import TopicAPI from '../../apis/TopicAPI'
require('./index.css')

function Topics() {
    const [modalVisible, setModalVisible] = useState(false);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        TopicAPI.getTopics(getTopicsCb);
    }, []);

    const getTopicsCb = (resultBoolean, topics) => {
        if (resultBoolean) {
            setTopics(topics.map((domain) => {
                return <Dropdown.Item href={`/topics/${domain._id}/categories`}>{domain.name}</Dropdown.Item >
            }))
        }
    }


    return (
        <div className="flex-container">
            {modalVisible ?
                <TopicModal setModalVisible={setModalVisible} /> : null
            }
            <DropdownButton id="dropdown-basic-button" title="Topic List">
                {topics}
            </DropdownButton>
            <button className="button" onClick={() => setModalVisible(true)}>Add Topic</button>
        </div>

    )
}

export default Topics;