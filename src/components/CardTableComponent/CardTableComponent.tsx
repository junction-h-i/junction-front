import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import './CardTableComponent.css';
import { useStores } from '../../stores/RootStore';
import { CardModel } from '../../models/CardModel';
import Card from '../CardComponent/CardComponent';

const CardTable: React.FC<{}> = () => {
  const { teamStore } = useStores();
  const [init, setInit] = useState(false);
  const [progress, setProgress] = useState(0);
  const randomPosition = () => {
    const marginTop = Math.random() * 30 - 12;
    const marginLeft = Math.random() * 50 - 25;
    return {marginTop: `${marginTop}vh`, marginLeft: `${marginLeft}vw`}
  };

  useEffect(() => {
    setTimeout(() => setInit(true), 100);
  }, []);

  useEffect(() => {
    setProgress(teamStore.completedCardCount / teamStore.cardCount);
  }, [teamStore.completedCardCount]);

  return (
    <div className="Card-Table">
      <div className="progress">
        <div className="progress-active" style={{marginRight: (1 - progress) * 328}}>
          <div className="progress-percent">{Math.floor(progress * 100)}%</div>
        </div>
      </div>
      {teamStore.completedCardList.map((card: CardModel, index: number) => (
        <div key={index} style={init ? randomPosition() : {}}>
          <Card key={index} card={card} zIndex={index + 10} rotate={Math.random() * 90 - 45} />
        </div>
      ))}
    </div>
  );
};

export default observer(CardTable);