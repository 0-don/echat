import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: Date;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['Float'];
  message: Scalars['String'];
  name: Scalars['String'];
};


export type Dropdown = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type EmailUsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['Int'];
  type: Scalars['String'];
  url: Scalars['String'];
  publicId: Scalars['String'];
  userId: Scalars['Int'];
  user: User;
};


export type Language = {
  __typename?: 'Language';
  id: Scalars['Int'];
  name: Scalars['String'];
  userId: Scalars['Int'];
  user: User;
};

export type ListValues = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeUserType: Scalars['Boolean'];
  updateMe?: Maybe<Scalars['Boolean']>;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  deleteAllImages: Scalars['Boolean'];
  multipleUpload: Array<Image>;
  deleteImage: Scalars['Boolean'];
  switchUserServiceStatus: Scalars['Boolean'];
  upsertUserService: Scalars['Boolean'];
  deleteUserService: Scalars['Boolean'];
  createChat: Chat;
};


export type MutationUpdateMeArgs = {
  options: UpdatedUser;
};


export type MutationRegisterArgs = {
  options: EmailUsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationMultipleUploadArgs = {
  files: Array<Scalars['Upload']>;
  type: Scalars['String'];
};


export type MutationDeleteImageArgs = {
  publicId: Scalars['String'];
};


export type MutationSwitchUserServiceStatusArgs = {
  id: Scalars['Int'];
};


export type MutationUpsertUserServiceArgs = {
  options: UpsertUserService;
};


export type MutationDeleteUserServiceArgs = {
  id: Scalars['Int'];
};


export type MutationCreateChatArgs = {
  message: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getUsers?: Maybe<Array<User>>;
  me?: Maybe<User>;
  allImages?: Maybe<Array<Image>>;
  userImages?: Maybe<Array<Image>>;
  getAllServices?: Maybe<Array<Service>>;
  getService?: Maybe<Service>;
  getMeUserService?: Maybe<Array<UserService>>;
  filterUserService?: Maybe<Array<UserService>>;
  getChats: Array<Chat>;
};


export type QueryUserImagesArgs = {
  type?: Maybe<Scalars['String']>;
};


export type QueryGetServiceArgs = {
  id: Scalars['Int'];
};


export type QueryFilterUserServiceArgs = {
  slug: Scalars['String'];
};

export type Schedule = {
  __typename?: 'Schedule';
  id: Scalars['Int'];
  name: Scalars['String'];
  from: Scalars['DateTime'];
  to: Scalars['DateTime'];
  available: Scalars['Boolean'];
  userId: Scalars['Int'];
  user: User;
};

export type ScheduleValues = {
  id: Scalars['Int'];
  name: Scalars['String'];
  from: Scalars['DateTime'];
  to: Scalars['DateTime'];
  available: Scalars['Boolean'];
};

export type Service = {
  __typename?: 'Service';
  id: Scalars['Int'];
  type: Scalars['String'];
  igdbId?: Maybe<Scalars['Int']>;
  twitchId?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  popularity: Scalars['Int'];
  boxArtUrl: Scalars['String'];
  first_release_date?: Maybe<Scalars['DateTime']>;
  platforms?: Maybe<Scalars['JSON']>;
  genres?: Maybe<Scalars['JSON']>;
  multiplayer_modes?: Maybe<Scalars['JSON']>;
  images?: Maybe<Array<ServiceImage>>;
  userService?: Maybe<UserService>;
};

export type ServiceImage = {
  __typename?: 'ServiceImage';
  id: Scalars['Int'];
  type: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  serviceId: Scalars['Int'];
  service: Service;
  userService: UserService;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageSent: Chat;
};

export type UpdatedUser = {
  username: Scalars['String'];
  description: Scalars['String'];
  age: Scalars['DateTime'];
  gender: Scalars['String'];
  country: Scalars['String'];
  discord: Scalars['String'];
  twitter: Scalars['String'];
  facebook: Scalars['String'];
  snapchat: Scalars['String'];
  instagram: Scalars['String'];
  twitch: Scalars['String'];
  steam: Scalars['String'];
  tiktok: Scalars['String'];
  languages: Array<ListValues>;
  schedules: Array<ScheduleValues>;
};


export type UpsertUserService = {
  serviceId: Scalars['Int'];
  level?: Maybe<Scalars['String']>;
  platforms?: Maybe<Array<Dropdown>>;
  description?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  per: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  type?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  email: Scalars['String'];
  lastOnline: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  snapchat?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  twitch?: Maybe<Scalars['String']>;
  steam?: Maybe<Scalars['String']>;
  tiktok?: Maybe<Scalars['String']>;
  languages?: Maybe<Array<Language>>;
  images?: Maybe<Array<Image>>;
  services?: Maybe<Array<UserService>>;
  schedules?: Maybe<Array<Schedule>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserService = {
  __typename?: 'UserService';
  id: Scalars['Int'];
  status: Scalars['Boolean'];
  level: Scalars['String'];
  platforms?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  per: Scalars['String'];
  userId: Scalars['Int'];
  user: User;
  serviceId: Scalars['Int'];
  service: Service;
  images?: Maybe<Array<ServiceImage>>;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'type' | 'username' | 'gender' | 'country' | 'age' | 'lastOnline' | 'description' | 'discord' | 'twitter' | 'facebook' | 'snapchat' | 'instagram' | 'twitch' | 'steam' | 'tiktok'>
  & { languages?: Maybe<Array<(
    { __typename?: 'Language' }
    & Pick<Language, 'id' | 'name'>
  )>>, schedules?: Maybe<Array<(
    { __typename?: 'Schedule' }
    & Pick<Schedule, 'id' | 'name' | 'from' | 'to' | 'available'>
  )>> }
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ChangeUserTypeMutationVariables = Exact<{ [key: string]: never; }>;


export type ChangeUserTypeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeUserType'>
);

export type DeleteImageMutationVariables = Exact<{
  publicId: Scalars['String'];
}>;


export type DeleteImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteImage'>
);

export type DeleteUserServiceMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserServiceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUserService'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MultipleUploadMutationVariables = Exact<{
  files: Array<Scalars['Upload']> | Scalars['Upload'];
  type: Scalars['String'];
}>;


export type MultipleUploadMutation = (
  { __typename?: 'Mutation' }
  & { multipleUpload: Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'type' | 'url' | 'publicId'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  options: EmailUsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type SwitchUserServiceStatusMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SwitchUserServiceStatusMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'switchUserServiceStatus'>
);

export type UpdateMeMutationVariables = Exact<{
  options: UpdatedUser;
}>;


export type UpdateMeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateMe'>
);

export type UpsertUserServiceMutationVariables = Exact<{
  options: UpsertUserService;
}>;


export type UpsertUserServiceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'upsertUserService'>
);

export type FilterUserServiceQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type FilterUserServiceQuery = (
  { __typename?: 'Query' }
  & { filterUserService?: Maybe<Array<(
    { __typename?: 'UserService' }
    & Pick<UserService, 'id' | 'status' | 'level' | 'platforms' | 'description' | 'price' | 'per'>
    & { images?: Maybe<Array<(
      { __typename?: 'ServiceImage' }
      & Pick<ServiceImage, 'id' | 'type' | 'url'>
    )>>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'age' | 'gender' | 'country' | 'lastOnline'>
      & { images?: Maybe<Array<(
        { __typename?: 'Image' }
        & Pick<Image, 'id' | 'type' | 'url'>
      )>> }
    ) }
  )>> }
);

export type GetAllServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllServicesQuery = (
  { __typename?: 'Query' }
  & { getAllServices?: Maybe<Array<(
    { __typename?: 'Service' }
    & Pick<Service, 'id' | 'type' | 'name' | 'slug' | 'popularity' | 'boxArtUrl' | 'first_release_date' | 'genres' | 'platforms' | 'multiplayer_modes'>
    & { images?: Maybe<Array<(
      { __typename?: 'ServiceImage' }
      & Pick<ServiceImage, 'id' | 'type' | 'url' | 'width' | 'height'>
    )>> }
  )>> }
);

export type GetMeUserServiceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeUserServiceQuery = (
  { __typename?: 'Query' }
  & { getMeUserService?: Maybe<Array<(
    { __typename?: 'UserService' }
    & Pick<UserService, 'id' | 'status' | 'serviceId' | 'level' | 'platforms' | 'description' | 'price' | 'per'>
    & { service: (
      { __typename?: 'Service' }
      & Pick<Service, 'id' | 'igdbId' | 'twitchId' | 'name' | 'popularity' | 'boxArtUrl' | 'first_release_date' | 'platforms' | 'genres' | 'multiplayer_modes'>
    ) }
  )>> }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'type' | 'username' | 'gender' | 'country' | 'age' | 'description' | 'discord' | 'twitter' | 'facebook' | 'snapchat' | 'instagram' | 'twitch' | 'steam' | 'tiktok'>
    & { images?: Maybe<Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'url'>
    )>>, languages?: Maybe<Array<(
      { __typename?: 'Language' }
      & Pick<Language, 'id' | 'name'>
    )>>, schedules?: Maybe<Array<(
      { __typename?: 'Schedule' }
      & Pick<Schedule, 'id' | 'name' | 'from' | 'to' | 'available'>
    )>> }
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'type' | 'username' | 'gender' | 'country' | 'age' | 'lastOnline' | 'description' | 'discord' | 'twitter' | 'facebook' | 'snapchat' | 'instagram' | 'twitch' | 'steam' | 'tiktok'>
    & { languages?: Maybe<Array<(
      { __typename?: 'Language' }
      & Pick<Language, 'id' | 'name'>
    )>>, schedules?: Maybe<Array<(
      { __typename?: 'Schedule' }
      & Pick<Schedule, 'id' | 'name' | 'from' | 'to' | 'available'>
    )>> }
  )> }
);

export type UserImagesQueryVariables = Exact<{
  type?: Maybe<Scalars['String']>;
}>;


export type UserImagesQuery = (
  { __typename?: 'Query' }
  & { userImages?: Maybe<Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'type' | 'url' | 'publicId'>
  )>> }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  type
  username
  gender
  country
  age
  lastOnline
  description
  discord
  twitter
  facebook
  snapchat
  instagram
  twitch
  steam
  tiktok
  languages {
    id
    name
  }
  schedules {
    id
    name
    from
    to
    available
  }
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeUserTypeDocument = gql`
    mutation ChangeUserType {
  changeUserType
}
    `;
export type ChangeUserTypeMutationFn = Apollo.MutationFunction<ChangeUserTypeMutation, ChangeUserTypeMutationVariables>;

/**
 * __useChangeUserTypeMutation__
 *
 * To run a mutation, you first call `useChangeUserTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserTypeMutation, { data, loading, error }] = useChangeUserTypeMutation({
 *   variables: {
 *   },
 * });
 */
export function useChangeUserTypeMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUserTypeMutation, ChangeUserTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUserTypeMutation, ChangeUserTypeMutationVariables>(ChangeUserTypeDocument, options);
      }
export type ChangeUserTypeMutationHookResult = ReturnType<typeof useChangeUserTypeMutation>;
export type ChangeUserTypeMutationResult = Apollo.MutationResult<ChangeUserTypeMutation>;
export type ChangeUserTypeMutationOptions = Apollo.BaseMutationOptions<ChangeUserTypeMutation, ChangeUserTypeMutationVariables>;
export const DeleteImageDocument = gql`
    mutation DeleteImage($publicId: String!) {
  deleteImage(publicId: $publicId)
}
    `;
export type DeleteImageMutationFn = Apollo.MutationFunction<DeleteImageMutation, DeleteImageMutationVariables>;

/**
 * __useDeleteImageMutation__
 *
 * To run a mutation, you first call `useDeleteImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteImageMutation, { data, loading, error }] = useDeleteImageMutation({
 *   variables: {
 *      publicId: // value for 'publicId'
 *   },
 * });
 */
export function useDeleteImageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteImageMutation, DeleteImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteImageMutation, DeleteImageMutationVariables>(DeleteImageDocument, options);
      }
export type DeleteImageMutationHookResult = ReturnType<typeof useDeleteImageMutation>;
export type DeleteImageMutationResult = Apollo.MutationResult<DeleteImageMutation>;
export type DeleteImageMutationOptions = Apollo.BaseMutationOptions<DeleteImageMutation, DeleteImageMutationVariables>;
export const DeleteUserServiceDocument = gql`
    mutation DeleteUserService($id: Int!) {
  deleteUserService(id: $id)
}
    `;
export type DeleteUserServiceMutationFn = Apollo.MutationFunction<DeleteUserServiceMutation, DeleteUserServiceMutationVariables>;

/**
 * __useDeleteUserServiceMutation__
 *
 * To run a mutation, you first call `useDeleteUserServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserServiceMutation, { data, loading, error }] = useDeleteUserServiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserServiceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserServiceMutation, DeleteUserServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserServiceMutation, DeleteUserServiceMutationVariables>(DeleteUserServiceDocument, options);
      }
export type DeleteUserServiceMutationHookResult = ReturnType<typeof useDeleteUserServiceMutation>;
export type DeleteUserServiceMutationResult = Apollo.MutationResult<DeleteUserServiceMutation>;
export type DeleteUserServiceMutationOptions = Apollo.BaseMutationOptions<DeleteUserServiceMutation, DeleteUserServiceMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MultipleUploadDocument = gql`
    mutation MultipleUpload($files: [Upload!]!, $type: String!) {
  multipleUpload(files: $files, type: $type) {
    id
    type
    url
    publicId
  }
}
    `;
export type MultipleUploadMutationFn = Apollo.MutationFunction<MultipleUploadMutation, MultipleUploadMutationVariables>;

/**
 * __useMultipleUploadMutation__
 *
 * To run a mutation, you first call `useMultipleUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMultipleUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [multipleUploadMutation, { data, loading, error }] = useMultipleUploadMutation({
 *   variables: {
 *      files: // value for 'files'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useMultipleUploadMutation(baseOptions?: Apollo.MutationHookOptions<MultipleUploadMutation, MultipleUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MultipleUploadMutation, MultipleUploadMutationVariables>(MultipleUploadDocument, options);
      }
export type MultipleUploadMutationHookResult = ReturnType<typeof useMultipleUploadMutation>;
export type MultipleUploadMutationResult = Apollo.MutationResult<MultipleUploadMutation>;
export type MultipleUploadMutationOptions = Apollo.BaseMutationOptions<MultipleUploadMutation, MultipleUploadMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: EmailUsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SwitchUserServiceStatusDocument = gql`
    mutation SwitchUserServiceStatus($id: Int!) {
  switchUserServiceStatus(id: $id)
}
    `;
export type SwitchUserServiceStatusMutationFn = Apollo.MutationFunction<SwitchUserServiceStatusMutation, SwitchUserServiceStatusMutationVariables>;

/**
 * __useSwitchUserServiceStatusMutation__
 *
 * To run a mutation, you first call `useSwitchUserServiceStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwitchUserServiceStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [switchUserServiceStatusMutation, { data, loading, error }] = useSwitchUserServiceStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSwitchUserServiceStatusMutation(baseOptions?: Apollo.MutationHookOptions<SwitchUserServiceStatusMutation, SwitchUserServiceStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SwitchUserServiceStatusMutation, SwitchUserServiceStatusMutationVariables>(SwitchUserServiceStatusDocument, options);
      }
export type SwitchUserServiceStatusMutationHookResult = ReturnType<typeof useSwitchUserServiceStatusMutation>;
export type SwitchUserServiceStatusMutationResult = Apollo.MutationResult<SwitchUserServiceStatusMutation>;
export type SwitchUserServiceStatusMutationOptions = Apollo.BaseMutationOptions<SwitchUserServiceStatusMutation, SwitchUserServiceStatusMutationVariables>;
export const UpdateMeDocument = gql`
    mutation UpdateMe($options: UpdatedUser!) {
  updateMe(options: $options)
}
    `;
export type UpdateMeMutationFn = Apollo.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
export const UpsertUserServiceDocument = gql`
    mutation UpsertUserService($options: UpsertUserService!) {
  upsertUserService(options: $options)
}
    `;
export type UpsertUserServiceMutationFn = Apollo.MutationFunction<UpsertUserServiceMutation, UpsertUserServiceMutationVariables>;

/**
 * __useUpsertUserServiceMutation__
 *
 * To run a mutation, you first call `useUpsertUserServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertUserServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertUserServiceMutation, { data, loading, error }] = useUpsertUserServiceMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpsertUserServiceMutation(baseOptions?: Apollo.MutationHookOptions<UpsertUserServiceMutation, UpsertUserServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertUserServiceMutation, UpsertUserServiceMutationVariables>(UpsertUserServiceDocument, options);
      }
export type UpsertUserServiceMutationHookResult = ReturnType<typeof useUpsertUserServiceMutation>;
export type UpsertUserServiceMutationResult = Apollo.MutationResult<UpsertUserServiceMutation>;
export type UpsertUserServiceMutationOptions = Apollo.BaseMutationOptions<UpsertUserServiceMutation, UpsertUserServiceMutationVariables>;
export const FilterUserServiceDocument = gql`
    query FilterUserService($slug: String!) {
  filterUserService(slug: $slug) {
    id
    status
    level
    platforms
    description
    price
    per
    images {
      id
      type
      url
    }
    user {
      id
      username
      age
      gender
      country
      lastOnline
      images {
        id
        type
        url
      }
    }
  }
}
    `;

/**
 * __useFilterUserServiceQuery__
 *
 * To run a query within a React component, call `useFilterUserServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterUserServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterUserServiceQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useFilterUserServiceQuery(baseOptions: Apollo.QueryHookOptions<FilterUserServiceQuery, FilterUserServiceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilterUserServiceQuery, FilterUserServiceQueryVariables>(FilterUserServiceDocument, options);
      }
export function useFilterUserServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilterUserServiceQuery, FilterUserServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilterUserServiceQuery, FilterUserServiceQueryVariables>(FilterUserServiceDocument, options);
        }
export type FilterUserServiceQueryHookResult = ReturnType<typeof useFilterUserServiceQuery>;
export type FilterUserServiceLazyQueryHookResult = ReturnType<typeof useFilterUserServiceLazyQuery>;
export type FilterUserServiceQueryResult = Apollo.QueryResult<FilterUserServiceQuery, FilterUserServiceQueryVariables>;
export const GetAllServicesDocument = gql`
    query GetAllServices {
  getAllServices {
    id
    type
    name
    slug
    popularity
    boxArtUrl
    first_release_date
    genres
    platforms
    multiplayer_modes
    images {
      id
      type
      url
      width
      height
    }
  }
}
    `;

/**
 * __useGetAllServicesQuery__
 *
 * To run a query within a React component, call `useGetAllServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllServicesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllServicesQuery, GetAllServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllServicesQuery, GetAllServicesQueryVariables>(GetAllServicesDocument, options);
      }
export function useGetAllServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllServicesQuery, GetAllServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllServicesQuery, GetAllServicesQueryVariables>(GetAllServicesDocument, options);
        }
export type GetAllServicesQueryHookResult = ReturnType<typeof useGetAllServicesQuery>;
export type GetAllServicesLazyQueryHookResult = ReturnType<typeof useGetAllServicesLazyQuery>;
export type GetAllServicesQueryResult = Apollo.QueryResult<GetAllServicesQuery, GetAllServicesQueryVariables>;
export const GetMeUserServiceDocument = gql`
    query GetMeUserService {
  getMeUserService {
    id
    status
    serviceId
    level
    platforms
    description
    price
    per
    service {
      id
      igdbId
      twitchId
      name
      popularity
      boxArtUrl
      first_release_date
      platforms
      genres
      multiplayer_modes
    }
  }
}
    `;

/**
 * __useGetMeUserServiceQuery__
 *
 * To run a query within a React component, call `useGetMeUserServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeUserServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeUserServiceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeUserServiceQuery(baseOptions?: Apollo.QueryHookOptions<GetMeUserServiceQuery, GetMeUserServiceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeUserServiceQuery, GetMeUserServiceQueryVariables>(GetMeUserServiceDocument, options);
      }
export function useGetMeUserServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeUserServiceQuery, GetMeUserServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeUserServiceQuery, GetMeUserServiceQueryVariables>(GetMeUserServiceDocument, options);
        }
export type GetMeUserServiceQueryHookResult = ReturnType<typeof useGetMeUserServiceQuery>;
export type GetMeUserServiceLazyQueryHookResult = ReturnType<typeof useGetMeUserServiceLazyQuery>;
export type GetMeUserServiceQueryResult = Apollo.QueryResult<GetMeUserServiceQuery, GetMeUserServiceQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    type
    username
    gender
    country
    age
    description
    discord
    twitter
    facebook
    snapchat
    instagram
    twitch
    steam
    tiktok
    images {
      id
      url
    }
    languages {
      id
      name
    }
    schedules {
      id
      name
      from
      to
      available
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    type
    username
    gender
    country
    age
    lastOnline
    description
    discord
    twitter
    facebook
    snapchat
    instagram
    twitch
    steam
    tiktok
    languages {
      id
      name
    }
    schedules {
      id
      name
      from
      to
      available
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserImagesDocument = gql`
    query UserImages($type: String) {
  userImages(type: $type) {
    id
    type
    url
    publicId
  }
}
    `;

/**
 * __useUserImagesQuery__
 *
 * To run a query within a React component, call `useUserImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserImagesQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useUserImagesQuery(baseOptions?: Apollo.QueryHookOptions<UserImagesQuery, UserImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserImagesQuery, UserImagesQueryVariables>(UserImagesDocument, options);
      }
export function useUserImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserImagesQuery, UserImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserImagesQuery, UserImagesQueryVariables>(UserImagesDocument, options);
        }
export type UserImagesQueryHookResult = ReturnType<typeof useUserImagesQuery>;
export type UserImagesLazyQueryHookResult = ReturnType<typeof useUserImagesLazyQuery>;
export type UserImagesQueryResult = Apollo.QueryResult<UserImagesQuery, UserImagesQueryVariables>;
export const namedOperations = {
  Query: {
    FilterUserService: 'FilterUserService',
    GetAllServices: 'GetAllServices',
    GetMeUserService: 'GetMeUserService',
    GetUsers: 'GetUsers',
    Me: 'Me',
    UserImages: 'UserImages'
  },
  Mutation: {
    ChangePassword: 'ChangePassword',
    ChangeUserType: 'ChangeUserType',
    DeleteImage: 'DeleteImage',
    DeleteUserService: 'DeleteUserService',
    ForgotPassword: 'ForgotPassword',
    Login: 'Login',
    Logout: 'Logout',
    MultipleUpload: 'MultipleUpload',
    Register: 'Register',
    SwitchUserServiceStatus: 'SwitchUserServiceStatus',
    UpdateMe: 'UpdateMe',
    UpsertUserService: 'UpsertUserService'
  },
  Fragment: {
    RegularError: 'RegularError',
    RegularUser: 'RegularUser',
    RegularUserResponse: 'RegularUserResponse'
  }
}