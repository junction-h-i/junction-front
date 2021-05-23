import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { UserModel } from '../../models/UserModel';
import { useStores } from '../../stores/RootStore';
import { timeToText } from '../../utils/TimeUtilities';
import './NavBarComponent.css';

const NavBar: React.FC<{}> = () => {
  const { userStore, teamStore } = useStores();
  const colors: string[] = ['#C7B9FF', '#699BF7', '#FF8577'];

  useEffect(() => {
    const interval = setInterval(() => {
      teamStore.getTeamCardList();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="Navbar">
      <div className="nav-title">
        <div className="logo">uno</div>
        <div className="teamname">{teamStore.teamname}</div>
      </div>
      <div className="nav-status">
        <div className="status team-timer">
          <div className="label">Team Timer</div>
          <div className="info">{timeToText(teamStore.leftMinute)} left</div>
        </div>
        <div className="status team-completion">
          <div className="label">Team Completion</div>
          <div className="info">{teamStore.completedCardCount} of {teamStore.cardCount}</div>
        </div>
        <div className="status my-completion">
          <div className="label">My Completion</div>
          <div className="info">{userStore.completedCardCount} of {userStore.cardCount}</div>
        </div>
        <div className="status member">
          <div className="label">Member</div>
          <div className="info">
            {teamStore.team.userList.map((user: UserModel, index: number) => (
              <div key={index} className="member-icon" style={{backgroundColor: colors[index]}}>{user.name[0]}</div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default observer(NavBar);