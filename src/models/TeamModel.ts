import { action, computed, makeAutoObservable } from 'mobx';
import { CardModel, CARD_COLOR } from './CardModel';
import { UserModel } from './UserModel';

export class TeamModel {
  name: string = '';
  userList: UserModel[] = [];
  goalMinute: number = 0;
  gameDate: number = 0;
  password: string = '';
  constructor() {
    this.userList = [];
    makeAutoObservable(this, {
      setName: action,
      setPassword: action,
      setUser: action,
      setGoalMinute: action,
      setGameDate: action,
      cardCount: computed,
      completedCardCount: computed,
      leftMinute: computed,
      completedCardList: computed,
    });
  }

  setName(name: string) {
    this.name = name;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setUser(user: UserModel) {
    if (!this.userList.some((u: UserModel) => u.name === user.name)) {
      this.userList.push(user);
    }
  }

  setGoalMinute(time: number) {
    this.goalMinute = time;
  }

  setGameDate() {
    this.gameDate = Date.now();
  }

  get cardCount(): number {
    return this.userList.map((user: UserModel) => user.cardCount).reduce((acc: number, curr: number) => acc + curr);
  }

  get completedCardCount(): number {
    return this.userList.map((user: UserModel) => user.completedCardCount).reduce((acc: number, curr: number) => acc + curr);
  }

  get leftMinute(): number {
    return this.goalMinute - Math.floor((Date.now() - this.gameDate) / 60000);
  }

  get completedCardList(): CardModel[] {
    return this.userList.map((user: UserModel) => user.completedCardList).reduce((acc: CardModel[], curr: CardModel[]) => acc.concat(curr));
  }
};