/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthCredentialsDto = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  expiration: Scalars['Float'];
  id: Scalars['String'];
  token: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser: Scalars['Boolean'];
  login: AuthPayload;
  updateUser: User;
};


export type MutationCreateUserArgs = {
  newUserData: NewUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  input: AuthCredentialsDto;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  updateUserInput: UpdateUserInput;
};

export type NewUserInput = {
  bio: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user: User;
  users: Array<User>;
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryUsersArgs = {
  limit?: Scalars['Int'];
  page?: Scalars['Int'];
};

export type UpdateUserInput = {
  bio: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  online?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

/** user  */
export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  online: Scalars['Boolean'];
  password: Scalars['String'];
  username: Scalars['String'];
};
