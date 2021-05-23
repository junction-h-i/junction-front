import React from "react";
import './JoinTeamScreen.css';
import InputCard from "../../components/InputCardComponent/InputCardComponent";
import { CARD_COLOR } from "../../models/CardModel";
import Logo from "../../components/LogoComponent/LogoComponent";
import { useLocation, useParams } from "react-router";

const JoinTeamScreen = () => {
  const query = new URLSearchParams(useLocation().search);

  return (
    <div className="Join-Team">
      <Logo />
      <InputCard type="join" title="Be with team mates" color={CARD_COLOR.BROWN} teamName={query.get('name') || ''} />
    </div>
  );
};

export default JoinTeamScreen;