import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import { useLogIn } from "../../AuthContext";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CONFIRM_SECRET, LOG_IN } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ route, navigation }) => {
  const confirmInput = useInput("");
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  console.log("route");
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: route.params.email,
    },
  });
  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || !value.includes(" ")) {
      return Alert.alert("Invalid secret");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret },
      } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        logIn(confirmSecret);
      } else {
        Alert.alert("Wrong secret!");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't confirm secret");
    } finally {
      setLoading(false);
    }
  };

  return (
    //TouchablewithoutFeedback을 사용하는 이유 : Input 화면 밖을 클릭했을때 포커스가 사라지게하기
    //What I use TouchablewithoutFeedback : For focus out when you click outside of Input position.
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <AuthButton text="Confirm" onPress={handleConfirm} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
