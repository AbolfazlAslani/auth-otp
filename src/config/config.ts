import { registerAs } from "@nestjs/config";

export enum ConfigKeys  {
    App = "App",
    Db = "Db"
}

const AppConfig = registerAs(ConfigKeys.App, () => ({
    port : 3000,
    
}))

const DbConfig = registerAs(ConfigKeys.Db, () => ({
    port : 3000,
    host : 'localhost',
    username : 'root',
    password: '151515',
    database: 'auth-otp'
    
}))


export const Configuration = [AppConfig, DbConfig]
