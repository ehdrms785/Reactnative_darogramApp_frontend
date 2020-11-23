import React from "react";
import styled from "styled-components";
import constants from "../constants";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native-paper";
const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${constants.width / 1.7}px;
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const AuthButton = ({
  className,
  text,
  onPress,
  loading = false,
  bgColor = null,
}) => (
  <Touchable className={className} disabled={loading} onPress={onPress}>
    {/* disalbe={loading} 은 꼭 필요하진 않아보인다 
    이걸 하는 이유는 loading이 돌아가는 중에도 버튼이 클릭되는 문제 때문이였는데
    자동으로 disabled를 시켜주는 것 같다. */}
    <Container bgColor={bgColor}>
      {loading ? <ActivityIndicator color="white" /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
export default AuthButton;
