declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    SERVER_PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    SMPT_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_URL: string;
  }
}
