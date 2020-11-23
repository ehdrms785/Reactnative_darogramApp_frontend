import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CREATE_ACCOUNT, LOG_IN } from "./AuthQueries";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.lightGreyColor};
  border-style: solid;
`;

const GoogleContainer = styled.View`
  margin-top: 10px;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const emailInput = useInput("");
  const usernameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      username: usernameInput.value,
    },
  });
  const handleSignup = async () => {
    const { value: email } = emailInput;
    const { value: firstName } = firstNameInput;
    const { value: lastName } = lastNameInput;
    const { value: username } = usernameInput;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (firstName === "") {
      return Alert.alert("I need your name");
    }
    if (username === "") {
      return Alert.alert("Invalid username");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount === true) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
        return;
      } else {
        Alert.alert("Couldn't make account! Got Error!");
        // navigation.navigate("Signup", { email: value });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't create Account!");
    } finally {
      setLoading(false);
    }
  };
  const googleLogin = async () => {
    const GOOGLE_CLIENT_ID =
      "61437993835-permnft2278jhhaudhbqbsne8ll0devs.apps.googleusercontent.com";
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        // androidClientId: GOOGLE_CLIENT_ID,
        iosClientId: GOOGLE_CLIENT_ID,
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        console.log("result");
        console.log(result);
        const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        });
        const { email, given_name, familyName } = await user.json();
        updateFormData(email, given_name, familyName);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
      return { error: true };
    } finally {
      setLoading(false);
    }
  };
  const fbLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "2771284496465987",
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        const { email, first_name, last_name } = await response.text();
        updateFormData(email, first_name, last_name);
        setLoading(false);

        // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    } finally {
      Facebook.logOutAsync();
    }
  };

  const updateFormData = (email, firstName, lastName) => {
    emailInput.setValue(email);
    firstNameInput.setValue(firstName);
    lastNameInput.setValue(lastName);
    const [username] = email.split("@");
    usernameInput.setValue(username);
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <AuthInput
            {...firstNameInput}
            placeholder="First name"
            autoCapitalize="words"
          />
          <AuthInput
            {...lastNameInput}
            placeholder="Last name"
            autoCapitalize="words"
          />
          <AuthInput
            {...emailInput}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="send"
            autoCorrect={false}
          />
          <AuthInput
            {...usernameInput}
            placeholder="Username"
            returnKeyType="send"
            autoCorrect={false}
          />
          <AuthButton text="Log in" onPress={handleSignup} loading={loading} />
          <FBContainer>
            <AuthButton
              loading={false}
              onPress={fbLogin}
              text="Connect Facebook"
              bgColor={"#2D4DA7"}
            />
          </FBContainer>
          <GoogleContainer>
            <AuthButton
              loading={false}
              onPress={googleLogin}
              text="Connect Google"
              bgColor={"#EE1922"}
            />
          </GoogleContainer>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
