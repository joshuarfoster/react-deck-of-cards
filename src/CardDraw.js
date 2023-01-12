import React, {useState, useEffect} from "react";
import axios from "axios";

function CardDraw ({deckId, addCard, showAlert}) {
    const [toggle,setToggle] = useState(false)
    const handleToggle = () => {
        setToggle(!toggle)
    }
    useEffect(() => {
        let intervalId
        if (toggle) {
            intervalId = setInterval(async () => {
                async function getData() {
                    let card = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                    console.log(card)
                    if (card['data']['cards'].length !== 0) {
                        let cardCode = card['data']['cards'][0]['code']
                        return cardCode
                    }
                    else{
                        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                        return false
                    }
                }
                let code = await getData()
                if (!code) {
                    clearInterval(intervalId)
                    showAlert()
                }else {
                    addCard(code)
                }
            }, 1000)
        } else {
            clearInterval(intervalId)
        }

        return () => clearInterval(intervalId)
    }, [toggle])

    return (
        <div>
            <button onClick={handleToggle}>
                {toggle ? 'Stop Drawing' : 'Start Drawing'}
            </button>
        </div>
    )
}

export default CardDraw