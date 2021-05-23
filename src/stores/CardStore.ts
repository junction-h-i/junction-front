import { action, makeAutoObservable, observable } from 'mobx';
import { CardModel } from '../models/CardModel';
import { RootStore } from './RootStore';

export default class CardStore {
  rootStore: RootStore;
  card: CardModel;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.card = new CardModel('', 0, undefined, false);
    makeAutoObservable(this, {
      card: observable,
      resetCard: action,
    });
  }

  resetCard() {
    this.card = new CardModel('', 0, undefined, false);
  }
}
