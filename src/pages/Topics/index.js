import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import TopicModal from './Modal';
import { getTopics } from '../../requests/TopicRequests'

function Topics() {
    const [modalVisible, setModalVisible] = useState(false);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        console.log("topics")
        getTopics(getTopicsCb);
    }, []);

    const getTopicsCb = (resultBoolean, topics) => {
        if (resultBoolean) {
            setTopics(topics.map((domain) => {
                return <Dropdown.Item href={`/topics/${domain._id}/categories`}>{domain.name}</Dropdown.Item >
            }))
        }
    }


    return (
        <div>
            {modalVisible ?
                <TopicModal setModalVisible={setModalVisible} /> : null
            }
            <DropdownButton id="dropdown-basic-button" title="Topic List">
                {topics}
            </DropdownButton>
            <button onClick={() => setModalVisible(true)}>Add Topic</button>
        </div>

    )
}

export default Topics;