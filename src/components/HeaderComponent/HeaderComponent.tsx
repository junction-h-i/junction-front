import React from 'react';
import { useHistory } from 'react-router';
import { useStores } from '../../stores/RootStore';
import Logo from '../LogoComponent/LogoComponent';
import './HeaderComponent.css';

const Header: React.FC<{
  description1: string;
  description2: string;
  buttonText?: string;
}> = ({ description1, description2, buttonText }) => {
  const { teamStore } = useStores();
  const history = useHistory();
  return (
    <div className="Header">
      <Logo />
      <h1 className="description">{description1}</h1>
      <h1 className="description">{description2}</h1>
      {buttonText &&
        <button
          className="header-button"
          onClick={
            buttonText === 'Start' ? 
            () => teamStore.createTeam().then(() => history.replace('/game')) :
            () => history.replace('/create/team')}
        >{buttonText}</button>}
    </div>
  );
};

export default Header;