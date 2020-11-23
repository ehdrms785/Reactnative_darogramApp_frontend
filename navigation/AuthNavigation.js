import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthHome from "../screens/Auth/AuthHome";
import Signup from "../screens/Auth/Signup";
import Login from "../screens/Auth/Login";
import Confirm from "../screens/Auth/Confirm";
import React from "react";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="AuthHome">
        <Stack.Screen name="AuthHome" component={AuthHome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Confirm" component={Confirm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AuthNavigation;
