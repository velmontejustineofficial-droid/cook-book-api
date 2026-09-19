const environment = globalThis.process?.env ?? {};

export const env = {
    nodeEnv: environment.NODE_ENV || "development",
    port: Number(environment.PORT) || 3000,

    databaseUrl: environment.DATABASE_URL || "",
};