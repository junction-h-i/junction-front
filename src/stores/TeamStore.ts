import axios from 'axios';
import { action, computed, makeAutoObservable, runInAction } from 'mobx';
import { CardModel } from '../models/CardModel';
import { TeamModel } from '../models/TeamModel';
import { UserModel } from '../models/UserModel';
import { RootStore } from './RootStore';

export class TeamStore {
  rootStore: RootStore;
  team: TeamModel;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.team = new TeamModel();
    this.team.setUser(this.rootStore.userStore.user);
    makeAutoObservable(this, {
      teamname: computed,
      setTeamName: action,
      setGoalMinute: action,
      cardCount: computed,
      completedCardCount: computed,
      leftMinute: computed,
      completedCardList: computed,
      createTeam: action,
      join: action,
    });
  }

  get teamname(): string {
    return this.team.name;
  }

  setTeamName(name: string) {
    this.team.setName(name);
  }

  setUser(user: UserModel) {
    this.team.setUser(user);
  }

  setGoalMinute(time: number) {
    this.team.setGoalMinute(time);
  }

  get cardCount(): number {
    return this.team.cardCount;
  }

  get completedCardCount(): number {
    return this.team.completedCardCount;
  }

  get leftMinute(): number {
    return this.team.leftMinute;
  }

  get completedCardList(): CardModel[] {
    return this.team.completedCardList;
  }

  async createTeam(teamname: string, password: string) {
    const { data } = await axios.post('/team', { team_name: teamname, password: password, goal_minute: this.team.goalMinute });
    console.log(data);
    runInAction(() => {
      this.setTeamName(teamname);
      this.setUser(this.rootStore.userStore.user);
    });
  }

  async join(teamname: string, password: string) {
    const { data } = await axios.post(`/teams/${teamname}/join`, { password });
    await this.getTeamCardList();
    console.log(data);
    runInAction(() => {
      this.setTeamName(teamname);
      this.setUser(this.rootStore.userStore.user);
    });
  }

  async getTeamCardList() {
    const { data } = await axios.get('/cards', { params: { team_name: this.teamname } });
    console.log(data);
    runInAction(() => {
      data.cards.map((card: {
        card_id: number,
        goal_focus_minute: number,
        color: string,
        content: string,
        start_time: string,
        progress_status: 'TODO' | 'PROGRESS' | 'DONE',
        username: string
      }) => {
        const cardModel: CardModel = new CardModel(card.content, card.goal_focus_minute, card.color, card.goal_focus_minute > 0, card.progress_status, new Date(card.start_time).getTime(), card.card_id);
        const user: UserModel | undefined = this.team.userList.find((u: UserModel) => u.name === card.username);
        if (user) {
          user.addCard(cardModel);
        }
      });
    });
  }
}