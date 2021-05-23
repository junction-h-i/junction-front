import React from 'react';
import { useHistory } from 'react-router';
import Logo from '../LogoComponent/LogoComponent';
import './HeaderComponent.css';

const Header: React.FC<{
  description1: string;
  description2: string;
  buttonText?: string;
}> = ({ description1, description2, buttonText }) => {
  const history = useHistory();
  return (
    <div className="Header">
      <Logo />
      <h1 className="description">{description1}</h1>
      <h1 className="description">{description2}</h1>
      {buttonText && <button className="header-button" onClick={() => history.replace(buttonText === 'Start' ? '' : '/create/team')}>{buttonText}</button>}
    </div>
  );
};

export default Header;