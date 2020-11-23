import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";
import TabNavigation from "../navigation/TabNavigation";
export default () => {
  // const isLoggedIn = false;
  const isLoggedIn = useIsLoggedIn();
  const logIn = useLogIn();
  const logOut = useLogOut();
  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </View>
  );
};
