import React, { useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import './CreateTeamScreen.css';
import Card from "../../components/CardComponent/CardComponent";
import Header from "../../components/HeaderComponent/HeaderComponent";
import { useStores } from "../../stores/RootStore";
import { CardModel, CARD_COLOR } from "../../models/CardModel";
import InputCard from "../../components/InputCardComponent/InputCardComponent";

const CreateTeamScreen = () => {
  const { userStore, cardStore } = useStores();

  return (
    <div className="Create-Team">
      <Header description1={'How long will you play?'} description2={''} buttonText={'Start'} />
      <div className="add-team">
        <InputCard type="create" title="Create team" color={CARD_COLOR.BROWN} />
        <InputCard type="time" title="" color={CARD_COLOR.BROWN} />
      </div>
      <div className="card-list">
        {userStore.user.cardList.map((card: CardModel, index: number) => (
          <Card key={index} card={card} zIndex={1000 - index} />
        ))}
      </div>
    </div>
  );
};

export default observer(CreateTeamScreen);