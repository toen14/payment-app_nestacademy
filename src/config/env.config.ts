export const port = process.env.PORT ?? 3000;

// database environment
export const typeOrmSynchronize =
  process.env.APP_ENVIRONMENT === "production" ? false : true;
export const dbType = process.env.DB_TYPE ?? "mysql";
export const dbHost = process.env.DB_HOST ?? "localhost";
export const dbPort = parseInt(process.env.DB_PORT) ?? 3306;
export const dbUsername = process.env.DB_USERNAME ?? "root";
export const dbPassword = process.env.DB_PASSWORD ?? "";
export const dbName = process.env.DB_NAME ?? "payment_app";
