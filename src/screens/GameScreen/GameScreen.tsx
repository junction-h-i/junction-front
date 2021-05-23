import React, { useEffect, useState } from 'react';
import './GameScreen.css';
import NavBar from '../../components/NavBarComponent/NavBarComponent';
import Player from '../../components/PlayerComponent/PlayerComponent';
import { useStores } from '../../stores/RootStore';
import { UserModel } from '../../models/UserModel';
import Mine from '../../components/MineComponent/MineComponent';
import CardTable from '../../components/CardTableComponent/CardTableComponent';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router';

const GameScreen = () => {
  const { userStore, teamStore } = useStores();
  const [start, setStart] = useState(false);
  const [isMine, setIsMine] = useState(true);
  const [complete, setComplete] = useState(false);
  const history = useHistory();

  useEffect(() => {
    teamStore.setGameDate();
    setTimeout(() => setStart(true), 200);
  }, []);

  useEffect(() => {
    if (!teamStore.teamname) {
      history.replace('/create/team');
    }
  }, [teamStore.teamname]);

  useEffect(() => {
    if (userStore.completedCardCount === userStore.cardCount) {
      setIsMine(false);
    }
  }, [userStore.completedCardCount]);

  useEffect(() => {
    if (teamStore.completedCardCount > 0 && teamStore.cardCount === teamStore.completedCardCount) {
      setComplete(true);
    }
  }, [teamStore.completedCardCount]);

  return (
    <div className="Game">
      {!complete ? (
        <>
          <NavBar />
          {!start ? (
            <div className="player-list">
              {teamStore.team.userList.map((user: UserModel, index: number) => (
                <Player key={index} user={user} />
              ))}
            </div>
          ) : (
            <div className="game-board">
              <div className="radio-group" style={{position: isMine ? 'static' : 'absolute'}}>
                <button className="radio" style={{opacity: isMine ? 1 : 0.2}} onClick={() => setIsMine(true)}>Mine</button>
                <button className="radio" style={{opacity: isMine ? 0.2 : 1}} onClick={() => setIsMine(false)}>Card Table</button>
              </div>
              <div style={isMine ? {} : {display: 'none'}}>
                <Mine />
              </div>
              {!isMine && <CardTable />}
            </div>
          )}
        </>
      ) : (
        <div className="overlay">
          <div className="background-card">
            <div className="logo-big">uno</div>
            <div className="message">
              All done.
              <br />
              The world is your oyster.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(GameScreen);