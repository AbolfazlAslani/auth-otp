"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = exports.ConfigKeys = void 0;
const config_1 = require("@nestjs/config");
var ConfigKeys;
(function (ConfigKeys) {
    ConfigKeys["App"] = "App";
    ConfigKeys["Db"] = "Db";
    ConfigKeys["Jwt"] = "Jwt";
})(ConfigKeys || (exports.ConfigKeys = ConfigKeys = {}));
const AppConfig = (0, config_1.registerAs)(ConfigKeys.App, () => ({
    port: 3000,
}));
const JwtConfig = (0, config_1.registerAs)(ConfigKeys.Jwt, () => ({
    accessTokenSecret: "c7de546f95dbf714603c558adad95bfa2af5f155",
    refreshTokenSecret: "b7f4038f4f05597b4941c1ab406b40cd7bcd338b"
}));
const DbConfig = (0, config_1.registerAs)(ConfigKeys.Db, () => ({
    port: 5432,
    host: 'localhost',
    username: 'postgres',
    password: '151515',
    database: 'auth-otp'
}));
exports.Configuration = [AppConfig, DbConfig, JwtConfig];
//# sourceMappingURL=config.js.map