import React, {useState, useEffect} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import CreateTopicModal from './createTopicModal';
import TopicAPI from '../../apis/TopicAPI'
import MyAwesomeTable from "./grid";

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
                return <Dropdown.Item href={`/topics/${domain.name}/categories`}>{domain.name}</Dropdown.Item>
            }))
        }
    }


    return (
        <div>
            {modalVisible ? <CreateTopicModal setModalVisible={setModalVisible}/> : null}
            <div className="centered-flex vertical-flex">
                <span className="header-text">
                    100 Things to do
                </span>
            </div>
            <span>&nbsp;&nbsp;</span>
            <div className="centered-flex vertical-flex">
                <MyAwesomeTable/>
                <DropdownButton id="dropdown-basic-button" title="Topic List">
                    {topics}
                </DropdownButton>
                <button className="button" onClick={() => setModalVisible(true)}>Add Topic</button>
            </div>
        </div>

    )
}

export default Topics;
