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
import CardModal from "../CardModal";

function Domain() {
    const { id } = useParams(); // this is defined in path(mainRouter)
    const token = useSelector(state => state.user.token)
    let cardArray = []
    let tempCards = []
    let indexx = 0;
    const [cards, setCards] = useState([])
    const [checked, _setChecked] = useState(false);
    const [curtainState, _setCurtainState] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    const [cardId, setCardId] = useState(0);

    const curtainStateRef = useRef(curtainState);
    const setCurtainState = (data) => {
        curtainStateRef.current = data;
        _setCurtainState(data);
    };
    const checkedRef = useRef(checked);
    const setChecked = (data) => {
        checkedRef.current = data;
        _setChecked(data);
    };

    function initCurtainState(input) {
        const initialCurtainState = {};
        for (const num in input) {
            initialCurtainState[num * 2] = 'closed';
        }
        return initialCurtainState;
    }

    useEffect(() => {
        console.log("new Curtain", curtainState)
    }, [curtainState])



    useEffect(() => {
        let input = [1, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        setCurtainState(initCurtainState(input));
        renderCards(true, input);
    }, [])

    const curtainClickEvent = (index) => {
        console.log(checkedRef.current)
        if (checkedRef.current) {
            setCardId(index);
            setModalVisible(true);
        } else {
            openCloseCurtain(index * 2, setCurtainState)
        }
    }

    const renderCard = (curtainId, index) => {
        let curtain1Id = `curtain${indexx++}`;
        let curtain2Id = `curtain${indexx++}`;
        console.log(indexx);
        cardArray.push(
            <Col lg={4} md={6} xs={12} >
                <div id="effect" style={{ width: 200 }} onClick={() => curtainClickEvent(index)}
                >
                    <p>{curtainId}</p>
                    <img src={curtain} alt={curtain1Id} id={curtain1Id} className="left-curtain" style={{ width: 100 }} />
                    <img src={curtain} alt={curtain2Id} id={curtain2Id} className="right-curtain" style={{ width: 100 }} />
                </div>
            </Col >
        )
    }


    function renderCards(isSuccess, data) {
        if (isSuccess) {
            data.forEach(renderCard);
            tempCards.push(
                <Row>
                    {cardArray}
                </Row>
            )
            setCards(tempCards)
        }
        else {
            console.log(data)
        }
    }


    function openCloseCurtain(id, setCurtainState) {
        let curtain1 = `#curtain${id}`
        let curtain2 = `#curtain${id + 1}`
        if (curtainStateRef.current[id] == 'closed') {
            let newCurtainState = {};
            newCurtainState[id] = 'opened';
            setCurtainState({ ...curtainStateRef.current, ...newCurtainState })
            $(curtain1).animate({ width: 20 }, 1000);
            $(curtain2).animate({ width: 20 }, 1000);
        } else {
            let newCurtainState = {};
            newCurtainState[id] = 'closed';
            setCurtainState({ ...curtainStateRef.current, ...newCurtainState })
            $(curtain1).animate({ width: 200 }, 1000);
            $(curtain2).animate({ width: 200 }, 1000);
        }
    }




    return (
        <div style={{ width: '60%' }}>
            {modalVisible ?
                <CardModal domainId={id} cardId={cardId} setModalVisible={setModalVisible} /> : null
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
        //     <div id="wrapper">

        //         <div id="effect">
        //             <p>Surprise You Got A Lottery!</p>
        //             <img src={curtain} id="curtain1" />
        //             <img src={curtain} id="curtain2" />
        //         </div>

        //         <div id="curtain_buttons">
        //             <input type="button" value="OPEN CURTAIN" onClick={() => open_curtain(0)} />
        //             <input type="button" value="CLOSE CURTAIN" onClick={() => close_curtain(0)} />
        //         </div>

        //     </div>
        // </div>
    );
}

export default Domain;