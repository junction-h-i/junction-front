import { observer } from 'mobx-react-lite';
import React from 'react';
import { CardModel } from '../../models/CardModel';
import Card from '../CardComponent/CardComponent';
import './PlayerComponent.css';
import IconCheckWhite from '../../assets/imgs/icon_check_white.png';
import { UserModel } from '../../models/UserModel';

const Player: React.FC<{
  user: UserModel;
}> = ({ user }) => {
  return (
    <div className="Player">
      <div className="player-name">{user.name}</div>
      <div className="card-list">
        {user.cardList.map((card: CardModel, index: number) => (
          <Card key={index} card={card} zIndex={index + 10} rotate={Math.random() * 30 - 15} />
        ))}
      </div>
      <button className="ready">
        <img src={IconCheckWhite} alt="icon" />
      </button>
    </div>
  );
};

export default observer(Player);