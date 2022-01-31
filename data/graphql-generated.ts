// NOTE: This file is auto-generated via `yarn codegen` - DO NOT EDIT DIRECTLY!\n
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
  /** Date custom scalar type */
  Date: any;
};

export type Echo = {
  __typename?: 'Echo';
  exampleField: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  createUser?: Maybe<User>;
  login?: Maybe<Scalars['String']>;
};

export type MutationCreateUserArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
};

export type MutationLoginArgs = {
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  echoExample?: Maybe<Echo>;
  fetchUser?: Maybe<User>;
  hello?: Maybe<Scalars['String']>;
};

export type QueryEchoExampleArgs = {
  str: Scalars['String'];
};

export type QueryFetchUserArgs = {
  id: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  username: Scalars['String'];
};

export type HelloAndEchoQueriesQueryVariables = Exact<{
  str: Scalars['String'];
}>;

export type HelloAndEchoQueriesQuery = {
  __typename?: 'Query';
  hello?: string | null | undefined;
  echoExample?: { __typename?: 'Echo'; exampleField: string } | null | undefined;
};
