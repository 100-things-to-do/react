import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import $ from "jquery";
import "./Domain.css";
import curtain from './curtain.jpeg';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useParams } from 'react-router';
import { Switch } from '@mui/material';
import CardModal from "./Modal";
import { getActivities } from '../../requests/ActivityRequest'
import { getCategory } from '../../requests/CategoryRequests'

function Activities() {
    const { topicId, categoryId } = useParams(); // this is defined in path(mainRouter)
    const token = useSelector(state => state.user.token)
    let cardArray = []
    let tempCards = []
    let indexx = 0;
    const [checked, _setChecked] = useState(false);
    const [curtainState, _setCurtainState] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    const [cardId, setCardId] = useState(0);
    const [cards, setCards] = useState([]);
    const [domainCardsLength, setDomainCardsLength] = useState(0);
    const curtainStateRef = useRef(curtainState);
    const [category, setCategory] = useState();
    const setCurtainState = (data) => {
        curtainStateRef.current = data;
        _setCurtainState(data);
    };
    const checkedRef = useRef(checked);
    const setChecked = (data) => {
        checkedRef.current = data;
        _setChecked(data);
    };

    useEffect(() => {
        getActivities(topicId, categoryId, getActivitiesCb)
        getCategory(topicId, categoryId, getCategoryCb);
    }, [])

    const getCategoryCb = (resultStatus, category) => {
        if (resultStatus) {
            console.log("category", category);
            setCategory(category)
        } else {
            console.log("error");
        }
    }

    const getActivitiesCb = (resultStatus, activities) => {
        if (resultStatus) {
            console.log("activities", activities);
            setDomainCardsLength(activities.length);
            setCurtainState(getInitialCurtainState(activities.length, false));
            renderActivities(activities);
        } else {
            console.log("error");
        }
    }

    function getInitialCurtainState(domainSize, isOpen) {
        const initialCurtainState = {};
        for (let i = 0; i < domainSize; i++) {
            if (isOpen) {
                initialCurtainState[i * 2] = 'opened';
            } else {
                initialCurtainState[i * 2] = 'closed';
            }
        }
        return initialCurtainState;
    }





    useEffect(() => {
        if (checked) {
            setCurtainState(getInitialCurtainState(domainCardsLength, true))
            changeAllCurtainStatus(true)

        } else {
            setCurtainState(getInitialCurtainState(domainCardsLength, false))
            changeAllCurtainStatus(false);
        }
    }, [checked])

    const curtainClickEvent = (index) => {
        if (checkedRef.current) {
            setCardId(index);
            setModalVisible(true);
        } else {
            openCloseCurtain(index * 2, setCurtainState)
        }
    }

    const renderActivity = (card, curtainId) => {
        let curtain1Id = `curtain${indexx++}`;
        let curtain2Id = `curtain${indexx++}`;
        const backgroundImage = card && card.image ? `url(http://localhost:6666/${card.image})` : null;
        cardArray.push(
            <Col lg={4} md={6} xs={12} >
                <div topicId="effect" style={{ width: 200, backgroundSize: '200px 225px', backgroundImage: backgroundImage }} onClick={() => curtainClickEvent(curtainId)}>
                    <p>{card && card.text ? card.text : curtainId}</p>
                    <img src={curtain} alt={curtain1Id} topicId={curtain1Id} className="left-curtain" style={{ width: 100 }} />
                    <img src={curtain} alt={curtain2Id} topicId={curtain2Id} className="right-curtain" style={{ width: 100 }} />
                </div>
            </Col >
        )
    }


    function renderActivities(cards) {
        cards.forEach(renderActivity);
        tempCards.push(
            <Row>
                {cardArray}
            </Row>
        )
        console.log(tempCards)
        setCards(tempCards)
    }

    function changeAllCurtainStatus(willOpen) {
        for (var i = 0; i < domainCardsLength * 2; i += 2) {
            let curtain1 = `#curtain${i}`
            let curtain2 = `#curtain${i + 1}`
            if (willOpen) {
                $(curtain1).animate({ width: 20 }, 1000);
                $(curtain2).animate({ width: 20 }, 1000);
            } else {
                $(curtain1).animate({ width: 200 }, 1000);
                $(curtain2).animate({ width: 200 }, 1000);
            }

        }
    }

    function openCloseCurtain(topicId, setCurtainState) {
        let curtain1 = `#curtain${topicId}`
        let curtain2 = `#curtain${topicId + 1}`
        if (curtainStateRef.current[topicId] == 'closed') {
            let newCurtainState = {};
            newCurtainState[topicId] = 'opened';
            setCurtainState({ ...curtainStateRef.current, ...newCurtainState })
            $(curtain1).animate({ width: 20 }, 1000);
            $(curtain2).animate({ width: 20 }, 1000);
        } else {
            let newCurtainState = {};
            newCurtainState[topicId] = 'closed';
            setCurtainState({ ...curtainStateRef.current, ...newCurtainState })
            $(curtain1).animate({ width: 200 }, 1000);
            $(curtain2).animate({ width: 200 }, 1000);
        }
    }




    return (
        <div style={{ width: '60%' }}>
            {
               category ? `Category - ${category.name}` : null
            }

            {modalVisible ?
                <CardModal domainId={topicId} cardId={cardId} setModalVisible={setModalVisible} /> : null
            }
            <Row className='mx-auto' md={12}>
                User Mode
                <Switch
                    checked={checked}
                    onChange={(chk) => {
                        setChecked(!checked);
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                Creator Mode
            </Row>
            {cards}
        </div >

        // <div className="p-4 mt-5">
        //     <div topicId="wrapper">

        //         <div topicId="effect">
        //             <p>Surprise You Got A Lottery!</p>
        //             <img src={curtain} topicId="curtain1" />
        //             <img src={curtain} topicId="curtain2" />
        //         </div>

        //         <div topicId="curtain_buttons">
        //             <input type="button" value="OPEN CURTAIN" onClick={() => open_curtain(0)} />
        //             <input type="button" value="CLOSE CURTAIN" onClick={() => close_curtain(0)} />
        //         </div>

        //     </div>
        // </div>
    );
}

export default Activities;