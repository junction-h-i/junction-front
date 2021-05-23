import { action, makeAutoObservable, observable } from 'mobx';
import { CardModel, CARD_COLOR } from '../models/CardModel';
import { RootStore } from './RootStore';

export default class CardStore {
  rootStore: RootStore;
  card: CardModel;
  color: CARD_COLOR | string;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.card = new CardModel('', 0, undefined, false);
    this.color = this.card.color;
    makeAutoObservable(this, {
      card: observable,
      resetCard: action,
    });
  }

  resetCard() {
    const colors: CARD_COLOR[] = [CARD_COLOR.RED, CARD_COLOR.GREEN, CARD_COLOR.BLUE, CARD_COLOR.PURPLE, CARD_COLOR.CYAN];
    let color = colors[Math.floor(Math.random() * 5)];
    while (color === this.color) {
      color = colors[Math.floor(Math.random() * 5)];
    }
    this.color = color;
    this.card = new CardModel('', 0, color, false);
  }
}
