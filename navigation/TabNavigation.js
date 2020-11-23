import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import { View, Text, Image, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import { color } from "react-native-reanimated";
import styles from "../styles";
import { stackStyles, cardStyles } from "./config";
const TabNavigation = createBottomTabNavigator();
const Stack = createStackNavigator();

const stackFactory = (initialRoute, name, customConfig) => (
  <Stack.Navigator>
    <Stack.Screen
      name={name}
      component={initialRoute}
      options={{
        ...customConfig,
        headerStyle: { ...stackStyles },
        cardStyle: { ...cardStyles },
      }}
    />
  </Stack.Navigator>
);
export default () => (
  <TabNavigation.Navigator
    tabBarOptions={{
      tabStyle: {
        justifyContent: "center",
        backgroundColor: "#EFEEEF",
      },
      style: {
        backgroundColor: "#FAFAFA",
      },
      showLabel: false,
    }}
  >
    <TabNavigation.Screen
      name="Home"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            size={28}
          />
        ),
      }}
    >
      {() =>
        stackFactory(Home, "Home", {
          headerRight: () => <MessagesLink />,
          headerTitle: <NavIcon name="logo-instagram" size={38} />,
        })
      }
    </TabNavigation.Screen>

    <TabNavigation.Screen
      name="Search"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-search" : "md-search"}
            size={28}
          />
        ),
      }}
    >
      {() =>
        stackFactory(Search, "Search", {
          title: "Search",
        })
      }
    </TabNavigation.Screen>
    <TabNavigation.Screen
      listeners={({ navigation, route }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate("PhotoNavigation");
          // console.log("Add");
        },
      })}
      name="Add"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
            size={36}
          />
        ),
      }}
      component={View}
    />
    <TabNavigation.Screen
      name="Notification"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={
              Platform.OS === "ios"
                ? focused
                  ? "ios-heart"
                  : "ios-heart-empty"
                : focused
                ? "md-heart"
                : "md-heart-empty"
            }
            size={28}
          />
        ),
      }}
    >
      {() =>
        stackFactory(Search, "Notification", {
          title: "Notification",
        })
      }
    </TabNavigation.Screen>
    <TabNavigation.Screen
      name="Profile"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            size={28}
          />
        ),
      }}
    >
      {() =>
        stackFactory(Search, "Profile", {
          title: "Profile",
        })
      }
    </TabNavigation.Screen>
  </TabNavigation.Navigator>
);
