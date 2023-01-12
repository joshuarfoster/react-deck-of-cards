import React, { useEffect, useState } from "react";
import CardDraw from "./CardDraw";
import Card from "./Card";
import axios from "axios";

function CardPile (){
    const [cards, setCards] = useState([])
    const [deckId, setDeckId] = useState('')
    const [alert, setAlert] =useState('')
    useEffect(function fetchDeckId() {
        async function fetchDeck() {
            const deckResult = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            setDeckId(deckResult['data']['deck_id'])
        }
        fetchDeck()
    }, [])
    const addCard = (code) => {
        setCards(prevCards => [...prevCards, code])
    }
    const showAlert = () => {
        setAlert('No Cards Remaining')
    }
    return(
        <div>
            <CardDraw addCard={addCard} deckId={deckId} showAlert={showAlert}/>
            <h3>{alert}</h3>
            <ul>
                {cards.map(card => (<li><Card code={card}/></li>))}
            </ul>
        </div>
    )
}

export default CardPile