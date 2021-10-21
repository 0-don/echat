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

export type Country = {
  __typename?: 'Country';
  id: Scalars['Int'];
  name: Scalars['String'];
  isoAlpha2: Scalars['String'];
  isoAlpha3: Scalars['String'];
  isoNumeric: Scalars['Int'];
  currencycode?: Maybe<Scalars['String']>;
  currencyname?: Maybe<Scalars['String']>;
  currencysymbol?: Maybe<Scalars['String']>;
  flag: Scalars['String'];
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

export type FilterOptions = {
  languages?: Maybe<Array<ListValues>>;
  genders?: Maybe<Array<ListValues>>;
  ages?: Maybe<Array<ListValues>>;
  prices?: Maybe<Array<ListValues>>;
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['Int'];
  type: Scalars['String'];
  url: Scalars['String'];
  publicId?: Maybe<Scalars['String']>;
  serviceId?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
  user: User;
};


export type Language = {
  __typename?: 'Language';
  id: Scalars['Int'];
  name: Scalars['String'];
  code: Scalars['String'];
};

export type ListValues = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  message: Scalars['String'];
  roomId: Scalars['Int'];
  room: Room;
  userId: Scalars['Int'];
  user: User;
  createdAt: Scalars['DateTime'];
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
  multipleUpload: Scalars['Boolean'];
  deleteImage: Scalars['Boolean'];
  changeUserserviceImage: Scalars['String'];
  switchUserServiceStatus: Scalars['Boolean'];
  upsertUserService: Scalars['Boolean'];
  deleteUserService: Scalars['Boolean'];
  createRoom?: Maybe<Scalars['String']>;
  sendMessage?: Maybe<Message>;
  deleteRoom: Scalars['Boolean'];
  createReview: Scalars['Boolean'];
  createOrder: OrderResponse;
  completeOrder: OrderResponse;
  acceptOrder: Scalars['Boolean'];
  cancelOrder: Scalars['Boolean'];
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


export type MutationChangeUserserviceImageArgs = {
  files: Array<Scalars['Upload']>;
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


export type MutationCreateRoomArgs = {
  participantId: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  message: Scalars['String'];
  channel: Scalars['String'];
};


export type MutationDeleteRoomArgs = {
  channel: Scalars['String'];
};


export type MutationCreateReviewArgs = {
  options: ReviewOptions;
};


export type MutationCreateOrderArgs = {
  startTime: Scalars['DateTime'];
  rounds: Scalars['Int'];
  userServiceId: Scalars['Int'];
};


export type MutationCompleteOrderArgs = {
  sellerId?: Maybe<Scalars['Int']>;
  buyerId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};


export type MutationAcceptOrderArgs = {
  id: Scalars['Int'];
};


export type MutationCancelOrderArgs = {
  sellerId?: Maybe<Scalars['Int']>;
  buyerId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Int'];
  status: Scalars['String'];
  price: Scalars['Float'];
  rounds: Scalars['Int'];
  per: Scalars['String'];
  startTime: Scalars['DateTime'];
  startedTime?: Maybe<Scalars['DateTime']>;
  finalPrice: Scalars['Float'];
  buyer?: Maybe<User>;
  buyerId: Scalars['Int'];
  seller?: Maybe<User>;
  sellerId: Scalars['Int'];
  userService?: Maybe<UserService>;
  userServiceId: Scalars['Int'];
  review?: Maybe<Review>;
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean'];
};

export type PaginatedUserService = {
  __typename?: 'PaginatedUserService';
  userService: Array<UserService>;
  hasMore: Scalars['Boolean'];
};

export type Participant = {
  __typename?: 'Participant';
  id: Scalars['Int'];
  roomId: Scalars['Int'];
  room: Room;
  userId: Scalars['Int'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
  me?: Maybe<User>;
  allImages?: Maybe<Array<Image>>;
  userImages?: Maybe<Array<Image>>;
  getServices?: Maybe<Array<Service>>;
  getService?: Maybe<Service>;
  getUserServices: Array<UserService>;
  filterUserService?: Maybe<PaginatedUserService>;
  getMeUserService?: Maybe<Array<UserService>>;
  getUserService: UserService;
  getRooms?: Maybe<Array<Room>>;
  getMessages?: Maybe<Array<Message>>;
  getCountries?: Maybe<Array<Country>>;
  getLanguages?: Maybe<Array<Language>>;
  getBuyerOrders: Array<Order>;
  getSellerOrders: Array<Order>;
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};


export type QueryUserImagesArgs = {
  type?: Maybe<Scalars['String']>;
};


export type QueryGetServiceArgs = {
  id: Scalars['Int'];
};


export type QueryFilterUserServiceArgs = {
  filterOptions?: Maybe<FilterOptions>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  slug: Scalars['String'];
};


export type QueryGetUserServiceArgs = {
  id: Scalars['Int'];
};


export type QueryGetMessagesArgs = {
  channel: Scalars['String'];
};


export type QueryGetCountriesArgs = {
  slug?: Maybe<Scalars['String']>;
};


export type QueryGetLanguagesArgs = {
  slug?: Maybe<Scalars['String']>;
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int'];
  score: Scalars['Float'];
  recommend: Scalars['Boolean'];
  review: Scalars['String'];
  target: User;
  targetId: Scalars['Int'];
  source?: Maybe<User>;
  sourceId: Scalars['Int'];
  order: Order;
  orderId: Scalars['Int'];
  userService?: Maybe<UserService>;
  userServiceId: Scalars['Int'];
  created_at: Scalars['DateTime'];
};

export type ReviewOptions = {
  orderId: Scalars['Int'];
  targetId: Scalars['Int'];
  score: Scalars['Float'];
  recommend: Scalars['Boolean'];
  review: Scalars['String'];
};

export type Room = {
  __typename?: 'Room';
  channel: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  lastMessageDate?: Maybe<Scalars['DateTime']>;
  messages?: Maybe<Array<Message>>;
  newMessage?: Maybe<Scalars['String']>;
  newMessagesCount?: Maybe<Scalars['Int']>;
  participants?: Maybe<Array<Participant>>;
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
  messageSent: Message;
};


export type SubscriptionMessageSentArgs = {
  channel: Scalars['String'];
};

export type UpdatedUser = {
  username: Scalars['String'];
  description: Scalars['String'];
  age: Scalars['DateTime'];
  gender: Scalars['String'];
  discord: Scalars['String'];
  twitter: Scalars['String'];
  facebook: Scalars['String'];
  snapchat: Scalars['String'];
  instagram: Scalars['String'];
  twitch: Scalars['String'];
  steam: Scalars['String'];
  tiktok: Scalars['String'];
  countryId: Scalars['Int'];
  languages: Array<ListValues>;
  schedules: Array<ScheduleValues>;
};


export type UpsertUserService = {
  serviceId: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  platforms?: Maybe<Array<Dropdown>>;
  description?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  per: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  coins: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  lastOnline?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  snapchat?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  twitch?: Maybe<Scalars['String']>;
  steam?: Maybe<Scalars['String']>;
  tiktok?: Maybe<Scalars['String']>;
  countryId?: Maybe<Scalars['Int']>;
  country?: Maybe<Country>;
  images?: Maybe<Array<Image>>;
  services?: Maybe<Array<UserService>>;
  languages?: Maybe<Array<UserLanguage>>;
  schedules?: Maybe<Array<Schedule>>;
  buyerOrders?: Maybe<Array<Order>>;
  sellerOrders?: Maybe<Array<Order>>;
  source?: Maybe<Array<Review>>;
  target?: Maybe<Array<Review>>;
  messages?: Maybe<Array<Message>>;
  participants?: Maybe<Array<Participant>>;
};

export type UserLanguage = {
  __typename?: 'UserLanguage';
  id: Scalars['Int'];
  name: Scalars['String'];
  languageId: Scalars['Int'];
  userId: Scalars['Int'];
  user: User;
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
  level?: Maybe<Scalars['String']>;
  platforms?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  per: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
  user: User;
  serviceId: Scalars['Int'];
  service: Service;
  images?: Maybe<Array<ServiceImage>>;
  orders?: Maybe<Array<Order>>;
  reviews?: Maybe<Array<Review>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'type' | 'username' | 'coins' | 'gender' | 'countryId' | 'age' | 'lastOnline' | 'description' | 'discord' | 'twitter' | 'facebook' | 'snapchat' | 'instagram' | 'twitch' | 'steam' | 'tiktok'>
  & { target?: Maybe<Array<(
    { __typename?: 'Review' }
    & Pick<Review, 'id' | 'score' | 'recommend'>
  )>>, country?: Maybe<(
    { __typename?: 'Country' }
    & Pick<Country, 'id' | 'name' | 'flag'>
  )>, languages?: Maybe<Array<(
    { __typename?: 'UserLanguage' }
    & Pick<UserLanguage, 'id' | 'name'>
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

export type AcceptOrderMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AcceptOrderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptOrder'>
);

export type CancelOrderMutationVariables = Exact<{
  id: Scalars['Int'];
  sellerId?: Maybe<Scalars['Int']>;
  buyerId?: Maybe<Scalars['Int']>;
}>;


export type CancelOrderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cancelOrder'>
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

export type ChangeUserserviceImageMutationVariables = Exact<{
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type ChangeUserserviceImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeUserserviceImage'>
);

export type CompleteOrderMutationVariables = Exact<{
  id: Scalars['Int'];
  sellerId?: Maybe<Scalars['Int']>;
  buyerId?: Maybe<Scalars['Int']>;
}>;


export type CompleteOrderMutation = (
  { __typename?: 'Mutation' }
  & { completeOrder: (
    { __typename?: 'OrderResponse' }
    & Pick<OrderResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CreateOrderMutationVariables = Exact<{
  userServiceId: Scalars['Int'];
  rounds: Scalars['Int'];
  startTime: Scalars['DateTime'];
}>;


export type CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { createOrder: (
    { __typename?: 'OrderResponse' }
    & Pick<OrderResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CreateReviewMutationVariables = Exact<{
  options: ReviewOptions;
}>;


export type CreateReviewMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createReview'>
);

export type CreateRoomMutationVariables = Exact<{
  participantId: Scalars['Int'];
}>;


export type CreateRoomMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createRoom'>
);

export type DeleteImageMutationVariables = Exact<{
  publicId: Scalars['String'];
}>;


export type DeleteImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteImage'>
);

export type DeleteRoomMutationVariables = Exact<{
  channel: Scalars['String'];
}>;


export type DeleteRoomMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteRoom'>
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
  & Pick<Mutation, 'multipleUpload'>
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

export type SendMessageMutationVariables = Exact<{
  channel: Scalars['String'];
  message: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'message' | 'roomId' | 'userId'>
  )> }
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
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  filterOptions?: Maybe<FilterOptions>;
}>;


export type FilterUserServiceQuery = (
  { __typename?: 'Query' }
  & { filterUserService?: Maybe<(
    { __typename?: 'PaginatedUserService' }
    & Pick<PaginatedUserService, 'hasMore'>
    & { userService: Array<(
      { __typename?: 'UserService' }
      & Pick<UserService, 'id' | 'status' | 'level' | 'platforms' | 'price' | 'per' | 'createdAt' | 'serviceId'>
      & { reviews?: Maybe<Array<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'score' | 'recommend' | 'review'>
      )>>, user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'age' | 'gender' | 'countryId' | 'lastOnline'>
        & { country?: Maybe<(
          { __typename?: 'Country' }
          & Pick<Country, 'id' | 'name' | 'flag'>
        )>, images?: Maybe<Array<(
          { __typename?: 'Image' }
          & Pick<Image, 'id' | 'type' | 'url'>
        )>> }
      ) }
    )> }
  )> }
);

export type GetCountriesQueryVariables = Exact<{
  slug?: Maybe<Scalars['String']>;
}>;


export type GetCountriesQuery = (
  { __typename?: 'Query' }
  & { getCountries?: Maybe<Array<(
    { __typename?: 'Country' }
    & Pick<Country, 'id' | 'name'>
  )>> }
);

export type GetLanguagesQueryVariables = Exact<{
  slug?: Maybe<Scalars['String']>;
}>;


export type GetLanguagesQuery = (
  { __typename?: 'Query' }
  & { getLanguages?: Maybe<Array<(
    { __typename?: 'Language' }
    & Pick<Language, 'id' | 'name'>
  )>> }
);

export type GetMeUserServiceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeUserServiceQuery = (
  { __typename?: 'Query' }
  & { getMeUserService?: Maybe<Array<(
    { __typename?: 'UserService' }
    & Pick<UserService, 'id' | 'status' | 'serviceId' | 'level' | 'platforms' | 'image' | 'description' | 'price' | 'per'>
    & { service: (
      { __typename?: 'Service' }
      & Pick<Service, 'id' | 'igdbId' | 'twitchId' | 'name' | 'popularity' | 'boxArtUrl' | 'first_release_date' | 'platforms' | 'genres' | 'multiplayer_modes'>
    ) }
  )>> }
);

export type GetMessagesQueryVariables = Exact<{
  channel: Scalars['String'];
}>;


export type GetMessagesQuery = (
  { __typename?: 'Query' }
  & { getMessages?: Maybe<Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'message' | 'roomId' | 'userId' | 'createdAt'>
  )>> }
);

export type GetRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoomsQuery = (
  { __typename?: 'Query' }
  & { getRooms?: Maybe<Array<(
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'channel' | 'createdAt' | 'newMessage' | 'newMessagesCount' | 'lastMessageDate'>
    & { participants?: Maybe<Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'roomId' | 'userId'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'lastOnline'>
        & { images?: Maybe<Array<(
          { __typename?: 'Image' }
          & Pick<Image, 'id' | 'type' | 'url'>
        )>> }
      ) }
    )>> }
  )>> }
);

export type GetSellerOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSellerOrdersQuery = (
  { __typename?: 'Query' }
  & { getSellerOrders: Array<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'status' | 'price' | 'rounds' | 'per' | 'startTime' | 'finalPrice'>
    & { buyer?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'description' | 'age' | 'gender'>
      & { images?: Maybe<Array<(
        { __typename?: 'Image' }
        & Pick<Image, 'id' | 'url' | 'type'>
      )>> }
    )>, review?: Maybe<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'score' | 'recommend' | 'review'>
    )>, userService?: Maybe<(
      { __typename?: 'UserService' }
      & Pick<UserService, 'id' | 'status' | 'level' | 'platforms' | 'description' | 'price' | 'per' | 'image'>
      & { service: (
        { __typename?: 'Service' }
        & Pick<Service, 'id' | 'name' | 'slug' | 'popularity' | 'boxArtUrl' | 'first_release_date' | 'platforms' | 'genres' | 'multiplayer_modes'>
        & { images?: Maybe<Array<(
          { __typename?: 'ServiceImage' }
          & Pick<ServiceImage, 'id' | 'type' | 'url' | 'height' | 'width'>
        )>> }
      ) }
    )> }
  )> }
);

export type GetServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServicesQuery = (
  { __typename?: 'Query' }
  & { getServices?: Maybe<Array<(
    { __typename?: 'Service' }
    & Pick<Service, 'id' | 'type' | 'name' | 'slug' | 'popularity' | 'boxArtUrl' | 'first_release_date' | 'genres' | 'platforms' | 'multiplayer_modes'>
    & { images?: Maybe<Array<(
      { __typename?: 'ServiceImage' }
      & Pick<ServiceImage, 'id' | 'type' | 'url' | 'width' | 'height'>
    )>> }
  )>> }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'type' | 'username' | 'email' | 'lastOnline' | 'description' | 'age' | 'gender' | 'discord' | 'twitter' | 'facebook' | 'snapchat' | 'instagram' | 'twitch' | 'steam' | 'tiktok'>
    & { target?: Maybe<Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'score' | 'recommend' | 'review' | 'targetId' | 'created_at'>
      & { source?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
        & { images?: Maybe<Array<(
          { __typename?: 'Image' }
          & Pick<Image, 'id' | 'type' | 'url'>
        )>> }
      )> }
    )>>, country?: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, 'id' | 'name' | 'flag'>
    )>, images?: Maybe<Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'type' | 'url'>
    )>>, languages?: Maybe<Array<(
      { __typename?: 'UserLanguage' }
      & Pick<UserLanguage, 'id' | 'name'>
    )>>, schedules?: Maybe<Array<(
      { __typename?: 'Schedule' }
      & Pick<Schedule, 'id' | 'name' | 'from' | 'to' | 'available'>
    )>>, services?: Maybe<Array<(
      { __typename?: 'UserService' }
      & Pick<UserService, 'id' | 'status' | 'level' | 'platforms' | 'description' | 'price' | 'per'>
      & { reviews?: Maybe<Array<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'score' | 'recommend' | 'review'>
      )>>, service: (
        { __typename?: 'Service' }
        & Pick<Service, 'id' | 'name' | 'boxArtUrl'>
      ), images?: Maybe<Array<(
        { __typename?: 'ServiceImage' }
        & Pick<ServiceImage, 'id' | 'type' | 'url'>
      )>> }
    )>> }
  )> }
);

export type GetUserServiceQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserServiceQuery = (
  { __typename?: 'Query' }
  & { getUserService: (
    { __typename?: 'UserService' }
    & Pick<UserService, 'id' | 'status' | 'platforms' | 'description' | 'level' | 'price' | 'per' | 'image'>
    & { reviews?: Maybe<Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'score' | 'recommend' | 'review' | 'created_at'>
      & { source?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
        & { images?: Maybe<Array<(
          { __typename?: 'Image' }
          & Pick<Image, 'id' | 'type' | 'url'>
        )>> }
      )> }
    )>>, service: (
      { __typename?: 'Service' }
      & Pick<Service, 'id' | 'type' | 'name' | 'twitchId' | 'popularity' | 'boxArtUrl' | 'first_release_date' | 'platforms' | 'genres'>
      & { images?: Maybe<Array<(
        { __typename?: 'ServiceImage' }
        & Pick<ServiceImage, 'id' | 'url' | 'width' | 'type' | 'height'>
      )>> }
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'lastOnline' | 'age' | 'description' | 'gender' | 'discord' | 'twitter' | 'facebook' | 'instagram' | 'twitch' | 'tiktok'>
      & { schedules?: Maybe<Array<(
        { __typename?: 'Schedule' }
        & Pick<Schedule, 'id' | 'name' | 'from' | 'to' | 'available'>
      )>>, target?: Maybe<Array<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'score' | 'recommend'>
      )>>, languages?: Maybe<Array<(
        { __typename?: 'UserLanguage' }
        & Pick<UserLanguage, 'id' | 'name'>
      )>>, country?: Maybe<(
        { __typename?: 'Country' }
        & Pick<Country, 'id' | 'name' | 'flag'>
      )>, images?: Maybe<Array<(
        { __typename?: 'Image' }
        & Pick<Image, 'id' | 'url' | 'type'>
      )>>, services?: Maybe<Array<(
        { __typename?: 'UserService' }
        & Pick<UserService, 'id' | 'status' | 'level' | 'platforms' | 'description' | 'price' | 'per' | 'image'>
        & { service: (
          { __typename?: 'Service' }
          & Pick<Service, 'id' | 'type' | 'name' | 'twitchId' | 'popularity' | 'boxArtUrl' | 'first_release_date' | 'platforms' | 'genres'>
        ) }
      )>> }
    ) }
  ) }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'type' | 'username' | 'gender' | 'countryId' | 'age' | 'description' | 'discord' | 'twitter' | 'facebook' | 'snapchat' | 'instagram' | 'twitch' | 'steam' | 'tiktok'>
    & { images?: Maybe<Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'url'>
    )>>, languages?: Maybe<Array<(
      { __typename?: 'UserLanguage' }
      & Pick<UserLanguage, 'id' | 'name'>
    )>>, schedules?: Maybe<Array<(
      { __typename?: 'Schedule' }
      & Pick<Schedule, 'id' | 'name' | 'from' | 'to' | 'available'>
    )>> }
  )>> }
);

export type GetBuyerOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBuyerOrdersQuery = (
  { __typename?: 'Query' }
  & { getBuyerOrders: Array<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'status' | 'price' | 'rounds' | 'per' | 'startTime' | 'finalPrice'>
    & { seller?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'description' | 'age' | 'gender'>
      & { images?: Maybe<Array<(
        { __typename?: 'Image' }
        & Pick<Image, 'id' | 'url' | 'type'>
      )>> }
    )>, review?: Maybe<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'score' | 'recommend' | 'review'>
    )>, userService?: Maybe<(
      { __typename?: 'UserService' }
      & Pick<UserService, 'id' | 'status' | 'level' | 'platforms' | 'description' | 'price' | 'per' | 'image'>
      & { service: (
        { __typename?: 'Service' }
        & Pick<Service, 'id' | 'name' | 'slug' | 'popularity' | 'boxArtUrl' | 'first_release_date' | 'platforms' | 'genres' | 'multiplayer_modes'>
        & { images?: Maybe<Array<(
          { __typename?: 'ServiceImage' }
          & Pick<ServiceImage, 'id' | 'type' | 'url' | 'height' | 'width'>
        )>> }
      ) }
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'type' | 'username' | 'coins' | 'gender' | 'countryId' | 'age' | 'lastOnline' | 'description' | 'discord' | 'twitter' | 'facebook' | 'snapchat' | 'instagram' | 'twitch' | 'steam' | 'tiktok'>
    & { target?: Maybe<Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'score' | 'recommend'>
    )>>, country?: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, 'id' | 'name' | 'flag'>
    )>, languages?: Maybe<Array<(
      { __typename?: 'UserLanguage' }
      & Pick<UserLanguage, 'id' | 'name'>
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

export type MessageSentSubscriptionVariables = Exact<{
  channel: Scalars['String'];
}>;


export type MessageSentSubscription = (
  { __typename?: 'Subscription' }
  & { messageSent: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'message' | 'roomId' | 'userId' | 'createdAt'>
  ) }
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
  coins
  gender
  countryId
  age
  lastOnline
  description
  target {
    id
    score
    recommend
  }
  discord
  twitter
  facebook
  snapchat
  instagram
  twitch
  steam
  tiktok
  country {
    id
    name
    flag
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
export const AcceptOrderDocument = gql`
    mutation AcceptOrder($id: Int!) {
  acceptOrder(id: $id)
}
    `;
export type AcceptOrderMutationFn = Apollo.MutationFunction<AcceptOrderMutation, AcceptOrderMutationVariables>;

/**
 * __useAcceptOrderMutation__
 *
 * To run a mutation, you first call `useAcceptOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptOrderMutation, { data, loading, error }] = useAcceptOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAcceptOrderMutation(baseOptions?: Apollo.MutationHookOptions<AcceptOrderMutation, AcceptOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptOrderMutation, AcceptOrderMutationVariables>(AcceptOrderDocument, options);
      }
export type AcceptOrderMutationHookResult = ReturnType<typeof useAcceptOrderMutation>;
export type AcceptOrderMutationResult = Apollo.MutationResult<AcceptOrderMutation>;
export type AcceptOrderMutationOptions = Apollo.BaseMutationOptions<AcceptOrderMutation, AcceptOrderMutationVariables>;
export const CancelOrderDocument = gql`
    mutation cancelOrder($id: Int!, $sellerId: Int, $buyerId: Int) {
  cancelOrder(id: $id, buyerId: $buyerId, sellerId: $sellerId)
}
    `;
export type CancelOrderMutationFn = Apollo.MutationFunction<CancelOrderMutation, CancelOrderMutationVariables>;

/**
 * __useCancelOrderMutation__
 *
 * To run a mutation, you first call `useCancelOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelOrderMutation, { data, loading, error }] = useCancelOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      sellerId: // value for 'sellerId'
 *      buyerId: // value for 'buyerId'
 *   },
 * });
 */
export function useCancelOrderMutation(baseOptions?: Apollo.MutationHookOptions<CancelOrderMutation, CancelOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelOrderMutation, CancelOrderMutationVariables>(CancelOrderDocument, options);
      }
export type CancelOrderMutationHookResult = ReturnType<typeof useCancelOrderMutation>;
export type CancelOrderMutationResult = Apollo.MutationResult<CancelOrderMutation>;
export type CancelOrderMutationOptions = Apollo.BaseMutationOptions<CancelOrderMutation, CancelOrderMutationVariables>;
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
export const ChangeUserserviceImageDocument = gql`
    mutation ChangeUserserviceImage($files: [Upload!]!) {
  changeUserserviceImage(files: $files)
}
    `;
export type ChangeUserserviceImageMutationFn = Apollo.MutationFunction<ChangeUserserviceImageMutation, ChangeUserserviceImageMutationVariables>;

/**
 * __useChangeUserserviceImageMutation__
 *
 * To run a mutation, you first call `useChangeUserserviceImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserserviceImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserserviceImageMutation, { data, loading, error }] = useChangeUserserviceImageMutation({
 *   variables: {
 *      files: // value for 'files'
 *   },
 * });
 */
export function useChangeUserserviceImageMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUserserviceImageMutation, ChangeUserserviceImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUserserviceImageMutation, ChangeUserserviceImageMutationVariables>(ChangeUserserviceImageDocument, options);
      }
export type ChangeUserserviceImageMutationHookResult = ReturnType<typeof useChangeUserserviceImageMutation>;
export type ChangeUserserviceImageMutationResult = Apollo.MutationResult<ChangeUserserviceImageMutation>;
export type ChangeUserserviceImageMutationOptions = Apollo.BaseMutationOptions<ChangeUserserviceImageMutation, ChangeUserserviceImageMutationVariables>;
export const CompleteOrderDocument = gql`
    mutation CompleteOrder($id: Int!, $sellerId: Int, $buyerId: Int) {
  completeOrder(id: $id, buyerId: $buyerId, sellerId: $sellerId) {
    success
    errors {
      field
      message
    }
  }
}
    `;
export type CompleteOrderMutationFn = Apollo.MutationFunction<CompleteOrderMutation, CompleteOrderMutationVariables>;

/**
 * __useCompleteOrderMutation__
 *
 * To run a mutation, you first call `useCompleteOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeOrderMutation, { data, loading, error }] = useCompleteOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      sellerId: // value for 'sellerId'
 *      buyerId: // value for 'buyerId'
 *   },
 * });
 */
export function useCompleteOrderMutation(baseOptions?: Apollo.MutationHookOptions<CompleteOrderMutation, CompleteOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteOrderMutation, CompleteOrderMutationVariables>(CompleteOrderDocument, options);
      }
export type CompleteOrderMutationHookResult = ReturnType<typeof useCompleteOrderMutation>;
export type CompleteOrderMutationResult = Apollo.MutationResult<CompleteOrderMutation>;
export type CompleteOrderMutationOptions = Apollo.BaseMutationOptions<CompleteOrderMutation, CompleteOrderMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($userServiceId: Int!, $rounds: Int!, $startTime: DateTime!) {
  createOrder(
    userServiceId: $userServiceId
    rounds: $rounds
    startTime: $startTime
  ) {
    success
    errors {
      field
      message
    }
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      userServiceId: // value for 'userServiceId'
 *      rounds: // value for 'rounds'
 *      startTime: // value for 'startTime'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const CreateReviewDocument = gql`
    mutation CreateReview($options: ReviewOptions!) {
  createReview(options: $options)
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const CreateRoomDocument = gql`
    mutation createRoom($participantId: Int!) {
  createRoom(participantId: $participantId)
}
    `;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      participantId: // value for 'participantId'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
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
export const DeleteRoomDocument = gql`
    mutation DeleteRoom($channel: String!) {
  deleteRoom(channel: $channel)
}
    `;
export type DeleteRoomMutationFn = Apollo.MutationFunction<DeleteRoomMutation, DeleteRoomMutationVariables>;

/**
 * __useDeleteRoomMutation__
 *
 * To run a mutation, you first call `useDeleteRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoomMutation, { data, loading, error }] = useDeleteRoomMutation({
 *   variables: {
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useDeleteRoomMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoomMutation, DeleteRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoomMutation, DeleteRoomMutationVariables>(DeleteRoomDocument, options);
      }
export type DeleteRoomMutationHookResult = ReturnType<typeof useDeleteRoomMutation>;
export type DeleteRoomMutationResult = Apollo.MutationResult<DeleteRoomMutation>;
export type DeleteRoomMutationOptions = Apollo.BaseMutationOptions<DeleteRoomMutation, DeleteRoomMutationVariables>;
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
  multipleUpload(files: $files, type: $type)
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
export const SendMessageDocument = gql`
    mutation SendMessage($channel: String!, $message: String!) {
  sendMessage(channel: $channel, message: $message) {
    id
    message
    roomId
    userId
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      channel: // value for 'channel'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
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
    query FilterUserService($slug: String!, $limit: Int!, $cursor: String, $filterOptions: FilterOptions) {
  filterUserService(
    slug: $slug
    limit: $limit
    cursor: $cursor
    filterOptions: $filterOptions
  ) {
    hasMore
    userService {
      id
      status
      level
      platforms
      price
      per
      createdAt
      serviceId
      reviews {
        id
        score
        recommend
        review
      }
      user {
        id
        username
        age
        gender
        countryId
        lastOnline
        country {
          id
          name
          flag
        }
        images {
          id
          type
          url
        }
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
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      filterOptions: // value for 'filterOptions'
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
export const GetCountriesDocument = gql`
    query GetCountries($slug: String) {
  getCountries(slug: $slug) {
    id
    name
  }
}
    `;

/**
 * __useGetCountriesQuery__
 *
 * To run a query within a React component, call `useGetCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountriesQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetCountriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCountriesQuery, GetCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCountriesQuery, GetCountriesQueryVariables>(GetCountriesDocument, options);
      }
export function useGetCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCountriesQuery, GetCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCountriesQuery, GetCountriesQueryVariables>(GetCountriesDocument, options);
        }
export type GetCountriesQueryHookResult = ReturnType<typeof useGetCountriesQuery>;
export type GetCountriesLazyQueryHookResult = ReturnType<typeof useGetCountriesLazyQuery>;
export type GetCountriesQueryResult = Apollo.QueryResult<GetCountriesQuery, GetCountriesQueryVariables>;
export const GetLanguagesDocument = gql`
    query GetLanguages($slug: String) {
  getLanguages(slug: $slug) {
    id
    name
  }
}
    `;

/**
 * __useGetLanguagesQuery__
 *
 * To run a query within a React component, call `useGetLanguagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLanguagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLanguagesQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetLanguagesQuery(baseOptions?: Apollo.QueryHookOptions<GetLanguagesQuery, GetLanguagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLanguagesQuery, GetLanguagesQueryVariables>(GetLanguagesDocument, options);
      }
export function useGetLanguagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLanguagesQuery, GetLanguagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLanguagesQuery, GetLanguagesQueryVariables>(GetLanguagesDocument, options);
        }
export type GetLanguagesQueryHookResult = ReturnType<typeof useGetLanguagesQuery>;
export type GetLanguagesLazyQueryHookResult = ReturnType<typeof useGetLanguagesLazyQuery>;
export type GetLanguagesQueryResult = Apollo.QueryResult<GetLanguagesQuery, GetLanguagesQueryVariables>;
export const GetMeUserServiceDocument = gql`
    query GetMeUserService {
  getMeUserService {
    id
    status
    serviceId
    level
    platforms
    image
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
export const GetMessagesDocument = gql`
    query GetMessages($channel: String!) {
  getMessages(channel: $channel) {
    id
    message
    roomId
    userId
    createdAt
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetRoomsDocument = gql`
    query GetRooms {
  getRooms {
    id
    channel
    createdAt
    newMessage @client
    newMessagesCount @client
    lastMessageDate @client
    participants {
      id
      roomId
      userId
      user {
        id
        username
        lastOnline
        images {
          id
          type
          url
        }
      }
    }
  }
}
    `;

/**
 * __useGetRoomsQuery__
 *
 * To run a query within a React component, call `useGetRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRoomsQuery(baseOptions?: Apollo.QueryHookOptions<GetRoomsQuery, GetRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomsQuery, GetRoomsQueryVariables>(GetRoomsDocument, options);
      }
export function useGetRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomsQuery, GetRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomsQuery, GetRoomsQueryVariables>(GetRoomsDocument, options);
        }
export type GetRoomsQueryHookResult = ReturnType<typeof useGetRoomsQuery>;
export type GetRoomsLazyQueryHookResult = ReturnType<typeof useGetRoomsLazyQuery>;
export type GetRoomsQueryResult = Apollo.QueryResult<GetRoomsQuery, GetRoomsQueryVariables>;
export const GetSellerOrdersDocument = gql`
    query GetSellerOrders {
  getSellerOrders {
    id
    status
    price
    rounds
    per
    startTime
    finalPrice
    buyer {
      id
      username
      description
      age
      gender
      images {
        id
        url
        type
      }
    }
    review {
      id
      score
      recommend
      review
    }
    userService {
      id
      status
      level
      platforms
      description
      price
      per
      image
      service {
        id
        name
        slug
        popularity
        boxArtUrl
        first_release_date
        platforms
        genres
        multiplayer_modes
        images {
          id
          type
          url
          height
          width
        }
      }
    }
  }
}
    `;

/**
 * __useGetSellerOrdersQuery__
 *
 * To run a query within a React component, call `useGetSellerOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSellerOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSellerOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSellerOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetSellerOrdersQuery, GetSellerOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSellerOrdersQuery, GetSellerOrdersQueryVariables>(GetSellerOrdersDocument, options);
      }
export function useGetSellerOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSellerOrdersQuery, GetSellerOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSellerOrdersQuery, GetSellerOrdersQueryVariables>(GetSellerOrdersDocument, options);
        }
export type GetSellerOrdersQueryHookResult = ReturnType<typeof useGetSellerOrdersQuery>;
export type GetSellerOrdersLazyQueryHookResult = ReturnType<typeof useGetSellerOrdersLazyQuery>;
export type GetSellerOrdersQueryResult = Apollo.QueryResult<GetSellerOrdersQuery, GetSellerOrdersQueryVariables>;
export const GetServicesDocument = gql`
    query GetServices {
  getServices {
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
 * __useGetServicesQuery__
 *
 * To run a query within a React component, call `useGetServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServicesQuery(baseOptions?: Apollo.QueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
      }
export function useGetServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
        }
export type GetServicesQueryHookResult = ReturnType<typeof useGetServicesQuery>;
export type GetServicesLazyQueryHookResult = ReturnType<typeof useGetServicesLazyQuery>;
export type GetServicesQueryResult = Apollo.QueryResult<GetServicesQuery, GetServicesQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: Int!) {
  getUser(id: $id) {
    id
    type
    username
    email
    lastOnline
    description
    age
    gender
    discord
    twitter
    facebook
    snapchat
    instagram
    twitch
    steam
    tiktok
    target {
      id
      score
      recommend
      review
      targetId
      created_at
      source {
        id
        username
        images {
          id
          type
          url
        }
      }
    }
    country {
      id
      name
      flag
    }
    images {
      id
      type
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
    services {
      id
      status
      level
      platforms
      description
      price
      per
      reviews {
        id
        score
        recommend
        review
      }
      service {
        id
        name
        boxArtUrl
      }
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
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUserServiceDocument = gql`
    query GetUserService($id: Int!) {
  getUserService(id: $id) {
    id
    status
    platforms
    description
    level
    price
    per
    image
    reviews {
      id
      score
      recommend
      review
      created_at
      source {
        id
        username
        images {
          id
          type
          url
        }
      }
    }
    service {
      id
      type
      name
      twitchId
      popularity
      boxArtUrl
      first_release_date
      platforms
      genres
      images {
        id
        url
        width
        type
        height
      }
    }
    user {
      id
      username
      lastOnline
      age
      description
      gender
      discord
      twitter
      facebook
      instagram
      twitch
      tiktok
      schedules {
        id
        name
        from
        to
        available
      }
      target {
        id
        score
        recommend
      }
      languages {
        id
        name
      }
      country {
        id
        name
        flag
      }
      images {
        id
        url
        type
      }
      services {
        id
        status
        level
        platforms
        description
        price
        per
        image
        service {
          id
          type
          name
          twitchId
          popularity
          boxArtUrl
          first_release_date
          platforms
          genres
        }
      }
    }
  }
}
    `;

/**
 * __useGetUserServiceQuery__
 *
 * To run a query within a React component, call `useGetUserServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserServiceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserServiceQuery(baseOptions: Apollo.QueryHookOptions<GetUserServiceQuery, GetUserServiceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserServiceQuery, GetUserServiceQueryVariables>(GetUserServiceDocument, options);
      }
export function useGetUserServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserServiceQuery, GetUserServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserServiceQuery, GetUserServiceQueryVariables>(GetUserServiceDocument, options);
        }
export type GetUserServiceQueryHookResult = ReturnType<typeof useGetUserServiceQuery>;
export type GetUserServiceLazyQueryHookResult = ReturnType<typeof useGetUserServiceLazyQuery>;
export type GetUserServiceQueryResult = Apollo.QueryResult<GetUserServiceQuery, GetUserServiceQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    type
    username
    gender
    countryId
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
export const GetBuyerOrdersDocument = gql`
    query GetBuyerOrders {
  getBuyerOrders {
    id
    status
    price
    rounds
    per
    startTime
    finalPrice
    seller {
      id
      username
      description
      age
      gender
      images {
        id
        url
        type
      }
    }
    review {
      id
      score
      recommend
      review
    }
    userService {
      id
      status
      level
      platforms
      description
      price
      per
      image
      service {
        id
        name
        slug
        popularity
        boxArtUrl
        first_release_date
        platforms
        genres
        multiplayer_modes
        images {
          id
          type
          url
          height
          width
        }
      }
    }
  }
}
    `;

/**
 * __useGetBuyerOrdersQuery__
 *
 * To run a query within a React component, call `useGetBuyerOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuyerOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuyerOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBuyerOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetBuyerOrdersQuery, GetBuyerOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBuyerOrdersQuery, GetBuyerOrdersQueryVariables>(GetBuyerOrdersDocument, options);
      }
export function useGetBuyerOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBuyerOrdersQuery, GetBuyerOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBuyerOrdersQuery, GetBuyerOrdersQueryVariables>(GetBuyerOrdersDocument, options);
        }
export type GetBuyerOrdersQueryHookResult = ReturnType<typeof useGetBuyerOrdersQuery>;
export type GetBuyerOrdersLazyQueryHookResult = ReturnType<typeof useGetBuyerOrdersLazyQuery>;
export type GetBuyerOrdersQueryResult = Apollo.QueryResult<GetBuyerOrdersQuery, GetBuyerOrdersQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    type
    username
    coins
    gender
    countryId
    age
    lastOnline
    description
    target {
      id
      score
      recommend
    }
    discord
    twitter
    facebook
    snapchat
    instagram
    twitch
    steam
    tiktok
    country {
      id
      name
      flag
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
export const MessageSentDocument = gql`
    subscription MessageSent($channel: String!) {
  messageSent(channel: $channel) {
    id
    message
    roomId
    userId
    createdAt
  }
}
    `;

/**
 * __useMessageSentSubscription__
 *
 * To run a query within a React component, call `useMessageSentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSentSubscription({
 *   variables: {
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useMessageSentSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageSentSubscription, MessageSentSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageSentSubscription, MessageSentSubscriptionVariables>(MessageSentDocument, options);
      }
export type MessageSentSubscriptionHookResult = ReturnType<typeof useMessageSentSubscription>;
export type MessageSentSubscriptionResult = Apollo.SubscriptionResult<MessageSentSubscription>;
export const namedOperations = {
  Query: {
    FilterUserService: 'FilterUserService',
    GetCountries: 'GetCountries',
    GetLanguages: 'GetLanguages',
    GetMeUserService: 'GetMeUserService',
    GetMessages: 'GetMessages',
    GetRooms: 'GetRooms',
    GetSellerOrders: 'GetSellerOrders',
    GetServices: 'GetServices',
    GetUser: 'GetUser',
    GetUserService: 'GetUserService',
    GetUsers: 'GetUsers',
    GetBuyerOrders: 'GetBuyerOrders',
    Me: 'Me',
    UserImages: 'UserImages'
  },
  Mutation: {
    AcceptOrder: 'AcceptOrder',
    cancelOrder: 'cancelOrder',
    ChangePassword: 'ChangePassword',
    ChangeUserType: 'ChangeUserType',
    ChangeUserserviceImage: 'ChangeUserserviceImage',
    CompleteOrder: 'CompleteOrder',
    CreateOrder: 'CreateOrder',
    CreateReview: 'CreateReview',
    createRoom: 'createRoom',
    DeleteImage: 'DeleteImage',
    DeleteRoom: 'DeleteRoom',
    DeleteUserService: 'DeleteUserService',
    ForgotPassword: 'ForgotPassword',
    Login: 'Login',
    Logout: 'Logout',
    MultipleUpload: 'MultipleUpload',
    Register: 'Register',
    SendMessage: 'SendMessage',
    SwitchUserServiceStatus: 'SwitchUserServiceStatus',
    UpdateMe: 'UpdateMe',
    UpsertUserService: 'UpsertUserService'
  },
  Subscription: {
    MessageSent: 'MessageSent'
  },
  Fragment: {
    RegularError: 'RegularError',
    RegularUser: 'RegularUser',
    RegularUserResponse: 'RegularUserResponse'
  }
}