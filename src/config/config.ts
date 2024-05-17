import { registerAs } from "@nestjs/config";

export enum ConfigKeys  {
    App = "App",
    Db = "Db",
    Jwt = "Jwt"
}

const AppConfig = registerAs(ConfigKeys.App, () => ({
    port : 3000,
    
}))

const JwtConfig = registerAs(ConfigKeys.Jwt,() =>({
    accessTokenSecret : "c7de546f95dbf714603c558adad95bfa2af5f155",
    refreshTokenSecret:"b7f4038f4f05597b4941c1ab406b40cd7bcd338b"

}))

const DbConfig = registerAs(ConfigKeys.Db, () => ({
    port : 5432,
    host : 'localhost',
    username : 'postgres',
    password: '151515',
    database: 'auth-otp'
    
}))


export const Configuration = [AppConfig, DbConfig,JwtConfig]
