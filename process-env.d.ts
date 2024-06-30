declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      NODE_ENV: "development" | "production";
      PORT: string;
      JWT_SECRET: string;
      DB_NAME: string;
      DB_USERNAME: string;
      DB_HOST: string;
      DB_PASSWORD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
