import React, { useEffect } from "react";
import './SignupScreen.css';
import InputCard from "../../components/InputCardComponent/InputCardComponent";
import { CARD_COLOR } from "../../models/CardModel";
import Logo from "../../components/LogoComponent/LogoComponent";
import { useStores } from "../../stores/RootStore";
import { useHistory } from "react-router";
import { observer } from "mobx-react-lite";

const SignupScreen = () => {
  const { userStore } = useStores();
  const history = useHistory();

  return (
    <div className="Signup">
      <Logo />
      <InputCard type="signup" title="Create New Account" color={CARD_COLOR.WHITE} />
    </div>
  );
};

export default observer(SignupScreen);