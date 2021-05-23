import React, { useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import './CardStatusComponent.css';
import { CardModel } from "../../models/CardModel";
import { timeToText } from "../../utils/TimeUtilities";

const CardStatus: React.FC<{
  card: CardModel;
}> = ({ card }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (card.goalFocusMinute > 0) {
      setProgress((card.goalFocusMinute - card.leftMinute) / card.goalFocusMinute);
    }
  }, [card.leftMinute]);

  return (
    <div className="Card-Status">
      <div className="time-text">{card.progressStatus === 'DONE' ? 'Done!' : timeToText(card.leftMinute) + ' left'}</div>
      <div className="progress">
        <div className="progress-active" style={{marginRight: card.progressStatus === 'DONE' ? 0 : progress * 254}}></div>
      </div>
    </div>
  );
};

export default observer(CardStatus);