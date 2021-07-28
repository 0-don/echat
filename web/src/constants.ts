export const __prod__ = process.env.NODE_ENV === 'production';
export const GRAPHQL_SERVER_URL = __prod__
  ? '/graphql'
  : 'http://localhost:4001/graphql';  //Tes