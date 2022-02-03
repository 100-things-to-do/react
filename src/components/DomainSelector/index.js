import { Link } from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Domain from '../Domain'

function DomainSelector() {


    return (
        <div>
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                <Dropdown.Item href="/domain/1">First Domain</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default DomainSelector;