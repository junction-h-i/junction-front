import React, { useEffect, useState } from 'react';
import { timeToText, TIME_TEXT } from '../../utils/TimeUtilities';
import './CardComponent.css';
import IconTime from '../../assets/imgs/icon_time.svg';
import IconCheck from '../../assets/imgs/icon_check.png';
import IconAddBig from '../../assets/imgs/icon_add_big.png';
import { CardModel } from '../../models/CardModel';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStore';

const Card: React.FC<{
  card: CardModel;
  zIndex?: number;
  rotate?: number;
}> = ({ card, zIndex, rotate }) => {
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(card.content);
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [writeTaskDone, setWriteTaskDone] = useState(false);
  const { userStore, cardStore } = useStores();
  const makeCard = () => {
    card.setIsInit(true);
    userStore.addCard(card);
  };

  useEffect(() => {
    setShowButton(task !== '');
  }, [task]);

  useEffect(() => {
    if (!cardStore.card.isInit) {
      setEdit(false);
      setTask('');
      setHour('');
      setMinute('');
      setShowButton(false);
      setWriteTaskDone(false);
    }
  }, [cardStore.card]);
  
  return (
    <div className="Card" style={{ backgroundColor: card.color, zIndex: zIndex, transform: `rotate(${rotate}deg)` }}>
      {card.isInit ? (
        <>
          <div className="card-header">
            <img src={IconTime} className="icon-time" alt="logo" /> 
            <span className="time">{timeToText(card.goalFocusMinute)}</span>
          </div>
          <div className="card-body">
            {card.content}
          </div>
        </>
      ) : (
        !edit ? (
          <>
            <button className="create create-center" onClick={() => setEdit(true)}>
              <img src={IconAddBig} alt="icon" />
            </button>
          </>
        ) : (
          <>
            {!writeTaskDone ? (
              <textarea rows={10} placeholder="Write your task" onChange={(e: any) => setTask(e.target.value)} />
            ) : (
              <div className="time-picker">
                <div>
                  <input type="number" placeholder="00" max={99} maxLength={2} value={hour} onChange={(e: any) => setHour((e.target.value))} />
                  <span className="time-text">{TIME_TEXT.HOUR}</span>
                </div>
                <div>
                  <input type="number" placeholder="00" max={59} maxLength={2} value={minute} onChange={(e: any) => setMinute((e.target.value))} />
                  <span className="time-text">{TIME_TEXT.MINUTE}</span>
                </div>
              </div>
            )}
            {showButton && <button className="create" onClick={writeTaskDone ? () => {
              card.setGoalFocusMinute(Number(hour) * 60 + Number(minute));
              makeCard();
            } : () => {
              card.setContent(task);
              setWriteTaskDone(true);
            }}>
              <img src={IconCheck} alt="icon" />
            </button>}
          </>
        )
      )}
    </div>
  );
};

export default observer(Card);
