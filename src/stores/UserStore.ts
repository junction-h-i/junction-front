import axios from 'axios';
import { action, computed, makeAutoObservable, runInAction } from 'mobx';
import { CardModel } from '../models/CardModel';
import { UserModel } from '../models/UserModel';
import { RootStore } from './RootStore';

export default class UserStore {
  rootStore: RootStore;
  user: UserModel;
  accessToken: string = '';
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.user = new UserModel();

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) this.setAccessToken(accessToken);

    const username = localStorage.getItem('username');
    if (username) this.setUserName(username);

    makeAutoObservable(this, {
      username: computed,
      cardCount: computed,
      completedCardCount: computed,
      addCard: action,
      setAccessToken: action,
      signin: action,
      signup: action,
    });
  }

  get username(): string {
    return this.user.name;
  }

  get cardCount(): number {
    return this.user.cardCount;
  }
  
  get completedCardCount(): number {
    return this.user.completedCardCount;
  }

  async addCard(card: CardModel) {
    const { data } = await axios.post('/card', { content: card.content, goal_focus_minute: card.goalFocusMinute, color: card.color });
    console.log(data);
    runInAction(() => {
      card.setId(data.card_id);
      this.user.cardList.push(card);
    });
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('accessToken', token);
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  setUserName(username: string) {
    this.user.setName(username);
    localStorage.setItem('username', username);
  }

  get userId(): string {
    const { user_id } = JSON.parse(atob(this.accessToken.split('.')[1]));
    return user_id;
  }

  async signin(username: string, password: string) {
    const { data } = await axios.post('/signin', { username, password });
    console.log(data);
    runInAction(() => {
      this.setAccessToken(data.access_token);
      this.setUserName(username);
      console.log(username);
      this.getCardList(this.userId);
    });
  }

  async signup(username: string, password: string) {
    const { data } = await axios.post('/signup', { username, password });
    console.log(data);
    runInAction(() => {
      this.setUserName(username);
    });
  }

  async getCardList(userId: string) {
    const { data } = await axios.get('/cards', { params: { user_id: userId } });
    console.log(data);
    const cardList: CardModel[] = data.cards.map((card: {
      card_id: number,
      goal_focus_minute: number,
      color: string,
      content: string,
      start_time: string,
      progress_status: 'TODO' | 'PROGRESS' | 'DONE',
      username: string
    }) => new CardModel(card.content, card.goal_focus_minute, card.color, card.goal_focus_minute > 0, card.progress_status, new Date(card.start_time).getTime(), card.card_id));
    runInAction(() => {
      console.log(cardList);
      this.user.cardList = cardList;
    })
  }
}
