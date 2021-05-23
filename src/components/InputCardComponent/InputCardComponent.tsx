import React, { useEffect, useState } from 'react';
import { CARD_COLOR } from '../../models/CardModel';
import './InputCardComponent.css';
import IconCheck from '../../assets/imgs/icon_check.png';
import IconCheckGray from '../../assets/imgs/icon_check_gray.png';
import IconBack from '../../assets/imgs/icon_back.png';
import { useStores } from '../../stores/RootStore';
import { useHistory } from 'react-router';
import { TIME_TEXT } from '../../utils/TimeUtilities';
import { observer } from 'mobx-react-lite';

const InputCard: React.FC<{
  type: 'signin' | 'signup' | 'join' | 'create' | 'time';
  title: string;
  color: CARD_COLOR | string;
  teamName?: string;
}> = ({ type, title, color, teamName }) => {
  const [name, setName] = useState(type === 'join' ? teamName : ''); // get from params
  const [password, setPassword] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const { userStore, teamStore } = useStores();
  const history = useHistory();

  const signin = () => {
    if (name && password) {
      userStore.signin(name, password);
    } else {
      alert('name or password invalid!');
    }
  };

  const signup = () => {
    if (name && password) {
      userStore.signup(name, password).then(() => history.replace('/login'));
    } else {
      alert('name or password invalid!');
    }
  };

  const join = () => {
    if (name && password) {
      teamStore.join(name, password);
    } else {
      alert('name or password invalid!');
    }
  };

  useEffect(() => {
    if (type === 'signin' && userStore.username) {
      setName(userStore.username);
    }
  }, [userStore.username]);

  useEffect(() => {
    if (type === 'create') {
      teamStore.setTeamName(name || '');
      teamStore.setTeamPassword(password || '');
    }
  }, [name, password]);

  useEffect(() => {
    if (type === 'time') {
      teamStore.setGoalMinute(Number(hour) * 60 + Number(minute));
    }
  }, [hour, minute]);

  return (
    <div className="Input-Card" style={{ backgroundColor: color }}>
      <div className="title" style={{color: (type === 'signup' ? 'black' : 'white')}}>{title}</div>
      {type !== 'time' ? (
        <>
          <input type="text" placeholder={(type === 'signup' || type === 'signin' ? 'User' : 'Team') + ' name'} value={name} disabled={type === 'join'} onChange={(e: any) => setName(e.target.value)} />
          <input type="password" placeholder={"Password"} value={password} onChange={(e: any) => setPassword(e.target.value)} />
          {type === 'signin' ? (
            <>
              <button className="signin" onClick={() => signin()}>
                <img src={IconCheck} alt="icon" />
              </button>
              <button className="signup" onClick={() => history.push('/signup')}>Sign up</button>
            </>
          ) : type === 'signup' ? (
            <>
              <div className="button-group">
                <button className="back" onClick={() => history.goBack()}>
                  <img src={IconBack} alt="icon" />
                </button>
                <button className="add" onClick={() => signup()}>
                  <img src={IconCheckGray} alt="icon" />
                </button>
              </div>
            </>
          ) : type === 'join' ? (
            <>
              <button className="join" onClick={() => join()}>
                <img src={IconCheck} alt="icon" />
              </button>
            </>
          ) : (
            <>
              <div style={{width: '100%', height: '33%'}}></div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="time-picker">
            <div>
              <input type="number" placeholder="00" max={99} maxLength={2} value={hour} onChange={(e: any) => setHour((e.target.value))} />
              <span className="time-text">{TIME_TEXT.HOUR}</span>
            </div>
            <div>
              <input type="number" placeholder="00" max={59} maxLength={2} value={minute} onChange={(e: any) => setMinute((e.target.value))} />
              <span className="time-text">{TIME_TEXT.MINUTE}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default observer(InputCard);