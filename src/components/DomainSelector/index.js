import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import DomainModal from '../DomainModal';
import { getDomains } from '../../requests/DomainRequests'


function DomainSelector() {
    const [modalVisible, setModalVisible] = useState(false);
    const [domains, setDomains] = useState([]);



    const getDomainsCb = (resultBoolean, domains) => {
        if (resultBoolean) {
            setDomains(domains.map((domain) => {
                return <Dropdown.Item href={`/domain/${domain.id}`}>{domain.name}</Dropdown.Item >
            }))
        }
    }

    useEffect(() => {
        getDomains(getDomainsCb);
    }, []);
    return (
        <div>
            {modalVisible ?
                <DomainModal setModalVisible={setModalVisible} /> : null
            }
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                {domains}
            </DropdownButton>
            <button onClick={() => setModalVisible(true)}>Add Domain</button>
        </div>

    )
}

export default DomainSelector;