import React, { useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import './CreateCardScreen.css';
import Card from "../../components/CardComponent/CardComponent";
import Header from "../../components/HeaderComponent/HeaderComponent";
import { useStores } from "../../stores/RootStore";
import { CardModel } from "../../models/CardModel";

const CreateCardScreen = () => {
  const { userStore, cardStore } = useStores();
  const [description1, setDescription1] = useState('Write a task you should complete ');
  const [description2, setDescription2] = useState('today on the card.');
  const [additionalCard, setAdditionalCard] = useState(userStore.cardCount > 0);
  const [headerButton, setHeaderButton] = useState('');

  useEffect(() => {
    if (userStore.cardCount === 0 && cardStore.card.content) {
      setDescription1('How long will this task take?');
      setDescription2('');
    }
  }, [cardStore.card.content]);

  useEffect(() => {
    if (userStore.cardCount === 1) {
      setDescription1('Ok, wish you succeed!');
      setTimeout(() => {
        setDescription1('Create tasks and');
        setDescription2(`clear them together ${userStore.username}!`);
        cardStore.resetCard();
        setAdditionalCard(true);
        setHeaderButton('Create Team');
      }, 3000);
    } else if (userStore.cardCount > 1) {
      setDescription1('Create tasks and');
      setDescription2(`clear them together ${userStore.username}!`);
      cardStore.resetCard();
      setAdditionalCard(true);
      setHeaderButton('Create Team');
    }
  }, [userStore.cardCount]);

  return (
    <div className="Create-Card">
      <Header description1={description1} description2={description2} buttonText={headerButton} />
      {additionalCard ? (
        <>
          <div className="add-card">
            <Card card={cardStore.card} />
          </div>
          <div className="card-list">
            {userStore.user.cardList.map((card: CardModel, index: number) => (
              <Card key={index} card={card} />
            ))}
          </div>
        </>
      ) : (
        <>
          <Card card={cardStore.card} />
        </>
      )}
    </div>
  );
};

export default observer(CreateCardScreen);