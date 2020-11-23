import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import { stackStyles } from "./config";
const MainNavigation = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <MainNavigation.Navigator
        headerMode="none"
        mode="modal"
        initialRouteName="TabNavigation"
        screenOptions={{
          headerStyle: { ...stackStyles },
          cardStyle: {
            backgroundColor: "red",
          },
        }}
      >
        <MainNavigation.Screen name="TabNavigation" component={TabNavigation} />
        <MainNavigation.Screen
          name="PhotoNavigation"
          component={PhotoNavigation}
        />
        <MainNavigation.Screen
          name="MessageNavigation"
          component={MessageNavigation}
        />
      </MainNavigation.Navigator>
    </NavigationContainer>
  );
};
