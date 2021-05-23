import React, { useEffect } from "react";
import './LoginScreen.css';
import InputCard from "../../components/InputCardComponent/InputCardComponent";
import { CARD_COLOR } from "../../models/CardModel";
import Logo from "../../components/LogoComponent/LogoComponent";
import { useHistory } from "react-router";
import { useStores } from "../../stores/RootStore";
import { observer } from "mobx-react-lite";

const LoginScreen = () => {
  const { userStore } = useStores();
  const history = useHistory();

  useEffect(() => {
    if (userStore.accessToken && userStore.username) {
      history.replace('/create/card');
    }
  }, [userStore.accessToken, userStore.username]);
  
  return (
    <div className="Login">
      <Logo />
      <InputCard type="signin" title="Welcome" color={CARD_COLOR.BLACK} />
    </div>
  );
};

export default observer(LoginScreen);