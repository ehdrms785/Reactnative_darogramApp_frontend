import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $email: String!
    $username: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
    )
  }
`;
