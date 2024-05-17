export declare enum ConfigKeys {
    App = "App",
    Db = "Db",
    Jwt = "Jwt"
}
export declare const Configuration: (((() => {
    port: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
}>) | ((() => {
    accessTokenSecret: string;
    refreshTokenSecret: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    accessTokenSecret: string;
    refreshTokenSecret: string;
}>))[];
