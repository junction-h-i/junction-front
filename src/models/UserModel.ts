import axios from 'axios';
import { action, computed, makeAutoObservable } from 'mobx';
import { CardModel, CARD_COLOR } from './CardModel';

export class UserModel {
  name: string = '';
  cardList: CardModel[] = [];
  constructor(name?: string, cardList?: CardModel[]) {
    if (name !== undefined) this.name = name;
    if (cardList !== undefined) this.cardList = cardList;
    makeAutoObservable(this, {
      cardCount: computed,
      completedCardCount: computed,
      completedCardList: computed,
      setName: action,
      addCard: action,
      setCardList: action,
    });
  }

  get cardCount(): number {
    return this.cardList.length;
  }

  get completedCardCount(): number {
    return this.cardList.filter((card: CardModel) => card.progressStatus === 'DONE').length;
  }

  get completedCardList(): CardModel[] {
    return this.cardList.filter((card: CardModel) => card.progressStatus === 'DONE');
  }

  setName(name: string) {
    this.name = name;
  }

  addCard(card: CardModel) {
    if (!this.cardList.some((c: CardModel) => c.id !== -1 && c.id === card.id)) {
      this.cardList.push(card);
    }
  }

  setCardList(cardList: CardModel[]) {
    this.cardList = cardList;
  }
};