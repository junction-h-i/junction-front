import React from 'react';
import axios from 'axios';
import CardStore from './CardStore';
import UserStore from './UserStore';
import { TeamStore } from './TeamStore';

export class RootStore {
  userStore: UserStore;
  cardStore: CardStore;
  teamStore: TeamStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.cardStore = new CardStore(this);
    this.teamStore = new TeamStore(this);
    axios.defaults.headers.common = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      'Cache-Control': 'no-cache',
      'Accept-Language': 'en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7;',
    };
    axios.defaults.baseURL = 'https://mbtxu9hdu0.execute-api.ap-northeast-2.amazonaws.com/Prod';
  }
}

const StoresContext = React.createContext(new RootStore());

// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);

// export default RootStore;
