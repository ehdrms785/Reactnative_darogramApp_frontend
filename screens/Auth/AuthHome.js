import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import constants from "../../constants";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

const Text = styled.Text``;

const Image = styled.Image`
  width: ${constants.width / 2.5}px;
  height: 130px;
  margin-bottom: 0px;
`;

const Touchable = styled.TouchableOpacity``;
const SignUpBtn = styled.View`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  margin-bottom: 25px;
  border-radius: 4px;
  width: ${constants.width / 2}px;
`;
const SignUpBtnText = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const LoginLink = styled.View`
  margin-top: 25px;
`;

const LoginLinkText = styled.Text`
  color: ${(props) => props.theme.blueColor};
`;

export default ({ navigation }) => (
  <View>
    <Image
      resizeMode={"contain"}
      source={require("../../assets/instaLogo.png")}
    />
    <AuthButton
      text={"Create New Account"}
      onPress={() => navigation.navigate("Signup")}
    />
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>Log in</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);
