import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { RefreshControl, ScrollView } from "react-native";
import styled from "styled-components";
import Loader from "../components/Loader";
const FEED_QUERY = gql`
  query seeFeed($startPoint: Int) {
    seeFeed(startPoint: $startPoint) {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY, {
    variables: {
      startPoint: 0,
    },
  });
  const refreshFunc = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  console.log(loading, data);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshFunc} />
      }
    >
      {loading ? <Loader /> : <Text>Hello</Text>}
    </ScrollView>
  );
};
