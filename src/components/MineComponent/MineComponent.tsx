import React, { useState } from "react";
import { observer } from 'mobx-react-lite';
import './MineComponent.css';
import Card from "../../components/CardComponent/CardComponent";
import { useStores } from "../../stores/RootStore";
import { CardModel } from "../../models/CardModel";
import CardStatus from "../CardStatusComponent/CardStatusComponent";

const Mine: React.FC<{}> = () => {
  const { userStore } = useStores();
  const [description, setDescription] = useState('Select a card and start the task');
  const [clicked, setClicked] = useState(false);
  const [start, setStart] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleButton = async (card: CardModel) => {
    setClicked(true);
    setDescription('');
    await card.startCard();
    setTimeout(() => {
      setStart(true);
      setDescription('Each time you complete a task,\nthe card will enter the card pile.')
    }, 1000);
  };

  const done = async (card: CardModel, index: number) => {
    setDescription('');
    await card.doneCard();
    if (index < userStore.user.cardList.length - 1) {
      setTimeout(() => {
        setStart(false);
        setCurrentCardIndex(index + 1);
        setClicked(false);
      }, 500);
    }
  };

  return (
    <div className="Mine">
      <div className="description" style={start ? {marginLeft: 310, top: 100} : {}}>
        {userStore.user.cardList[currentCardIndex].progressStatus !== 'DONE' && description}
      </div>
      <div className="card-list">
        {userStore.user.cardList.map((card: CardModel, index: number) => (
          <div key={index} style={{top: index === currentCardIndex && clicked ? -85 : 0, opacity: card.progressStatus === 'DONE' ? 0 : 1, display: index < currentCardIndex ? 'none' : 'flex'}}>
            <div className="status">
              {index === currentCardIndex && clicked && card.progressStatus !== 'TODO' && (
                <CardStatus card={card} />
              )}
            </div>
            <button className="card-button" disabled={index !== currentCardIndex || clicked} onClick={() => handleButton(card)} >
              <Card card={card} />
            </button>
            {index === currentCardIndex && clicked ? (
              <>
                {!start ? (
                  <div className="start-text">Start!</div>
                ) : (
                  <button className="done-button" onClick={() => done(card, index)}>Done!</button>
                )}
              </>
            ) : (<></>)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Mine);