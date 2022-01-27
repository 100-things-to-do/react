import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import $ from "jquery";
import "./Cardboard.css";
import curtain from './curtain.jpeg';
import { useMediaQuery } from 'react-responsive'

function Cardboard() {
    const [cards, setCards] = useState([])
    const token = useSelector(state => state.user.token)
    let rowIndex = 0
    let cardArray = []
    let tempCards = []
    let indexx = 0;
    const [curtainState, _setCurtainState] = useState({})
    const curtainStateRef = useRef(curtainState);
    const setCurtainState = (data) => {
        curtainStateRef.current = data;
        _setCurtainState(data);
    };

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

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
        let input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        setCurtainState(initCurtainState(input));
        renderCards(true, input);
    }, [])


    const renderCard = (curtainId, index) => {
        if (index !== 0 && index % 4 === 0) {
            tempCards.push(
                <div className="row mt-4" key={++rowIndex}>
                    {cardArray}
                </div>
            )
            cardArray = []
        }


        let curtain1Id = `curtain${indexx++}`;
        let curtain2Id = `curtain${indexx++}`;
        console.log(indexx);
        cardArray.push(
            <div id="wrapper" style={{ width: 500 }}>
                <div id="effect" style={{ width: 200 }} onClick={() => { openCloseCurtain(index * 2, setCurtainState) }}>
                    <p>{curtainId}</p>
                    <img src={curtain} alt={curtain1Id} id={curtain1Id} className="left-curtain" style={{ width: 100 }} />
                    <img src={curtain} alt={curtain2Id} id={curtain2Id} className="right-curtain" style={{ width: 100 }} />
                </div>
            </div>
        )




    }


    function renderCards(isSuccess, data) {
        if (isSuccess) {
            data.forEach(renderCard);
            if (cardArray !== []) {
                tempCards.push(
                    <div className="row mt-4" key={++rowIndex}>
                        {cardArray}
                    </div>
                )
            }
            setCards(tempCards)
        } else {
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
            $(curtain2).animate({ width: 191 }, 1000);
        }
    }




    return (
        <div className="p-4 mt-5" style={{ width: '80%' }}>
            {cards}
        </div>

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

export default Cardboard;