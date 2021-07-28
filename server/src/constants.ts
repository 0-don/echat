export const __prod__ = process.env.NODE_ENV === 'production';
export const COOKIE_NAME = 'qid';
export const FORGET_PASSWORD_PREFIX = 'forget-password:';
export const ENTITIES = __prod__ ? 'dist/entity/**/*.js' : 'src/entity/**/*.ts';
export const MIGRATIONS = __prod__
  ? 'dist/migration/**/*.js'
  : 'src/migration/**/*.ts';
export const SUBSCRIBERS = __prod__
  ? 'dist/subscriber/**/*.js'
  : 'src/subscriber/**/*.ts';
 