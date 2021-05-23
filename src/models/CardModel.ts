import axios from "axios";
import { action, computed, makeAutoObservable, runInAction } from "mobx";

export enum CARD_COLOR {
  RED = '#FF6677',
  GREEN = '#0F7C83',
  BLUE = '#189DF0',
  PURPLE = '#682FED',
  CYAN = '#09BAAB',
  BLACK = '#000000',
  WHITE = '#FFFFFF',
  BROWN = '#584848',
};

export class CardModel {
  id: number = -1;
  content: string;
  goalFocusMinute: number;
  color: CARD_COLOR | string;
  isInit: boolean = true;
  progressStatus: 'TODO' | 'PROGRESS' | 'DONE' = 'TODO';
  startTime: number = 0;
  constructor(content: string, goalFocusMinute: number, color?: CARD_COLOR | string, isInit?: boolean, progressStatus?: 'TODO' | 'PROGRESS' | 'DONE', startTime?: number, id?: number) {
    this.content = content;
    this.goalFocusMinute = goalFocusMinute;
    if (color !== undefined) this.color = color;
    else {
      const colors: CARD_COLOR[] = [CARD_COLOR.RED, CARD_COLOR.GREEN, CARD_COLOR.BLUE, CARD_COLOR.PURPLE, CARD_COLOR.CYAN];
      this.color = colors[Math.floor(Math.random() * 5)];
    }
    if (isInit !== undefined) this.isInit = isInit;
    if (progressStatus !== undefined) this.progressStatus = progressStatus;
    if (startTime !== undefined) this.startTime = startTime;
    if (id !== undefined) this.id = id;
    makeAutoObservable(this, {
      setId: action,
      setContent: action,
      setGoalFocusMinute: action,
      setColor: action,
      setIsInit: action,
      setProgressStatus: action,
      setStartTime: action,
      leftMinute: computed,
      startCard: action,
    });
  }

  setId(id: number) {
    this.id = id;
  }

  setContent(content: string) {
    this.content = content;
  }

  setGoalFocusMinute(time: number) {
    this.goalFocusMinute = time;
  }

  setColor(color: CARD_COLOR) {
    this.color = color;
  }

  setIsInit(isInit: boolean) {
    this.isInit = isInit;
  }

  setProgressStatus(progressStatus: 'TODO' | 'PROGRESS' | 'DONE') {
    this.progressStatus = progressStatus;
  }

  setStartTime(startTime: number) {
    this.startTime = startTime;
  }

  get leftMinute(): number {
    return this.goalFocusMinute - Math.floor((Date.now() - this.startTime) / 60000);
  }

  async startCard() {
    const { data } = await axios.post(`/cards/${this.id}/start`);
    console.log(data);
    runInAction(() => {
      this.setStartTime(Date.now());
      this.setProgressStatus('PROGRESS');
    });
  }

  async doneCard() {
    const { data } = await axios.post(`/cards/${this.id}/done`);
    console.log(data);
    runInAction(() => {
      this.setProgressStatus('DONE');
    });
  }
};