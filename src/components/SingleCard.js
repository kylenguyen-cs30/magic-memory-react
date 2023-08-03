import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
    
    const handleClick = () => { //handling click
        if (!disabled) {
            handleChoice(card)
        }
        //handleChoice(card)
    }

    return (

        <div className="card" >
            <div className={flipped ? "flipped" : ""}> {/*1*/}

                <img className="front" src={card.src} alt="card front" />

                <img className="back" 
                src="/img/cover.png" 
                onClick={handleClick}  // Link back clickListener
                alt="cover" />
                
            </div>
        </div>
    )
}


/*
1: if flipped is true, that div will be applied flipped class
*/