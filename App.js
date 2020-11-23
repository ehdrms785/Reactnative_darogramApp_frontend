import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { AsyncStorage, Text, TouchableOpacity, View } from "react-native";
import { InMemoryCache } from "@apollo/client/core";
import { persistCache } from "apollo-cache-persist";
import { ThemeProvider } from "styled-components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import apolloClientOptions from "./apollo";
import styles from "./styles";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";
import * as Facebook from "expo-facebook";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    // await AsyncStorage.clear();
    try {
      await Font.loadAsync(Ionicons.font);
      await Asset.loadAsync([require("./assets/instaLogo.png")]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        request: async (operation) => {
          const token = await AsyncStorage.getItem("jwt");
          return operation.setContext({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        },
        ...apolloClientOptions,
      });
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
