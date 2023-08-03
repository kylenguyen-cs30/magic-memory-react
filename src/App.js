
import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png ", matched: false },
  { "src": "/img/scroll-1.png ", matched: false },
  { "src": "/img/shield-1.png ", matched: false },
  { "src": "/img/sword-1.png ", matched: false }
]


function App() {
  const [cards, setCards] = useState([])    
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  
  
  //shuffle cards for new game
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages] //making two set of cards
      .sort(() => Math.random() - 0.5)                  //randomized the order 
      .map((card) => ({ ...card, id: Math.random() }))  //map the card the layout

    setChoiceOne(null)    // reset choice 
    setChoiceTwo(null)
    setCards(shuffleCards);
    setTurns(0)
  }

  // handle a choice 
  /*
      if(choiceOne != null){
        setChoiceTwo(card)
      }else{
        setChoiceOne(card)
      }
    */
  const handleChoice = (card) => { //SingleCard.js commponent
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true) // this code stop player from messing up the program


      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {      //map the correct card to the array. 
            if (card.src === choiceOne.src) { //if both cards are actually have the same path
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])


  console.log(cards)




  // reset choice & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automatically

  useEffect(() => {
    shuffleCards()
  },[])



  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      {/* grid layout */}
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched} //2
            disabled={disabled}
          />
        ))}
      </div>

      <p> Turns : {turns}</p>

    </div>
  );
}

export default App;







/*
SHUFFLE CARDS

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
  }

* this fucntion will shuffle cards and map them onto the web browser.
* const shuffleCards = [...cardImages, ...cardImages] this is an array and 

CARD GRID

<div className="card-grid">
        {cards.map(card =>( //getting card from cards state
          <div className="card" key={card.id}>
            <div>
              <img className="front" src={card.src} alt="card front"/>
              <img className="back" src="/img/cover.png" alt="card back"/>
            </div>
          </div>
        ))}
      </div>



2 : if two cards is equal then this flipped is true otherwise is incorrect




*/


